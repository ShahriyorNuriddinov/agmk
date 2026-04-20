const router = require("express").Router();
const FoodVoucher = require("../models/FoodVoucher");
const { auth, role } = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
    try {
        const now = new Date();
        const vouchers = await FoodVoucher.find({
            user: req.user.id,
            month: now.getMonth() + 1,
            year: now.getFullYear(),
        });
        res.json({ success: true, data: vouchers });
    } catch (err) {
        res.status(500).json({ success: false, message: "Внутренняя ошибка сервера" });
    }
});

router.get("/history", auth, async (req, res) => {
    try {
        const vouchers = await FoodVoucher.find({ user: req.user.id }).sort({ year: -1, month: -1 });
        res.json({ success: true, data: vouchers });
    } catch (err) {
        res.status(500).json({ success: false, message: "Внутренняя ошибка сервера" });
    }
});

router.post("/", auth, async (req, res) => {
    try {
        const { type, allocated, month, year } = req.body;
        const existing = await FoodVoucher.findOne({ user: req.user.id, type, month, year });
        if (existing) {
            return res.status(400).json({ success: false, message: "Талон на этот период уже существует" });
        }
        const voucher = await FoodVoucher.create({ user: req.user.id, type, allocated, month, year });
        res.status(201).json({ success: true, data: voucher });
    } catch (err) {
        res.status(500).json({ success: false, message: "Внутренняя ошибка сервера" });
    }
});

router.post("/transaction", auth, role("admin"), async (req, res) => {
    try {
        const { userId, type, amount, location, description, month, year } = req.body;
        const voucher = await FoodVoucher.findOne({ user: userId, type, month, year });
        if (!voucher) return res.status(404).json({ success: false, message: "Талон питания не найден" });

        voucher.transactions.push({ amount, location, description });
        voucher.used += amount;
        await voucher.save();

        res.json({ success: true, data: voucher });
    } catch (err) {
        res.status(500).json({ success: false, message: "Внутренняя ошибка сервера" });
    }
});

module.exports = router;
