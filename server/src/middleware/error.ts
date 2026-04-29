import { Request, Response, NextFunction } from 'express';
import { log } from '../log.js';

export class HttpError extends Error {
  constructor(public readonly status: number, message: string) {
    super(message);
    this.name = 'HttpError';
  }
}

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  if (err instanceof HttpError) {
    res.status(err.status).json({ error: err.message });
    return;
  }
  log.error(err instanceof Error ? err : new Error(String(err)));
  res.status(500).json({ error: 'Internal server error' });
}
