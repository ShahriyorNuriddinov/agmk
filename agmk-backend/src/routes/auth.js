const router = require("express").Router();
const jwt = require("jsonwebtoken");
const { body } = require("express-validator");
const User = require("../models/User");
const Employee = require("../models/Employee");
const validate = require("../middleware/validate");
const { auth } = require("../middleware/auth");

function signAccess(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
}
function signRefresh(payload) {
    return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN });
}

router.post(
    "/register",
    [
        body("email").isEmail().withMessage("Некорректный email"),
        body("password").isLength({ min: 6 }).withMessage("Пароль должен содержать минимум 6 символов"),
        body("firstName").notEmpty().withMessage("Введите имя"),
        body("lastName").notEmpty().withMessage("Введите фамилию"),
    ],
    validate,
    async (req, res) => {
        try {
            const { email, password, firstName, lastName, middleName, position, department } = req.body;

            const exists = await User.findOne({ email });
            if (exists) {
                return res.status(400).json({ success: false, message: "Пользователь с таким email уже зарегистрирован" });
            }

            const employee = await Employee.create({
                tabNumber: `TAB-${Date.now()}`,
                firstName,
                lastName,
                middleName: middleName || "",
                position: position || "Сотрудник",
                department: department || "АГМК",
                email,
            });

            const user = await User.create({ email, password, employeeId: employee._id, role: "employee" });

            const payload = { id: user._id, role: user.role, employeeId: employee._id };
            const accessToken = signAccess(payload);
            const refreshToken = signRefresh(payload);

            user.refreshToken = refreshToken;
            await user.save();

            res.status(201).json({
                success: true,
                message: "Регистрация прошла успешно",
                accessToken,
                refreshToken,
                user: { id: user._id, email: user.email, role: user.role, employee },
            });
        } catch (err) {
            res.status(500).json({ success: false, message: "Внутренняя ошибка сервера" });
        }
    }
);

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

            res.json({
                success: true,
                accessToken,
                refreshToken,
                user: { id: user._id, email: user.email, role: user.role, employee: user.employeeId },
            });
        } catch (err) {
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
