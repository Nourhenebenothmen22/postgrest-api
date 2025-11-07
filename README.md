# 🚀 Secure Express API with PostgreSQL

![Node.js](https://img.shields.io/badge/Node.js-v22.x-green)
![Express](https://img.shields.io/badge/Express-v5.x-blue)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-blue)
![License](https://img.shields.io/badge/license-ISC-lightgrey)
![Status](https://img.shields.io/badge/status-Active-success)

---

## 📸 Project Overview

This project is a **secure, production-ready backend API** built with **Express.js** and **PostgreSQL**.  
It follows best practices for **security**, **performance**, and **clean code structure**.

---

## 🧠 Key Features

✅ RESTful API architecture  
✅ PostgreSQL database with scalable design  
✅ Environment configuration with `dotenv`  
✅ Advanced security middlewares (Helmet, XSS Clean, Mongo Sanitize, etc.)  
✅ Rate limiting to prevent brute-force attacks  
✅ Logging and monitoring with Morgan & Winston  
✅ Code style and linting (Prettier + ESLint)  
✅ Ready for Docker & CI/CD deployment  

---

## 🏗️ Project Architecture
express-project/
│
├── 📁 src/
│   ├── 🚀 app.js                 # Express app configuration & middlewares
│   ├── 🚀 server.js              # App startup & environment loading
│   ├── 📁 config/                # Database & environment configuration
│   │   └── database.js           # PostgreSQL connection setup
│   ├── 📁 controllers/           # Business logic controllers
│   │   └── userController.js     # User management
│   ├── 📁 routes/                # API routes
│   │   └── userRoutes.js         # User management routes
│   ├── 📁 middlewares/           # Security & validation middlewares
│   │   ├── validationMiddleware.js # Request validation
│   │   └── errorMiddleware.js    # Global error handling
│   └── 📁 utils/                 # Helpers & reusable modules
│       └── logger.js             # Winston logger setup
│
├── 🔐 .env                       # Environment variables (NOT pushed to GitHub)
├── 📝 .gitignore                 # Files ignored by Git
├── 📦 package.json               # Dependencies & scripts
├── 📚 README.md                  # Project documentation
└── 🐳 docker-compose.yml         # Docker setup for development



---

## ⚙️ Tech Stack

| Layer | Technology | Description |
|:------|:------------|:-------------|
| 💻 Backend | Node.js + Express | Core web framework |
| 🗄️ Database | PostgreSQL | SQL relational database |
| 🔐 Security | Helmet, XSS-Clean, HPP, Mongo-Sanitize | Protects against common web vulnerabilities |
| 🧩 Validation | Joi | Data schema validation |
| 📦 Compression | Compression | Improves performance with gzip |
| ⚡ Logger | Morgan + Winston | Request & error logging |
| 🔧 Dev Tools | Nodemon, ESLint, Prettier | Development convenience |

---

## 🔒 Why SQL instead of NoSQL?

| Criteria | SQL (PostgreSQL) | NoSQL (MongoDB) |
|-----------|------------------|----------------|
| 💾 Data Structure | Structured (tables, relations) | Unstructured (documents) |
| 🔍 Query Power | Complex joins, transactions | Simple lookups |
| 🧠 Consistency | Strong ACID compliance | Eventual consistency |
| 🧰 Use Case | Ideal for structured data, authentication, financial & HR systems | Ideal for flexible, fast-scaling apps |

👉 **PostgreSQL was chosen** for its **data integrity**, **ACID compliance**, and **strong relational capabilities**, making it ideal for enterprise-grade systems.

---

## 🧱 Middlewares Used

| Middleware | Description |
|-------------|--------------|
| `helmet` | Secures HTTP headers |
| `xss-clean` | Prevents cross-site scripting |
| `express-rate-limit` | Limits requests to prevent abuse |
| `hpp` | Prevents HTTP parameter pollution |
| `express-mongo-sanitize` | Sanitizes user inputs |
| `cors` | Enables cross-origin resource sharing |
| `compression` | Reduces response body size |
| `morgan` | Logs HTTP requests |

---

## 🚀 Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/yourusername/postgrest-api.git
cd postgrest-api


