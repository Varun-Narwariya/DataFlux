/**
 * models/postgreSQL/user.model.js
 * Prisma schema representation (for reference — actual schema is in prisma/schema.prisma)
 *
 * This file contains helper functions for user operations
 * Keeps db logic out of controllers
 */

import { db } from '../../db/pgdb.js';
import bcrypt from 'bcryptjs';

export const UserModel = {
  /**
   * Create a new user
   */
  async create({ email, password }) {
    const hashed = await bcrypt.hash(password, 12);
    return db.user.create({
      data: { email, password: hashed },
      select: { id: true, email: true, plan: true, createdAt: true }, // never return password
    });
  },

  /**
   * Find user by email — used in login
   */
  async findByEmail(email) {
    return db.user.findUnique({ where: { email } });
  },

  /**
   * Find user by id — used in auth middleware
   */
  async findById(id) {
    return db.user.findUnique({
      where: { id },
      select: { id: true, email: true, plan: true, quotaUsed: true, quotaLimit: true },
    });
  },

  /**
   * Check if user has quota remaining
   */
  async hasQuota(userId) {
    const user = await db.user.findUnique({
      where: { id: userId },
      select: { quotaUsed: true, quotaLimit: true },
    });
    return user.quotaUsed < user.quotaLimit;
  },

  /**
   * Increment quota after a job is created
   */
  async incrementQuota(userId) {
    return db.user.update({
      where: { id: userId },
      data: { quotaUsed: { increment: 1 } },
    });
  },

  /**
   * Verify password on login
   */
  async verifyPassword(plaintext, hashed) {
    return bcrypt.compare(plaintext, hashed);
  },
};
