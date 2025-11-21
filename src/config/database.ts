import { Pool } from 'pg';
import { config } from './environment';

export const pool = new Pool({
  host: config.database.host,
  user: config.database.user,
  password: config.database.password,
  database: config.database.database,
  port: config.database.port,
});

// Test connection
pool.on('connect', () => {
  console.log('✅ Connected to PostgreSQL database');
});

pool.on('error', (err) => {
  console.error('❌ PostgreSQL connection error:', err);
});

// Initialize database tables
export const initDatabase = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS login (
        id SERIAL PRIMARY KEY,
        username VARCHAR(100) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        last_login TIMESTAMP
      );
    `);
    console.log('✅ Database tables initialized');
  } catch (error) {
    console.error('❌ Error initializing database:', error);
    throw error;
  }
};
