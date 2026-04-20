const mongoose = require("mongoose");

const salaryItemSchema = new mongoose.Schema({
    label: { type: String, required: true },
    amount: { type: Number, required: true },
    type: { type: String, enum: ["income", "deduction"], required: true },
});

const salarySchema = new mongoose.Schema(
    {
        employee: { type: mongoose.Schema.Types.ObjectId, ref: "Employee", required: true },
        month: { type: Number, required: true, min: 1, max: 12 },
        year: { type: Number, required: true },
        baseSalary: { type: Number, required: true },
        items: [salaryItemSchema],
        totalIncome: { type: Number, default: 0 },
        totalDeductions: { type: Number, default: 0 },
        netSalary: { type: Number, default: 0 },
        status: { type: String, enum: ["pending", "paid"], default: "pending" },
        paidAt: Date,
    },
    { timestamps: true }
);

salarySchema.pre("save", function (next) {
    this.totalIncome = this.items.filter((i) => i.type === "income").reduce((sum, i) => sum + i.amount, 0);
    this.totalDeductions = this.items.filter((i) => i.type === "deduction").reduce((sum, i) => sum + i.amount, 0);
    this.netSalary = this.baseSalary + this.totalIncome - this.totalDeductions;
    next();
});

module.exports = mongoose.model("Salary", salarySchema);
