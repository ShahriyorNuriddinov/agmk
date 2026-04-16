const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
    date: { type: Date, default: Date.now },
    amount: Number,
    location: String,
    description: String,
});

const schema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        type: { type: String, enum: ["LPP", "BP"], required: true },
        month: { type: Number, required: true },
        year: { type: Number, required: true },
        allocated: { type: Number, required: true },
        used: { type: Number, default: 0 },
        transactions: [transactionSchema],
    },
    { timestamps: true }
);

module.exports = mongoose.model("FoodVoucher", schema);
