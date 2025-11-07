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
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");

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
// ⚙️ Global Middlewares
// =====================================

// 🧱 Security and Performance
app.use(express.json());         // Parse JSON request bodies
app.use(cors());                 // Enable Cross-Origin Resource Sharing
app.use(helmet());               // Secure HTTP headers
app.use(morgan("dev"));          // Log HTTP requests (development mode)
app.use(compression());          // Compress response payloads
app.use(hpp());                  // Prevent HTTP Parameter Pollution
app.use(mongoSanitize());        // Prevent MongoDB operator injection
app.use(xss());                  // Prevent XSS (Cross-Site Scripting) attacks

// 🚦 Rate Limiter — Protect against brute-force or DDoS attacks
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,                  // limit each IP to 100 requests per window
  message: "Too many requests from this IP, please try again later."
});
app.use(limiter);

// =====================================
// 🧭 Routes
// Mount all application routes
// =====================================
app.use("/api/v1/users", userRoutes); // User-related routes

// =====================================
// ⚠️ Global Error Handler
// Should be the last middleware in the stack
// =====================================
app.use(errorHandling);

// =====================================
// 📦 Export Express App
// =====================================
module.exports = app;
