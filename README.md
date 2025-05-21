# HTestProject

A full-stack application for managing user information and sector selections.

## Project Structure

```
.
├── backend/                 # Node.js backend
│   ├── src/
│   │   ├── routes/         # API routes
│   │   ├── schemas/        # Request/response schemas
│   │   ├── repositories/   # Database operations
│   │   ├── db/            # Database migrations
│   │   └── server.js      # Main application file
│   └── package.json
└── frontend/               # React frontend
    ├── src/
    │   ├── components/     # React components
    │   ├── hooks/         # Custom React hooks
    │   ├── services/      # API services
    │   └── pages/         # Page components
    └── package.json
```

## Database Setup

1. Create a PostgreSQL database:
   ```sql
   CREATE DATABASE htestproject;
   ```

2. Create a `.env` file in the backend directory:
   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=htestproject
   DB_USER=your_username
   DB_PASSWORD=your_password
   ```

3. Run database migrations:
   ```bash
   cd backend
   npm run migrate
   ```

## Database Schema

### Users Table
```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    agreed_to_terms BOOLEAN NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### Sectors Table
```sql
CREATE TABLE sectors (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    value INTEGER NOT NULL,
    level INTEGER NOT NULL,
    parent_value INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (parent_value) REFERENCES sectors(value)
);
```

### User Sectors Table
```sql
CREATE TABLE user_sectors (
    user_id INTEGER NOT NULL,
    sector_value INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, sector_value),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (sector_value) REFERENCES sectors(value) ON DELETE CASCADE
);
```

## API Endpoints

### Users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user

### Sectors
- `GET /api/sectors` - Get all sectors

## Frontend Setup

1. Create a `.env` file in the frontend directory:
   ```env
   VITE_API_URL=http://localhost:3001/api
   ```

2. Install dependencies and start the development server:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## Backend Setup

1. Install dependencies and start the server:
   ```bash
   cd backend
   npm install
   npm run dev
   ```

## Development

- Frontend runs on: http://localhost:5173
- Backend runs on: http://localhost:3001

## Technologies Used

### Backend
- Node.js
- Fastify
- PostgreSQL
- TypeBox for schema validation

### Frontend
- React
- Vite
- Material-UI
- Axios for API calls
- React Hook Form for form handling

## Database Dump

The database dumps are available in the `backend` directory:
- `schema.sql` - Contains the database structure (tables, constraints, indexes)
- `data.sql` - Contains the actual data

## Source Code

The source code is organized into two main directories:

### Backend (`/backend`)
- `src/routes/` - API route handlers
- `src/schemas/` - Request/response validation schemas
- `src/repositories/` - Database operations
- `src/db/` - Database migrations and setup
- `src/server.js` - Main application file

### Frontend (`/frontend`)
- `src/components/` - React components
  - `UserForm.jsx` - User information form
  - `SectorSelector.jsx` - Sector selection component
- `src/hooks/` - Custom React hooks
  - `useUserForm.js` - Form logic and state management
- `src/services/` - API services
  - `apiService.js` - Backend API communication
- `src/pages/` - Page components
  - `App.jsx` - Main application component