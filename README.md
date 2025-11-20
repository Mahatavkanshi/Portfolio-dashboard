# Portfolio Dashboard API

A TypeScript-based REST API built with Express.js following the MVC architecture pattern.

## 🏗️ Project Structure

```
src/
├── config/           # Configuration files
│   └── environment.ts
├── controllers/      # Request handlers (Controller layer)
│   ├── auth.controller.ts
│   └── health.controller.ts
├── middlewares/      # Express middlewares
│   └── auth.middleware.ts
├── models/          # Data models (Model layer)
│   └── user.model.ts
├── routes/          # API routes
│   ├── auth.routes.ts
│   └── health.routes.ts
├── services/        # Business logic (Service layer)
│   ├── auth.service.ts
│   └── user.service.ts
├── types/           # TypeScript type definitions
│   └── index.ts
└── server.ts        # Application entry point
```

## ✅ MVC Structure Verification

This project follows the **MVC (Model-View-Controller)** pattern:

- **Models** (`src/models/`): Handle data structure and database operations
- **Controllers** (`src/controllers/`): Handle HTTP requests and responses
- **Services** (`src/services/`): Contain business logic (acts as the intermediary)
- **Routes** (`src/routes/`): Define API endpoints
- **Middlewares** (`src/middlewares/`): Handle authentication, validation, etc.

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/Mahatavkanshi/Portfolio-dashboard.git
cd Portfolio-dashboard
```

2. Install dependencies
```bash
npm install
```

3. Create environment file
```bash
cp .env.example .env
```

4. Update the `.env` file with your configuration

### Running the Application

#### Development Mode
```bash
npm run dev
```

#### Production Mode
```bash
# Build the project
npm run build

# Start the server
npm start
```

## 📡 API Endpoints

### Health Check

#### GET `/api/health`
Get detailed health status of the application

**Response:**
```json
{
  "success": true,
  "message": "Application is healthy",
  "data": {
    "status": "healthy",
    "timestamp": "2025-11-20T10:30:00.000Z",
    "uptime": 3600,
    "environment": "development",
    "version": "1.0.0",
    "memory": {
      "total": 50,
      "used": 30,
      "free": 20
    }
  }
}
```

#### GET `/api/health/ping`
Simple ping endpoint for basic connectivity check

**Response:**
```json
{
  "success": true,
  "message": "pong",
  "timestamp": "2025-11-20T10:30:00.000Z"
}
```

### Authentication

#### POST `/api/auth/register`
Register a new user

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

#### POST `/api/auth/login`
Login user

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "user_123",
      "email": "user@example.com",
      "name": "John Doe"
    },
    "token": "token_..."
  }
}
```

#### GET `/api/auth/me`
Get current user profile (Protected)

**Headers:**
```
Authorization: Bearer <token>
```

## 🛠️ Technologies Used

- **TypeScript** - Type-safe JavaScript
- **Express.js** - Web framework
- **Node.js** - Runtime environment
- **dotenv** - Environment variable management
- **CORS** - Cross-origin resource sharing

## 📝 Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Start production server
- `npm run watch` - Watch mode for TypeScript compilation

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```
PORT=3000
NODE_ENV=development
JWT_SECRET=your-secret-key-change-this-in-production
DATABASE_URL=mongodb://localhost:27017/portfolio
```

## 📦 Project Features

- ✅ TypeScript for type safety
- ✅ MVC architecture pattern
- ✅ Health check endpoint
- ✅ Authentication system (register, login)
- ✅ JWT middleware
- ✅ RESTful API design
- ✅ Error handling
- ✅ Environment configuration

## 🏆 Best Practices

- Separation of concerns (MVC pattern)
- Type safety with TypeScript
- Environment-based configuration
- Consistent API response format
- Error handling middleware
- Authentication middleware

## 📄 License

ISC

## 👥 Author

Portfolio Dashboard Team