# Notification Service

Sends notifications to users via email/SMS (mocked).

## Features

- Send booking/ticket notifications

## Tech Stack

- Node.js
- Express.js

## Environment Variables

None needed for now.

## API Endpoints

### POST /api/notifications/send

**Request:**
```json
{
  "user_id": 10,
  "message": "Your ticket has been issued!"
}
````

**Response:**

```json
{
  "status": "sent"
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