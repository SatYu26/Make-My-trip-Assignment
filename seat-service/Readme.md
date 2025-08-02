# Seat Inventory Service

Handles seat locking and confirming for flights.

## Features

- Lock seats temporarily
- Confirm seats after payment
- Redis-based concurrency

## Tech Stack

- Node.js
- Express.js
- PostgreSQL
- Redis

## Environment Variables

| Variable       | Description                          |
|----------------|--------------------------------------|
| `PORT`         | Port to run the server (default 5000)|
| `DATABASE_URL` | PostgreSQL connection string         |
| `REDIS_URL`    | Redis connection string              |

## API Endpoints

### POST /api/seats/lock

Temporarily locks seats for a booking.

**Headers:**
````

Authorization: Bearer \<JWT\_TOKEN>

````

**Request:**
```json
{
  "flight_id": 1,
  "user_id": 10,
  "num_seats": 2
}
````

**Response:**

```json
{
  "message": "Seats locked successfully",
  "flight_id": 1
}
```

### POST /api/seats/confirm

Confirms seats after successful payment.

**Request:**

```json
{
  "flight_id": 1,
  "user_id": 10,
  "booking_id": 123
}
```

**Response:**

```json
{
  "message": "Seats confirmed"
}
```

## Setup

```bash
npm install
npm run build
npm start
```

## Testing

```bash
npm run test
```

````