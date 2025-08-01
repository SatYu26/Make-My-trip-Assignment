# 💺 Seat Service

Locks seats temporarily using Redis and confirms them via DB.

---

## 📌 Purpose

- Lock seats for 10 minutes using Redis TTL
- Confirm seat bookings by writing to DB

---

## 🧰 Tech Stack

- Node.js + TypeScript
- Express.js
- Redis
- PostgreSQL

---

## 🚀 Setup Instructions

```bash
cd seat-service
npm install
npm run dev
````

### Environment Variables

```
PORT=5000
REDIS_URL=redis://localhost:6379
DATABASE_URL=postgres://user:pass@host:port/db
```

---

## 🔗 API Endpoints

### ✅ POST `/lock`

Temporarily locks selected seats.

**Request:**

```json
{
  "flightId": "AI101",
  "userId": "u123",
  "seats": ["1A", "1B"]
}
```

**Response:**

```json
{
  "message": "Seats locked for 10 minutes"
}
```

---

### ✅ POST `/confirm`

Marks seats as booked in the database.

**Request:**

```json
{
  "flightId": "AI101",
  "userId": "u123",
  "seats": ["1A", "1B"]
}
```

**Response:**

```json
{
  "message": "Seats confirmed"
}
```

---

## 🧪 How to Test

1. Lock seats → `POST /lock`
2. Confirm them → `POST /confirm`