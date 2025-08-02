# ✈️ Flight Booking System — Microservices Architecture

A modular, scalable backend system for searching flights, locking seats, creating bookings, processing payments, applying discounts, generating tickets/invoices, and sending notifications.

Built using **TypeScript**, **Node.js**, **PostgreSQL**, and **Redis**, with clean class-based architecture, secure JWT auth, Redis caching, and containerized using Docker Compose.

---

## 📌 System Purpose

This is a complete backend for a flight booking platform (like MakeMyTrip). It includes 9 decoupled microservices handling:

- Authentication
- Flight search (supports 2-hop logic)
- Seat inventory & locking
- Booking system
- Payment gateway (mock)
- Discount validation
- Ticket & Invoice generation
- Notification dispatch (mock)
- Centralized API Gateway

---

## 🧱 Tech Stack

| Layer             | Stack                          |
|------------------|--------------------------------|
| Language          | TypeScript                     |
| Runtime           | Node.js                        |
| API Framework     | Express.js                     |
| Database          | PostgreSQL                     |
| Cache             | Redis                          |
| Auth              | JWT (JSON Web Token)           |
| Containerization  | Docker + Docker Compose        |

---

## 🧩 Architecture Overview

<img src="https://github.com/SatYu26/Make-My-trip-Assignment/blob/main/mmt.png" alt="System Design" style="float: left; margin-right: 20px;" />


```text
            [ Client / Postman ]
                     │
               ┌────────────┐
               │ API Gateway│ ← http://localhost:8080
               └─────┬──────┘
     ┌────────────┬────────────┬────────────┬────────────┬────────────┐
     │ Auth       │ Flight     │ Seat       │ Booking    │ Ticket     │
     │ Service    │ Search     │ Inventory  │ Service    │ Service    │
     └────────────┴─────┬──────┴────┬───────┴──────┬─────┴────────────┘
                        │           │              │
                   Payment      Discount      Notification
                   Service      Service         Service
````

---

## 📁 Microservices and Port Map

| Service            | Description                       | Port |
| ------------------ | --------------------------------- | ---- |
| `auth-service`     | Signup, login, JWT authentication | 3000 |
| `flight-search`    | Direct & 2-hop flight search      | 4000 |
| `seat-service`     | Lock and confirm seats via Redis  | 5000 |
| `booking-service`  | Booking flow management           | 6000 |
| `payment-service`  | Simulate payments, update status  | 7000 |
| `discount-service` | Validate discount tokens          | 8000 |
| `ticket-service`   | Generate ticket + invoice         | 9000 |
| `notification`     | Mock SMS/email notifications      | 9100 |
| `api-gateway`      | Central entrypoint & routing      | 8080 |

---

## 🚀 Getting Started

### 1. Prerequisites

* Node.js ≥ 18
* Docker and Docker Compose
* `.env` files (see below)

### 2. Clone and Run

```bash
git clone <repo-url>
cd flight-booking-system
docker compose up --build
```
NOTE: **MAKE SURE ALL SERVICES ARE RUNNING
IT CAN SHOW THAT SOME SERVICES HAVE  FAILED BUT JUST GO TO DOCKER DESKTOP AND MANUALLY START THEM ONCE AND IT WILL START WORKING.**

USE POSTMAN COLLECTION FOR TESTING
This starts all 9 services, Postgres DBs, and Redis via Docker Compose.

---

## 🔐 .env Configuration

Each service contains a `.env` file. Most include:

```env
PORT=XXXX
DATABASE_URL=postgres://postgres:postgres@<db-service>:5432/<dbname>
JWT_SECRET=your-secret (for auth-service only)
REDIS_URL=redis://redis:6379 (for flight-search and seat-service)
```

The `api-gateway` also includes:

```env
AUTH_SERVICE_URL=http://auth-service:3000
FLIGHT_SEARCH_URL=http://flight-search:4000
SEAT_SERVICE_URL=http://seat-service:5000
BOOKING_SERVICE_URL=http://booking-service:6000
PAYMENT_SERVICE_URL=http://payment-service:7000
DISCOUNT_SERVICE_URL=http://discount-service:8000
TICKET_SERVICE_URL=http://ticket-service:9000
NOTIFICATION_SERVICE_URL=http://notification-service:9100
```

---

## 🧪 API Flow — Full Booking Journey (via Postman)

Below is a complete end-to-end simulation of a flight booking using Postman or cURL. All APIs are routed via the **API Gateway** (`http://localhost:8080`):

NOTE: **MAKE SURE ALL SERVICES ARE RUNNING
IT CAN SHOW THAT SOME SERVICES HAVE  FAILED BUT JUST GO TO DOCKER DESKTOP AND MANUALLY START THEM ONCE AND IT WILL START WORKING.**

1. **Signup**

   ```
   POST /api/auth/signup
   Content-Type: application/json

   {
     "name": "John",
     "email": "john@example.com",
     "password": "test123"
   }
   ```

2. **Login**

   ```
   POST /api/auth/login
   Content-Type: application/json

   {
     "email": "john@example.com",
     "password": "test123"
   }
   ```

   > 🔐 Returns a **JWT token** and `userId`. Use the token in all further requests as:
   > `Authorization: Bearer <token>`

3. **Search Flights**

   ```
   GET /api/flights/search?source=DEL&destination=BOM&date=2025-08-05
   Authorization: Bearer <token>
   ```

4. **Check Available Seats**

   ```
   GET /api/seats/1
   Authorization: Bearer <token>
   ```

5. **Lock a Seat**

   ```
   POST /api/seats/lock
   Authorization: Bearer <token>
   Content-Type: application/json

   {
     "flightId": 1,
     "userId": 1,
     "seatNumber": "A1"
   }
   ```

6. **Create Booking**

   ```
   POST /api/bookings/create
   Authorization: Bearer <token>
   Content-Type: application/json

   {
     "userId": 1,
     "flightId": 1,
     "price": 5000,
     "seats": 2
   }
   ```

7. **Get Booking Details**

   ```
   GET /api/bookings/1/1
   Authorization: Bearer <token>
   ```

8. **Initiate Payment**

   ```
   POST /api/payments/pay
   Authorization: Bearer <token>
   Content-Type: application/json

   {
     "bookingId": 1,
     "amount": 5000,
     "userId": 1
   }
   ```

9. **Apply Discount Code (Optional)**

   ```
   POST /api/discounts/apply
   Authorization: Bearer <token>
   Content-Type: application/json

   {
     "bookingId": 1,
     "code": "FLY100"
   }
   ```

10. **Generate Ticket**

```
POST /api/tickets/generate
Authorization: Bearer <token>
Content-Type: application/json

{
  "booking_id": 1
}
```

11. **Get Ticket**

```
GET /api/tickets/1
Authorization: Bearer <token>
```

12. **Send Notification**

```
POST /api/notifications/send
Authorization: Bearer <token>
Content-Type: application/json

{
  "userId": 1,
  "message": "ticket booked"
}
```

---

## 📦 Folder Structure

```
flight-booking-system/
├── auth-service/
├── flight-search-service/
├── seat-service/
├── booking-service/
├── payment-service/
├── discount-service/
├── ticket-service/
├── notification-service/
├── api-gateway/
├── docker-compose.yml
└── README.md
```

---

## 📌 Caching & Invalidation

* Flight search results are cached in Redis
* Cache is invalidated if:

  1. Flight has already departed
  2. Flight is in the cancelled list
  3. Flight is fully booked

---

## 🔐 Security & Flow Constraints

* Every service (except signup/login) checks for valid JWT
* Booking flow is strictly linear:

  1. Search → Lock → Booking → Pay → Ticket
  2. Discount is optional, all else is mandatory
* Redis ensures race-free seat locking

---

## 🧰 Production Recommendations

* Reverse proxy: NGINX or Traefik in front of API Gateway
* Use HTTPS (TLS termination at gateway)
* Run Redis/Postgres as managed services (e.g., GCP Cloud SQL, Memorystore)
* Add retry logic and exponential backoff for network calls
* Add monitoring (Prometheus + Grafana)
* Structured logging (e.g., Winston + FluentBit)
