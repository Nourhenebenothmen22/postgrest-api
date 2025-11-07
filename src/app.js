/**
 * @file app.js
 * @description Main application file for the Node.js Express API.
 * Sets up the Express server, security & performance middlewares,
 * mounts API routes, and handles errors globally.
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

// Import custom middlewares
const errorHandling = require('./middlewares/errorMiddleware');

// Import routes
const userRoutes = require("./routes/userRoutes");

// ================================
// 🔹 Create Express App
// ================================
const app = express();

// ================================
// 🚀 Rate Limiter
// Limits repeated requests to public APIs and endpoints
// ================================
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,                  // limit each IP to 100 requests per window
  message: "Too many requests from this IP, please try again later."
});
app.use(limiter);

// ================================
// 🧱 Security & Performance Middlewares
// ================================
app.use(express.json());       // Parse incoming JSON requests
app.use(cors());               // Enable Cross-Origin Resource Sharing
app.use(helmet());             // Set secure HTTP headers
app.use(morgan("dev"));        // Log HTTP requests in development mode
app.use(compression());        // Compress response bodies for better performance
app.use(hpp());                // Prevent HTTP Parameter Pollution attacks
app.use(mongoSanitize());      // Sanitize user input to prevent MongoDB operator injection
app.use(xss());                // Clean user input to prevent XSS attacks

// ================================
// 📦 Routes
// Mount all API routes under /api/v1/users
// ================================
app.use("/api/v1/users", userRoutes);

// ================================
// ⚠️ Global Error Handling Middleware
// Must be placed after all routes
// ================================
app.use(errorHandling);

// ================================
// 🔹 Export Express App
// ================================
module.exports = app;
