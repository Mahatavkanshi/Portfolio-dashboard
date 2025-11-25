import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';

export class AuthController {
  // Register endpoint
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

  // Login endpoint
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