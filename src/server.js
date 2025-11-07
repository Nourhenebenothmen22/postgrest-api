/**
 * @file server.js
 * @description Entry point of the Node.js Express API.
 * Loads environment variables, initializes the database connection,
 * and starts the Express server.
 */

const dotenv = require("dotenv");
dotenv.config(); // Load .env variables

const app = require("./app");
const pool = require('./config/database');


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
