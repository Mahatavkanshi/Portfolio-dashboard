import { AuthModel  } from '../models/auth.model';
import { QueryModel, ReceivedInput } from '../models/query.model';

export class UsersService {
    static async getAllUsers() {
        try {
            const users = await AuthModel.allUsers();
            const querys= await QueryModel.getAllQueries();
            return {
                success: true,
                users: users,
                querys: querys
            };
        }
        catch (error: any) {
            throw new Error(error.message || 'Failed to retrieve users');
        }
    }

    
}

