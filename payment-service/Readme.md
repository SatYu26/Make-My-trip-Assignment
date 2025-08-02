# Payment Service

Handles user payments for bookings.

## Features

- Process payment for booking
- Update payment status
- Trigger seat confirmation

## Tech Stack

- Node.js
- Express.js
- PostgreSQL

## Environment Variables

| Variable       | Description                          |
|----------------|--------------------------------------|
| `PORT`         | Port to run the server (7000)        |
| `DATABASE_URL` | PostgreSQL connection string         |

## API Endpoints

### POST /api/payments/initiate

Initiates a mock payment for a booking.

**Headers:**
````

Authorization: Bearer \<JWT\_TOKEN>

````

**Request:**
```json
{
  "booking_id": 123,
  "amount": 4999
}
````

**Response:**

```json
{
  "message": "Payment successful",
  "transaction_id": "txn_456"
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