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
     // Delete a query by id
    static async deleteQueryById(id: number) {
        try {
            console.log('Service: deleteQueryById called with id:', id);
            if (!Number.isInteger(id) || id <= 0) {
                throw new Error('Invalid query id');
            }

            console.log('Service: Calling QueryModel.deleteQuery');
            const deleted = await QueryModel.deleteQuery(id);
            console.log('Service: deleteQuery returned:', deleted);
            
            if (!deleted) {
                return {
                    success: false,
                    message: 'Query not found',
                };
            }

            return {
                success: true,
                message: 'Query deleted successfully',
            };
        } catch (error: any) {
            console.log('Service: Error in deleteQueryById:', error);
            throw new Error(error.message || 'Failed to delete query');
        }
    }
    
    // Update query by id (supports partial updates: name, email, message)
    static async updateQueryById(id: number, updates: Partial<ReceivedInput>) {
        try {
            if (!Number.isInteger(id) || id <= 0) {
                throw new Error('Invalid query id');
            }

            // Ensure at least one updatable field is provided
            const hasValidField =
                updates.name !== undefined ||
                updates.email !== undefined ||
                updates.message !== undefined;

            if (!hasValidField) {
                return {
                    success: false,
                    message: 'No fields provided to update',
                };
            }

            // Optional: simple email format validation
            if (updates.email !== undefined) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(updates.email)) {
                    return {
                        success: false,
                        message: 'Invalid email format',
                    };
                }
            }

            const updated = await QueryModel.updateQueryById(id, updates);

            if (!updated) {
                return {
                           success: false,
                    message: 'Query not found or nothing changed',
                };
            }

            return {
                success: true,
                message: 'Query updated successfully',
            };
        } catch (error: any) {
            console.log('Service: Error in updateQueryById:', error);
            throw new Error(error.message || 'Failed to update query');
        }
    }
}

