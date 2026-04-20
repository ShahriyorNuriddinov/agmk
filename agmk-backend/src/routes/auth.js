const router = require("express").Router();
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const { body } = require("express-validator");
const User = require("../models/User");
const Employee = require("../models/Employee");
const validate = require("../middleware/validate");
const { auth } = require("../middleware/auth");

const otpStore = new Map();

function signAccess(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
}
function signRefresh(payload) {
    return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN });
}
function createTransporter() {
    return nodemailer.createTransport({
        service: "gmail",
        auth: { user: process.env.MAIL_USER, pass: process.env.MAIL_PASS },
    });
}

// Parol bilan kirish
router.post("/login",
    [body("email").isEmail(), body("password").notEmpty()],
    validate,
    async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email }).populate("employeeId");
            if (!user || !user.isActive) return res.status(401).json({ success: false, message: "Неверный email или пароль" });
            const match = await user.comparePassword(password);
            if (!match) return res.status(401).json({ success: false, message: "Неверный email или пароль" });
            const payload = { id: user._id, role: user.role, employeeId: user.employeeId._id };
            const accessToken = signAccess(payload);
            const refreshToken = signRefresh(payload);
            user.refreshToken = refreshToken;
            await user.save();
            res.json({ success: true, accessToken, refreshToken, user: { id: user._id, email: user.email, role: user.role, employee: user.employeeId } });
        } catch (err) {
            res.status(500).json({ success: false, message: "Внутренняя ошибка сервера" });
        }
    }
);

// OTP kod yuborish — hamma uchun (user yo'q bo'lsa ham)
router.post("/send-otp",
    [body("email").isEmail()],
    validate,
    async (req, res) => {
        try {
            const normalEmail = req.body.email.toLowerCase();
            const code = Math.floor(100000 + Math.random() * 900000).toString();
            otpStore.set(normalEmail, code);
            await createTransporter().sendMail({
                from: `"АГМК Портал" <${process.env.MAIL_USER}>`,
                to: normalEmail,
                subject: "Код входа в портал АГМК",
                html: `<div style="font-family:Arial;max-width:400px;margin:0 auto">
                    <h2 style="color:#1a56db">Ваш код входа</h2>
                    <div style="font-size:36px;font-weight:bold;letter-spacing:8px;color:#1a56db;padding:16px 0">${code}</div>
                    <p style="color:#666;font-size:13px">Код одноразовый. Никому не сообщайте его.</p>
                </div>`,
            });
            res.json({ success: true, message: "Код отправлен на ваш email" });
        } catch (err) {
            console.error("send-otp error:", err.message);
            res.status(500).json({ success: false, message: "Ошибка при отправке кода" });
        }
    }
);

// OTP kodni tekshirish — hamma uchun (user yo'q bo'lsa avtomatik yaratiladi)
router.post("/verify-otp",
    [body("email").isEmail(), body("code").isLength({ min: 6, max: 6 })],
    validate,
    async (req, res) => {
        try {
            const { email, code } = req.body;
            const normalEmail = email.toLowerCase();

            const savedCode = otpStore.get(normalEmail);
            if (!savedCode) return res.status(400).json({ success: false, message: "Код не найден. Запросите новый" });
            if (savedCode !== code) return res.status(400).json({ success: false, message: "Неверный код" });
            otpStore.delete(normalEmail);

            // Employee topish yoki yaratish
            let employee = await Employee.findOne({ email: normalEmail });
            if (!employee) {
                employee = await Employee.create({
                    firstName: normalEmail.split("@")[0],
                    email: normalEmail,
                });
            }

            let user = await
                let user = await User.findOne({ email: normalEmail });
            if (!user) {
                user = await User.create({
                    email: normalEmail,
                    password: crypto.randomBytes(16).toString("hex"),
                    employeeId: employee._id,
                    role: "employee",
                });
            }

            if (!user.isActive) return res.status(401).json({ success: false, message: "Аккаунт деактивирован" });

            const payload = { id: user._id, role: user.role, employeeId: employee._id };
            const accessToken = signAccess(payload);
            const refreshToken = signRefresh(payload);
            user.refreshToken = refreshToken;
            await user.save();

            res.json({ success: true, accessToken, refreshToken, user: { id: user._id, email: user.email, role: user.role, employee } });
        } catch (err) {
            console.error("verify-otp error:", err.message);
            res.status(500).json({ success: false, message: err.message || "Внутренняя ошибка сервера" });
        }
    }
);

// Token yangilash
router.post("/refresh", async (req, res) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) return res.status(401).json({ success: false, message: "Refresh-токен отсутствует" });
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        const user = await User.findById(decoded.id);
        if (!user || user.refreshToken !== refreshToken) return res.status(401).json({ success: false, message: "Токен недействителен" });
        const accessToken = signAccess({ id: user._id, role: user.role, employeeId: user.employeeId });
        res.json({ success: true, accessToken });
    } catch {
        res.status(401).json({ success: false, message: "Токен недействителен" });
    }
});

router.post("/logout", auth, async (req, res) => {
    await User.findByIdAndUpdate(req.user.id, { refreshToken: null });
    res.json({ success: true });
});


router.get("/me", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate("employeeId").select("-password -refreshToken");
        res.json({ success: true, data: user });
    } catch (err) {
        res.status(500).json({ success: false, message: "Внутренняя ошибка сервера" });
    }
});

module.exports = router;
