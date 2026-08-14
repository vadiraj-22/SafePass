# 🔐 SafePass Frontend

High-performance, modern React 19 single-page web application powering the **SafePass Password Security Suite**.

## ✨ Key Features

- **Encrypted Vault Interface**: Interactive vault manager to securely store, decrypt, search, copy, edit, and filter credentials with real-time UI updates.
- **2-Step Email Verification**: Interactive 6-digit OTP prompt UI with countdown timers, resend actions, and auto-focus inputs.
- **Strong Password Rules Indicator**: Real-time password strength meter and interactive 5-criteria checklist providing live feedback during registration and password updates.
- **Password Reset Flow**: Multi-step account recovery wizard via 6-digit OTP sent to registered email.
- **Data Breach Auditing**: Integrates with Have I Been Pwned API (k-Anonymity model) to check passwords against 70M+ compromised records.
- **Cryptographic Generator**: High-entropy random password generator with customizable length, letter case, numbers, and special symbol toggles.
- **Cyberpunk Dark Theme**: Responsive UI styled with Tailwind CSS 4, Lucide icons, dynamic visual indicators, and Framer Motion transitions.

## 🛠️ Tech Stack

- **Framework**: React 19, Vite
- **Routing**: React Router v7
- **State Management**: React Context API (`AuthContext`)
- **Styling**: Tailwind CSS 4, PostCSS
- **Animations**: Framer Motion
- **Icons**: Lucide React

## ⚙️ Environment Variables

Create `.env` inside `client/`:

```env
VITE_API_URL=http://localhost:5000/api
```

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run Vite dev server
npm run dev
```

The application will launch on `http://localhost:5173`.

