# 🔐 Auth Service

Handles user authentication and JWT token issuance.

---

## 📌 Purpose

- Register users securely
- Authenticate users and return access tokens
- Validate access tokens in downstream services

---

## 🧰 Tech Stack

- Node.js + TypeScript
- Express.js
- PostgreSQL
- JWT

---

## 🚀 Setup Instructions

```bash
cd auth-service
npm install
npm run dev
````

### Environment Variables

```
PORT=3000
JWT_SECRET=your-secret
DATABASE_URL=postgres://user:pass@host:port/db
```

---

## 🔗 API Endpoints

### ✅ POST `/signup`

Registers a new user.

**Request:**

```json
{
  "email": "user@example.com",
  "password": "secure123"
}
```

**Response:**

```json
{
  "message": "User registered successfully"
}
```

---

### ✅ POST `/login`

Returns a JWT token for a valid user.

**Request:**

```json
{
  "email": "user@example.com",
  "password": "secure123"
}
```

**Response:**

```json
{
  "token": "<jwt_token>"
}
```

---

### ✅ GET `/verify-token`

Verifies token and returns payload.

**Headers:**

```
Authorization: Bearer <jwt_token>
```

**Response:**

```json
{
  "userId": "uuid",
  "email": "user@example.com"
}
```

---

## 🧪 How to Test

1. Register: `POST /signup`
2. Login: `POST /login` → get token
3. Use token in downstream services with `Authorization` header
