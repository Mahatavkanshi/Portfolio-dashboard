import { pool } from '../config/database';
export interface ReceivedInput {
    name: string;
    email: string;
    message: string;
}

export interface Query {
    id: number;
    username: string;
    email: string;
    msg: string;
    created_at: Date;
}


export class QueryModel {
    // Save a new query
    static async saveQuery(queryData: ReceivedInput): Promise<void> {
        const { name, email, message } = queryData;
        const query = `
      INSERT INTO query (username, email, msg)
      VALUES ($1, $2, $3)
    `;
        await pool.query(query, [name, email, message]);
    }

    static async getAllQueries(): Promise<Query[]> {
        const query = 'SELECT * FROM query ORDER BY created_at DESC';
        const result = await pool.query(query);
        return result.rows;
    }
   // Delete a query by id
    static async deleteQuery(id: number): Promise<boolean> {
        // First check if the record exists
        const checkQuery = 'SELECT id FROM query WHERE id = $1';
        const checkResult = await pool.query(checkQuery, [id]);
        console.log('Record exists check:', checkResult.rows);
        
        if (checkResult.rows.length === 0) {
            console.log('No record found with id:', id);
            return false;
        }
        
        const query = 'DELETE FROM query WHERE id = $1';
        const result = await pool.query(query, [id]);
        console.log('Delete query result:', result.rowCount, typeof result.rowCount);
        return result.rowCount !== null && result.rowCount > 0;
    }
    // Update query fields (name, email, message) by id — supports partial updates
    static async updateQueryById(id: number, updates: Partial<ReceivedInput>): Promise<boolean> {
        if (!Number.isInteger(id) || id <= 0) {
            throw new Error('Invalid id');
        }

        const setClauses: string[] = [];
        const values: any[] = [];

        if (updates.name !== undefined) {
            values.push(updates.name);
            setClauses.push(`username = $${values.length}`);
        }
        if (updates.email !== undefined) {
            values.push(updates.email);
            setClauses.push(`email = $${values.length}`);
        }
        if (updates.message !== undefined) {
            values.push(updates.message);
            setClauses.push(`msg = $${values.length}`);
        }

        if (setClauses.length === 0) {
            // Nothing to update
            return false;
        }

        // Add id as last parameter
        values.push(id);
        const query = `UPDATE query SET ${setClauses.join(', ')} WHERE id = $${values.length} RETURNING id`;
        const result = await pool.query(query, values);
        return (result.rowCount ?? 0) > 0;
    }
}