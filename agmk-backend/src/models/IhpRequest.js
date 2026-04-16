const mongoose = require("mongoose");

const schema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        category: { type: String, required: true },
        itemName: { type: String, required: true },
        quantity: { type: Number, default: 1 },
        urgency: { type: String, enum: ["low", "normal", "high"], default: "normal" },
        purpose: String,
        justification: String,
        status: { type: String, enum: ["pending", "approved", "rejected", "issued"], default: "pending" },
    },
    { timestamps: true }
);

module.exports = mongoose.model("IhpRequest", schema);
