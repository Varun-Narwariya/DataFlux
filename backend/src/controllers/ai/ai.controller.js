/**
 * controllers/ai/ai.controller.js
 * AI summarise / explain / visual explain
 */

import { enqueue, JOB, queueEvents } from '../../services/queue/index.js';
import { JobModel }   from '../../models/postgreSQL/jobs.model.js';
import { StorageService } from '../../services/storage/index.js';
import { AppError }   from '../../middlewares/error.middleware.js';

export const AiController = {
  async summarise(req, res, next) {
    try {
      const { jobId, inputKey, language = 'en', length = 'medium' } = req.body;
      if (!inputKey) throw new AppError('inputKey required', 400);

      const outputKey = StorageService.jobKey(jobId, 'summary.json');

      await JobModel.create({ id: jobId, userId: req.user.id, type: 'ai-summarise', inputKeys: [inputKey], outputKey, meta: { language, length } });
      await enqueue.ai(JOB.AI_SUMMARISE, { jobId, userId: req.user.id, plan: req.user.plan, inputKey, outputKey, language, length });

      res.status(202).json({ jobId, status: 'queued', estimatedSeconds: 20 });
    } catch (err) { next(err); }
  },

  async explain(req, res, next) {
    try {
      const { jobId, inputKey, audience = 'general', language = 'en' } = req.body;
      if (!inputKey) throw new AppError('inputKey required', 400);

      const outputKey = StorageService.jobKey(jobId, 'explanation.json');

      await JobModel.create({ id: jobId, userId: req.user.id, type: 'ai-explain', inputKeys: [inputKey], outputKey, meta: { audience, language } });
      await enqueue.ai(JOB.AI_EXPLAIN, { jobId, userId: req.user.id, plan: req.user.plan, inputKey, outputKey, audience, language });

      res.status(202).json({ jobId, status: 'queued', estimatedSeconds: 30 });
    } catch (err) { next(err); }
  },

  /**
   * SSE — stream real-time progress to client
   * Client connects once, gets events as job progresses
   */
  async streamProgress(req, res) {
    const { jobId } = req.params;

    // SSE headers
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();

    const send = (data) => res.write(`data: ${JSON.stringify(data)}\n\n`);

    // Listen on BullMQ queue events
    const onProgress  = ({ jobId: id, data }) => id === jobId && send({ type: 'progress', ...data });
    const onCompleted = ({ jobId: id, returnvalue }) => { if (id === jobId) { send({ type: 'completed', result: returnvalue }); res.end(); } };
    const onFailed    = ({ jobId: id, failedReason }) => { if (id === jobId) { send({ type: 'failed', error: failedReason }); res.end(); } };

    queueEvents.ai.on('progress',  onProgress);
    queueEvents.ai.on('completed', onCompleted);
    queueEvents.ai.on('failed',    onFailed);

    // Cleanup when client disconnects
    req.on('close', () => {
      queueEvents.ai.off('progress',  onProgress);
      queueEvents.ai.off('completed', onCompleted);
      queueEvents.ai.off('failed',    onFailed);
    });
  },
};
