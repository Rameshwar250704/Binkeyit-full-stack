import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";

import connectDB from "./config/connectDB.js";
import userRouter from "./route/users.rout.js";
import categoryRouter from "./route/category.rout.js";
import uploadRouter from "./route/upload.rout.js";
import subCategoryRouter from "./route/subCategory.rout.js";
import productRouter from "./route/product.rout.js";
import cartRouter from "./route/cart.route.js";
import addressRouter from "./route/address.route.js";

dotenv.config();

const app = express();

// ✅ FIXED PORT (very important)
const PORT = process.env.PORT || 8080;

// Middlewares
app.use(cors({
  credentials: true,
  origin: process.env.FRONTEND_URL
}));

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(helmet({
  crossOriginResourcePolicy: false
}));

// Test Route
app.get("/", (req, res) => {
  res.json({
    message: "Server is running 🚀"
  });
});

// Routes
app.use("/api/user", userRouter);
app.use("/api/category", categoryRouter);
app.use("/api/file", uploadRouter);
app.use("/api/subcategory", subCategoryRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/address", addressRouter);

// ✅ Connect DB then start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
