import { Router, Request, Response } from 'express';
import { capitalizeNameMiddleware } from '../middlewares/authmiddleware';

const router = Router();

// Protected route - requires auth header
router.get('/protected', capitalizeNameMiddleware, (req: Request, res: Response) => {
    const name = req.body['name'] || 'User';
  res.json({
    success: true,
    message: `Hello, ${name}! You have accessed a protected route.`,
    data: {
      info: 'This route is protected by the auth middleware'
    }
  });
});

// Public route - no auth required
router.get('/public', (req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'This is a public route - no auth required'
  });
});

export default router;
