/**
 * @file app.js
 * @description Main application file for the Node.js Express API.
 * Sets up the Express server, security & performance middlewares,
 * and prepares the app for routing and error handling.
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

// Create Express app
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
app.use(express.json());       // Parse JSON requests
app.use(cors());               // Enable CORS
app.use(helmet());             // Secure HTTP headers
app.use(morgan("dev"));        // Log HTTP requests
app.use(compression());        // Compress responses
app.use(hpp());                // Prevent HTTP Parameter Pollution
app.use(mongoSanitize());      // Prevent MongoDB operator injection
app.use(xss());                // Prevent XSS attacks

// ========================================
// 📦 Routes
// Add your API routes here
// ========================================
// Example placeholder:
// app.use('/api/users', require('./routes/userRoutes'));

// ========================================
// ⚠️ Error Handling Middlewares
// ========================================
// Example global error handler (to implement)
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ message: "Something went wrong!" });
// });

// Export the app for the server entry point
module.exports = app;
