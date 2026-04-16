const router = require("express").Router();
const IhpRequest = require("../models/IhpRequest");
const { auth, role } = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
    try {
        const requests = await IhpRequest.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.json({ success: true, data: requests });
    } catch (err) {
        res.status(500).json({ success: false, message: "Внутренняя ошибка сервера" });
    }
});

router.get("/all", auth, role("hr", "admin"), async (req, res) => {
    try {
        const requests = await IhpRequest.find().populate("user", "email").sort({ createdAt: -1 });
        res.json({ success: true, data: requests });
    } catch (err) {
        res.status(500).json({ success: false, message: "Внутренняя ошибка сервера" });
    }
});

router.post("/", auth, async (req, res) => {
    try {
        const request = await IhpRequest.create({ ...req.body, user: req.user.id });
        res.status(201).json({ success: true, data: request });
    } catch (err) {
        res.status(500).json({ success: false, message: "Внутренняя ошибка сервера" });
    }
});

router.get("/:id", auth, async (req, res) => {
    try {
        const request = await IhpRequest.findById(req.params.id);
        if (!request) return res.status(404).json({ success: false, message: "Заявка не найдена" });
        res.json({ success: true, data: request });
    } catch (err) {
        res.status(500).json({ success: false, message: "Внутренняя ошибка сервера" });
    }
});

router.put("/:id/status", auth, role("hr", "admin"), async (req, res) => {
    try {
        const request = await IhpRequest.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true }
        );
        res.json({ success: true, data: request });
    } catch (err) {
        res.status(500).json({ success: false, message: "Внутренняя ошибка сервера" });
    }
});

module.exports = router;
