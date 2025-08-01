# 🎫 Ticket Service

Generates invoices and ticket details post booking/payment.

---

## 📌 Purpose

- Store ticket record
- Return final invoice with passenger list and payment info

---

## 🧰 Tech Stack

- Node.js + TypeScript
- Express.js
- PostgreSQL

---

## 🚀 Setup Instructions

```bash
cd ticket-service
npm install
npm run dev
````

---

## 🔗 API Endpoints

### ✅ GET `/ticket/:bookingId`

**Response:**

```json
{
  "bookingId": "bk_001",
  "flightId": "AI101",
  "passengers": [
    { "name": "Alice" },
    { "name": "Bob" }
  ],
  "totalAmount": 4580,
  "transactionId": "txn_12345"
}
```

---

## 🧪 How to Test

Use `GET /ticket/:bookingId` after booking and payment