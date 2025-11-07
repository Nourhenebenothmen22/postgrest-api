/**
 * @file app.js
 * @description Main application file for the Node.js Express API.
 * This file sets up the Express server, integrates security and performance middlewares,
 * and prepares the application for routing and error handling.
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

// Custom middlewares (to be implemented)


// Routes (to be implemented)

const app = express();

// ========================================
// 🚀 Rate Limiter
// Limits repeated requests to public APIs and endpoints
// ========================================
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per window
  message: "Too many requests from this IP, please try again later.",
});
app.use(limiter);

// ========================================
// 🧱 Security & Performance Middlewares
// ========================================

// Parse incoming JSON requests
app.use(express.json());

// Enable CORS for cross-origin requests
app.use(cors());

// Secure HTTP headers with Helmet
app.use(helmet());

// Log HTTP requests in development mode
app.use(morgan("dev"));

// Compress response bodies for better performance
app.use(compression());

// Protect against HTTP Parameter Pollution attacks
app.use(hpp());

// Sanitize user-supplied data to prevent MongoDB Operator Injection
app.use(mongoSanitize());

// Clean user input to prevent XSS attacks
app.use(xss());

// ========================================
// 📦 Routes
// ========================================

// ========================================
// ⚠️ Error Handling Middlewares
// ========================================


// Global error handler

// Export the configured app for server entry point
module.exports = app;
