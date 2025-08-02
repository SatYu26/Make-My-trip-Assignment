# Auth Service

Handles user registration and login.

## Features

- User Signup and Login
- JWT Authentication
- PostgreSQL-based persistence

## Tech Stack

- Node.js
- Express.js
- PostgreSQL
- JWT

## Environment Variables

| Variable       | Description                          |
|----------------|--------------------------------------|
| `PORT`         | Port to run the server (default 3000)|
| `DATABASE_URL` | PostgreSQL connection string         |
| `JWT_SECRET`   | Secret for signing JWT tokens        |

## API Endpoints

### POST /api/auth/signup

Registers a new user.

**Request:**
```json
{
  "name": "Alice",
  "email": "alice@example.com",
  "password": "securepassword"
}
````

**Response:**

```json
{
  "message": "User registered successfully"
}
```

### POST /api/auth/login

Logs in an existing user.

**Request:**

```json
{
  "email": "alice@example.com",
  "password": "securepassword"
}
```

**Response:**

```json
{
  "token": "JWT_TOKEN_HERE",
  "userId": "1"
}
```

## Setup

```bash
npm install
npm run build
npm start
```

## Testing

```bash
npm run test
```

````