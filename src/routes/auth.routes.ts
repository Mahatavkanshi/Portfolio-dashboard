import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { ViewController } from '../controllers/views.controller';

const router = Router();

/**
 * Authentication Routes - Following MVC Architecture
 * 
 * View Routes (GET) - Render HTML pages
 * API Routes (POST) - Handle authentication logic
 */

// ============ VIEW ROUTES ============
// Render login page
router.get('/login', ViewController.renderLoginPage);

// Render register page
router.get('/register', ViewController.renderRegisterPage);

// ============ API ROUTES ============
// Register new user
router.post('/register', AuthController.register);

// Login user
router.post('/login', AuthController.login);

export default router;
