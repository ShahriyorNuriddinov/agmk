const router = require("express").Router();
const User = require("../models/User");
const { auth, role } = require("../middleware/auth");



router.get("/", auth, role("admin"), async (req, res) => {
    try {
        const users = await User.find().select("-password -refreshToken");
        res.json({ success: true, data: users });
    } catch (err) {
        res.status(500).json({ success: false, message: "Внутренняя ошибка сервера" });
    }
});




router.put("/:id/role", auth, role("admin"), async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { role: req.body.role },
            { new: true }
        ).select("-password -refreshToken");
        res.json({ success: true, data: user });
    } catch (err) {
        res.status(500).json({ success: false, message: "Внутренняя ошибка сервера" });
    }
});




router.put("/:id/deactivate", auth, role("admin"), async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { isActive: false },
            { new: true }
        ).select("-password -refreshToken");
        res.json({ success: true, message: "Пользователь деактивирован", data: user });
    } catch (err) {
        res.status(500).json({ success: false, message: "Внутренняя ошибка сервера" });
    }
});

module.exports = router;
