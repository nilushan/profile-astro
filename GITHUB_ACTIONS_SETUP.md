# GitHub Actions Setup for Firebase Deployment

## Current Configuration

GitHub Actions will now automatically deploy both **Hosting** and **Functions** on every push to `master` branch.

## Required Secret: FIREBASE_TOKEN

You need to add a `FIREBASE_TOKEN` secret to your GitHub repository for the deployment to work.

### Step 1: Generate Firebase CI Token

Run this command locally:

```bash
firebase login:ci
```

This will:
1. Open a browser for authentication
2. Generate a CI token
3. Display the token in your terminal

**Copy the token** - you'll need it in the next step.

### Step 2: Add Token to GitHub Secrets

1. Go to your repository on GitHub: https://github.com/nilushan/profile-astro
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Name: `FIREBASE_TOKEN`
5. Value: Paste the token from Step 1
6. Click **Add secret**

## What Gets Deployed

### On Push to `master`:
- ✅ **Hosting** (static files from `dist/client/`)
- ✅ **Functions** (Cloud Function in `australia-southeast1`)
- Deploys to: https://www.nilushansilva.info/

### On Pull Requests:
- ✅ **Hosting preview** (temporary preview URL)
- ✅ **Functions** (updates production function)
- GitHub bot comments with preview URL on PR

## Workflow Files

1. **`.github/workflows/firebase-hosting-merge.yml`**
   - Triggers on push to `master`
   - Deploys to production

2. **`.github/workflows/firebase-hosting-pull-request.yml`**
   - Triggers on pull request
   - Creates preview deployment

## How It Works

```yaml
steps:
  1. Checkout code
  2. Setup pnpm + Node.js 22
  3. Install dependencies: pnpm install --frozen-lockfile
  4. Build site: pnpm run build
  5. Copy dist to functions/dist
  6. Install functions dependencies: npm ci
  7. Deploy to Firebase: hosting + functions
```

## Testing the Setup

After adding the `FIREBASE_TOKEN` secret:

1. Make a small change to your code
2. Commit and push to `master`:
   ```bash
   git add .
   git commit -m "test: trigger GitHub Actions deployment"
   git push origin master
   ```
3. Go to **Actions** tab in GitHub to see the deployment progress
4. After ~3-5 minutes, check https://www.nilushansilva.info/

## Troubleshooting

### Deployment Fails

**Check the logs:**
- Go to Actions tab → Click the failed workflow → View logs

**Common issues:**
1. Missing `FIREBASE_TOKEN` secret
2. Token expired (regenerate with `firebase login:ci`)
3. Insufficient permissions (token needs project editor role)

### Functions Don't Deploy

Make sure `firebase.json` has the predeploy script:
```json
{
  "functions": {
    "predeploy": [
      "pnpm run build",
      "rm -rf functions/dist && cp -r dist functions/dist"
    ]
  }
}
```

## Current Deployment Status

✅ **Manual deployment working**: Functions deployed to australia-southeast1
✅ **Chatbot API working**: https://www.nilushansilva.info/api/chat
⏳ **GitHub Actions**: Needs `FIREBASE_TOKEN` secret to be added

## Cost Implications

**GitHub Actions:**
- Free for public repositories (unlimited minutes)
- Private repos: 2,000 minutes/month free

**Firebase:**
- Same costs as manual deployment
- No additional charges

---

**Last Updated**: 2025-11-21
**Status**: Ready for automated deployment after adding FIREBASE_TOKEN secret
