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

}