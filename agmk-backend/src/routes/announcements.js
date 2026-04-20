const router = require("express").Router();
const Announcement = require("../models/Announcement");
const { auth, role } = require("../middleware/auth");



router.get("/", auth, async (req, res) => {
    try {
        const announcements = await Announcement.find({ isPublished: true })
            .populate("author", "email")
            .sort({ createdAt: -1 });

        const data = announcements.map((a) => ({
            ...a.toObject(),
            isRead: a.readBy.includes(req.user.id),
        }));

        res.json({ success: true, data });
    } catch (err) {
        res.status(500).json({ success: false, message: "Внутренняя ошибка сервера" });
    }
});





router.post("/", auth, role("hr", "manager", "admin"), async (req, res) => {
    try {
        const ann = await Announcement.create({ ...req.body, author: req.user.id });
        res.status(201).json({ success: true, data: ann });
    } catch (err) {
        res.status(500).json({ success: false, message: "Внутренняя ошибка сервера" });
    }
});





router.put("/:id/read", auth, async (req, res) => {
    try {
        await Announcement.findByIdAndUpdate(req.params.id, {
            $addToSet: { readBy: req.user.id },
        });
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ success: false, message: "Внутренняя ошибка сервера" });
    }
});

module.exports = router;
