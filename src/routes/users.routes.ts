import { Router } from 'express';
import { UserController } from '../controllers/users.controller';
import { checkAuthHeader, capitalizeNameMiddleware } from '../middlewares/authmiddleware';
const router = Router();

// Get all users - protected route
router.get('/users',  UserController.getAllUsers);
export default router;
