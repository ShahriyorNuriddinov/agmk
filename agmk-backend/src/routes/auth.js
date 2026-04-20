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
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
        },
    });
}

router.post(
    "/login",
    [
        body("email").isEmail().withMessage("Некорректный email"),
        body("password").notEmpty().withMessage("Пароль обязателен"),
    ],
    validate,
    async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email }).populate("employeeId");
            if (!user || !user.isActive) {
                return res.status(401).json({ success: false, message: "Неверный email или пароль" });
            }
            const match = await user.comparePassword(password);
            if (!match) {
                return res.status(401).json({ success: false, message: "Неверный email или пароль" });
            }
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

router.post(
    "/send-otp",
    [body("email").isEmail().withMessage("Некорректный email")],
    validate,
    async (req, res) => {
        try {
            const { email } = req.body;
            const normalEmail = email.toLowerCase();
            const code = Math.floor(100000 + Math.random() * 900000).toString();
            otpStore.set(normalEmail, { code });
            const transporter = createTransporter();
            await transporter.sendMail({
                from: `"АГМК Портал" <${process.env.MAIL_USER}>`,
                to: email,
                subject: "Код входа в портал АГМК",
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 400px; margin: 0 auto;">
                        <h2 style="color: #1a56db;">Ваш код входа</h2>
                        <p>Используйте этот код для входа в корпоративный портал:</p>
                        <div style="font-size: 36px; font-weight: bold; letter-spacing: 8px; color: #1a56db; padding: 16px 0;">
                            ${code}
                        </div>
                        <p style="color:#666;font-size:13px;">Код одноразовый. Никому не сообщайте его.</p>
                    </div>
                `,
            });
            res.json({ success: true, message: "Код отправлен на ваш email" });
        } catch (err) {
            console.error("send-otp error:", err);
            res.status(500).json({ success: false, message: "Ошибка при отправке кода" });
        }
    }
);

router.post(
    "/verify-otp",
    [
        body("email").isEmail().withMessage("Некорректный email"),
        body("code").isLength({ min: 6, max: 6 }).withMessage("Неверный код"),
    ],
    validate,
    async (req, res) => {
        try {
            const { email, code } = req.body;
            const normalEmail = email.toLowerCase();
            const otp = otpStore.get(normalEmail);
            if (!otp) {
                return res.status(400).json({ success: false, message: "Код не найден. Запросите новый" });
            }
            if (otp.code !== code) {
                return res.status(400).json({ success: false, message: "Неверный код" });
            }
            otpStore.delete(normalEmail);
            let user = await User.findOne({ email: normalEmail }).populate("employeeId");
            if (!user) {
                let employee = await Employee.findOne({ email: normalEmail });
                if (!employee) {
                    employee = await Employee.create({
                        tabNumber: `TAB-${Date.now()}`,
                        firstName: normalEmail.split("@")[0],
                        lastName: "",
                        middleName: "",
                        position: "Сотрудник",
                        department: "АГМК",
                        email: normalEmail,
                    });
                }
                const tempPass = crypto.randomBytes(16).toString("hex");
                user = await User.create({ email: normalEmail, password: tempPass, employeeId: employee._id, role: "employee" });
                user = await User.findById(user._id).populate("employeeId");
            }
            if (!user.isActive) {
                return res.status(401).json({ success: false, message: "Аккаунт деактивирован" });
            }
            const payload = { id: user._id, role: user.role, employeeId: user.employeeId._id };
            const accessToken = signAccess(payload);
            const refreshToken = signRefresh(payload);
            user.refreshToken = refreshToken;
            await user.save();
            res.json({ success: true, accessToken, refreshToken, user: { id: user._id, email: user.email, role: user.role, employee: user.employeeId } });
        } catch (err) {
            console.error("verify-otp error:", err);
            res.status(500).json({ success: false, message: "Внутренняя ошибка сервера" });
        }
    }
);

router.post("/refresh", async (req, res) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) return res.status(401).json({ success: false, message: "Refresh-токен отсутствует" });
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        const user = await User.findById(decoded.id);
        if (!user || user.refreshToken !== refreshToken) {
            return res.status(401).json({ success: false, message: "Токен недействителен или устарел" });
        }
        const accessToken = signAccess({ id: user._id, role: user.role, employeeId: user.employeeId });
        res.json({ success: true, accessToken });
    } catch {
        res.status(401).json({ success: false, message: "Токен недействителен или устарел" });
    }
});

router.post("/logout", auth, async (req, res) => {
    await User.findByIdAndUpdate(req.user.id, { refreshToken: null });
    res.json({ success: true, message: "Вы успешно вышли из системы" });
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
