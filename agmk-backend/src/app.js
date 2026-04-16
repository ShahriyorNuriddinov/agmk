const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const employeeRoutes = require("./routes/employees");
const sanatoriumRoutes = require("./routes/sanatoriums");
const kindergartenRoutes = require("./routes/kindergartens");
const ihpRoutes = require("./routes/ihp");
const foodVoucherRoutes = require("./routes/foodVouchers");
const supportRoutes = require("./routes/support");
const announcementRoutes = require("./routes/announcements");

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/sanatoriums", sanatoriumRoutes);
app.use("/api/kindergartens", kindergartenRoutes);
app.use("/api/ihp", ihpRoutes);
app.use("/api/food-vouchers", foodVoucherRoutes);
app.use("/api/support", supportRoutes);
app.use("/api/announcements", announcementRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: "Внутренняя ошибка сервера" });
});

module.exports = app;
