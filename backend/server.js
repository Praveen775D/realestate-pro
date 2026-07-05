import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import propertyRoutes from "./routes/propertyRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import enquiryRoutes from "./routes/enquiryRoutes.js";

import errorMiddleware from "./middleware/errorMiddleware.js";

dotenv.config();

// ================================
// Connect Database
// ================================

connectDB();

const app = express();

// ================================
// Middlewares
// ================================

app.use(cors());

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

// Request Logger

app.use((req, res, next) => {

  console.log(
    `${req.method} ${req.originalUrl}`
  );

  next();

});

// ================================
// Static Upload Folder
// ================================

app.use(
  "/uploads",
  express.static(
    path.join(process.cwd(), "uploads")
  )
);

// ================================
// API Routes
// ================================

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/properties",
  propertyRoutes
);

app.use(
  "/api/upload",
  uploadRoutes
);

app.use(
  "/api/enquiries",
  enquiryRoutes
);

// ================================
// Home Route
// ================================

app.get("/", (req, res) => {

  res.status(200).json({

    success: true,

    project: "Real Estate SaaS",

    version: "1.0.0",

    author: "Praveen",

    status: "Running",

    api: "http://localhost:5000/api"

  });

});

// ================================
// Health Check
// ================================

app.get("/health", (req, res) => {

  res.status(200).json({

    success: true,

    database: mongoose.connection.readyState === 1
      ? "Connected"
      : "Disconnected",

    uptime: process.uptime(),

    timestamp: new Date()

  });

});

// ================================
// 404 Handler
// ================================

app.use((req, res) => {

  res.status(404).json({

    success: false,

    message: "Route Not Found"

  });

});

// ================================
// Global Error Middleware
// ================================

app.use(errorMiddleware);

// ================================
// Start Server
// ================================

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log("\n========================================");
  console.log("🏡 REAL ESTATE SAAS BACKEND");
  console.log("========================================");
  console.log(`🚀 Server : http://localhost:${PORT}`);
  console.log(`📦 API    : http://localhost:${PORT}/api`);
  console.log(`📷 Upload : http://localhost:${PORT}/uploads`);
  console.log("========================================\n");

});