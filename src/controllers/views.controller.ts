import { Request, Response } from 'express';
import { loginPage } from '../views/login.views';
import { registerPage } from '../views/register.views';
import {  DashboardPage } from '../views/dashboard.views'; 

/**
 * ViewController - Handles rendering of HTML views
 * Following MVC architecture pattern
 */
export class ViewController {
  /**
   * Render login page
   * @route GET /api/auth/login
   */
  static renderLoginPage(_req: Request, res: Response): void {
    res.send(loginPage);
  }

  /**
   * Render register page
   * @route GET /api/auth/register
   */
  static renderRegisterPage(_req: Request, res: Response): void {
    res.send(registerPage);
  }
  /**
   * Render dashboard page
   * @route GET /dashboard
   */
  static renderDashboardPage(req: Request, res: Response): void {
    // Check if user is authenticated
    
    res.send(DashboardPage);
  }



  /**
   * Render home/landing page
   * @route GET /
   */
  static renderHomePage(_req: Request, res: Response): void {
    res.json({
      message: 'Portfolio Dashboard API',
      version: '1.0.0',
      endpoints: {
        health: '/api/health',
        auth: '/api/auth',
        login: '/api/login',
        register: '/api/register',
        dashboard: '/dashboard',
      },
    });
  }
}
