# Discount Service

Handles discount code validation.

## Features

- Validate discount tokens
- Seeded dummy discount codes

## Tech Stack

- Node.js
- Express.js
- PostgreSQL

## Environment Variables

| Variable       | Description                          |
|----------------|--------------------------------------|
| `PORT`         | Port to run the server (8000)        |
| `DATABASE_URL` | PostgreSQL connection string         |

## API Endpoints

### POST /api/discounts/validate

Validates a given discount code.

**Headers:**
````

Authorization: Bearer \<JWT\_TOKEN>

````

**Request:**
```json
{
  "code": "DISCOUNT50"
}
````

**Response:**

```json
{
  "valid": true,
  "percent": 50
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