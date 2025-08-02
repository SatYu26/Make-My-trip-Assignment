# Booking Service

Handles booking creation and flow management.

## Features

- Create booking record
- Interact with seat service to lock seats
- Maintain booking flow state

## Tech Stack

- Node.js
- Express.js
- PostgreSQL

## Environment Variables

| Variable             | Description                     |
|----------------------|---------------------------------|
| `PORT`               | Port to run the server (6000)   |
| `DATABASE_URL`       | PostgreSQL connection string    |
| `SEAT_SERVICE_URL`   | Internal URL to seat service    |

## API Endpoints

### POST /api/bookings/create

Creates a booking entry.

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
  "booking_id": 123,
  "status": "PENDING"
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
`