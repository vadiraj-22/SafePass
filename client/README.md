# 🔐 SafePass - Password Security Suite

A professional password management application with authentication, built with React, Express, and MongoDB.

## ✨ Features

- 🔍 **Password Strength & Breach Checker** - Analyze passwords and check against Have I Been Pwned database
- ⚡ **Cryptographic Password Generator** - Generate secure random passwords
- 🗄️ **Password Manager** - Store and manage passwords securely (requires login)
- 🔐 **User Authentication** - JWT-based login/signup with MongoDB
- 🎨 **Modern UI** - Beautiful dark theme with Tailwind CSS
- 🔒 **Protected Routes** - Password manager requires authentication

## 🚀 Quick Start

### Prerequisites
- Node.js (v16+)
- MongoDB (local or Atlas)

### Installation

1. **Install Frontend Dependencies**
```bash
npm install
```

2. **Install Backend Dependencies**
```bash
cd server
npm install
cd ..
```

3. **Start MongoDB** (if using local)
```bash
# Windows
net start MongoDB

# macOS/Linux
brew services start mongodb-community
```

4. **Start Development Servers**

**Option 1: Windows Quick Start**
```bash
start-dev.bat
```

**Option 2: Manual Start**
```bash
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend
npm run dev
```

5. **Open Application**
- Frontend: http://localhost:5173
- Backend API: https://safepass-60b0.onrender.com/

## 📁 Project Structure

```
safepass/
├── server/                    # Backend (Express + MongoDB)
│   ├── models/               # User & Password models
│   ├── routes/               # API routes (auth, passwords)
│   ├── middleware/           # JWT authentication
│   └── server.js             # Express server
│
├── src/
│   ├── components/           # Navbar, Footer, ProtectedRoute
│   ├── pages/                # All page components
│   ├── context/              # AuthContext for state management
│   └── App.jsx               # Main app with routing
│
└── SETUP.md                  # Detailed setup instructions
```

## 🔑 Usage

### 1. Create Account
- Click "Sign Up" in navbar
- Enter username, email, and password
- Automatically logged in after registration

### 2. Login
- Click "Login" in navbar
- Enter credentials
- Access password manager

### 3. Password Manager
- Add passwords with website, username, and password
- View, copy, and delete saved passwords
- All passwords are user-specific and protected

### 4. Other Features (No Login Required)
- **Breach Checker**: Test password strength and check breaches
- **Password Generator**: Generate secure random passwords

## 🛠️ Tech Stack

**Frontend:**
- React 19 + Vite
- React Router DOM
- Tailwind CSS 4
- Axios
- Context API

**Backend:**
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- bcryptjs for password hashing
- CORS enabled

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/auth/verify` - Verify token

### Passwords (Protected)
- `GET /api/passwords` - Get all passwords
- `POST /api/passwords` - Add password
- `PUT /api/passwords/:id` - Update password
- `DELETE /api/passwords/:id` - Delete password

## 🔒 Security Features

✅ **Implemented:**
- JWT authentication
- Password hashing (bcrypt)
- Protected API routes
- User-specific data isolation
- CORS configuration

⚠️ **For Production:**
- Add password encryption at rest
- Use HTTPS
- Implement rate limiting
- Add 2FA
- Use httpOnly cookies
- Add email verification

## 📖 Documentation

See [SETUP.md](./SETUP.md) for detailed setup instructions and troubleshooting.

## 🎯 Future Enhancements

- [ ] Password encryption at rest (AES-256)
- [ ] Password sharing between users
- [ ] Password history tracking
- [ ] Email verification
- [ ] Password reset functionality
- [ ] Two-factor authentication
- [ ] Mobile app
- [ ] Browser extension

## 📝 License

MIT License - feel free to use for your projects!

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues and pull requests.
