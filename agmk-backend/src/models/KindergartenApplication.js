const mongoose = require("mongoose");

const schema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        childFirstName: { type: String, required: true },
        childLastName: { type: String, required: true },
        childBirthDate: { type: Date, required: true },
        preferredGarden: String,
        parentInfo: String,
        contacts: String,
        additionalInfo: String,
        status: { type: String, enum: ["pending", "queue", "enrolled", "rejected"], default: "pending" },
        queuePosition: Number,
        enrollmentDate: Date,
    },
    { timestamps: true }
);

module.exports = mongoose.model("KindergartenApplication", schema);
