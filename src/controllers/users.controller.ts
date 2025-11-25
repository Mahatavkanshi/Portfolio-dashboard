import { Request, Response } from 'express';
import { UsersService} from '../services/users.service';

export class UserController {
    // Get all users endpoint
    static async getAllUsers(req: Request, res: Response): Promise<void> {
        try {
            const result = await UsersService.getAllUsers();
            res.status(200).json(result);
        } catch (error: any) {
            res.status(400).json({
                success: false,
                message: error.message || 'Failed to retrieve users',
            });
        }
    }
}
