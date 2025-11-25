import { pool } from '../config/database';
import bcrypt from 'bcrypt';

export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  created_at: Date;
  last_login: Date | null;
}

export interface CreateUserInput {
  username: string;
  email: string;
  password: string;
}

export interface LoginInput {
  username: string;
  password: string;
}

export class AuthModel {
  // Create a new user
  static async createUser(userData: CreateUserInput): Promise<User> {
    const { username, email, password } = userData;
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const query = `
      INSERT INTO login (username, email, password)
      VALUES ($1, $2, $3)
      RETURNING id, username, email, created_at, last_login
    `;
    
    const result = await pool.query(query, [username, email, hashedPassword]);
    return result.rows[0];
  }

   static async allUsers(): Promise<User[]> {
    const query = 'SELECT id, username, email, created_at, last_login FROM login';
    const result = await pool.query(query);
    return result.rows;   
    
  }

  // Find user by username
  static async findByUsername(username: string): Promise<User | null> {
    const query = 'SELECT * FROM login WHERE username = $1';
    const result = await pool.query(query, [username]);
    return result.rows[0] || null;
  }

  // Find user by email
  static async findByEmail(email: string): Promise<User | null> {
    const query = 'SELECT * FROM login WHERE email = $1';
    const result = await pool.query(query, [email]);
    return result.rows[0] || null;
  }

  // Update last login timestamp
  static async updateLastLogin(userId: number): Promise<void> {
    const query = 'UPDATE login SET last_login = CURRENT_TIMESTAMP WHERE id = $1';
    await pool.query(query, [userId]);
  }

  // Verify password
  static async verifyPassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
}
