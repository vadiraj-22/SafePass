<div align="center">

# 🔐 SafePass — Enterprise Password Security Suite

### *Enterprise-Grade Password Management & Cryptographic Security Platform*

[![Live Application](https://img.shields.io/badge/🌐_Live_App-SafePass-10b981?style=for-the-badge)](https://safepass-ewqi.onrender.com/)
[![React](https://img.shields.io/badge/React-19.0-61dafb?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS_4-38bdf8?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-amber500?style=for-the-badge)](LICENSE)

---

### 🚀 **[Launch Live Application →](https://safepass-ewqi.onrender.com/)**

---

</div>

## 📌 Executive Summary

**SafePass** is an end-to-end encrypted password management and security auditing suite engineered for digital privacy and credential safety. It combines authenticated AES-256-GCM vault encryption, real-time data breach detection via Have I Been Pwned API, multi-provider 2-Step Email Verification (OTP), and strong password policy enforcement into a unified, high-performance web interface.

---

## ✨ Core Capabilities

### 🔐 Cryptographic Vault Security
- 🛡️ **AES-256-GCM Encryption** — Authenticated symmetric encryption for all stored user credentials preventing data tampering.
- 🔑 **PBKDF2 Key Derivation** — High-security key generation using 100,000 iterations of SHA-256 PBKDF2 with unique per-record salt and IV.
- 🚫 **Zero Plain-Text Storage** — Passwords are encrypted before persisting to database storage; secret keys are never exposed in responses.

### 🛡️ Authentication & Access Controls
- 📧 **Multi-Provider 2-Step Email OTP** — Secure 6-digit login verification supporting **Brevo API**, **Resend API**, and **SMTP (Nodemailer)** with automatic failover.
- 🎛️ **User-Controlled 2FA Toggle** — Turn 2-Step Email OTP verification ON or OFF at any time in User Profile settings.
- 🔑 **Strong Password Policy** — Enforces minimum 8 characters with uppercase, lowercase, numbers, and special symbols.
- 📊 **Real-Time Password Strength Meter** — Interactive 5-rule checklist providing live visual feedback on password complexity.
- 📨 **OTP Account Recovery** — Secure self-service account password reset via 6-digit email OTP verification.
- 🔒 **bcrypt Password Hashing** — Salted bcrypt key derivation for user authentication passwords.
- 🛡️ **JWT Bearer Token Auth** — Stateless authentication with secure token verification.

### 🎯 Security Suite Tools
- 🔍 **Data Breach Checker** — Integrates with Have I Been Pwned API to check passwords against 70M+ compromised records.
- ⚡ **Cryptographic Password Generator** — Generates high-entropy passwords with customizable length and symbol filters.
- 🗄️ **Encrypted Vault Manager** — Securely store, view, search, copy, and manage credentials with complete user isolation.

---

## 🏗️ Architecture & Technology Stack

| Layer | Technologies | Description |
| :--- | :--- | :--- |
| **Frontend Framework** | React 19, React Router v7, Context API | Single Page Application with dynamic client-side routing |
| **Styling & Motion** | Tailwind CSS 4, Framer Motion, Lucide Icons | Responsive UI with smooth transitions |
| **Backend Runtime** | Node.js, Express.js | RESTful HTTP API services |
| **Database** | MongoDB, Mongoose ODM | Document storage for encrypted vault items and users |
| **Cryptography** | Node Crypto (`aes-256-gcm`, PBKDF2), `bcryptjs` | Authenticated encryption & salted password hashing |
| **Mail Services** | Brevo API, Resend API, Nodemailer (SMTP) | Multi-channel OTP delivery with dev console fallback |
| **Authentication** | JSON Web Tokens (`jsonwebtoken`) | Stateless bearer authentication |
| **Build & Tooling** | Vite, TypeScript, Nodemon | Dev toolchain and fast builds |

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
| `GET` | `/api/passwords` | Retrieve & decrypt user's stored vault credentials | ✅ |
| `POST` | `/api/passwords` | Encrypt and store a new vault record | ✅ |
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

# --- Email Provider Configuration (Choose one or multiple) ---

# Option A: Brevo API (Recommended for Cloud Hosting / Render)
BREVO_API_KEY=xkeysib-your-brevo-api-key-here
BREVO_SENDER_EMAIL=your_verified_sender@email.com

# Option B: Resend API
RESEND_API_KEY=re_your_resend_api_key_here
EMAIL_FROM="SafePass Security" <onboarding@resend.dev>

# Option C: Standard SMTP (Gmail, SendGrid, etc.)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_16_digit_app_password
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

