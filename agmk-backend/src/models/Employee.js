const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
    {
        tabNumber: { type: String, required: true, unique: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        middleName: String,
        position: String,
        department: String,
        phone: String,
        mobile: String,
        email: { type: String, lowercase: true },
        birthday: Date,
        hireDate: Date,
        isLeader: { type: Boolean, default: false },
        salary: Number,
    },
    { timestamps: true }
);

module.exports = mongoose.model("Employee", employeeSchema);
