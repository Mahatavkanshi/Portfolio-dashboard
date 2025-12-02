import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';

/**
 * AuthController - Handles authentication-related requests
 * Following MVC architecture pattern
 * 
 * Responsibilities:
 * - Validate incoming requests
 * - Call appropriate service methods
 * - Return formatted responses
 */
export class AuthController {
  /**
   * Register a new user
   * @route POST /api/auth/register
   * @param req - Express request object with username, email, and password in body
   * @param res - Express response object
   */
  static async register(req: Request, res: Response): Promise<void> {
    try {
      const { username, email, password } = req.body;

      // Validate input
      if (!username || !email || !password) {
        res.status(400).json({
          success: false,
          message: 'Username, email, and password are required',
        });
        return;
      }

      const result = await AuthService.register({ username, email, password });
      res.status(201).json(result);
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message || 'Registration failed',
      });
    }
  }

  /**
   * Login an existing user
   * @route POST /api/auth/login
   * @param req - Express request object with username and password in body
   * @param res - Express response object
   */
  static async login(req: Request, res: Response): Promise<void> {
    try {
      const { username, password } = req.body;

      // Validate input
      if (!username || !password) {
        res.status(400).json({
          success: false,
          message: 'Username and password are required',
        });
        return;
      }

      const result = await AuthService.login({ username, password });
      res.status(200).json(result);
    } catch (error: any) {
      res.status(401).json({
        success: false,
        message: error.message || 'Login failed',
      });
    }
  }
  
}