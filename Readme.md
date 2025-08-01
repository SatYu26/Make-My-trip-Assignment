# ✈️ Flight Booking System (MakeMyTrip-like) — Microservices Architecture

A modular, production-grade backend system to search flights, book tickets, lock seats, process payments, apply discounts, generate invoices, and send notifications.

Built with **TypeScript + Node.js + PostgreSQL + Redis**, following **clean class-based LLD**, fully containerized with **Docker Compose**, and routed through a central **API Gateway**.

---

## 📌 System Purpose

This project simulates the backend of a flight booking platform like MakeMyTrip or ClearTrip. It consists of 9 decoupled microservices that handle:

- Authentication
- Flight search (with up to 2 hops)
- Seat inventory & locking
- Booking
- Payments (mocked)
- Discounts
- Ticketing
- Notifications
- Central API Gateway

---

## 🧱 Tech Stack

| Layer             | Stack                         |
|------------------|-------------------------------|
| Language          | TypeScript                    |
| Runtime           | Node.js                       |
| API Framework     | Express.js                    |
| DB                | PostgreSQL                    |
| Cache             | Redis                         |
| Containerization  | Docker + Docker Compose       |
| Auth              | JWT                           |

---

## 🧩 Architecture Overview


<img src="https://github.com/SatYu26/Make-My-trip-Assignment/blob/main/mmt.png" alt="System Design" style="float: left; margin-right: 20px;" />


```text
           [ Client / Postman ]
                    │
              ┌────────────┐
              │ API Gateway│  ← http://localhost:8080
              └─────┬──────┘
     ┌────────────┬────────────┬────────────┬────────────┬────────────┐
     │ Auth       │ Flight     │ Seat       │ Booking    │ Ticket     │
     │ Service    │ Search     │ Inventory  │ Service    │ Service    │
     └────────────┴─────┬──────┴────┬───────┴──────┬─────┴────────────┘
                        │           │              │
                    Payment     Discount     Notification
                    Service     Service         Service
````

---

## 📁 Services and Ports

| Service            | Description                        | Port |
| ------------------ | ---------------------------------- | ---- |
| `auth-service`     | Signup, login, token auth          | 3000 |
| `flight-search`    | Search direct and 2-hop flights    | 4000 |
| `seat-service`     | Lock seats in Redis, confirm in DB | 5000 |
| `booking-service`  | Store bookings, passengers         | 6000 |
| `payment-service`  | Simulate external payments         | 7000 |
| `discount-service` | Validate discount codes            | 8000 |
| `ticket-service`   | Generate ticket & invoice          | 9000 |
| `notification`     | Simulate SMS/email                 | 9100 |
| `api-gateway`      | Central routing for all services   | 8080 |

---

## 🚀 Setup Instructions

### 1. Prerequisites

* Node.js ≥ 18
* Docker + Docker Compose

### 2. Clone & Start the System

```bash
git clone <repo-url>
cd flight-booking-system
docker-compose up --build
```

This will boot all services in one go.

---

## 🧪 API Flow — Full User Journey

Here’s how you can simulate a complete flight booking in Postman:

1. **Signup:**
   `POST /api/auth/signup`
   `{ "email": "test@user.com", "password": "123456" }`

2. **Login:**
   `POST /api/auth/login`
   ⇒ returns JWT token

3. **Search Flights:**
   `GET /api/flights/search?src=DEL&dest=BLR`

4. **Lock Seats:**
   `POST /api/seats/lock`
   `{ "flightId": "AI101", "seats": ["1A", "1B"] }`

5. **Apply Discount:**
   `POST /api/discounts/apply`
   `{ "code": "FLY50", "amount": 5000 }`

6. **Create Booking:**
   `POST /api/bookings/create`
   `{ "flightId": "AI101", "passengers": [...] }`

7. **Pay:**
   `POST /api/payments/pay`
   `{ "bookingId": "bk_001", "amount": 5000 }`

8. **Generate Ticket:**
   `GET /api/tickets/bk_001`

9. **Send Notification:**
   `POST /api/notify/send`
   `{ "to": "test@user.com", "message": "Ticket confirmed" }`

All routes above are accessible through:
`http://localhost:8080/api/...`

---

## 🧰 Folder Structure

```bash
flight-booking-system/
├── api-gateway/
├── auth-service/
├── booking-service/
├── discount-service/
├── flight-search-service/
├── notification-service/
├── payment-service/
├── seat-service/
├── ticket-service/
├── docker-compose.yml
└── README.md
```

---

## 🔐 Security Notes

* JWT-based authentication
* All protected endpoints check `Authorization: Bearer <token>`
* Redis used to avoid race conditions in seat locking
* Services are stateless and scalable independently

---

## 🔧 Production Suggestions

* Use HTTPS with TLS termination at the gateway
* Add monitoring/logging (Prometheus + Grafana)
* Persist Redis data with Redis AOF or RDB in production
* Add retries + circuit breakers for downstream calls
* Run DB and Redis as managed services (e.g., GCP Cloud SQL, Memorystore)