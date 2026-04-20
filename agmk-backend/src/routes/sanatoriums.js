const router = require("express").Router();
const SanatoriumApplication = require("../models/SanatoriumApplication");
const { auth, role } = require("../middleware/auth");


router.get("/", auth, async (req, res) => {
    try {
        const apps = await SanatoriumApplication.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.json({ success: true, data: apps });
    } catch (err) {
        res.status(500).json({ success: false, message: "Внутренняя ошибка сервера" });
    }
});


router.get("/all", auth, role("hr", "manager", "admin"), async (req, res) => {
    try {
        const apps = await SanatoriumApplication.find()
            .populate("user", "email employeeId")
            .sort({ createdAt: -1 });
        res.json({ success: true, data: apps });
    } catch (err) {
        res.status(500).json({ success: false, message: "Внутренняя ошибка сервера" });
    }
});


router.post("/", auth, async (req, res) => {
    try {
        const app = await SanatoriumApplication.create({ ...req.body, user: req.user.id });
        res.status(201).json({ success: true, data: app });
    } catch (err) {
        res.status(500).json({ success: false, message: "Внутренняя ошибка сервера" });
    }
});


router.get("/:id", auth, async (req, res) => {
    try {
        const app = await SanatoriumApplication.findById(req.params.id);
        if (!app) return res.status(404).json({ success: false, message: "Заявка не найдена" });
        if (app.user.toString() !== req.user.id && !["hr", "admin"].includes(req.user.role)) {
            return res.status(403).json({ success: false, message: "Доступ запрещён" });
        }
        res.json({ success: true, data: app });
    } catch (err) {
        res.status(500).json({ success: false, message: "Внутренняя ошибка сервера" });
    }
});


router.put("/:id/status", auth, role("hr", "admin"), async (req, res) => {
    try {
        const app = await SanatoriumApplication.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status, queuePosition: req.body.queuePosition },
            { new: true }
        );
        res.json({ success: true, data: app });
    } catch (err) {
        res.status(500).json({ success: false, message: "Внутренняя ошибка сервера" });
    }
});

router.delete("/:id", auth, async (req, res) => {
    try {
        const app = await SanatoriumApplication.findById(req.params.id);
        if (!app) return res.status(404).json({ success: false, message: "Заявка не найдена" });
        if (app.user.toString() !== req.user.id) {
            return res.status(403).json({ success: false, message: "Доступ запрещён" });
        }
        await app.deleteOne();
        res.json({ success: true, message: "Заявка отменена" });
    } catch (err) {
        res.status(500).json({ success: false, message: "Внутренняя ошибка сервера" });
    }
});

module.exports = router;
