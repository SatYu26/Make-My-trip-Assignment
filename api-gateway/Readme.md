# API Gateway

Single entry point to all backend services.

## Features

- Centralized routing
- Authentication forwarding
- Hides internal service details

## Tech Stack

- Node.js
- Express.js

## Environment Variables

| Variable                  | Description                         |
|---------------------------|-------------------------------------|
| `AUTH_SERVICE_URL`        | Internal URL of Auth Service        |
| `FLIGHT_SEARCH_URL`       | Internal URL of Flight Search       |
| `SEAT_SERVICE_URL`        | Internal URL of Seat Inventory      |
| `BOOKING_SERVICE_URL`     | Internal URL of Booking Service     |
| `PAYMENT_SERVICE_URL`     | Internal URL of Payment Service     |
| `DISCOUNT_SERVICE_URL`    | Internal URL of Discount Service    |
| `TICKET_SERVICE_URL`      | Internal URL of Ticket Service      |
| `NOTIFICATION_SERVICE_URL`| Internal URL of Notification Service|

## Setup

```bash
npm install
npm run build
npm start
````

## API Structure

This service forwards requests to respective microservices. All paths start with `/api`.

Example:

* `/api/auth/login` → Auth Service
* `/api/flights/search` → Flight Search Service
* `/api/bookings/create` → Booking Service

## Testing

```bash
npm run test