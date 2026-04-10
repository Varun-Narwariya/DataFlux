/**
 * middlewares/auth.middleware.js
 * Verifies JWT, attaches req.user
 *
 * Why middleware and not inside each route?
 * Because you'd repeat the same 15 lines in every protected route.
 * Middleware runs once, protects everything below it.
 */

import jwt         from 'jsonwebtoken';
import { UserModel } from '../models/postgreSQL/user.model.js';

export async function authenticate(req, res, next) {
  try {
    // Token comes in Authorization header: "Bearer <token>"
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user to request — available in all downstream middleware and routes
    const user = await UserModel.findById(payload.sub);
    if (!user) return res.status(401).json({ error: 'User not found' });

    req.user = user;
    next();

  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired' });
    }
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid token' });
    }
    next(err);
  }
}

/**
 * Optional auth — attaches user if token exists, doesn't block if not
 * Useful for routes that work for both guests and logged-in users
 */
export async function optionalAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) return next();

  try {
    const token   = authHeader.split(' ')[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user      = await UserModel.findById(payload.sub);
  } catch {
    // silently fail — user just won't be attached
  }
  next();
}
