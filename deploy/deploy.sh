#!/bin/bash
set -euo pipefail

# ============================================================
# Deploy/update the broker API on the server
# Run from the project root on your local machine
# Usage: ./deploy/deploy.sh user@your-server-ip
# ============================================================

SERVER=${1:?Usage: ./deploy/deploy.sh user@server-ip}

echo "==> Syncing demo-api to server"
rsync -avz --exclude node_modules --exclude .env \
  demo-api/ "$SERVER:/home/openclaw/knowtheclaw/demo-api/"

echo "==> Syncing openclaw config"
rsync -avz openclaw-config/ "$SERVER:/home/openclaw/knowtheclaw/openclaw-config/"

echo "==> Syncing deploy configs"
rsync -avz deploy/ "$SERVER:/home/openclaw/knowtheclaw/deploy/"

echo "==> Installing dependencies on server"
ssh "$SERVER" "cd /home/openclaw/knowtheclaw/demo-api && pnpm install --production"

echo "==> Restarting broker service"
ssh "$SERVER" "sudo systemctl restart knowtheclaw-demo-api"

echo "==> Checking status"
ssh "$SERVER" "sudo systemctl status knowtheclaw-demo-api --no-pager"

echo ""
echo "  Deploy complete."
