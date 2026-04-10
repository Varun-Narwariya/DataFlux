/**
 * models/postgreSQL/jobs.model.js
 * Job lifecycle management
 * Every tool operation is a "job" with a trackable status
 */

import { db } from '../../db/pgdb.js';

export const JobModel = {
  /**
   * Create a new job record before enqueuing
   * Always create DB record FIRST — worker might pick it up before you respond
   */
  async create({ id, userId, type, inputKeys, outputKey, meta = {} }) {
    return db.job.create({
      data: {
        id,
        userId,
        type,
        status:    'QUEUED',
        inputKeys,
        outputKey,
        meta,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24hr auto-delete
      },
    });
  },

  async findById(id) {
    return db.job.findUnique({ where: { id } });
  },

  async findByUser(userId, limit = 20) {
    return db.job.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
  },

 async markProcessing(id) {
  return db.job.update({
    where: { id },
    data: { status: 'PROCESSING' }   // ✅ FIX
  });
},

async markCompleted(id, outputKey) {
  return db.job.update({
    where: { id },
    data: { status: 'COMPLETED', outputKey }  // ✅ FIX
  });
},

async markFailed(id, error) {
  return db.job.update({
    where: { id },
    data: { status: 'FAILED', error }  // ✅ FIX
  });
},
};
