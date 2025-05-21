# Full Stack Application

This is a full-stack application with a Fastify backend, PostgreSQL database, and React frontend. More detailed information in backend and frontend README.md's.

## Prerequisites

- Node.js (v14 or higher)
- Docker and Docker Compose
- npm or yarn

## Setup

### Database

1. Start the PostgreSQL database:
```bash
docker-compose up -d
```

### Backend

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The backend will run on http://localhost:3001

### Frontend

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on http://localhost:5173

## Features

- Fastify backend with PostgreSQL database
- React frontend with Material-UI
- Docker containerized PostgreSQL database
- API endpoints for data management
- Modern UI with responsive design