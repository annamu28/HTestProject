# Backend Application

A Node.js backend application built with Fastify for managing user information and sector data.

## Features

- RESTful API endpoints
- PostgreSQL database integration
- User data management
- Sector hierarchy management
- Input validation
- Error handling
- CORS support
- Environment configuration
- Docker support
- Database migrations and seeding

## Project Structure

```
backend/
├── src/
│   ├── config/             # Configuration files
│   │   └── database.js     # Database configuration
│   ├── controllers/        # Request handlers
│   │   ├── user.controller.js
│   │   └── sector.controller.js
│   ├── db/                 # Database related files
│   │   ├── index.js        # Database connection
│   │   ├── migrations/     # Database migrations
│   │   └── seed-sectors.js # Sector seeding script
│   ├── repositories/       # Data access layer
│   │   ├── user.repository.js
│   │   └── sector.repository.js
│   ├── routes/            # API routes
│   │   ├── users.js
│   │   └── sectors.js
│   ├── schemas/           # Validation schemas
│   │   ├── user.schema.js
│   │   └── sector.schema.js
│   ├── services/          # Business logic
│   │   ├── user.service.js
│   │   └── sector.service.js
│   └── server.js          # Application entry point
├── .env                   # Environment variables
├── docker-compose.yml     # Docker compose configuration
├── Dockerfile            # Docker configuration
└── package.json          # Project dependencies
```

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn
- Docker and Docker Compose (for containerized setup)

## Environment Setup

Create a `.env` file in the root directory with the following variables:

```env
DATABASE_URL=postgres://postgres:postgres@localhost:25432/myapp
PORT=3001
NODE_ENV=development
```

## Installation

### Option 1: Local Installation

1. Clone the repository
2. Navigate to the backend directory:
   ```bash
   cd backend
   ```
3. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

### Option 2: Docker Installation

1. Clone the repository
2. Navigate to the backend directory:
   ```bash
   cd backend
   ```
3. Build and start the containers:
   ```bash
   docker-compose up --build
   ```

## Database Setup

### Option 1: Local Database

1. Create the database:
   ```bash
   createdb myapp
   # or
   psql -U postgres -c "CREATE DATABASE myapp;"
   ```

2. Run migrations:
   ```bash
   npm run migrate:up
   # or
   yarn migrate:up
   ```

3. Seed the database with sectors:
   ```bash
   node src/db/seed-sectors.js
   ```

### Option 2: Docker Database

1. Start the containers:
   ```bash
   docker-compose up -d
   ```

2. Run migrations:
   ```bash
   docker-compose exec app npm run migrate:up
   ```

3. Seed the database with sectors:
   ```bash
   docker-compose exec app node src/db/seed-sectors.js
   ```

## Database Migrations

The application uses a migration system to manage database schema changes. Migrations are located in the `src/db/migrations` directory.

### Available Migration Commands

```bash
# Create a new migration
npm run migrate:create -- <migration-name>

# Run all pending migrations
npm run migrate:up

# Rollback the last migration
npm run migrate:down

# Show migration status
npm run migrate:status
```

### Migration Files

Migration files follow the naming convention: `[timestamp]_[name].sql`

Example migration file:
```sql
-- 001_initial_schema.sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  agreed_to_terms BOOLEAN NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Database Seeding

The application includes a seeding script for populating the sectors table with initial data. The seeding process is not automatic and must be run manually after migrations.

### Seeding Commands

```bash
# Local environment
node src/db/seed-sectors.js

# Docker environment
docker-compose exec app node src/db/seed-sectors.js
```

The seeding script will:
1. Clear existing sector data
2. Insert predefined sectors with their hierarchy
3. Log the seeding process

## Development

### Local Development

To start the development server:

```bash
npm run dev
# or
yarn dev
```

### Docker Development

To start the development server with Docker:

```bash
docker-compose up
```

The server will be available at http://localhost:3001

## API Endpoints

### Users

- `POST /api/users`
  - Create a new user
  - Body: `{ name: string, sectors: number[], agreed_to_terms: boolean }`

- `GET /api/users/:id`
  - Get user by ID
  - Response: User data with sectors

- `PUT /api/users/:id`
  - Update user
  - Body: `{ name: string, sectors: number[], agreed_to_terms: boolean }`

### Sectors

- `GET /api/sectors`
  - Get all sectors
  - Response: Array of sectors with hierarchy

## Database Schema

### Users Table
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  agreed_to_terms BOOLEAN NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Sectors Table
```sql
CREATE TABLE sectors (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  value INTEGER NOT NULL,
  parent_value INTEGER,
  level INTEGER NOT NULL
);
```

### User Sectors Table
```sql
CREATE TABLE user_sectors (
  user_id INTEGER REFERENCES users(id),
  sector_id INTEGER REFERENCES sectors(id),
  PRIMARY KEY (user_id, sector_id)
);
```

## Error Handling

The API uses standard HTTP status codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 404: Not Found
- 500: Internal Server Error

Error responses include:
```json
{
  "error": "Error message",
  "details": "Additional error details"
}
```