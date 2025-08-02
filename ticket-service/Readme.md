# Ticket & Invoice Service

Generates final ticket and invoice after booking + payment.

## Features

- Generate downloadable ticket
- Create invoice records

## Tech Stack

- Node.js
- Express.js
- PostgreSQL

## Environment Variables

| Variable       | Description                          |
|----------------|--------------------------------------|
| `PORT`         | Port to run the server (9000)        |
| `DATABASE_URL` | PostgreSQL connection string         |

## API Endpoints

### POST /api/tickets/generate

Generates a ticket after booking confirmation.

**Headers:**
````

Authorization: Bearer \<JWT\_TOKEN>

````

**Request:**
```json
{
  "booking_id": 123
}
````

**Response:**

```json
{
  "ticket_id": "TICK-456",
  "pdf_url": "/tickets/TICK-456.pdf"
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