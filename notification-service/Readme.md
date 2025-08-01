# 📩 Notification Service

Simulates sending email or SMS for ticket confirmation.

---

## 📌 Purpose

- Simulate message/email delivery
- Log notification request

---

## 🧰 Tech Stack

- Node.js + TypeScript
- Express.js

---

## 🚀 Setup Instructions

```bash
cd notification-service
npm install
npm run dev
````

---

## 🔗 API Endpoints

### ✅ POST `/send`

**Request:**

```json
{
  "to": "user@example.com",
  "message": "Your ticket is confirmed"
}
```

**Response:**

```json
{
  "status": "delivered"
}
```

---

## 🧪 How to Test

Call `/send` with mock payload