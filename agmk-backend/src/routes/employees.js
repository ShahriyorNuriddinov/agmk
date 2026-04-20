const router = require("express").Router();
const Employee = require("../models/Employee");
const { auth, role } = require("../middleware/auth");


router.get("/", auth, async (req, res) => {
    try {
        const { search, department, page = 1, limit = 20 } = req.query;
        const query = {};
        if (search) {
            query.$or = [
                { firstName: new RegExp(search, "i") },
                { lastName: new RegExp(search, "i") },
                { position: new RegExp(search, "i") },
                { phone: new RegExp(search, "i") },
            ];
        }
        if (department) query.department = department;

        const total = await Employee.countDocuments(query);
        const employees = await Employee.find(query)
            .skip((page - 1) * limit)
            .limit(Number(limit));

        res.json({
            success: true,
            data: employees,
            pagination: { page: Number(page), limit: Number(limit), total, pages: Math.ceil(total / limit) },
        });
    } catch (err) {
        res.status(500).json({ success: false, message: "Внутренняя ошибка сервера" });
    }
});




router.get("/:id", auth, async (req, res) => {
    try {
        const emp = await Employee.findById(req.params.id);
        if (!emp) return res.status(404).json({ success: false, message: "Сотрудник не найден" });
        res.json({ success: true, data: emp });
    } catch (err) {
        res.status(500).json({ success: false, message: "Внутренняя ошибка сервера" });
    }
});




router.post("/", auth, role("hr", "admin"), async (req, res) => {
    try {
        const emp = await Employee.create(req.body);
        res.status(201).json({ success: true, data: emp });
    } catch (err) {
        res.status(500).json({ success: false, message: "Внутренняя ошибка сервера" });
    }
});




router.put("/:id", auth, role("hr", "admin"), async (req, res) => {
    try {
        const emp = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ success: true, data: emp });
    } catch (err) {
        res.status(500).json({ success: false, message: "Внутренняя ошибка сервера" });
    }
});




router.delete("/:id", auth, role("admin"), async (req, res) => {
    try {
        await Employee.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: "Сотрудник удалён" });
    } catch (err) {
        res.status(500).json({ success: false, message: "Внутренняя ошибка сервера" });
    }
});

module.exports = router;
