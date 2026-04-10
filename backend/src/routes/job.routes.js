/**
 * services/lambda/index.js
 * Invokes AWS Lambda for light PDF tasks
 * In local dev — calls local handler functions directly (no AWS needed)
 */

import { LambdaClient, InvokeCommand } from '@aws-sdk/client-lambda';

const isLocal = process.env.NODE_ENV !== 'production';

const lambdaClient = new LambdaClient({
  region: process.env.AWS_REGION || 'eu-north-1',
});

// Map of function names to env vars (set these after deploying Lambdas)
const FUNCTIONS = {
  'image-to-pdf':  process.env.LAMBDA_IMAGE_TO_PDF,
  'pdf-merge':     process.env.LAMBDA_PDF_MERGE,
  'pdf-split':     process.env.LAMBDA_PDF_SPLIT,
  'pdf-watermark': process.env.LAMBDA_PDF_WATERMARK,
  'exif':          process.env.LAMBDA_EXIF,
};

/**
 * Invoke a Lambda function
 * sync: true  = wait for result (RequestResponse) — for EXIF read
 * sync: false = fire and forget (Event) — for PDF operations
 */
export async function invokeLambda(name, payload, { sync = false } = {}) {
  // In local dev, skip Lambda and call the handler directly
  if (isLocal) {
    return invokeLocal(name, payload);
  }

  const functionName = FUNCTIONS[name];
  if (!functionName) throw new Error(`Lambda function not configured: ${name}`);

  const res = await lambdaClient.send(new InvokeCommand({
    FunctionName:   functionName,
    InvocationType: sync ? 'RequestResponse' : 'Event',
    Payload:        Buffer.from(JSON.stringify(payload)),
  }));

  if (res.FunctionError) {
    const err = JSON.parse(Buffer.from(res.Payload).toString());
    throw new Error(`Lambda ${name} failed: ${err.errorMessage}`);
  }

  if (sync && res.Payload) {
    return JSON.parse(Buffer.from(res.Payload).toString());
  }

  return { invoked: true };
}

// ─── Local dev: import and call handlers directly ─────────────────────────────
// IMPORTANT: after the handler runs, update the job status in DB
// In real Lambda, the handler calls notifyComplete() via HTTP callback
// In local dev, we do it here directly since we're in the same process

async function invokeLocal(name, payload) {
  const { JobModel } = await import('../../../src/models/postgreSQL/jobs.model.js').catch(
    () => import('../../models/postgreSQL/jobs.model.js')
  );

  const handlers = {
    'image-to-pdf': () => import('../../lambdas/image-to-pdf/index.js'),
    'exif':         () => import('../../lambdas/exif/index.js'),
    'pdf-merge':    () => import('../../lambdas/pdf-merge/index.js'),
    'pdf-split':    () => import('../../lambdas/pdf-split/index.js'),
  };

  const loader = handlers[name];
  if (!loader) throw new Error(`No local handler for: ${name}`);

  try {
    const mod    = await loader();
    const result = await mod.handler(payload);

    // ✅ This is the fix — mark job COMPLETED after handler returns
    if (payload.jobId) {
      await JobModel.markCompleted(payload.jobId, result?.outputKey || payload.outputKey);
    }

    return result;
  } catch (err) {
    // Mark job FAILED if handler throws
    if (payload.jobId) {
      await JobModel.markFailed(payload.jobId, err.message);
    }
    throw err;
  }
}
