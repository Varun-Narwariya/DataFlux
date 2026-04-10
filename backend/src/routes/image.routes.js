// routes/image.routes.js
import { Router } from 'express';
import { ImageController } from '../controllers/image/image.controller.js';

export const imageRouter = Router();
imageRouter.post('/to-pdf',     ImageController.toPdf);
imageRouter.post('/exif/read',  ImageController.exifRead);
imageRouter.post('/exif/strip', ImageController.exifStrip);
