# VPS Backend Setup Guide

## 1. Requirements
- Node.js v18+
- NPM
- A VPS with Public IP

## 2. Installation
1. Upload this folder to your VPS (e.g., `/var/www/fiberasinet-backend`)
2. Run `npm install`

## 3. Configuration
Create a `.env` file:
```
PORT=3000
TRIPAY_API_KEY=your_tripay_key
TRIPAY_PRIVATE_KEY=your_tripay_private_key
MIKROTIK_HOST=192.168.1.1
MIKROTIK_USER=admin
MIKROTIK_PASS=password
WA_API_KEY=your_fonnte_key
```

## 4. Running
- Development: `npm run dev`
- Production: Use PM2
  `npm install -g pm2`
  `pm2 start server.js --name fiberasinet-api`

## 5. Connecting to Frontend
- Point your React App or Login Page to `http://YOUR_VPS_IP:3000`
