# CoursePulse

A full-stack course marketplace where users can browse and purchase courses, with account management and role-based access control.

**Live demo:** https://course-selling-application-bay.vercel.app

## Features

- Course listings and course purchases
- User accounts with JWT authentication and protected routes
- Role-based access control: [list your roles, e.g. admin / instructor / student, and what each can do]
- REST API backed by MongoDB schemas for courses, users, and purchases

## Tech Stack

| Layer    | Technology                         |
| -------- | ---------------------------------- |
| Frontend | React                              |
| Backend  | Node.js, Express.js                |
| Database | MongoDB                            |
| Auth     | JSON Web Tokens (JWT)              |

## Project Structure

```
.
├── backend/       # Express REST API
├── frontend/      # React app
└── .env.example   # Environment variable template
```

## Getting Started

### Prerequisites

- Node.js [version]
- A MongoDB instance (local or Atlas)

### 1. Clone the repository

```bash
git clone https://github.com/anukya01/course-selling-application-.git
cd course-selling-application-
```

### 2. Configure environment variables

Copy the example file and fill in your values:

```bash
cp ".env.example" backend/.env
```

| Variable        | Description                          |
| --------------- | ------------------------------------ |
| `[MONGO_URI]`   | MongoDB connection string            |
| `[JWT_SECRET]`  | Secret used to sign JWTs             |
| `[PORT]`        | Port for the API server              |

### 3. Run the backend

```bash
cd backend
npm install
npm [start / run dev]
```

### 4. Run the frontend

```bash
cd frontend
npm install
npm [start / run dev]
```

The app will be available at `http://localhost:[port]`.

## API Overview

Authentication uses a JWT sent in the `Authorization` header. Protected routes reject requests without a valid token, and role-restricted routes check the user's role.

| Method | Endpoint             | Access        | Description        |
| ------ | -------------------- | ------------- | ------------------ |
| POST   | `[/api/.../signup]`  | Public        | Create an account  |
| POST   | `[/api/.../login]`   | Public        | Log in, receive JWT|
| GET    | `[/api/.../courses]` | Public        | List courses       |
| POST   | `[/api/.../purchase]`| Authenticated | Purchase a course  |

Replace the bracketed routes with the ones in your code.

## Author

Anukya Reddy: [GitHub](https://github.com/anukya01) | [LinkedIn](https://www.linkedin.com/in/reddyanukya/)
