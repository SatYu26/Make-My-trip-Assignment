# 🌐 API Gateway

Acts as a reverse proxy and unified entry point for all internal microservices like auth, flight search, booking, etc.

---

## 📌 Purpose

- Expose a single external interface for all services
- Route requests to appropriate internal service
- Enforce JWT token validation
- Centralized logging and error handling

---

## 🧰 Tech Stack

- Node.js + TypeScript
- Express.js
- http-proxy-middleware
- JWT (middleware for protected routes)

---

## 🚀 Setup Instructions

```bash
cd api-gateway
npm install
npm run dev
````

### Environment Variables

```
PORT=8080
AUTH_SERVICE=http://localhost:3000
FLIGHT_SERVICE=http://localhost:4000
SEAT_SERVICE=http://localhost:5000
BOOKING_SERVICE=http://localhost:6000
PAYMENT_SERVICE=http://localhost:7000
DISCOUNT_SERVICE=http://localhost:8000
TICKET_SERVICE=http://localhost:9000
NOTIFICATION_SERVICE=http://localhost:9100
JWT_SECRET=your-secret
```

---

## 🔗 Gateway Routes

All routes below are **prefixed with `/api/`**.

### 🛂 Auth Routes

| Endpoint                 | Method | Description            |
| ------------------------ | ------ | ---------------------- |
| `/api/auth/signup`       | POST   | User registration      |
| `/api/auth/login`        | POST   | Login & get JWT        |
| `/api/auth/verify-token` | GET    | Validate token payload |

---

### 🛫 Flight Search

| Endpoint              | Method | Description             |
| --------------------- | ------ | ----------------------- |
| `/api/flights/search` | GET    | Find flights (0–2 hops) |

**Query:** `?src=DEL&dest=BLR`

---

### 💺 Seat Service

| Endpoint             | Method | Description   |
| -------------------- | ------ | ------------- |
| `/api/seats/lock`    | POST   | Lock seats    |
| `/api/seats/confirm` | POST   | Confirm seats |

---

### 📦 Booking

| Endpoint               | Method | Description    |
| ---------------------- | ------ | -------------- |
| `/api/bookings/create` | POST   | Create booking |

---

### 💳 Payments

| Endpoint            | Method | Description      |
| ------------------- | ------ | ---------------- |
| `/api/payments/pay` | POST   | Simulate payment |

---

### 🎟️ Discounts

| Endpoint               | Method | Description         |
| ---------------------- | ------ | ------------------- |
| `/api/discounts/apply` | POST   | Apply discount code |

---

### 🎫 Tickets

| Endpoint                  | Method | Description          |
| ------------------------- | ------ | -------------------- |
| `/api/tickets/:bookingId` | GET    | Get full ticket info |

---

### 📩 Notifications

| Endpoint           | Method | Description         |
| ------------------ | ------ | ------------------- |
| `/api/notify/send` | POST   | Send email/SMS mock |

---

## 🧾 Sample Booking Flow via Gateway

```http
POST    /api/auth/signup
POST    /api/auth/login                → JWT
GET     /api/flights/search            → get flightId
POST    /api/seats/lock                → reserve seats
POST    /api/discounts/apply           → apply coupon
POST    /api/bookings/create           → create booking
POST    /api/payments/pay              → confirm payment
GET     /api/tickets/:bookingId        → get ticket info
POST    /api/notify/send               → send ticket info
```

---

## 🔐 JWT Middleware

* Applied to all routes except `/signup`, `/login`, and `/verify-token`
* Expects header:
  `Authorization: Bearer <token>`
* Token is verified and passed downstream

---

## 🧪 How to Test

Use Postman or cURL to run the full flow via the gateway at:

```
http://localhost:8080/api
```

Each request should behave as if it directly talks to the target microservice.

---
