/**
 * models/MongoDB/metadata.model.js
 * Stores AI tool results — flexible schema per tool type
 * TTL index auto-deletes documents after 24 hours
 */

import { mongoose } from '../../db/mongodb.js';

const aiResultSchema = new mongoose.Schema(
  {
    jobId:   { type: String, required: true, unique: true, index: true },
    userId:  { type: String, required: true, index: true },
    tool:    { type: String, required: true }, // 'summarise' | 'explain' | 'visual'

    // Flexible — each tool stores different shape here
    result:  { type: mongoose.Schema.Types.Mixed, required: true },

    // Model metadata — useful for debugging and cost tracking
    model:       { type: String },
    tokensUsed:  { type: Number },
    processingMs: { type: Number },

    // TTL — MongoDB auto-deletes 24hr after expiresAt
    expiresAt: { type: Date, default: () => new Date(Date.now() + 24 * 60 * 60 * 1000) },
  },
  { timestamps: true }
);

// TTL index — set expireAfterSeconds: 0 means "expire AT the expiresAt date"
aiResultSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const AiResult = mongoose.model('AiResult', aiResultSchema);
