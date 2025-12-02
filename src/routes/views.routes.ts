import { Router } from 'express';
import { ViewController } from '../controllers/views.controller';

const router = Router();

/**
 * View Routes - Render HTML pages
 * Following MVC architecture pattern
 */

// Render login page
router.get('/', ViewController.renderLoginPage);
router.get('/login', ViewController.renderLoginPage);

// Render register page
router.get('/register', ViewController.renderRegisterPage);
router.get('/dashboard', ViewController.renderDashboardPage);

export default { routes: router };
