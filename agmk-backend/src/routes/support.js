const router = require("express").Router();
const SupportTicket = require("../models/SupportTicket");
const { auth, role } = require("../middleware/auth");


router.get("/", auth, async (req, res) => {
    try {
        const tickets = await SupportTicket.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.json({ success: true, data: tickets });
    } catch (err) {
        res.status(500).json({ success: false, message: "Внутренняя ошибка сервера" });
    }
});


router.get("/all", auth, role("admin"), async (req, res) => {
    try {
        const { status, priority, page = 1, limit = 20 } = req.query;
        const query = {};
        if (status) query.status = status;
        if (priority) query.priority = priority;

        const total = await SupportTicket.countDocuments(query);
        const tickets = await SupportTicket.find(query)
            .populate("user", "email")
            .populate("executor", "email")
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(Number(limit));

        res.json({
            success: true,
            data: tickets,
            pagination: { page: Number(page), limit: Number(limit), total, pages: Math.ceil(total / limit) },
        });
    } catch (err) {
        res.status(500).json({ success: false, message: "Внутренняя ошибка сервера" });
    }
});


router.post("/", auth, async (req, res) => {
    try {
        const ticket = await SupportTicket.create({ ...req.body, user: req.user.id });
        res.status(201).json({ success: true, data: ticket });
    } catch (err) {
        res.status(500).json({ success: false, message: "Внутренняя ошибка сервера" });
    }
});



router.get("/:id", auth, async (req, res) => {
    try {
        const ticket = await SupportTicket.findById(req.params.id)
            .populate("user", "email")
            .populate("executor", "email");
        if (!ticket) return res.status(404).json({ success: false, message: "Заявка не найдена" });
        res.json({ success: true, data: ticket });
    } catch (err) {
        res.status(500).json({ success: false, message: "Внутренняя ошибка сервера" });
    }
});


router.put("/:id/status", auth, role("admin"), async (req, res) => {
    try {
        const ticket = await SupportTicket.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status, solution: req.body.solution, executor: req.body.executor },
            { new: true }
        );
        res.json({ success: true, data: ticket });
    } catch (err) {
        res.status(500).json({ success: false, message: "Внутренняя ошибка сервера" });
    }
});


router.post("/:id/comment", auth, async (req, res) => {
    try {
        const ticket = await SupportTicket.findById(req.params.id);
        if (!ticket) return res.status(404).json({ success: false, message: "Заявка не найдена" });
        ticket.comments.push({ user: req.user.id, text: req.body.text });
        await ticket.save();
        res.json({ success: true, data: ticket });
    } catch (err) {
        res.status(500).json({ success: false, message: "Внутренняя ошибка сервера" });
    }
});

module.exports = router;
