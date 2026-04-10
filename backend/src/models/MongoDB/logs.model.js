/**
 * models/MongoDB/logs.model.js
 * Request and error logs — flexible, high-write, no joins needed
 * Perfect use case for MongoDB
 */

import { mongoose } from '../../db/mongodb.js';

const logSchema = new mongoose.Schema(
  {
    level:   { type: String, enum: ['info', 'warn', 'error'], default: 'info' },
    event:   { type: String, required: true }, // 'job.created' | 'job.failed' | 'auth.login'
    userId:  { type: String, index: true },
    jobId:   { type: String, index: true },
    message: { type: String },
    meta:    { type: mongoose.Schema.Types.Mixed }, // anything extra
    expiresAt: { type: Date, default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) }, // 7 days
  },
  { timestamps: true }
);

logSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
logSchema.index({ event: 1, createdAt: -1 });

export const Log = mongoose.model('Log', logSchema);

// ─── Logger helper ────────────────────────────────────────────────────────────
export const logger = {
  info:  (event, meta = {}) => Log.create({ level: 'info',  event, ...meta }),
  warn:  (event, meta = {}) => Log.create({ level: 'warn',  event, ...meta }),
  error: (event, meta = {}) => Log.create({ level: 'error', event, ...meta }),
};
