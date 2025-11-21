import { QueryModel, ReceivedInput } from '../models/query.model';
import { AuthService } from './auth.service';
export class QueryService {
    // Submit a new query
    static async submitQuery(queryData: ReceivedInput) {
        try {
            await QueryModel.saveQuery(queryData);
            return {
                success: true,
                message: 'Query submitted successfully',
            };
        }
        catch (error: any) {
            throw new Error(error.message || 'Failed to submit query');
        }
    }
    static async getAllQueries() {
        try {
            const queries = await QueryModel.getAllQueries();
            return {

                success: true,
                data: queries,
            };
        } catch (error: any) {
            throw new Error(error.message || 'Failed to retrieve queries');
        }
    }
}

