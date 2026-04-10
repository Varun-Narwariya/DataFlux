/**
 * services/queue/index.js
 * BullMQ job queue — runs on Redis
 * No AWS dependency — runs anywhere Redis runs
 */

import { Queue, QueueEvents } from 'bullmq';
import IORedis from 'ioredis';

export const redis = new IORedis(process.env.REDIS_URL || 'redis://localhost:6379', {
  maxRetriesPerRequest: null, // required by BullMQ
});

// ─── Job Types ─────────────────────────────────────────────────────────────────
export const JOB = {
  // Light — Lambda handles these
  IMAGE_TO_PDF:  'image:to-pdf',
  PDF_MERGE:     'pdf:merge',
  PDF_SPLIT:     'pdf:split',
  PDF_WATERMARK: 'pdf:watermark',
  EXIF_READ:     'exif:read',
  EXIF_STRIP:    'exif:strip',

  // Heavy — Fargate worker handles these
  PDF_COMPRESS:  'pdf:compress',
  PDF_TO_WORD:   'pdf:to-word',
  PDF_TO_IMAGE:  'pdf:to-image',
  PDF_OCR:       'pdf:ocr',

  // AI — Fargate worker + LiteLLM
  AI_SUMMARISE:  'ai:summarise',
  AI_EXPLAIN:    'ai:explain',
  AI_VISUAL:     'ai:visual',
};

const defaultOpts = {
  attempts: 3,
  backoff: { type: 'exponential', delay: 2000 },
  removeOnComplete: { count: 100 },
  removeOnFail:     { count: 500 },
};

// ─── Queues ────────────────────────────────────────────────────────────────────
export const queues = {
  heavy: new Queue('heavy-jobs', { connection: redis, defaultJobOptions: defaultOpts }),
  ai:    new Queue('ai-jobs',    { connection: redis, defaultJobOptions: defaultOpts }),
};

// ─── Queue Events — for SSE real-time updates ─────────────────────────────────
export const queueEvents = {
  heavy: new QueueEvents('heavy-jobs', { connection: redis }),
  ai:    new QueueEvents('ai-jobs',    { connection: redis }),
};

// ─── Enqueue helpers ───────────────────────────────────────────────────────────
export const enqueue = {
  heavy(type, payload) {
    const priority = payload.plan === 'pro' ? 1 : 2;
    return queues.heavy.add(type, payload, { priority });
  },
  ai(type, payload) {
    return queues.ai.add(type, payload, { priority: 3 });
  },
};
