import express, { Application } from 'express';
import cors from 'cors';
import { config } from './config/environment';
import { initDatabase } from './config/database';
import healthRoutes from './routes/health.routes';
import authRoutes from './routes/auth.routes';
import queryRoutes from './routes/query.routes';
import testRoutes from './routes/test.routes';
import userRoutes from './routes/users.routes';
const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/health', healthRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/query', queryRoutes);
app.use('/api/test', testRoutes);
app.use('/api', userRoutes);
// Root endpoint
app.get('/', (_req, res) => {
  res.json({
    message: 'Portfolio Dashboard API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      auth: '/api/auth',
    },
  });
});

// Initialize database and start server
const PORT = config.port;

const startServer = async () => {
  try {
    await initDatabase();
    
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📊 Environment: ${config.nodeEnv}`);
      console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
      console.log(`🔐 Auth endpoints: http://localhost:${PORT}/api/auth`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

export default app;
