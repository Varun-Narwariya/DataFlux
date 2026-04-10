/**
 * middlewares/error.middleware.js
 * Global error handler — catches anything passed to next(err)
 *
 * Why 4 params? Express identifies error handlers by signature.
 * (req, res, next)      = normal middleware
 * (err, req, res, next) = error handler
 * If you use 3 params, Express ignores it as an error handler.
 */

import { logger } from '../models/MongoDB/logs.model.js';

export function errorHandler(err, req, res, next) {
  // Log to MongoDB
  logger.error('api.error', {
    userId:  req.user?.id,
    message: err.message,
    meta: {
      method: req.method,
      path:   req.path,
      stack:  process.env.NODE_ENV === 'development' ? err.stack : undefined,
    },
  }).catch(() => {}); // never let logging crash your response

  // Known operational errors (you threw them intentionally)
  if (err.isOperational) {
    return res.status(err.status).json({ error: err.message });
  }

  // Prisma errors
  if (err.code === 'P2002') {
    return res.status(409).json({ error: 'Already exists' });
  }
  if (err.code === 'P2025') {
    return res.status(404).json({ error: 'Not found' });
  }

  // Unknown errors — don't leak internals
  console.error('[error]', err);
  res.status(500).json({ error: 'Internal server error' });
}

// ─── Operational Error class ──────────────────────────────────────────────────
// Use this when YOU want to throw a specific HTTP error:
// throw new AppError('File too large', 413)

export class AppError extends Error {
  constructor(message, status = 500) {
    super(message);
    this.status = status;
    this.isOperational = true;
  }
}
