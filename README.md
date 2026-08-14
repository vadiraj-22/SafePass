<div align="center">

# 🔐 SafePass — Password Security Suite

### *Enterprise-Grade Password Management & Cryptographic Security Platform*

[![Live Application](https://img.shields.io/badge/🌐_Live_App-SafePass-10b981?style=for-the-badge)](https://safepass-ewqi.onrender.com/)
[![React](https://img.shields.io/badge/React-19.2-61dafb?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-38bdf8?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

---

### 🚀 **[Launch Live Application →](https://safepass-ewqi.onrender.com/)**

---

</div>

## 📌 Executive Summary

**SafePass** is an end-to-end encrypted password management and security auditing suite designed for modern digital privacy. It combines secure account vault storage, real-time data breach detection, 2-Step Email Verification (OTP), and strong password policy enforcement into a unified, high-performance web interface.

---

## ✨ Core Capabilities

### 🛡️ Security & Authentication
- 📧 **2-Step Email Verification (OTP)** — Multi-factor sign-in security powered by Nodemailer.
- 🎛️ **User-Controlled 2FA Toggle** — Enable or disable 2-Step OTP verification anytime in User Profile settings.
- 🔑 **Strong Password Policy** — Enforces minimum 8 characters with uppercase, lowercase, numbers, and special symbols.
- 📊 **Real-Time Password Strength Meter** — Interactive 5-rule checklist providing live visual feedback on password complexity.
- 📨 **OTP Password Recovery** — Secure self-service account recovery via 6-digit email OTP verification.
- 🔒 **bcrypt Password Hashing** — Salted key derivation for storing user credentials.
- 🛡️ **JWT Bearer Token Auth** — Stateless authentication with 7-day token rotation.

### 🎯 Security Suite Tools
- 🔍 **Data Breach Checker** — Integrates with Have I Been Pwned API to check passwords against 70M+ compromised records.
- ⚡ **Cryptographic Password Generator** — Generates high-entropy passwords with customizable length and symbol filters.
- 🗄️ **Encrypted Vault Manager** — Securely store, view, search, copy, and manage credentials with complete user isolation.

---

## 🏗️ Architecture & Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend Framework** | React 19, React Router v7, Context API |
| **Styling & Motion** | Tailwind CSS 4, Framer Motion, Lucide Icons |
| **Backend Runtime** | Node.js, Express.js (REST API) |
| **Database** | MongoDB, Mongoose ODM |
| **Mail Services** | Nodemailer (SMTP transport with dev console fallback) |
| **Security Packages** | JSON Web Tokens (`jsonwebtoken`), `bcryptjs`, CORS |
| **Build & Tooling** | Vite, TypeScript |

---

## 🔌 API Reference

### 🔑 Authentication & Security Endpoints

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `POST` | `/api/auth/register` | Register a new user (enforces strong password policy) | ❌ |
| `POST` | `/api/auth/login` | Authenticate user & trigger OTP if 2FA is enabled | ❌ |
| `POST` | `/api/auth/verify-login-otp` | Validate 6-digit OTP and issue JWT access token | ❌ |
| `POST` | `/api/auth/resend-login-otp` | Resend fresh 6-digit login verification OTP | ❌ |
| `POST` | `/api/auth/forgot-password` | Request password reset 6-digit OTP via email | ❌ |
| `POST` | `/api/auth/reset-password` | Verify reset OTP & update password | ❌ |
| `PUT` | `/api/auth/toggle-2fa` | Toggle 2-Step Email Verification ON or OFF | ✅ |
| `GET` | `/api/auth/verify` | Validate JWT bearer token session | ✅ |
| `PUT` | `/api/auth/profile` | Update username profile details | ✅ |
| `PUT` | `/api/auth/change-password` | Change account password (enforces strong rules) | ✅ |

### 🗄️ Vault Password Manager Endpoints

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `GET` | `/api/passwords` | Retrieve user's stored vault credentials | ✅ |
| `POST` | `/api/passwords` | Create and store a new vault record | ✅ |
| `PUT` | `/api/passwords/:id` | Update an existing vault record | ✅ |
| `DELETE` | `/api/passwords/:id` | Remove a credential record from vault | ✅ |

---

## 💻 Local Setup & Development

### 1. Clone & Install Dependencies

```bash
# Clone the repository
git clone https://github.com/vadiraj-22/SafePass.git
cd SafePass

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 2. Environment Configuration

Create `.env` in `server/`:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/safepass
JWT_SECRET=your_super_secret_jwt_key
ENCRYPTION_KEY=your_super_secret_encryption_key_min_32_chars
NODE_ENV=development

# SMTP Mail Settings (Optional: falls back to server console logging if omitted)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_16_digit_app_password
EMAIL_FROM="SafePass Security" <your_email@gmail.com>
```

Create `.env` in `client/`:

```env
VITE_API_URL=http://localhost:5000/api
```

### 3. Run Development Servers

**Terminal 1 — Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 — Frontend:**
```bash
cd client
npm run dev
```

Access the application in your browser at `http://localhost:5173`.

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 👨‍💻 Author & Support

**Vadiraj Joshi**
- 🌐 Application Demo: [https://safepass-ewqi.onrender.com/](https://safepass-ewqi.onrender.com/)
- 📧 Contact Email: vadirajjoshi22504@gmail.com
