// routes/ai.routes.js
//import { Router } from 'express';
import { AiController } from '../controllers/ai/ai.controller.js';

export const aiRouter = Router();
aiRouter.post('/summarise',AiController.summarise);
aiRouter.post('/explain',AiController.explain);
aiRouter.get('/jobs/:jobId/stream',AiController.streamProgress);


// routes/job.routes.js
import { Router }   from 'express';
import { JobModel } from '../models/postgreSQL/jobs.model.js';
import { StorageService } from '../services/storage/index.js';
import { AppError } from '../middlewares/error.middleware.js';

export const jobRouter = Router();

// Get job status — client polls this after submitting a job
jobRouter.get('/:id', async (req, res, next) => {
  try {
    const job = await JobModel.findById(req.params.id);
    if (!job) throw new AppError('Job not found', 404);
    if (job.userId !== req.user.id) throw new AppError('Forbidden', 403);
    res.json({ job });
  } catch (err) { next(err); }
});

// Get download URL once job is completed
jobRouter.get('/:id/download', async (req, res, next) => {
  try {
    const job = await JobModel.findById(req.params.id);
    if (!job) throw new AppError('Job not found', 404);
    if (job.userId !== req.user.id) throw new AppError('Forbidden', 403);
    if (job.status !== 'completed') throw new AppError('Job not completed yet', 400);

    const url = await StorageService.getDownloadUrl(job.outputKey);
    res.json({ downloadUrl: url, expiresIn: 7200 });
  } catch (err) { next(err); }
});

// List all jobs for current user
jobRouter.get('/', async (req, res, next) => {
  try {
    const jobs = await JobModel.findByUser(req.user.id);
    res.json({ jobs });
  } catch (err) { next(err); }
});
