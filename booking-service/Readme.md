# 📦 Booking Service

Creates and stores complete bookings and passenger details.

---

## 📌 Purpose

- Store booking metadata
- Link bookings with users and flights
- Track booking status

---

## 🧰 Tech Stack

- Node.js + TypeScript
- Express.js
- PostgreSQL

---

## 🚀 Setup Instructions

```bash
cd booking-service
npm install
npm run dev
````

### Environment Variables

```
PORT=6000
DATABASE_URL=postgres://user:pass@host:port/db
```

---

## 🔗 API Endpoints

### ✅ POST `/create`

Creates a booking with passenger data.

**Request:**

```json
{
  "userId": "u123",
  "flightId": "AI101",
  "seats": ["1A", "1B"],
  "passengers": [
    { "name": "Alice", "age": 28 },
    { "name": "Bob", "age": 32 }
  ]
}
```

**Response:**

```json
{
  "bookingId": "bk_001",
  "message": "Booking created"
}
```

---

## 🧪 How to Test

1. Confirm seats via seat service
2. Send booking details to `/create`