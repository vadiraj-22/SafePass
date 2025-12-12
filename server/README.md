# SafePass Backend

Express.js backend with MongoDB for SafePass Password Manager.

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Start production server
npm start
```

## Environment Variables

Create a `.env` file (already created):

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/safepass
JWT_SECRET=your_secret_key
NODE_ENV=development
```

## API Documentation

### Authentication Endpoints

#### Register User
```
POST /api/auth/register
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "securepass123"
}
```

#### Login User
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepass123"
}
```

#### Verify Token
```
GET /api/auth/verify
Authorization: Bearer <token>
```

### Password Endpoints (Protected)

All password endpoints require JWT token in Authorization header.

#### Get All Passwords
```
GET /api/passwords
Authorization: Bearer <token>
```

#### Add Password
```
POST /api/passwords
Authorization: Bearer <token>
Content-Type: application/json

{
  "website": "Gmail",
  "username": "john@gmail.com",
  "password": "mypassword123"
}
```

#### Update Password
```
PUT /api/passwords/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "website": "Gmail",
  "username": "john@gmail.com",
  "password": "newpassword123"
}
```

#### Delete Password
```
DELETE /api/passwords/:id
Authorization: Bearer <token>
```

## Database Schema

### User Model
```javascript
{
  username: String (unique, required),
  email: String (unique, required),
  password: String (hashed, required),
  createdAt: Date
}
```

### Password Model
```javascript
{
  userId: ObjectId (ref: User),
  website: String (required),
  username: String (required),
  password: String (required),
  createdAt: Date,
  updatedAt: Date
}
```
