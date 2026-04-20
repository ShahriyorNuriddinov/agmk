const router = require("express").Router();
const Salary = require("../models/Salary");
const { auth, role } = require("../middleware/auth");



router.get("/me", auth, async (req, res) => {
    try {
        const salaries = await Salary.find({ employee: req.user.id }).sort({ year: -1, month: -1 });
        res.json({ success: true, data: salaries });
    } catch (err) {
        res.status(500).json({ success: false, message: "Внутренняя ошибка сервера" });
    }
});




router.get("/me/current", auth, async (req, res) => {
    try {
        const now = new Date();
        const salary = await Salary.findOne({
            employee: req.user.id,
            month: now.getMonth() + 1,
            year: now.getFullYear(),
        });
        res.json({ success: true, data: salary });
    } catch (err) {
        res.status(500).json({ success: false, message: "Внутренняя ошибка сервера" });
    }
});






router.post("/", auth, role("hr", "admin"), async (req, res) => {
    try {
        const { employeeId, month, year, baseSalary, items } = req.body;

        const existing = await Salary.findOne({ employee: employeeId, month, year });
        if (existing) {
            return res.status(400).json({ success: false, message: "Запись за этот период уже существует" });
        }

        const salary = await Salary.create({ employee: employeeId, month, year, baseSalary, items: items ?? [] });
        res.status(201).json({ success: true, data: salary });
    } catch (err) {
        res.status(500).json({ success: false, message: "Внутренняя ошибка сервера" });
    }
});



router.put("/:id", auth, role("hr", "admin"), async (req, res) => {
    try {
        const salary = await Salary.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!salary) return res.status(404).json({ success: false, message: "Запись не найдена" });
        res.json({ success: true, data: salary });
    } catch (err) {
        res.status(500).json({ success: false, message: "Внутренняя ошибка сервера" });
    }
});

module.exports = router;
