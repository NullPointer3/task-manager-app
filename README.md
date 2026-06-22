# Task Manager App

A full-stack TypeScript task management app.

- **Client**: React + Vite + TypeScript, with email/password auth and a task CRUD UI.
- **Server**: Express + TypeScript + Prisma + SQLite, with JWT-based auth and per-user task endpoints.

## Prerequisites

- Node.js 18+
- npm 9+

## Setup

1. Install dependencies (from the repo root, installs both `client` and `server` workspaces):

   ```bash
   npm install
   ```

2. Configure the server environment. Create `server/.env`:

   ```
   DATABASE_URL="file:./dev.db"
   JWT_SECRET="replace-with-a-real-secret"
   PORT=4000
   ```

3. Create the SQLite database and run migrations:

   ```bash
   cd server
   npx prisma migrate dev
   cd ..
   ```

## Running

Start the server and client in two separate terminals:

```bash
npm run dev:server   # http://localhost:4000
npm run dev:client   # http://localhost:5173
```

Open `http://localhost:5173`, register an account, and start adding tasks. The client dev server proxies `/api/*` requests to the backend.

## Project structure

```
client/   React + Vite frontend
server/   Express + Prisma backend
  prisma/schema.prisma   Database schema
  src/routes/auth.ts     Register/login endpoints
  src/routes/tasks.ts    Task CRUD endpoints (requires auth)
```

## Notes

- Auth uses JWTs (7-day expiry) returned on register/login and sent as `Authorization: Bearer <token>`.
- `Task.status` is a plain string (`TODO` | `IN_PROGRESS` | `DONE`) validated by Zod, since SQLite doesn't support native Prisma enums. If you migrate to PostgreSQL, this could become a real enum.
