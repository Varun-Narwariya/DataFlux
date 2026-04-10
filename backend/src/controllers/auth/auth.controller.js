/**
 * controllers/auth/auth.controller.js
 * Register and login
 * Controller = handles HTTP req/res, calls model for data logic
 */

import jwt           from 'jsonwebtoken';
import { UserModel } from '../../models/postgreSQL/user.model.js';
import { AppError }  from '../../middlewares/error.middleware.js';
import { logger }    from '../../models/MongoDB/logs.model.js';

function signToken(userId) {
  return jwt.sign(
    { sub: userId },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
}

export const AuthController = {
  async register(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email || !password)
        throw new AppError('Email and password required', 400);
      if (password.length < 8)
        throw new AppError('Password must be at least 8 characters', 400);

      const user  = await UserModel.create({ email, password });
      const token = signToken(user.id);

      await logger.info('auth.register', { userId: user.id }).catch(() => {});

      res.status(201).json({ token, user });
    } catch (err) {
      // Prisma unique constraint = email taken
      if (err.code === 'P2002') return next(new AppError('Email already registered', 409));
      next(err);
    }
  },

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || !password) throw new AppError('Email and password required', 400);

      const user = await UserModel.findByEmail(email);
      if (!user) throw new AppError('Invalid credentials', 401);

      const valid = await UserModel.verifyPassword(password, user.password);
      if (!valid) throw new AppError('Invalid credentials', 401);

      const token = signToken(user.id);
      await logger.info('auth.login', { userId: user.id }).catch(() => {});
      // Never send password back
      const { password: _, ...safeUser } = user;
      res.json({ token, user: safeUser });
    } catch (err) { next(err); }
  },

  async me(req, res) {
    // req.user is attached by authenticate middleware
    res.json({ user: req.user });
  },
};
