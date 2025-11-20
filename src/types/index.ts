import { Request } from 'express';

// User interface
export interface IUser {
  id: string;
  email: string;
  password: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

// Auth request with user attached
export interface AuthRequest extends Request {
  user?: IUser;
}

// Health check response
export interface HealthCheckResponse {
  status: 'healthy' | 'unhealthy';
  timestamp: string;
  uptime: number;
  environment: string;
  version: string;
  database?: {
    connected: boolean;
    responseTime?: number;
  };
  memory: {
    total: number;
    used: number;
    free: number;
  };
}

// API Response wrapper
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}
