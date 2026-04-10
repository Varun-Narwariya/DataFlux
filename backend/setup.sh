#!/bin/bash
# setup.sh — Run this once to get everything working locally
# chmod +x setup.sh && ./setup.sh

echo ""
echo "╔══════════════════════════════════════╗"
echo "║     DataFluxAI — Local Setup         ║"
echo "╚══════════════════════════════════════╝"
echo ""

# Step 1 — Copy env
echo "▶ Step 1: Setting up .env"
if [ ! -f .env ]; then
  cp .env.example .env
  echo "  ✓ .env created — open it and check the values"
else
  echo "  ✓ .env already exists"
fi

# Step 2 — Install dependencies
echo ""
echo "▶ Step 2: Installing dependencies"
npm install
echo "  ✓ Done"

# Step 3 — Start Docker services
echo ""
echo "▶ Step 3: Starting Docker services (Postgres, MongoDB, Redis, MinIO)"
docker compose up -d
echo "  Waiting for services to be healthy..."
sleep 8
echo "  ✓ Services running"

# Step 4 — Generate Prisma client + run migrations
echo ""
echo "▶ Step 4: Running database migrations"
npx prisma generate
npx prisma migrate dev --name init
echo "  ✓ Tables created"

# Step 5 — Done
echo ""
echo "╔══════════════════════════════════════╗"
echo "║         Everything is ready!         ║"
echo "╚══════════════════════════════════════╝"
echo ""
echo "  Start the server:   npm run dev"
echo ""
echo "  Services running:"
echo "  → API:              http://localhost:3000"
echo "  → MinIO console:    http://localhost:9001  (minioadmin / minioadmin)"
echo "  → BullMQ board:     http://localhost:3001"
echo "  → Prisma studio:    npm run db:studio"
echo ""
echo "  Test the API:"
echo '  curl http://localhost:3000/health'
echo '  curl -X POST http://localhost:3000/auth/register \'
echo '       -H "Content-Type: application/json" \'
echo '       -d '"'"'{"email":"you@test.com","password":"password123"}'"'"''
echo ""
