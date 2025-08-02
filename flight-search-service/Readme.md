# Flight Search Service

Provides available flights with real-time seat availability.

## Features

- Fetch flights (with caching via Redis)
- Cache invalidation on:
  - Departure passed
  - Flight canceled
  - Flight fully booked

## Tech Stack

- Node.js
- Express.js
- PostgreSQL
- Redis

## Environment Variables

| Variable       | Description                          |
|----------------|--------------------------------------|
| `PORT`         | Port to run the server (default 4000)|
| `DATABASE_URL` | PostgreSQL connection string         |
| `REDIS_URL`    | Redis connection string              |

## API Endpoints

### GET /api/flights/search?source=DEL&destination=BLR&date=2025-08-10

Returns matching flights with available seat counts.

**Headers:**
````

Authorization: Bearer \<JWT\_TOKEN>

````

**Response:**
```json
[
  {
    "flight_id": 1,
    "flight_number": "AI105",
    "source": "DEL",
    "destination": "BLR",
    "departure_time": "06:00",
    "arrival_time": "08:30",
    "date": "2025-08-10",
    "available_seats": 10
  }
]
````

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