# Deployment Guide

## Quick Deployment Options

### Option 1: GitHub Pages (Frontend) + Railway (Backend) [Recommended]

1. **Deploy Backend to Railway:**
   ```bash
   # Push your code to GitHub first
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```
   - Go to [Railway.app](https://railway.app)
   - Connect your GitHub repository
   - Select the `backend` folder as the root
   - Add environment variable: `PORT=8000`
   - Deploy automatically

2. **Deploy Frontend to GitHub Pages:**
   ```bash
   # Update the backend URL in .env.production
   # Set VITE_API_URL to your Railway backend URL
   
   # Deploy to GitHub Pages
   npm run deploy
   ```

### Option 2: Full Vercel Deployment

1. **Setup Vercel:**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Login to Vercel
   vercel login
   
   # Deploy
   vercel --prod
   ```

2. **Configure Environment Variables in Vercel:**
   - `PYTHON_VERSION=3.10.0`
   - Add any other required environment variables

### Option 3: Netlify (Frontend) + Railway (Backend)

1. **Deploy Backend to Railway** (same as Option 1)

2. **Deploy Frontend to Netlify:**
   - Connect your GitHub repository to Netlify
   - Set build command: `npm run build`
   - Set publish directory: `dist`
   - Add environment variable: `VITE_API_URL=your-railway-backend-url`

## Environment Configuration

### Development
```bash
npm run dev          # Frontend on http://localhost:3000
npm run dev:backend  # Backend on http://localhost:8000
```

### Production Environment Variables

Create `.env.production`:
```
VITE_API_URL=https://your-backend-domain.com
VITE_BASE_PATH=/snake-ai-arena/
NODE_ENV=production
```

## Testing Deployment

1. **Test locally:**
   ```bash
   npm run build
   npm run preview
   ```

2. **Test backend health:**
   ```bash
   curl https://your-backend-url.com/health
   ```

3. **Test AI endpoint:**
   ```bash
   curl -X POST https://your-backend-url.com/ai-move \
     -H "Content-Type: application/json" \
     -d '{"game_state":{"ai_snake":[[5,5]],"player_snake":[[10,10]],"food":[[7,7]],"grid_size":20},"algorithm":"greedy"}'
   ```

## Troubleshooting

### Common Issues:

1. **CORS Errors:**
   - Ensure backend CORS is configured for your frontend domain
   - Check `backend/main.py` CORS settings

2. **API Connection Failed:**
   - Verify `VITE_API_URL` environment variable
   - Check if backend is running and accessible
   - Ensure backend health endpoint returns 200

3. **Build Errors:**
   - Run `npm run build` locally to test
   - Check TypeScript errors with `npx tsc --noEmit`
   - Verify all dependencies are installed

4. **GitHub Pages 404:**
   - Ensure `base` in `vite.config.js` matches repository name
   - Check if `gh-pages` branch was created
   - Verify GitHub Pages is enabled in repository settings

### Backend Deployment Notes:

- Railway: Automatically detects Python and installs dependencies
- Heroku: Uses `Procfile` for deployment configuration
- Vercel: Uses `vercel.json` for Python serverless functions

### Frontend Deployment Notes:

- GitHub Pages: Free for public repositories
- Netlify: Free tier with custom domains
- Vercel: Excellent for React applications

## Performance Optimization

For production, consider:

1. **Bundle Analysis:**
   ```bash
   npm run build -- --mode analyze
   ```

2. **Lighthouse Audit:**
   - Test Core Web Vitals
   - Optimize images and assets
   - Enable compression

3. **Backend Optimization:**
   - Add Redis caching for AI calculations
   - Implement rate limiting
   - Use async database connections

## Monitoring

Set up monitoring for production:

1. **Frontend:** Vercel Analytics, Google Analytics
2. **Backend:** Railway metrics, custom logging
3. **Uptime:** Ping health endpoints regularly

## Scaling

For high traffic:

1. **Frontend:** CDN (Cloudflare, AWS CloudFront)
2. **Backend:** Load balancer, multiple instances
3. **Database:** Consider PostgreSQL for persistent data
