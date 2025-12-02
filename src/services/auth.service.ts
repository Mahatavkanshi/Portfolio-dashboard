import { AuthModel, CreateUserInput, LoginInput } from '../models/auth.model';

/**
 * AuthService - Business logic layer for authentication
 * Following MVC architecture pattern
 * 
 * Responsibilities:
 * - Implement business logic
 * - Coordinate between controllers and models
 * - Handle data validation and processing
 */
export class AuthService {
  /**
   * Register a new user
   * @param userData - User registration data (username, email, password)
   * @returns Success response with user data
   * @throws Error if username or email already exists
   */
  static async register(userData: CreateUserInput) {
    try {
      // Check if username already exists
      const existingUser = await AuthModel.findByUsername(userData.username);
      if (existingUser) {
        throw new Error('Username already exists');
      }

      // Check if email already exists
      const existingEmail = await AuthModel.findByEmail(userData.email);
      if (existingEmail) {
        throw new Error('Email already exists');
      }

      // Create user
      const user = await AuthModel.createUser(userData);
      
      return {
        success: true,
        message: 'User registered successfully',
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          created_at: user.created_at,
        },
      };
    } catch (error: any) {
      throw new Error(error.message || 'Registration failed');
    }
  }

  /**
   * Authenticate user login
   * @param loginData - User login credentials (username, password)
   * @returns Success response with user data
   * @throws Error if credentials are invalid
   */
  static async login(loginData: LoginInput) {
    try {
      const { username, password } = loginData;

      // Find user by username
      const user = await AuthModel.findByUsername(username);
      if (!user) {
        throw new Error('Invalid username or password');
      }

      // Verify password
      const isPasswordValid = await AuthModel.verifyPassword(password, user.password);
      if (!isPasswordValid) {
        throw new Error('Invalid username or password');
      }

      // Update last login
      await AuthModel.updateLastLogin(user.id);

      return {
        success: true,
        message: 'Login successful',
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          last_login: new Date(),
        },
      };
    } catch (error: any) {
      throw new Error(error.message || 'Login failed');
    }
  }
}
