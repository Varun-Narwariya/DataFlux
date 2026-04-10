/**
 * app.js — Express App
 * Middleware chain + route mounting
 * Separated from index.js so you can import app in tests
 * without starting the server
 */

import express   from 'express';
import helmet    from 'helmet';
import cors      from 'cors';
import morgan    from 'morgan';
import rateLimit from 'express-rate-limit';

import { authRouter }  from './routes/auth.routes.js';
import { pdfRouter }   from './routes/pdf.routes.js';
import { imageRouter } from './routes/image.routes.js';
import { aiRouter }    from './routes/ai.routes.js';
import { jobRouter }   from './routes/ai.routes.js';
import { authenticate } from './middlewares/auth.middleware.js';
import { errorHandler } from './middlewares/error.middleware.js';
import { notFound }     from './middlewares/notFound.middleware.js';

const app = express();

// Security 
app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));

// Logging
// 'dev' in development, 'combined' in production
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// Body Parsing 
// Files never come through here — they go direct to S3 via signed URLs
// 10mb is for JSON metadata only
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Rate Limiting 
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10,
  keyGenerator: (req) => req.user?.id || req.ip,
  skip: (req) => req.user?.plan === 'pro',
  message: { error: 'Too many requests. Upgrade to Pro for higher limits.' },
});

// ─── Routes ───────────────────────────────────────────────────────────────────
app.get('/health', (req, res) => res.json({ status: 'ok', ts: Date.now() }));

app.use('/auth',  authRouter);
app.use('/pdf',   authenticate, limiter, pdfRouter);
app.use('/image', authenticate, limiter, imageRouter);
app.use('/ai',    authenticate, limiter, aiRouter);
app.use('/jobs',  authenticate, jobRouter);

//  Error Handling 
// Order matters — notFound then errorHandler, always last
app.use(notFound);
app.use(errorHandler);

export default app;
