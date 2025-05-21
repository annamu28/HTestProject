# Frontend Application

A React-based frontend application for managing user information and sector selections.

## Features

- User information management (create, read, update)
- Hierarchical sector selection with up to 4 levels
- Form validation
- Responsive design
- Real-time feedback
- Error handling

## Project Structure

```
frontend/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── UserForm.jsx    # Form component for user data
│   │   └── SectorSelector.jsx  # Sector selection component
│   ├── hooks/              # Custom React hooks
│   │   └── useUserForm.js  # Form logic and state management
│   ├── services/           # API and other services
│   │   └── apiService.js   # API service for backend communication
│   ├── pages/              # Page components
|   |   ├── App.jsx         # Main application component
|   |   └── App.css         # App-specific styles
│   ├── assets/             # Static assets
│   ├── main.jsx           # Application entry point
│   ├── index.css          # Global styles
```

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Backend server running (default: http://localhost:3001)

## Environment Setup

Create a `.env` file in the frontend directory with the following variables:

```env
VITE_API_URL=http://localhost:3001/api
```

Note: All environment variables must be prefixed with `VITE_` to be accessible in the frontend code.

## Installation

1. Clone the repository
2. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
3. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

## Development

To start the development server:

```bash
npm run dev
# or
yarn dev
```

The application will be available at http://localhost:5173

## Building for Production

To create a production build:

```bash
npm run build
# or
yarn build
```

## Key Components

### UserForm
- Handles user information input
- Manages form validation
- Displays success/error messages
- Integrates with sector selection

### SectorSelector
- Manages hierarchical sector selection
- Supports up to 4 levels of sectors
- Shows current selection
- Validates sector selection

### useUserForm Hook
- Manages form state
- Handles form submission
- Manages validation
- Handles API communication

### apiService
- Manages all API calls
- Handles error responses
- Provides consistent API interface
- Uses environment variables for configuration

## API Integration

The frontend communicates with the backend API endpoints:

- `GET /api/sectors` - Fetch all sectors
- `POST /api/users` - Create new user
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user

## Styling

The application uses:
- Material-UI for component styling
- Custom CSS for layout and specific styling needs
- Responsive design principles

## Error Handling

- Form validation errors
- API communication errors
- Network errors
- User feedback for all error states

