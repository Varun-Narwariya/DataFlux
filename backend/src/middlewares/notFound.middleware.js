/**
 * middlewares/notFound.middleware.js
 * Catches requests to routes that don't exist
 * Must come AFTER all route definitions, BEFORE errorHandler
 */

export function notFound(req, res) {
  res.status(404).json({ error: `Route ${req.method} ${req.path} not found` });
}
