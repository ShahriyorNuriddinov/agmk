const router = require("express").Router();
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const { body } = require("express-validator");
const User = require("../models/User");
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


router.post("/login",
    [body("email").isEmail(), body("password").notEmpty()],
    validate,
    async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if (!user || !user.isActive) return res.status(401).json({ success: false, message: "Неверный email или пароль" });
            const match = await user.comparePassword(password);
            if (!match) return res.status(401).json({ success: false, message: "Неверный email или пароль" });
            const payload = { id: user._id, role: user.role };
            const accessToken = signAccess(payload);
            const refreshToken = signRefresh(payload);
            user.refreshToken = refreshToken;
            await user.save();
            res.json({ success: true, accessToken, refreshToken, user: { id: user._id, email: user.email, role: user.role } });
        } catch (err) {
            res.status(500).json({ success: false, message: err.message });
        }
    }
);

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
            let user = await User.findOne({ email: normalEmail });
            if (!user) {
                user = await User.create({
                    email: normalEmail,
                    password: crypto.randomBytes(16).toString("hex"),
                    role: "employee",
                });
            }

            if (!user.isActive) return res.status(401).json({ success: false, message: "Аккаунт деактивирован" });

            const payload = { id: user._id, role: user.role };
            const accessToken = signAccess(payload);
            const refreshToken = signRefresh(payload);
            user.refreshToken = refreshToken;
            await user.save();

            res.json({ success: true, accessToken, refreshToken, user: { id: user._id, email: user.email, role: user.role } });
        } catch (err) {
            console.error("verify-otp error:", err.message);
            res.status(500).json({ success: false, message: err.message });
        }
    }
);

router.post("/refresh", async (req, res) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) return res.status(401).json({ success: false, message: "Refresh-токен отсутствует" });
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        const user = await User.findById(decoded.id);
        if (!user || user.refreshToken !== refreshToken) return res.status(401).json({ success: false, message: "Токен недействителен" });
        const accessToken = signAccess({ id: user._id, role: user.role });
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
        const user = await User.findById(req.user.id).select("-password -refreshToken");
        res.json({ success: true, data: user });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

module.exports = router;
