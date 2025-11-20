import express, { Application } from 'express';
import cors from 'cors';
import { config } from './config/environment';
import healthRoutes from './routes/health.routes';

const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/health', healthRoutes);

// Root endpoint
app.get('/', (_req, res) => {
  res.json({
    message: 'Portfolio Dashboard API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
    },
  });
});

// Start server
const PORT = config.port;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Environment: ${config.nodeEnv}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
});

export default app;
