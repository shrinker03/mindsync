import { Request, Response, NextFunction } from 'express';
import { config } from '../config.js';
import { HttpError } from './error.js';

export function requireBearer(req: Request, _res: Response, next: NextFunction): void {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) {
    throw new HttpError(401, 'Missing or invalid Authorization header');
  }
  if (auth.slice(7) !== config.syncBearerToken) {
    throw new HttpError(401, 'Invalid bearer token');
  }
  next();
}
