# TaskFlow — Modern SaaS Task Manager

A production-grade, full-stack task management application with a premium dark glassmorphism UI, full JWT authentication, and comprehensive task operations.

## Features

- **Premium UI**: Dark mode with glassmorphism, smooth animations, and responsive design.
- **Full Authentication**: JWT-based auth with bcrypt password hashing.
- **Task Management**: Create, Read, Update, and Delete tasks.
- **Organization**: Filter tasks by status (To Do, In Progress, Done) and sort by deadline.
- **Dashboard Stats**: Real-time animated statistics for task completion.
- **Security**: Protected API routes and client-side protected routes.

## Tech Stack

- **Frontend**: React 18, Vite, React Router DOM, Axios, Lucide React (Icons), Custom CSS Design System
- **Backend**: Node.js, Express, better-sqlite3, JSON Web Tokens (JWT), bcryptjs
- **Database**: SQLite (Zero-config, fast, single-file DB)

## Setup & Installation

### Prerequisites
- Node.js (v16 or higher)
- npm

### 1. Backend Setup

```bash
cd server
npm install
# Seed the database with demo user and sample tasks
npm run seed
# Start the backend server (runs on port 5000)
npm start
```

### 2. Frontend Setup

Open a new terminal window:

```bash
cd client
npm install
# Start the Vite development server
npm run dev
```

The application will be available at `http://localhost:5173`.

## Demo Account

If you ran the seed script (`npm run seed` in the server folder), you can log in immediately with:

- **Email**: demo@taskflow.com
- **Password**: password123

## Project Structure

- `/client` - React frontend powered by Vite
- `/server` - Express backend with SQLite database
- `/server/taskflow.db` - Auto-generated SQLite database file
