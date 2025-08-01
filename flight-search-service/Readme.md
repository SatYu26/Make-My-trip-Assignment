# 🛫 Flight Search Service

Returns direct and connecting flights (up to 2 hops) between cities.

---

## 📌 Purpose

- Search direct or 1-stop flights using 2-hop BFS
- Store flight routes in PostgreSQL
- Expose GET endpoint to retrieve flights between cities

---

## 🧰 Tech Stack

- Node.js + TypeScript
- Express.js
- PostgreSQL

---

## 🚀 Setup Instructions

```bash
cd flight-search-service
npm install
npm run dev
````

### Environment Variables

```
PORT=4000
DATABASE_URL=postgres://user:pass@host:port/db
```

---

## 🔗 API Endpoints

### ✅ GET `/search?src=DEL&dest=BLR`

Returns all direct or one-stop flight paths.

**Response:**

```json
[
  {
    "path": ["DEL", "BLR"],
    "flights": [{ "flightId": "AI101", ... }]
  },
  {
    "path": ["DEL", "BOM", "BLR"],
    "flights": [
      { "flightId": "AI301", ... },
      { "flightId": "AI789", ... }
    ]
  }
]
```

---

## 🧪 How to Test

1. Seed database with sample flight data
2. Run: `GET /search?src=DEL&dest=BLR`