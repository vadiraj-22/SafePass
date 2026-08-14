# 🔐 SafePass Server API

Express.js REST backend service powering the **SafePass Password Security Suite**.

## ✨ Backend Features

- **Authenticated Vault Cryptography**: AES-256-GCM authenticated symmetric encryption with PBKDF2 key derivation (100,000 iterations, 64-byte salt, 16-byte IV).
- **Authentication & Authorization**: JWT token generation and verification middleware.
- **Password Hashing**: Salted key derivation with `bcryptjs`.
- **2-Step Email Verification (OTP)**: Generates 6-digit OTP codes with 10-minute expiration windows.
- **Multi-Channel Email Dispatcher**: Integrated support for **Brevo API**, **Resend API**, and **SMTP (Nodemailer)** with automatic server console fallback for local development.
- **User-Controlled 2FA Toggle**: Allows users to enable or disable 2-Step OTP login requirements via profile settings.
- **Strong Password Rules Engine**: Backend validation enforcing min 8 characters, uppercase, lowercase, numbers, and symbols.
- **MongoDB ODM**: Structured user and password schemas using Mongoose with complete user account data isolation.

## 🛠️ Tech Stack

- **Runtime**: Node.js, Express.js (ES Modules)
- **Database**: MongoDB, Mongoose ODM
- **Security & Cryptography**: Node `crypto` (`aes-256-gcm`, PBKDF2), `bcryptjs`, `jsonwebtoken`
- **Mail Transporters**: Brevo HTTP API, Resend HTTP API, Nodemailer SMTP
- **CORS & Environment**: `cors`, `dotenv`

## 🔌 API Endpoints Summary

### Authentication Routes (`/api/auth`)
- `POST /register` — Create a user account (enforces strong password policy).
- `POST /login` — Validate credentials & issue token or trigger 2FA OTP.
- `POST /verify-login-otp` — Verify 6-digit login OTP & issue token.
- `POST /resend-login-otp` — Resend 6-digit verification OTP.
- `POST /forgot-password` — Generate & email password reset OTP.
- `POST /reset-password` — Validate reset OTP & set new password.
- `PUT /toggle-2fa` — Enable/disable 2-Step Email Verification (Auth Required).
- `GET /verify` — Check JWT bearer token status (Auth Required).
- `PUT /profile` — Update account profile details (Auth Required).
- `PUT /change-password` — Update account password (Auth Required).

### Vault Routes (`/api/passwords`)
- `GET /` — Fetch and decrypt authenticated user's stored vault passwords.
- `POST /` — Encrypt and store a new password record.
- `PUT /:id` — Update a stored password record.
- `DELETE /:id` — Delete a password record.

## ⚙️ Environment Variables

Create `.env` inside `server/`:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/safepass
JWT_SECRET=your_super_secret_jwt_key
ENCRYPTION_KEY=your_super_secret_encryption_key_min_32_chars
NODE_ENV=development

# Email Options:
# Brevo API:
BREVO_API_KEY=xkeysib-your-key
BREVO_SENDER_EMAIL=your_email@domain.com

# Resend API:
RESEND_API_KEY=re_your_key
EMAIL_FROM="SafePass Security" <onboarding@resend.dev>

# SMTP Fallback:
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
```

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run backend development server with Nodemon
npm run dev
```

Server runs on `http://localhost:5000`.

