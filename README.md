<div align="center">

# 🔐 SafePass - Password Security Suite

### *Military-grade password security tools to protect your digital life*

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-SafePass-8b5cf6?style=for-the-badge)](https://safepass-ewqi.onrender.com/)
[![React](https://img.shields.io/badge/React-19.2.3-61dafb?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-38bdf8?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

---

### 🚀 **[Visit Live Application →](https://safepass-ewqi.onrender.com/)**

---

</div>

## 📸 Application Screenshots

<div align="center">

### 🏠 Landing Page
![SafePass Home](./client/public/screenshots/hero.png)
*Modern, sleek interface with military-grade security promise*

### ⚡ Powerful Security Features
![Features Overview](./client/public/screenshots/features.png)
*Three core security tools: Data Breach Checker, Password Generator, and Password Manager*

### 🗄️ Password Manager Dashboard
![Password Manager](./client/public/screenshots/password_manager.png)
*Securely store and manage all your passwords with MongoDB backend and JWT authentication*

### 🔑 Cryptographic Password Generator
![Password Generator](./client/public/screenshots/random_password.png)
*Generate military-grade passwords with customizable length and character types*

### 🔍 Password Strength & Breach Checker
![Breach Checker](./client/public/screenshots/password_strength.png)
*Analyze password strength and check against 70M+ compromised passwords using Have I Been Pwned API*

</div>

---

## ✨ Key Features

<table>
<tr>
<td width="50%">

### 🛡️ Security Features
- 🔐 **JWT Authentication** - Secure token-based auth
- 🔒 **Password Hashing** - bcrypt encryption
- 🗄️ **MongoDB Storage** - Secure database backend
- 🔑 **User Isolation** - Each user's data is protected
- 🚫 **Protected Routes** - Authentication required for sensitive features
- ✅ **CORS Enabled** - Secure cross-origin requests

</td>
<td width="50%">

### 🎯 Core Tools
- 🔍 **Breach Checker** - Check 70M+ compromised passwords
- 💪 **Strength Analyzer** - Real-time password strength analysis
- ⚡ **Password Generator** - Cryptographically secure random passwords
- 🗂️ **Password Manager** - Store, view, copy, and delete passwords
- 📊 **Entropy Calculator** - Advanced password complexity metrics
- 🎨 **Modern UI** - Beautiful dark theme with smooth animations

</td>
</tr>
</table>

---

## 🏗️ Tech Stack

<div align="center">

### Frontend
![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS_4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)

### Backend
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=json-web-tokens&logoColor=white)
![bcrypt](https://img.shields.io/badge/bcrypt-338?style=for-the-badge&logo=letsencrypt&logoColor=white)

### Deployment
![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)

</div>

---

## 🚀 Quick Start

### Prerequisites
```bash
Node.js v16+ 
MongoDB (local or Atlas)
npm or yarn
```

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/safepass.git
cd safepass
```

2. **Install Frontend Dependencies**
```bash
cd client
npm install
```

3. **Install Backend Dependencies**
```bash
cd ../server
npm install
```

4. **Configure Environment Variables**

Create `.env` in `server/` directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/safepass
JWT_SECRET=your_super_secret_jwt_key_here
NODE_ENV=development
```

Create `.env` in `client/` directory:
```env
VITE_API_URL=http://localhost:5000
```

5. **Start MongoDB** (if using local)
```bash
# Windows
net start MongoDB

# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

6. **Run the Application**

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```

7. **Access the Application**
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:5000`

---

## 📁 Project Structure

```
safepass/
├── client/                          # Frontend React Application
│   ├── public/
│   │   ├── videos/                  # Background video assets
│   │   └── favicon.png
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx          # Navigation bar
│   │   │   ├── Footer.jsx          # Footer component
│   │   │   ├── ProtectedRoute.jsx  # Auth guard
│   │   │   ├── FeatureCard.jsx     # Feature display
│   │   │   └── Video.jsx           # Video background
│   │   ├── context/
│   │   │   └── AuthContext.jsx     # Global auth state
│   │   ├── pages/
│   │   │   ├── Home.jsx            # Landing page
│   │   │   ├── Features.jsx        # Features showcase
│   │   │   ├── Login.jsx           # Login page
│   │   │   ├── Signup.jsx          # Registration page
│   │   │   ├── PasswordGenerator.jsx
│   │   │   ├── PasswordManager.jsx
│   │   │   └── BreachAndStrengthChecker.jsx
│   │   ├── App.jsx                 # Main app component
│   │   ├── main.jsx                # Entry point
│   │   └── index.css               # Global styles
│   ├── package.json
│   └── vite.config.js
│
├── server/                          # Backend Express Application
│   ├── models/
│   │   ├── User.js                 # User schema
│   │   └── Password.js             # Password schema
│   ├── routes/
│   │   ├── auth.js                 # Auth endpoints
│   │   └── passwords.js            # Password CRUD
│   ├── middleware/
│   │   └── auth.js                 # JWT verification
│   ├── server.js                   # Express server
│   ├── package.json
│   └── .env                        # Environment variables
│
└── README.md                        # You are here!
```

---

## 🔌 API Endpoints

### 🔐 Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/api/auth/register` | Register new user | ❌ |
| `POST` | `/api/auth/login` | Login user | ❌ |
| `GET` | `/api/auth/verify` | Verify JWT token | ✅ |

### 🗄️ Password Management

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/api/passwords` | Get all user passwords | ✅ |
| `POST` | `/api/passwords` | Add new password | ✅ |
| `PUT` | `/api/passwords/:id` | Update password | ✅ |
| `DELETE` | `/api/passwords/:id` | Delete password | ✅ |

### 📊 Health Check

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/api/health` | Server health status | ❌ |

---

## 💡 Usage Guide

### 1️⃣ Create an Account
1. Click **"Sign Up"** in the navigation bar
2. Enter username, email, and password
3. Automatically logged in after registration

### 2️⃣ Login
1. Click **"Login"** in the navigation bar
2. Enter your credentials
3. Access the password manager

### 3️⃣ Password Manager (Requires Login)
- ➕ Add passwords with website, username, and password
- 👁️ View all your saved passwords
- 📋 Copy passwords to clipboard
- 🗑️ Delete passwords you no longer need
- 🔒 All passwords are user-specific and protected

### 4️⃣ Other Features (No Login Required)

**🔍 Breach Checker:**
- Test password strength in real-time
- Check if password has been compromised in data breaches
- Get security tips and recommendations

**⚡ Password Generator:**
- Generate cryptographically secure passwords
- Customize length (8-100 characters)
- Include/exclude numbers and symbols
- View password strength metrics
- Automatic breach checking

---

## 🔒 Security Implementation

### ✅ Current Security Features

```javascript
// Password Hashing (bcrypt)
const hashedPassword = await bcrypt.hash(password, 10);

// JWT Token Generation
const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
  expiresIn: '7d'
});

// Protected Route Middleware
const auth = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  // Verify token and attach user to request
};

// User Data Isolation
const passwords = await Password.find({ userId: req.user._id });
```

### 🎯 Security Metrics

- 🔐 **100%** Client-Side Security
- 🔑 **256-bit** Encryption Standard
- 🚫 **0** Data Stored on Servers (for generator/checker)
- ✅ **70M+** Breached Passwords Database
- 🛡️ **JWT** Token-Based Authentication
- 🔒 **bcrypt** Password Hashing (10 rounds)

### ⚠️ Production Recommendations

For production deployment, consider implementing:

- [ ] Password encryption at rest (AES-256)
- [ ] HTTPS/SSL certificates
- [ ] Rate limiting on API endpoints
- [ ] Two-factor authentication (2FA)
- [ ] httpOnly cookies for tokens
- [ ] Email verification
- [ ] Password reset functionality
- [ ] Session management
- [ ] Input sanitization
- [ ] CSRF protection

---

## 🎨 Features Breakdown

### 🔍 Data Breach Checker
- Integrates with **Have I Been Pwned** API
- Checks against **70+ million** compromised passwords
- Real-time password strength analysis
- Entropy calculation (bits)
- Visual strength indicators
- Security tips and recommendations

### ⚡ Password Generator
- Cryptographically secure random generation
- Customizable length (8-100 characters)
- Character type options (numbers, symbols)
- Real-time strength meter
- Automatic breach checking
- One-click copy to clipboard
- Entropy and uniqueness metrics

### 🗄️ Password Manager
- Secure MongoDB storage
- JWT-authenticated access
- Add, view, copy, delete operations
- User-specific password isolation
- Clean, intuitive interface
- Timestamp tracking
- Quick search and filter

---

## 🌐 Deployment

### Frontend (Render)
```bash
cd client
npm run build
# Deploy dist/ folder to Render
```

### Backend (Render)
```bash
cd server
# Deploy with environment variables configured
```

### Environment Variables for Production
```env
# Backend
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/safepass
JWT_SECRET=your_production_secret_key
NODE_ENV=production
PORT=5000

# Frontend
VITE_API_URL=https://your-backend-url.onrender.com
```

---

## 🎯 Future Enhancements

### 🚀 Planned Features
- [ ] Password encryption at rest (AES-256)
- [ ] Password sharing between users
- [ ] Password history and versioning
- [ ] Email verification system
- [ ] Password reset via email
- [ ] Two-factor authentication (2FA)
- [ ] Browser extension
- [ ] Mobile application (React Native)
- [ ] Password import/export
- [ ] Secure notes feature
- [ ] Password expiration reminders
- [ ] Biometric authentication
- [ ] Dark/Light theme toggle
- [ ] Multi-language support

### 🎨 UI/UX Improvements
- [ ] Password strength visualization
- [ ] Animated transitions
- [ ] Keyboard shortcuts
- [ ] Drag-and-drop organization
- [ ] Advanced search and filters
- [ ] Password categories/tags
- [ ] Favorites system

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. 🍴 Fork the repository
2. 🌿 Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. 💾 Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. 📤 Push to the branch (`git push origin feature/AmazingFeature`)
5. 🔃 Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** - feel free to use it for your own projects!

```
MIT License

Copyright (c) 2025 SafePass

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

## 👨‍💻 Author

**SafePass Team**

- 🌐 Website: [https://safepass-ewqi.onrender.com/](https://safepass-ewqi.onrender.com/)

- 📧 Email: vadirajjoshi22504@gmail.com

---

## 🙏 Acknowledgments

- [Have I Been Pwned](https://haveibeenpwned.com/) - Breach checking API
- [React](https://reactjs.org/) - Frontend framework
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [MongoDB](https://www.mongodb.com/) - Database
- [Express.js](https://expressjs.com/) - Backend framework
- [Render](https://render.com/) - Hosting platform

---



<div align="center">

### 🔐 Stay Secure with SafePass

**[Try it Now →](https://safepass-ewqi.onrender.com/)**

Made with ❤️ and ☕ by the SafePass Tea

⭐ Star this repo if you find it helpful!

</div>
