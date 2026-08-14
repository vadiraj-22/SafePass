# SafePass Frontend

High-performance, modern React 19 single-page web application for **SafePass Password Security Suite**.

## ✨ Key Features

- **Encrypted Vault Interface**: Vault manager to securely create, search, copy, edit, and delete stored passwords.
- **2-Step Email Verification**: Interactive 6-digit OTP prompt UI integrated with Nodemailer backend.
- **Strong Password Rules Indicator**: Real-time password strength meter and interactive 5-criteria checklist.
- **Password Reset Flow**: Multi-step account recovery wizard via 6-digit OTP sent to registered email.
- **Data Breach Auditing**: Integrates with Have I Been Pwned API to check passwords against 70M+ compromised records.
- **Cryptographic Generator**: High-entropy random password generator with customizable parameters.
- **Cyberpunk Dark Theme**: Responsive UI styled with Tailwind CSS, Lucide icons, and Framer Motion transitions.

## 🛠️ Tech Stack

- **Framework**: React 19, Vite
- **Routing**: React Router v7
- **State Management**: React Context API (`AuthContext`)
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Icons**: Lucide React

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run Vite dev server
npm run dev
```

The application will launch on `http://localhost:5173`.
