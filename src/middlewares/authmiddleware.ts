import { Request, Response, NextFunction } from 'express';

export const checkAuthHeader = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['auth'];

  if (authHeader === 'xyz') {
    next();
  } else {
    res.status(401).json({
      success: false,
      message: 'Unauthorized: Invalid or missing auth header'
    });
  }
};
export const capitalizeNameMiddleware = (req: Request, _res: Response, next: NextFunction) => {
  const rawName =
    (req.body && (req.body as any).name) ??
    (req.query && (req.query as any).name) ??
    (req.params && (req.params as any).name) ??
    req.headers['name'];

  if (!rawName) {
    return next();
  }

  const nameStr = String(rawName).trim();
  if (nameStr.length === 0) {
    return next();
  }

  const capitalized = nameStr.charAt(0).toUpperCase() + nameStr.slice(1).toLowerCase();

  // ensure req.body exists and set the capitalized name so controller receives it
  if (!req.body) {
    (req as any).body = {};
  }
  (req as any).body.name = capitalized;

  next();
};

