import { Request, Response } from 'express';
import { QueryService } from '../services/query.service';
import { ReceivedInput } from '../models/query.model';
export class QueryController {
    // Submit query endpoint
    static async submitQuery(req: Request, res: Response): Promise<void> {
        try {
            const { name, email, message } = req.body;
            // Validate input
            if (!name || !email || !message) {
                res.status(400).json({
                    success: false,
                    message: 'Name, email, and message are required',
                });
                return;
            }
            const queryData: ReceivedInput = { name, email, message };
            const result = await QueryService.submitQuery(queryData);
            res.status(201).json(result);
        } catch (error: any) {
            res.status(400).json({
                success: false,
                message: error.message || 'Failed to submit query',
            });
        }


    }
    static async getAllQueries(req: Request, res: Response): Promise<void> {
        try {
            const result = await QueryService.getAllQueries();
            res.status(200).json({
                success: true,
                data: result,
            });
        } catch (error: any) {
            res.status(400).json({
                success: false,
                message: error.message || 'Failed to retrieve queries',
            });
        }

    }
      // Delete query by id endpoint
    static async deleteQuery(req: Request, res: Response): Promise<void> {
        try {
            console.log('DELETE request received');
            console.log('req.params:', req.params);
            console.log('req.body:', req.body);
            
            const idParam = req.params.id ?? req.body.id;
            console.log('idParam:', idParam, typeof idParam);
            const id = Number(idParam);
            console.log('id after conversion:', id);

            if (!Number.isInteger(id) || id <= 0) {
                console.log('Invalid ID detected');
                res.status(400).json({
                    success: false,
                    message: 'Invalid query id',
                });
                return;
            }

            console.log('Calling QueryService.deleteQueryById with id:', id);
            const result = await QueryService.deleteQueryById(id);
            console.log('Service result:', result);

            if (result.success) {
                res.status(200).json(result);
            } else {
                res.status(404).json(result);
            }
        } catch (error: any) {
            console.log('Error in deleteQuery controller:', error);
            res.status(400).json({
                success: false,
                message: error.message || 'Failed to delete query',
            });
        }
    }
      // Update query by id (partial updates allowed: name, email, message)
    static async updateQuery(req: Request, res: Response): Promise<void> {
        try {
            const idParam = req.params.id ?? req.body.id;
            const id = Number(idParam);

            if (!Number.isInteger(id) || id <= 0) {
                res.status(400).json({
                    success: false,
                    message: 'Invalid query id',
                });
                return;
            }

            const { name, email, message } = req.body;
            const updates: Partial<ReceivedInput> = {};
            if (name !== undefined) updates.name = name;
            if (email !== undefined) updates.email = email;
            if (message !== undefined) updates.message = message;

            if (
                updates.name === undefined &&
                updates.email === undefined &&
                updates.message === undefined
            ) {
                res.status(400).json({
                    success: false,
                    message: 'At least one of name, email or message must be provided',
                });
                return;
            }

            // Optional: basic email format validation
            if (updates.email !== undefined) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(updates.email)) {
                     res.status(400).json({
                        success: false,
                        message: 'Invalid email format',
                    });
                    return;
                }
            }

            const result = await QueryService.updateQueryById(id, updates);

            if (result.success) {
                res.status(200).json(result);
            } else {
                // service returns meaningful message (not found or no changes)
                const status = result.message && result.message.toLowerCase().includes('not found') ? 404 : 400;
                res.status(status).json(result);
            }
        } catch (error: any) {
            res.status(400).json({
                success: false,
                   message: error.message || 'Failed to update query',
            });
        }
    }
}