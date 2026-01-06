# Employee Management Dashboard

An employee management system built with **React**, **Node.js**, **Prisma**, and **PostgreSQL**.

<img width="1440" alt="dashboard_screenshot" src="https://github.com/user-attachments/assets/placeholder">

## Features
- 👥 **Manage Employees**: Add, edit, delete, and toggle status.
- 🖼️ **Profile Images**: Upload and preview photos (stored as Base64).
- 🔍 **Search & Filters**: Find employees by name, gender, or status.
- 🖨️ **Print Ready**: Clean print layout for reports.
- 🔐 **Mock Auth**: Simple login flow (username: `admin`, password: `admin`).

## Tech Stack
- **Frontend**: React 18, Tailwind CSS, Lucide Icons
- **Backend**: Node.js, Express, Prisma ORM
- **Database**: PostgreSQL

---

## Quick Start

### 1. Database
Make sure you have PostgreSQL running and create a DB:
```sql
CREATE DATABASE employee_db;
```

### 2. Backend
```bash
cd backend
npm install
```

Create a `.env` file (copy from `.env.example`) and set your `DATABASE_URL`:
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/employee_db?schema=public"
```

Sync the database & start the server:
```bash
# Apply schema
npx prisma generate
npx prisma db push

# (Optional) Add dummy data
curl -X POST http://localhost:5000/api/seed

# Start server (Runs on port 5000)
npm run dev
```

### 3. Frontend
```bash
cd frontend
npm install
npm run dev
```
Open **http://localhost:5173** in your browser.

---

## API Reference
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/employees` | List all employees |
| POST | `/api/employees` | Create employee |
| PUT | `/api/employees/:id` | Update employee |
| DEL | `/api/employees/:id` | Delete employee |
