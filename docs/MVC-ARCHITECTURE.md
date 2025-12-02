# MVC Architecture Documentation

## 📐 Architecture Overview

This application follows the **Model-View-Controller (MVC)** architectural pattern with an additional **Service Layer** for better separation of concerns.

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT/BROWSER                          │
│                     (User Interface Layer)                      │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             │ HTTP Request
                             │
┌────────────────────────────▼────────────────────────────────────┐
│                           SERVER                                │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                     ROUTES LAYER                         │  │
│  │  • auth.routes.ts    • health.routes.ts                  │  │
│  │  • query.routes.ts   • users.routes.ts                   │  │
│  │  (Maps URLs to Controllers)                              │  │
│  └─────────────────────┬────────────────────────────────────┘  │
│                        │                                        │
│  ┌─────────────────────▼──────────────────┬─────────────────┐  │
│  │      VIEW CONTROLLER                   │  API CONTROLLERS│  │
│  │  • views.controller.ts                 │  • auth.ctrl    │  │
│  │  (Renders HTML Pages)                  │  • health.ctrl  │  │
│  │                                         │  • query.ctrl   │  │
│  │  Returns:                               │  • users.ctrl   │  │
│  │  - Login Page                           │                 │  │
│  │  - Register Page                        │  Returns:       │  │
│  │                                         │  - JSON Data    │  │
│  └─────────────┬───────────────────────────┴────┬────────────┘  │
│                │                                 │                │
│                │                                 │                │
│  ┌─────────────▼─────────────────────────────────▼────────────┐  │
│  │                     SERVICE LAYER                          │  │
│  │  • auth.service.ts    • health.service.ts                  │  │
│  │  • query.service.ts   • users.service.ts                   │  │
│  │  (Business Logic & Validation)                             │  │
│  └─────────────────────────┬──────────────────────────────────┘  │
│                            │                                      │
│  ┌─────────────────────────▼──────────────────────────────────┐  │
│  │                     MODEL LAYER                            │  │
│  │  • auth.model.ts     • query.model.ts                      │  │
│  │  (Database Operations & Data Structure)                    │  │
│  └─────────────────────────┬──────────────────────────────────┘  │
│                            │                                      │
└────────────────────────────┼──────────────────────────────────────┘
                             │
                             │ SQL Queries
                             │
┌────────────────────────────▼────────────────────────────────────┐
│                      DATABASE (PostgreSQL)                      │
│                        • login table                            │
│                        • query table                            │
└─────────────────────────────────────────────────────────────────┘
```

## 🔄 Request Flow

### 1. View Rendering Flow (GET Requests)

```
User → Browser → GET /api/auth/login → Route → ViewController → HTML View → Browser
```

**Example: Login Page Request**
1. User navigates to `http://localhost:3000/api/auth/login`
2. `auth.routes.ts` maps GET request to `ViewController.renderLoginPage`
3. `views.controller.ts` returns the HTML content from `login.views.ts`
4. Browser renders the login page

### 2. API Request Flow (POST Requests)

```
User → Form Submit → POST /api/auth/login → Route → Controller → Service → Model → Database
                                                        ↓
User ← JSON Response ← Route ← Controller ← Service ← Model ← Database
```

**Example: Login Authentication**
1. User fills login form and submits
2. Browser sends POST to `/api/auth/login` with credentials
3. `auth.routes.ts` maps POST to `AuthController.login`
4. `auth.controller.ts` validates input
5. `auth.service.ts` implements business logic:
   - Checks if user exists
   - Verifies password
   - Updates last login
6. `auth.model.ts` executes database queries
7. Response flows back through each layer
8. Browser receives JSON response and handles it

## 📁 Layer Responsibilities

### 1️⃣ **Views Layer** (`src/views/`)
**Purpose:** Presentation layer - HTML templates

**Files:**
- `login.views.ts` - Login page HTML
- `register.views.ts` - Registration page HTML

**Responsibilities:**
- HTML structure and styling
- Client-side JavaScript for form handling
- User interface and user experience

**Example:**
```typescript
export const loginPage = `<!DOCTYPE html>...`;
```

### 2️⃣ **Routes Layer** (`src/routes/`)
**Purpose:** URL mapping and request routing

**Files:**
- `auth.routes.ts` - Authentication routes
- `health.routes.ts` - Health check routes
- `query.routes.ts` - Query routes
- `users.routes.ts` - User management routes
- `test.routes.ts` - Test routes

**Responsibilities:**
- Map URLs to controller methods
- Define HTTP methods (GET, POST, PUT, DELETE)
- Apply middleware

**Example:**
```typescript
// View route
router.get('/login', ViewController.renderLoginPage);

// API route
router.post('/login', AuthController.login);
```

### 3️⃣ **Controllers Layer** (`src/controllers/`)
**Purpose:** Request handling and response formatting

**Files:**
- `views.controller.ts` - Renders HTML pages
- `auth.controller.ts` - Authentication endpoints
- `health.controller.ts` - Health checks
- `query.controller.ts` - Query operations
- `users.controller.ts` - User management

**Responsibilities:**
- Receive HTTP requests
- Validate request data
- Call appropriate service methods
- Format and send responses
- Handle errors

**Example:**
```typescript
static async login(req: Request, res: Response): Promise<void> {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      res.status(400).json({ message: 'Invalid input' });
      return;
    }
    
    const result = await AuthService.login({ username, password });
    res.status(200).json(result);
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }
}
```

### 4️⃣ **Services Layer** (`src/services/`)
**Purpose:** Business logic and data coordination

**Files:**
- `auth.service.ts` - Authentication logic
- `health.service.ts` - Health monitoring
- `query.service.ts` - Query processing
- `users.service.ts` - User management logic

**Responsibilities:**
- Implement business rules
- Coordinate between controllers and models
- Data validation and transformation
- Multi-model operations
- Error handling

**Example:**
```typescript
static async login(loginData: LoginInput) {
  // Find user
  const user = await AuthModel.findByUsername(loginData.username);
  if (!user) {
    throw new Error('Invalid credentials');
  }
  
  // Verify password
  const isValid = await AuthModel.verifyPassword(
    loginData.password, 
    user.password
  );
  if (!isValid) {
    throw new Error('Invalid credentials');
  }
  
  // Update last login
  await AuthModel.updateLastLogin(user.id);
  
  return { success: true, user };
}
```

### 5️⃣ **Models Layer** (`src/models/`)
**Purpose:** Data structure and database operations

**Files:**
- `auth.model.ts` - User data and authentication
- `query.model.ts` - Query data operations

**Responsibilities:**
- Define data structures (interfaces)
- Execute database queries
- Data persistence
- Password hashing
- Raw data operations (CRUD)

**Example:**
```typescript
static async findByUsername(username: string): Promise<User | null> {
  const query = 'SELECT * FROM login WHERE username = $1';
  const result = await pool.query(query, [username]);
  return result.rows[0] || null;
}

static async verifyPassword(plain: string, hashed: string): Promise<boolean> {
  return await bcrypt.compare(plain, hashed);
}
```

## 🎯 Key Principles

### 1. Separation of Concerns
Each layer has a single, well-defined responsibility:
- **Views**: What the user sees
- **Controllers**: Handle HTTP communication
- **Services**: Business logic
- **Models**: Data access
- **Routes**: URL mapping

### 2. Dependency Flow
```
Routes → Controllers → Services → Models → Database
```
- Each layer only depends on the layer below it
- No skip-level dependencies (Controller shouldn't call Model directly)

### 3. Single Responsibility
- Each class/file has one reason to change
- `AuthController` only handles HTTP requests/responses
- `AuthService` only handles business logic
- `AuthModel` only handles database operations

### 4. Code Reusability
- Services can be called from multiple controllers
- Models can be used by multiple services
- Views are self-contained and reusable

## 🔐 Authentication Flow Example

```
┌─────────────────────────────────────────────────────────────┐
│                   LOGIN PROCESS FLOW                        │
└─────────────────────────────────────────────────────────────┘

1. USER ACTION
   └─> Fills form: username="john", password="pass123"
   └─> Clicks "Login" button

2. BROWSER (View Layer)
   └─> JavaScript intercepts form submit
   └─> Sends POST to /api/auth/login with JSON body
   
3. ROUTES (auth.routes.ts)
   └─> Matches: POST /api/auth/login
   └─> Calls: AuthController.login()

4. CONTROLLER (auth.controller.ts)
   └─> Validates: username and password exist
   └─> Calls: AuthService.login({ username, password })

5. SERVICE (auth.service.ts)
   └─> Calls: AuthModel.findByUsername(username)
   └─> Calls: AuthModel.verifyPassword(password, hashedPassword)
   └─> Calls: AuthModel.updateLastLogin(userId)
   └─> Returns: { success: true, user: {...} }

6. DATABASE (PostgreSQL)
   └─> Executes: SELECT * FROM login WHERE username = 'john'
   └─> Executes: UPDATE login SET last_login = NOW() WHERE id = 1

7. RESPONSE FLOW
   └─> Model returns user data to Service
   └─> Service returns formatted data to Controller
   └─> Controller sends JSON response to Browser
   └─> Browser JavaScript handles response:
       • Shows success message
       • Stores token (if provided)
       • Redirects to dashboard
```

## 📊 Benefits of This Architecture

### ✅ Maintainability
- Easy to locate and fix bugs
- Changes in one layer don't affect others
- Clear code organization

### ✅ Testability
- Each layer can be tested independently
- Mock dependencies easily
- Unit tests, integration tests possible

### ✅ Scalability
- Easy to add new features
- Can replace database without changing controllers
- Can add new views without touching API

### ✅ Team Collaboration
- Multiple developers can work on different layers
- Clear contracts between layers
- Reduced merge conflicts

### ✅ Reusability
- Services can be used by multiple controllers
- Models can be shared across services
- Views are self-contained

## 🔄 Adding New Features

To add a new feature (e.g., "Forgot Password"):

1. **Create View** (`src/views/forgot-password.views.ts`)
   ```typescript
   export const forgotPasswordPage = `<!DOCTYPE html>...`;
   ```

2. **Add Route** (`src/routes/auth.routes.ts`)
   ```typescript
   router.get('/forgot-password', ViewController.renderForgotPasswordPage);
   router.post('/forgot-password', AuthController.forgotPassword);
   ```

3. **Update Controller** (`src/controllers/auth.controller.ts`)
   ```typescript
   static async forgotPassword(req: Request, res: Response) {
     const result = await AuthService.forgotPassword(req.body.email);
     res.json(result);
   }
   ```

4. **Update Service** (`src/services/auth.service.ts`)
   ```typescript
   static async forgotPassword(email: string) {
     // Business logic
     const user = await AuthModel.findByEmail(email);
     // Send reset email
   }
   ```

5. **Update Model** (if needed) (`src/models/auth.model.ts`)
   ```typescript
   static async createResetToken(userId: number) {
     // Database operation
   }
   ```

## 📝 Summary

This MVC architecture provides:
- ✅ **Clear separation of concerns**
- ✅ **Complete view layer** with HTML pages
- ✅ **Robust API layer** with JSON endpoints
- ✅ **Business logic layer** for validation
- ✅ **Data access layer** for database operations
- ✅ **Easy to maintain and extend**
- ✅ **Follows industry best practices**

The architecture supports both traditional web pages (Views) and modern API endpoints (JSON), making it flexible for various client types.
