# 🎟️ Discount Service

Applies and validates coupon codes and offers.

---

## 📌 Purpose

- Validate discount codes or bank offers
- Return applicable discount amount

---

## 🧰 Tech Stack

- Node.js + TypeScript
- Express.js
- PostgreSQL

---

## 🚀 Setup Instructions

```bash
cd discount-service
npm install
npm run dev
````

---

## 🔗 API Endpoints

### ✅ POST `/apply`

**Request:**

```json
{
  "userId": "u123",
  "code": "FLY50",
  "amount": 5000
}
```

**Response:**

```json
{
  "valid": true,
  "discount": 500
}
```

*(OR)*

```json
{
  "valid": false,
  "discount": 0,
  "reason": "Invalid or expired coupon"
}
```

---

## 🧪 How to Test

Send coupon code and base amount to `/apply`