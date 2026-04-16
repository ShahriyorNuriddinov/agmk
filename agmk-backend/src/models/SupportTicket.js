const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    text: String,
    createdAt: { type: Date, default: Date.now },
});

const schema = new mongoose.Schema(
    {
        ticketNumber: { type: String, unique: true },
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        category: { type: String, required: true },
        priority: { type: String, enum: ["low", "medium", "high"], required: true },
        title: { type: String, required: true },
        description: { type: String, required: true },
        location: String,
        contactPhone: String,
        status: { type: String, enum: ["open", "in_progress", "resolved", "closed"], default: "open" },
        executor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        solution: String,
        comments: [commentSchema],
    },
    { timestamps: true }
);

// Auto-generate ticket number
schema.pre("save", async function (next) {
    if (this.isNew) {
        const count = await mongoose.model("SupportTicket").countDocuments();
        const year = new Date().getFullYear();
        this.ticketNumber = `TS-${year}-${String(count + 1).padStart(4, "0")}`;
    }
    next();
});

module.exports = mongoose.model("SupportTicket", schema);
