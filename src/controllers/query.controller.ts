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
}