#!/bin/bash
set -euo pipefail

# ============================================================
# KnowTheClaw Demo Server Setup
# Run this on a fresh Ubuntu 24.04 VPS as root
# ============================================================

echo "==> Updating system"
apt update && apt upgrade -y

echo "==> Creating openclaw user"
adduser --disabled-password --gecos "" openclaw || true
usermod -aG sudo openclaw

echo "==> Installing Node.js 20"
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

echo "==> Installing pnpm"
npm install -g pnpm

echo "==> Installing nginx"
apt install -y nginx

echo "==> Installing certbot"
apt install -y certbot python3-certbot-nginx

echo "==> Installing git"
apt install -y git

echo "==> Setting up firewall"
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw --force enable

echo "==> Disabling root SSH login"
sed -i 's/^PermitRootLogin yes/PermitRootLogin no/' /etc/ssh/sshd_config
sed -i 's/^#PasswordAuthentication yes/PasswordAuthentication no/' /etc/ssh/sshd_config
systemctl reload sshd

echo ""
echo "============================================================"
echo "  Server base setup complete."
echo ""
echo "  Next steps (as the openclaw user):"
echo "  1. Install OpenClaw:  git clone https://github.com/openclaw/openclaw.git"
echo "  2. Run onboarding:    cd openclaw && pnpm install && pnpm build && pnpm openclaw onboard"
echo "  3. Deploy broker:     cd ~/knowtheclaw/demo-api && pnpm install && cp .env.example .env"
echo "  4. Configure nginx:   sudo cp ~/knowtheclaw/deploy/nginx-demo-api.conf /etc/nginx/sites-available/demo-api"
echo "  5. Enable site:       sudo ln -s /etc/nginx/sites-available/demo-api /etc/nginx/sites-enabled/"
echo "  6. Get SSL:           sudo certbot --nginx -d demo-api.knowtheclaw.com"
echo "  7. Start services:    See deploy/demo-api.service"
echo "============================================================"
