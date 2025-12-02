# Portfolio Dashboard API

A TypeScript-based REST API built with Express.js following the MVC architecture pattern.

## 🏗️ Project Structure

```
src/
├── config/           # Configuration files
│   ├── database.ts
│   └── environment.ts
├── controllers/      # Request handlers (Controller layer)
│   ├── auth.controller.ts
│   ├── health.controller.ts
│   ├── query.controller.ts
│   ├── users.controller.ts
│   └── views.controller.ts
├── middlewares/      # Express middlewares
│   └── authmiddleware.ts
├── models/          # Data models (Model layer)
│   ├── auth.model.ts
│   └── query.model.ts
├── routes/          # API routes (Route layer)
│   ├── auth.routes.ts
│   ├── health.routes.ts
│   ├── query.routes.ts
│   ├── test.routes.ts
│   └── users.routes.ts
├── services/        # Business logic (Service layer)
│   ├── auth.service.ts
│   ├── health.service.ts
│   ├── query.service.ts
│   └── users.service.ts
├── types/           # TypeScript type definitions
│   └── index.ts
├── views/           # HTML views (View layer)
│   ├── login.views.ts
│   └── register.views.ts
└── server.ts        # Application entry point
```

## ✅ MVC Structure Verification

This project follows the **MVC (Model-View-Controller)** pattern:

- **Models** (`src/models/`): Handle data structure and database operations
  - `auth.model.ts` - User data persistence, password hashing, database queries
  - `query.model.ts` - Query-related data operations

- **Views** (`src/views/`): Handle presentation layer (HTML pages)
  - `login.views.ts` - Login page UI
  - `register.views.ts` - Registration page UI

- **Controllers** (`src/controllers/`): Handle HTTP requests and responses
  - `auth.controller.ts` - Authentication API endpoints (POST)
  - `views.controller.ts` - Page rendering (GET)
  - `health.controller.ts` - Health check endpoints
  - `query.controller.ts` - Query management
  - `users.controller.ts` - User management

- **Services** (`src/services/`): Contain business logic (acts as the intermediary)
  - `auth.service.ts` - Authentication business logic
  - `health.service.ts` - Health monitoring logic
  - `query.service.ts` - Query processing logic
  - `users.service.ts` - User management logic

- **Routes** (`src/routes/`): Define API endpoints and map to controllers
  - `auth.routes.ts` - Authentication routes (both view and API)
  - `health.routes.ts` - Health check routes
  - `query.routes.ts` - Query routes
  - `users.routes.ts` - User routes
  - `test.routes.ts` - Test routes

- **Middlewares** (`src/middlewares/`): Handle authentication, validation, etc.
  - `authmiddleware.ts` - JWT authentication middleware

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

#### 🎨 View Routes (HTML Pages)

##### GET `/api/auth/login`
Render the login page

**Access:** Public  
**Returns:** HTML login page with form

##### GET `/api/auth/register`
Render the registration page

**Access:** Public  
**Returns:** HTML registration page with form

#### 🔌 API Routes (JSON Endpoints)

##### POST `/api/auth/register`
Register a new user

**Request Body:**
```json
{
  "username": "johndoe",
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "username": "johndoe",
    "email": "user@example.com",
    "created_at": "2025-11-25T10:30:00.000Z"
  }
}
```

**Response (Error):**
```json
{
  "success": false,
  "message": "Username already exists"
}
```

##### POST `/api/auth/login`
Login user

**Request Body:**
```json
{
  "username": "johndoe",
  "password": "password123"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": 1,
    "username": "johndoe",
    "email": "user@example.com",
    "last_login": "2025-11-25T10:30:00.000Z"
  }
}
```

**Response (Error):**
```json
{
  "success": false,
  "message": "Invalid username or password"
}
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
- ✅ **Complete MVC architecture pattern** with Views layer
- ✅ **Beautiful Login & Registration Pages** with modern UI
- ✅ Health check endpoints
- ✅ **Full authentication system** (register, login with UI)
- ✅ Password hashing with bcrypt
- ✅ PostgreSQL database integration
- ✅ RESTful API design
- ✅ Error handling and validation
- ✅ Environment-based configuration
- ✅ Responsive HTML views with CSS styling
- ✅ Client-side form validation
- ✅ Loading states and user feedback

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