require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const productRoutes = require("./routes/productRoutes");

const app = express();

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

// Cho phép API nhận JSON
app.use(express.json());

// Product API
app.use("/api/products", productRoutes);

// Trang kiểm tra API
app.get("/", (req, res) => {
    res.json({
        message: "Product API is running"
    });
});

// Kết nối MongoDB
mongoose
    .connect(MONGODB_URI)
    .then(() => {
        console.log("MongoDB connected successfully");

        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error("MongoDB connection failed:", error.message);
    });