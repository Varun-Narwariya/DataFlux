/**
 * services/storage/index.js
 * S3-compatible storage abstraction
 * STORAGE_PROVIDER=minio  → local dev (MinIO)
 * STORAGE_PROVIDER=aws    → production (S3)
 * STORAGE_PROVIDER=r2     → production (Cloudflare R2, zero egress)
 */

import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const configs = {
  aws: {
    region: process.env.AWS_REGION || 'us-east-1',
    credentials: {
      accessKeyId:     process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  },
  r2: {
    region: 'auto',
    endpoint: `https://${process.env.CF_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId:     process.env.R2_ACCESS_KEY_ID,
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    },
  },
  minio: {
    region: 'us-east-1',
    endpoint: process.env.MINIO_ENDPOINT || 'http://localhost:9000',
    forcePathStyle: true,
    credentials: {
      accessKeyId:     process.env.MINIO_ACCESS_KEY || 'minioadmin',
      secretAccessKey: process.env.MINIO_SECRET_KEY || 'minioadmin',
    },
  },
};

const provider = process.env.STORAGE_PROVIDER || 'minio';
const client   = new S3Client(configs[provider]);

const BUCKETS = {
  uploads: process.env.BUCKET_UPLOADS || 'datafluxai-uploads',
  outputs: process.env.BUCKET_OUTPUTS || 'datafluxai-outputs',
};

export const StorageService = {
  /**
   * Get a pre-signed URL for direct browser → storage upload
   * Client uploads directly — file never passes through your API
   */
  async getUploadUrl(key, contentType, expiresIn = 3600) {
    const cmd = new PutObjectCommand({
      Bucket: BUCKETS.uploads,
      Key: key,
      ContentType: contentType,
    });
    return getSignedUrl(client, cmd, { expiresIn });
  },

  /**
   * Get a pre-signed download URL
   * Default 2hr — files expire anyway after 24hr
   */
  async getDownloadUrl(key, bucket = 'outputs', expiresIn = 7200) {
    const cmd = new GetObjectCommand({ Bucket: BUCKETS[bucket], Key: key });
    return getSignedUrl(client, cmd, { expiresIn });
  },

  /**
   * Download a file as Buffer — used inside workers
   */
  async download(key, bucket = 'uploads') {
    const res = await client.send(new GetObjectCommand({ Bucket: BUCKETS[bucket], Key: key }));
    const chunks = [];
    for await (const chunk of res.Body) chunks.push(chunk);
    return Buffer.concat(chunks);
  },

  /**
   * Upload a buffer — used inside workers after processing
   */
  async upload(key, buffer, contentType = 'application/octet-stream', bucket = 'outputs') {
    await client.send(new PutObjectCommand({
      Bucket: BUCKETS[bucket],
      Key: key,
      Body: buffer,
      ContentType: contentType,
    }));
    return { key, bucket };
  },

  /**
   * Delete a file
   */
  async delete(key, bucket = 'uploads') {
    await client.send(new DeleteObjectCommand({ Bucket: BUCKETS[bucket], Key: key }));
  },

  // Generate a scoped key: jobs/abc123/output.pdf
  jobKey: (jobId, filename) => `jobs/${jobId}/${filename}`,
};
