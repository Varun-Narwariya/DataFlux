/**
 * index.js — Entry Point
 * Starts the server after all connections are established
 * Never start listening before DB is ready — you'll get requests
 * hitting an unready app
 */

import app from './src/app.js';
import { connectPostgres } from './src/db/pgdb.js';
import { connectMongo }    from './src/db/mongodb.js';

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    // Connect databases first, then start server
    await connectPostgres();
    await connectMongo();

    app.listen(PORT, () => {
      console.log(`[server] running on port ${PORT}`);
      console.log(`[server] environment: ${process.env.NODE_ENV}`);
    });

  } catch (err) {
    console.error('[server] failed to start:', err.message);
    process.exit(1); // crash hard — don't run without a DB connection
  }
}

start();
