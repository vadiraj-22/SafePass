# SafePass Server API

Express.js REST backend service powering **SafePass Password Security Suite**.

## ✨ Backend Features

- **Authentication & Authorization**: JWT token generation and verification middleware.
- **Password Hashing**: Salted key derivation with `bcryptjs`.
- **2-Step Email Verification (OTP)**: Generates 6-digit OTP codes with 10-minute expiration windows.
- **Nodemailer SMTP Integration**: Dispatches formatted security HTML emails with dev console logging fallback.
- **User-Controlled 2FA Toggle**: Allows users to enable or disable 2-Step OTP login requirements.
- **Strong Password Rules Engine**: Backend validation enforcing min 8 characters, uppercase, lowercase, numbers, and symbols.
- **MongoDB ODM**: Structured user and password schemas using Mongoose.

## 🛠️ Tech Stack

- **Runtime**: Node.js, Express.js
- **Database**: MongoDB, Mongoose ODM
- **Security**: `bcryptjs`, `jsonwebtoken`
- **Mail Transporter**: `nodemailer`
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
- `GET /` — Fetch authenticated user's stored passwords.
- `POST /` — Store a new password record.
- `PUT /:id` — Update a stored password record.
- `DELETE /:id` — Delete a password record.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run backend development server with Nodemon
npm run dev
```

Server runs on `http://localhost:5000`.
