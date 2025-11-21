# Chatbot Deployment Guide

This guide explains how to deploy your portfolio with the AI chatbot to production.

## Current Setup

- **Framework**: Astro 5.16.0 with Node.js adapter
- **Mode**: Server mode (SSR enabled)
- **Chatbot API**: `/api/chat` endpoint (requires SSR)
- **Pages**: Should be prerendered as static HTML for performance

## Deployment Options

### Option 1: Deploy to Vercel (Recommended - Easiest)

Vercel has native Astro support and handles SSR automatically.

1. **Install Vercel CLI** (if not already installed):
   ```bash
   pnpm add -g vercel
   ```

2. **Deploy**:
   ```bash
   vercel
   ```

3. **Add Environment Variable**:
   - Go to your Vercel project dashboard
   - Settings → Environment Variables
   - Add: `GEMINI_API_KEY` = `your_api_key_here`

4. **Redeploy**:
   ```bash
   vercel --prod
   ```

That's it! Vercel automatically detects the Node adapter and configures everything.

---

### Option 2: Firebase Hosting + Cloud Functions

Your current setup uses Firebase Hosting (static). To add the chatbot, you'll need Firebase Cloud Functions.

#### Step 1: Install Firebase Functions

```bash
firebase init functions
# Choose JavaScript or TypeScript
# Choose to install dependencies
```

#### Step 2: Update `firebase.json`

```json
{
  "hosting": {
    "public": "dist/client",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [
      {
        "source": "/api/**",
        "function": "api"
      },
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  },
  "functions": {
    "source": "functions",
    "runtime": "nodejs20"
  }
}
```

#### Step 3: Create Cloud Function

In `functions/index.js`:

```javascript
const functions = require('firebase-functions');
const { handler } = require('../dist/server/entry.mjs');

exports.api = functions.https.onRequest(handler);
```

#### Step 4: Set Environment Variable

```bash
firebase functions:config:set gemini.api_key="your_api_key_here"
```

Update your code to read from Firebase config:
```javascript
const GEMINI_API_KEY = functions.config().gemini?.api_key || import.meta.env.GEMINI_API_KEY;
```

#### Step 5: Deploy

```bash
pnpm run build
firebase deploy
```

**Challenges with Firebase**:
- More complex setup
- Cloud Functions cold starts (slower first request)
- Need to manage both hosting and functions
- Higher cost for functions (vs Vercel's free tier)

---

### Option 3: Railway / Render / Fly.io

These platforms support Node.js apps natively.

#### Railway

1. Connect your GitHub repo
2. Add environment variable: `GEMINI_API_KEY`
3. Deploy automatically on push

#### Render

1. Create new "Web Service"
2. Connect repository
3. Build command: `pnpm install && pnpm run build`
4. Start command: `node ./dist/server/entry.mjs`
5. Add environment variable: `GEMINI_API_KEY`

#### Fly.io

```bash
fly launch
fly secrets set GEMINI_API_KEY="your_key_here"
fly deploy
```

---

## Prerendering Pages (Performance Optimization)

Since your pages don't need SSR (only the API route does), you should prerender them as static HTML.

### Manual Approach

Add this to the frontmatter of each `.astro` page (except API routes):

```astro
---
export const prerender = true; // Makes this page static

import Layout from "@/layouts/Layout.astro";
// ... rest of imports
---
```

### Automated Approach

Run this script to add prerender to all pages:

```bash
find src/pages -name "*.astro" -type f ! -path "*/api/*" -exec sed -i '' '1s/^/---\nexport const prerender = true;\n\n/' {} \;
```

---

## Testing Production Build Locally

### 1. Build

```bash
pnpm run build
```

This creates:
- `dist/client/` - Static files (HTML, CSS, JS, images)
- `dist/server/` - Server bundle with API route

### 2. Preview

```bash
node ./dist/server/entry.mjs
```

Or use Astro's preview:

```bash
pnpm run preview
```

### 3. Test the Chatbot

Visit `http://localhost:4321` and test the chat functionality.

---

## Troubleshooting

### "GEMINI_API_KEY not configured" Error

**Cause**: Environment variable not set in production

**Solution**:
- Vercel: Add in dashboard Settings → Environment Variables
- Firebase: `firebase functions:config:set gemini.api_key="key"`
- Railway/Render: Add in environment variables section

### Chatbot Works Locally but Not in Production

**Cause**: API key not available at runtime

**Solution**: Check deployment logs for errors. Ensure `GEMINI_API_KEY` is set correctly.

### Build Fails with "Cannot find module"

**Cause**: Missing dependencies

**Solution**:
```bash
pnpm install
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### High Response Times (>5 seconds)

**Cause**: Cold starts (especially Firebase Functions)

**Solutions**:
- Use Vercel (no cold starts on paid plan)
- Keep functions warm with periodic health checks
- Consider caching context aggregation

---

## Cost Estimates

### LLM Costs (Gemini Flash 2.0)

- Per conversation: ~$0.0016
- 1000 conversations/month: ~$1.60/month

### Hosting Costs

| Platform | Free Tier | Paid Tier |
|----------|-----------|-----------|
| **Vercel** | 100GB bandwidth, Hobby projects | $20/month (Pro) |
| **Firebase Hosting** | 10GB storage, 360MB/day | Pay-as-you-go |
| **Firebase Functions** | 2M invocations/month | $0.40/million after |
| **Railway** | $5 free credit/month | ~$5-10/month |
| **Render** | Static sites free | $7/month (Web Service) |

### Recommendation

For your portfolio:
1. **Vercel** (easiest, generous free tier, great DX)
2. **Railway** (simple, good free tier)
3. **Firebase** (you're already using it, but more complex)

---

## Recommended: Vercel Deployment

### Quick Start

```bash
# 1. Install Vercel CLI
pnpm add -g vercel

# 2. Login
vercel login

# 3. Deploy
vercel

# 4. Add environment variable in dashboard
# Go to: https://vercel.com/your-project/settings/environment-variables
# Add: GEMINI_API_KEY

# 5. Redeploy
vercel --prod
```

### Vercel Configuration

Create `vercel.json`:

```json
{
  "buildCommand": "pnpm run build",
  "outputDirectory": "dist",
  "devCommand": "pnpm run dev",
  "installCommand": "pnpm install"
}
```

### Environment Variables

In Vercel dashboard:
- Production: `GEMINI_API_KEY` = `your_api_key`
- Preview: Same key (or use different key for testing)
- Development: Uses local `.env`

---

## Next Steps

1. Choose deployment platform
2. Set up environment variables
3. Test production build locally
4. Deploy to production
5. Test chatbot in production
6. Monitor API usage and costs

## Questions?

- Vercel Docs: https://vercel.com/docs
- Astro Deployment: https://docs.astro.build/en/guides/deploy/
- Firebase Functions: https://firebase.google.com/docs/functions

---

**Last Updated**: 2025-11-21
**Astro Version**: 5.16.0
**Node Adapter**: 9.5.1
