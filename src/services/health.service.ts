import { HealthCheckResponse } from '../types';
import { config } from '../config/environment';

export class HealthService {
  /**
   * Get application health status
   */
  public getHealthStatus(): HealthCheckResponse {
    const memoryUsage = process.memoryUsage();

    const healthCheck: HealthCheckResponse = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: config.nodeEnv,
      version: '1.0.0',
      memory: {
        total: Math.round(memoryUsage.heapTotal / 1024 / 1024), // MB
        used: Math.round(memoryUsage.heapUsed / 1024 / 1024), // MB
        free: Math.round((memoryUsage.heapTotal - memoryUsage.heapUsed) / 1024 / 1024), // MB
      },
    };

    return healthCheck;
  }

  /**
   * Check if application is running
   */
  public ping(): { message: string; timestamp: string } {
    return {
      message: 'pong',
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * Get system uptime in seconds
   */
  public getUptime(): number {
    return process.uptime();
  }

  /**
   * Get memory usage statistics
   */
  public getMemoryUsage(): { total: number; used: number; free: number } {
    const memoryUsage = process.memoryUsage();
    
    return {
      total: Math.round(memoryUsage.heapTotal / 1024 / 1024), // MB
      used: Math.round(memoryUsage.heapUsed / 1024 / 1024), // MB
      free: Math.round((memoryUsage.heapTotal - memoryUsage.heapUsed) / 1024 / 1024), // MB
    };
  }
}

export default new HealthService();
