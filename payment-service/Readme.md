# 💳 Payment Service

Mocks external payments and returns success/failure.

---

## 📌 Purpose

- Simulate payment gateway (80% success)
- Return dummy transaction ID

---

## 🧰 Tech Stack

- Node.js + TypeScript
- Express.js

---

## 🚀 Setup Instructions

```bash
cd payment-service
npm install
npm run dev
````

### Environment Variables

```
PORT=7000
```

---

## 🔗 API Endpoints

### ✅ POST `/pay`

**Request:**

```json
{
  "bookingId": "bk_001",
  "amount": 4580
}
```

**Response:**

```json
{
  "status": "success",
  "transactionId": "txn_12345"
}
```

*(OR)*

```json
{
  "status": "failed",
  "reason": "Insufficient balance"
}
```

---

## 🧪 How to Test

1. Call `/pay` with booking ID + amount