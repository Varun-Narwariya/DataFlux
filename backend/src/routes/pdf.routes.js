// routes/pdf.routes.js
import { Router } from 'express';
import { PdfController } from '../controllers/pdf/pdf.controller.js';

export const pdfRouter = Router();
pdfRouter.post('/upload-url', PdfController.getUploadUrl);
pdfRouter.post('/merge',      PdfController.merge);
pdfRouter.post('/split',      PdfController.split);
pdfRouter.post('/compress',   PdfController.compress);
pdfRouter.post('/to-word',    PdfController.toWord);
