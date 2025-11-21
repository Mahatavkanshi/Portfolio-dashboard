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
