# 🚀 Quick GitHub Deployment Guide

## ✅ Frontend Deployed! 

Your Snake AI Arena frontend is now live at:
**https://EmreeKucuk.github.io/snake-ai-arena/**

## 🔥 Next Step: Deploy Backend to Railway

### 1. Deploy Backend to Railway (5 minutes)

1. **Go to [Railway.app](https://railway.app)**
2. **Click "Start a New Project"**
3. **Select "Deploy from GitHub repo"**
4. **Choose your `snake-ai-arena` repository**
5. **Configure the service:**
   - Root Directory: `backend`
   - Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
6. **Add Environment Variables:**
   - `PORT` = `8000`
   - `PYTHONPATH` = `/app`
7. **Deploy!** Railway will auto-deploy from your GitHub repo

### 2. Update Frontend API URL

Once your Railway backend is deployed:

1. **Get your Railway backend URL** (something like `https://snake-ai-backend-production.up.railway.app`)

2. **Update the API URL in your code:**
   ```typescript
   // In src/services/api.ts - update line 5:
   const API_BASE_URL = import.meta.env.PROD 
     ? 'https://YOUR-RAILWAY-URL.railway.app/api'  // <- Put your Railway URL here
     : '/api';
   ```

3. **Commit and push:**
   ```bash
   git add .
   git commit -m "Update production API URL"
   git push origin main
   ```

4. **Redeploy frontend:**
   ```bash
   npm run deploy
   ```

## 🎮 Your App Will Be Live!

- **Frontend**: https://EmreeKucuk.github.io/snake-ai-arena/
- **Backend**: https://your-railway-url.railway.app

## 🔄 Automatic Deployments

Both are now set up for automatic deployment:
- **Frontend**: Deploys automatically when you push to `main` branch (via GitHub Actions)
- **Backend**: Deploys automatically when you push changes to Railway

## 🧪 Test Your Deployment

1. **Open your GitHub Pages URL**
2. **Try starting a game**
3. **If AI doesn't work, update the API URL above**

## 🛠 Alternative Backend Options

If Railway doesn't work, try these:

### Render.com
- Connect GitHub repo
- Root Directory: `backend`
- Build Command: `pip install -r requirements.txt`
- Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`

### Fly.io
```bash
# Install flyctl and run in backend directory:
fly launch
fly deploy
```

### Vercel (Serverless)
- Use the existing `vercel.json` config
- Run `vercel --prod` in project root

---

**Your Snake AI Arena is now ready for the world! 🐍🤖**
