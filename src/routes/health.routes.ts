import { Router } from 'express';
import healthController from '../controllers/health.controller';

const router: Router = Router();

/**
 * @route   GET /api/health
 * @desc    Get application health status
 * @access  Public
 */
router.get('/', healthController.getHealth.bind(healthController));

/**
 * @route   GET /api/health/ping
 * @desc    Simple ping endpoint
 * @access  Public
 */
router.get('/ping', healthController.ping.bind(healthController));

export default router;
