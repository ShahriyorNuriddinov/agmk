const mongoose = require("mongoose");

const schema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        sanatorium: { type: String, required: true },
        checkIn: { type: Date, required: true },
        checkOut: { type: Date, required: true },
        roomType: String,
        treatment: String,
        companions: [{ name: String, relation: String }],
        medicalNotes: String,
        specialRequests: String,
        status: { type: String, enum: ["pending", "approved", "rejected", "completed"], default: "pending" },
        queuePosition: Number,
        totalCost: Number,
    },
    { timestamps: true }
);

module.exports = mongoose.model("SanatoriumApplication", schema);
