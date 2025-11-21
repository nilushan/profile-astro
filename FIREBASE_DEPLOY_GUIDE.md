# Firebase Deployment Guide for Chatbot

Complete guide to deploying your portfolio with the AI chatbot to Firebase Hosting + Cloud Functions.

## Prerequisites

- Firebase CLI installed: `npm install -g firebase-tools`
- Firebase project: `nilushandevelopment`
- Gemini API key ready

## Setup Complete ✅

The following have been configured:

1. ✅ Firebase Functions directory created (`functions/`)
2. ✅ Cloud Function handler created (`functions/index.js`)
3. ✅ `firebase.json` updated with Functions config
4. ✅ API route will be proxied to Cloud Functions
5. ✅ Static files will be served from Firebase Hosting

## Deployment Steps

### Step 1: Set Environment Variable

Set your Gemini API key as a Firebase secret:

```bash
firebase functions:secrets:set GEMINI_API_KEY --project nilushandevelopment
```

When prompted, paste your API key: `AIzaSyCHJTWTGFqBQRcDEMJGBaKu4mojN3t9qYs`

**Alternative**: Use environment config (less secure, but simpler):

```bash
firebase functions:config:set gemini.api_key="AIzaSyCHJTWTGFqBQRcDEMJGBaKu4mojN3t9qYs" --project nilushandevelopment
```

Then update `functions/index.js` to read from config instead of env.

### Step 2: Build Your Site

```bash
pnpm run build
```

This creates:
- `dist/client/` - Static HTML/CSS/JS for Firebase Hosting
- `dist/server/` - Server bundle for Cloud Functions

### Step 3: Deploy to Firebase

Deploy everything (hosting + functions):

```bash
firebase deploy --project nilushandevelopment
```

Or deploy separately:

```bash
# Deploy only hosting
firebase deploy --only hosting --project nilushandevelopment

# Deploy only functions
firebase deploy --only functions --project nilushandevelopment
```

### Step 4: Test Your Deployment

Visit your site:
- Production: `https://nilushansilva.web.app` or your custom domain
- Test the chatbot by clicking the floating chat button
- Ask a question to verify the API works

## Architecture

```
User Request
    ↓
Firebase Hosting (CDN)
    ├─ Static pages (HTML/CSS/JS) → Served directly
    └─ /api/* requests → Routed to Cloud Functions
           ↓
       Cloud Function (api)
           ↓
       Astro SSR Handler
           ↓
       Gemini API
           ↓
       Response to User
```

## File Structure

```
your-project/
├── dist/
│   ├── client/          # Static files (deployed to Hosting)
│   │   ├── index.html
│   │   ├── about/
│   │   ├── blog/
│   │   └── _astro/
│   └── server/          # Server bundle (used by Functions)
│       └── entry.mjs
├── functions/
│   ├── index.js         # Cloud Function handler
│   ├── package.json
│   └── node_modules/
├── firebase.json        # Firebase config
└── .firebaserc          # Project aliases
```

## Configuration Files

### firebase.json

```json
{
  "hosting": {
    "public": "dist/client",  // Static files from here
    "rewrites": [
      {
        "source": "/api/**",   // API requests go to function
        "function": "api"
      },
      {
        "source": "**",        // Everything else gets index.html
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

### functions/index.js

```javascript
const functions = require('firebase-functions');

let handler;

exports.api = functions.https.onRequest(async (req, res) => {
  if (!handler) {
    const { handler: astroHandler } = await import('../dist/server/entry.mjs');
    handler = astroHandler;
  }
  await handler(req, res);
});
```

## Troubleshooting

### Error: "GEMINI_API_KEY not configured"

**Solution**: Ensure you set the secret:

```bash
firebase functions:secrets:set GEMINI_API_KEY --project nilushandevelopment
```

Then redeploy functions:

```bash
firebase deploy --only functions --project nilushandevelopment
```

### Error: "Failed to load Astro server"

**Cause**: `dist/server/entry.mjs` not found

**Solution**: Run `pnpm run build` before deploying

### Chatbot works locally but not in production

**Check**:
1. View Cloud Functions logs:
   ```bash
   firebase functions:log --project nilushandevelopment
   ```

2. Check if secret is set:
   ```bash
   firebase functions:secrets:access GEMINI_API_KEY --project nilushandevelopment
   ```

3. Verify function deployed:
   ```bash
   firebase functions:list --project nilushandevelopment
   ```

### Cold starts are slow (3-5 seconds first request)

**Cause**: Cloud Functions cold start

**Solutions**:
1. Use minimum instances (costs money but keeps function warm):
   ```javascript
   exports.api = functions
     .runWith({ minInstances: 1 })  // Keep 1 instance always warm
     .https.onRequest(async (req, res) => { ... });
   ```

2. Accept cold starts (free tier, slower first request)

### Function deployment fails

**Error**: "Billing account not configured"

**Solution**: Enable billing for your Firebase project at:
https://console.firebase.google.com/project/nilushandevelopment/usage/details

**Note**: Cloud Functions require the Blaze (pay-as-you-go) plan. Free tier includes:
- 2 million invocations/month
- 400,000 GB-seconds/month
- 200,000 CPU-seconds/month

## Cost Estimates

### Firebase Costs

**Hosting (Free Tier)**:
- 10 GB storage
- 360 MB/day transfer

**Cloud Functions (Blaze Plan - Free Tier)**:
- 2M invocations/month FREE
- After: $0.40 per million invocations

**Typical Usage** (1000 chatbot conversations/month):
- Hosting: FREE (within limits)
- Functions: FREE (way under 2M limit)
- **Gemini API**: ~$1.60/month (main cost)

### Total Estimated Cost

- **0-1000 conversations/month**: ~$1.60/month (just Gemini)
- **1000-10,000 conversations/month**: ~$16/month
- **10,000+ conversations/month**: Consider adding rate limiting

## Monitoring

### View Functions Logs

```bash
firebase functions:log --project nilushandevelopment
```

### Real-time Logs

```bash
firebase functions:log --project nilushandevelopment --follow
```

### Check Usage

Firebase Console → Functions → Usage tab:
https://console.firebase.google.com/project/nilushandevelopment/functions

## Updating the Chatbot

### Update Code

1. Make changes to your code
2. Rebuild: `pnpm run build`
3. Deploy: `firebase deploy --project nilushandevelopment`

### Update Environment Variables

```bash
firebase functions:secrets:set GEMINI_API_KEY --project nilushandevelopment
firebase deploy --only functions --project nilushandevelopment
```

## Production Checklist

Before deploying to production:

- [ ] Build succeeds: `pnpm run build`
- [ ] Gemini API key set in Firebase
- [ ] Test locally: `firebase emulators:start`
- [ ] Review `firebase.json` configuration
- [ ] Check Firebase project billing enabled
- [ ] Deploy: `firebase deploy --project nilushandevelopment`
- [ ] Test chatbot on production URL
- [ ] Monitor logs for errors
- [ ] Set up usage alerts in Firebase Console

## Quick Deploy Commands

```bash
# Full deployment workflow
pnpm run build
firebase deploy --project nilushandevelopment

# Just rebuild and deploy (if secret already set)
pnpm run build && firebase deploy --project nilushandevelopment

# Deploy only updated functions
firebase deploy --only functions --project nilushandevelopment

# Deploy only updated hosting
firebase deploy --only hosting --project nilushandevelopment
```

## Local Testing with Emulators

Test before deploying:

```bash
# Start emulators
firebase emulators:start --project nilushandevelopment

# Visit: http://localhost:5000
```

## Need Help?

- Firebase Docs: https://firebase.google.com/docs/functions
- Astro SSR: https://docs.astro.build/en/guides/server-side-rendering/
- Project Console: https://console.firebase.google.com/project/nilushandevelopment

---

**Last Updated**: 2025-11-21
**Firebase Project**: nilushandevelopment
**Functions Runtime**: Node.js 20
