/**
 * db/mongodb.js
 * MongoDB connection — used for AI results (schema-flexible)
 * Mongoose gives us models, validation, and connection management
 */

import mongoose from 'mongoose';

export async function connectMongo() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error('MONGODB_URI is not set in .env');

  mongoose.connection.on('connected',    () => console.log('[mongo] connected'));
  mongoose.connection.on('disconnected', () => console.log('[mongo] disconnected'));
  mongoose.connection.on('error',        (err) => console.error('[mongo] error:', err));

  await mongoose.connect(uri, {
    dbName: process.env.MONGODB_DB || 'datafluxai',
  });
}

export { mongoose };
