import { v4 as uuid }      from 'uuid';
import { StorageService }  from '../../services/storage/index.js';
import { enqueue, JOB }    from '../../services/queue/index.js';
import { invokeLambda }    from '../../services/lambda/index.js';
import { JobModel }        from '../../models/postgreSQL/jobs.model.js';
import { UserModel }       from '../../models/postgreSQL/user.model.js';
import { AppError }        from '../../middlewares/error.middleware.js';

export const PdfController = {
  async getUploadUrl(req, res, next) {
    try {
      const { filename, contentType } = req.body;
      if (!filename || !contentType) throw new AppError('filename and contentType required', 400);

      const jobId = uuid();
      const key = StorageService.jobKey(jobId, filename);
      const url = await StorageService.getUploadUrl(key, contentType);

      res.json({ jobId, uploadUrl: url, key });
    } catch (err) { next(err); }
  },
  async merge(req, res, next) {
    try {
      const { jobId, inputKeys } = req.body;
      if (!inputKeys?.length) throw new AppError('inputKeys array required', 400);

      const outputKey = StorageService.jobKey(jobId, 'merged.pdf');

      await JobModel.create({ id: jobId, userId: req.user.id, type: 'merge', inputKeys, outputKey });
      await UserModel.incrementQuota(req.user.id);
      await invokeLambda('pdf-merge', { jobId, inputKeys, outputKey });

      res.status(202).json({ jobId, status: 'processing' });
    } catch (err) { next(err); }
  },
  async split(req, res, next) {
    try {
      const { jobId, inputKey, ranges } = req.body;
      console.log(jobId)
      // ranges: [[1,3],[4,6]] or null for all pages individually
      if (!inputKey) throw new AppError('inputKey required', 400);

      const outputKey = StorageService.jobKey(jobId, 'split.zip');

      await JobModel.create({ id: jobId, userId: req.user.id, type: 'split', inputKeys: [inputKey], outputKey, meta: { ranges } });
      await invokeLambda('pdf-split', { jobId, inputKey, outputKey, ranges });

      res.status(202).json({ jobId, status: 'processing' });
    } catch (err) { next(err); }
  },
  async compress(req, res, next) {
    try {
      const { jobId, inputKey, quality = 'medium' } = req.body;
      if (!inputKey) throw new AppError('inputKey required', 400);

      const outputKey = StorageService.jobKey(jobId, 'compressed.pdf');

      await JobModel.create({ id: jobId, userId: req.user.id, type: 'compress', inputKeys: [inputKey], outputKey, meta: { quality } });
      await enqueue.heavy(JOB.PDF_COMPRESS, { jobId, userId: req.user.id, plan: req.user.plan, inputKey, outputKey, quality });

      res.status(202).json({ jobId, status: 'queued' });
    } catch (err) { next(err); }
  },
  async toWord(req, res, next) {
    try {
      const { jobId, inputKey } = req.body;
      if (!inputKey) throw new AppError('inputKey required', 400);

      const outputKey = StorageService.jobKey(jobId, 'output.docx');

      await JobModel.create({ id: jobId, userId: req.user.id, type: 'to-word', inputKeys: [inputKey], outputKey });
      await enqueue.heavy(JOB.PDF_TO_WORD, { jobId, userId: req.user.id, plan: req.user.plan, inputKey, outputKey });

      res.status(202).json({ jobId, status: 'queued' });
    } catch (err) { next(err); }
  },
};
