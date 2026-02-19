# Karibu Groceries LTD Backend API

This is a Node.js Express backend for Karibu Groceries LTD, supporting procurement, sales, and user management with MongoDB. The API is fully documented with Swagger and uses modular routing and authentication.

## Features
- Modular routers for procurement, sales, and users
- MongoDB integration with Mongoose
- User authentication and role-based access
- Field validation for all endpoints
- Swagger API documentation at `/api-docs`

## Getting Started

### Prerequisites
- Node.js (v14+ recommended)
- MongoDB (local or Atlas)

### Installation
1. Clone the repository:
   ```
   git clone <your-repo-url>
   cd <your-repo-folder>
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Copy `.env.example` to `.env` and fill in your values:
   ```
   cp .env.example .env
   ```
4. Start MongoDB (if running locally):
   ```
   mongod
   ```
5. Start the server:
   ```
   node server.js
   ```

## API Documentation
Visit [http://localhost:3000/api-docs](http://localhost:3000/api-docs) for interactive Swagger docs.

## Example Requests
### Register User
POST `/users/register`
```json
{
  "username": "john123",
  "email": "john@example.com",
  "password": "password123",
  "role": "Manager"
}
```

### Login
POST `/users/login`
```json
{
  "username": "john123",
  "password": "password123"
}
```

### Record Procurement
POST `/procurement`
```json
{
  "produceName": "Maize",
  "produceType": "Grain",
  "date": "2026-02-19",
  "time": "10:00",
  "tonnage": 200,
  "cost": 150000,
  "dealerName": "Alpha Dealer",
  "branch": "Maganjo",
  "contact": "+256700000000",
  "sellingPrice": 200000
}
```

## Environment Variables
See `.env.example` for required variables:
- `PORT`
- `NODE_ENV`
- `DATABASE_URI`
- `JWT_SECRET`

## .gitignore
Make sure your `.env` file is listed in `.gitignore` and not pushed to GitHub.

## License
MIT
