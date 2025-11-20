import { Request, Response } from 'express';
import { HealthCheckResponse, ApiResponse } from '../types';
import healthService from '../services/health.service';

export class HealthController {
  /**
   * GET /api/health
   * Returns the health status of the application
   */
  public async getHealth(_req: Request, res: Response): Promise<Response> {
    try {
      const healthCheck: HealthCheckResponse = healthService.getHealthStatus();

      const response: ApiResponse<HealthCheckResponse> = {
        success: true,
        message: 'Application is healthy',
        data: healthCheck,
      };

      return res.status(200).json(response);
    } catch (error) {
      const response: ApiResponse = {
        success: false,
        message: 'Health check failed',
        error: error instanceof Error ? error.message : 'Unknown error',
      };

      return res.status(500).json(response);
    }
  }

  /**
   * GET /api/health/ping
   * Simple ping endpoint
   */
  public async ping(_req: Request, res: Response): Promise<Response> {
    const pingResponse = healthService.ping();
    
    return res.status(200).json({
      success: true,
      ...pingResponse,
    });
  }
}

export default new HealthController();
