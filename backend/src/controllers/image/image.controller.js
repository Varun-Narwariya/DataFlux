// controllers/image/image.controller.js
import { v4 as uuid }     from 'uuid';
import { StorageService } from '../../services/storage/index.js';
import { invokeLambda }   from '../../services/lambda/index.js';
import { JobModel }       from '../../models/postgreSQL/jobs.model.js';
import { AppError }       from '../../middlewares/error.middleware.js';

export const ImageController = {
  async toPdf(req, res, next) {
    try {
      const { jobId, inputKeys, fitToPage = true } = req.body;
      if (!inputKeys?.length) throw new AppError('inputKeys required', 400);

      const outputKey = StorageService.jobKey(jobId, 'output.pdf');
      await JobModel.create({ id: jobId, userId: req.user.id, type: 'image-to-pdf', inputKeys, outputKey });
      await invokeLambda('image-to-pdf', { jobId, inputKeys, outputKey, fitToPage });

      res.status(202).json({ jobId, status: 'processing' });
    } catch (err) { next(err); }
  },

  async exifRead(req, res, next) {
    try {
      const { inputKey } = req.body;
      if (!inputKey) throw new AppError('inputKey required', 400);
      // Sync invoke — returns result directly, no DB job needed
      const metadata = await invokeLambda('exif', { action: 'read', inputKey }, { sync: true });
      res.json({ metadata });
    } catch (err) { next(err); }
  },

  async exifStrip(req, res, next) {
    try {
      const { jobId, inputKey, fields } = req.body;
      if (!inputKey) throw new AppError('inputKey required', 400);
      const outputKey = StorageService.jobKey(jobId, 'clean.jpg');
      await JobModel.create({ id: jobId, userId: req.user.id, type: 'exif-strip', inputKeys: [inputKey], outputKey });
      await invokeLambda('exif', { action: 'strip', jobId, inputKey, outputKey, fields });
      res.status(202).json({ jobId, status: 'processing' });
    } catch (err) { next(err); }
  },
};
