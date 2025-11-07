/**
 * @file app.js
 * @description Main entry point for the Express API application.
 * Initializes the Express app, sets up global middlewares for
 * security, performance, and request handling, mounts all routes,
 * and integrates error handling. Also ensures the database table
 * structure is initialized at startup.
 */

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const compression = require("compression");
const hpp = require("hpp");
const rateLimit = require("express-rate-limit");

// =====================================
// 🧩 Import Custom Modules
// =====================================
const errorHandling = require("./middlewares/errorMiddleware");
const createUserTable = require("./data/createUserTable");
const userRoutes = require("./routes/userRoutes");

// =====================================
// 🗄️ Initialize Database Table
// Ensures the 'users' table exists before handling requests
// =====================================
createUserTable();

// =====================================
// 🚀 Initialize Express Application
// =====================================
const app = express();

// =====================================
// ⚙️ Global Middlewares - OPTIMIZED ORDER
// =====================================

// 🔒 1. SECURITY MIDDLEWARES (First line of defense)
app.use(helmet());         // Secure HTTP headers - FIRST!
app.use(cors());           // Enable Cross-Origin Resource Sharing

// 📊 2. LOGGING & MONITORING (Before request processing)
app.use(morgan("dev"));    // Log HTTP requests (development mode)

// 🚦 3. RATE LIMITING (Early rejection of excessive requests)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,                  // limit each IP to 100 requests per window
  message: {
    status: "error",
    message: "Too many requests from this IP, please try again later."
  },
  standardHeaders: true,
  legacyHeaders: false
});
app.use("/api", limiter);  // Appliquer seulement aux routes API

// 📦 4. BODY PARSING (Prepare request data)
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// ⚠️ 6. HTTP PARAMETER POLLUTION PROTECTION
app.use(hpp());            // Prevent HTTP Parameter Pollution

// 💨 7. PERFORMANCE OPTIMIZATION
app.use(compression());    // Compress response payloads

// =====================================
// 🧭 Routes
// Mount all application routes
// =====================================
app.use("/api/v1/users", userRoutes); // User-related routes

// 🏠 Health check route
app.get("/api/v1/health", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "API is running successfully",
    timestamp: new Date().toISOString()
  });
});


// =====================================
// ⚠️ Global Error Handler
// Should be the last middleware in the stack
// =====================================
app.use(errorHandling);

// =====================================
// 📦 Export Express App
// =====================================
module.exports = app;