# Firebase Hosting Deployment Guide

## 🔥 Understanding Firebase Preview vs Production

### The Key Difference

Firebase Hosting has **two types of deployments**:

| Type | URL Pattern | X-Robots-Tag | Indexable? |
|------|-------------|--------------|------------|
| **Preview Channel** | `site--preview-xyz.web.app` | `noindex` (forced) | ❌ NO |
| **Production** | `site.web.app` or custom domain | `index, follow` (configurable) | ✅ YES |

### Why You're Seeing `noindex`

If you're checking a URL like:
- `nilushansilva--preview-123abc.web.app`
- `nilushansilva--pr-456.web.app`
- Any URL with `--` in it

**That's a preview channel!** Firebase automatically adds `X-Robots-Tag: noindex` to ALL preview channels, and **this cannot be overridden**. This is by design to prevent test/staging sites from appearing in search results.

---

## ✅ Solution: Deploy to Production

### Step 1: Build Your Site
```bash
pnpm build
```

This creates the `dist/` folder with your production-ready site.

---

### Step 2: Deploy to Production

**Option A: Deploy to Production Channel (Main Site)**
```bash
firebase deploy --only hosting
```

This deploys to:
- `nilushansilva.web.app` ✅ INDEXABLE
- Your custom domain (if configured) ✅ INDEXABLE

**Option B: Deploy to a Preview Channel (For Testing)**
```bash
firebase hosting:channel:deploy preview-name
```

This deploys to:
- `nilushansilva--preview-name-xyz.web.app` ❌ NOT INDEXABLE (by design)

---

## 🔍 How to Verify Which You're Using

### Check Your URL

**Production URLs:**
- ✅ `https://nilushansilva.web.app`
- ✅ `https://www.nilushansilva.info` (custom domain)
- ✅ `https://nilushansilva.firebaseapp.com`

**Preview URLs (will have `--` in them):**
- ❌ `https://nilushansilva--preview-main-abc123.web.app`
- ❌ `https://nilushansilva--pr-456-def789.web.app`
- ❌ Any URL with two dashes `--`

---

## 🛠️ Firebase Configuration Explained

Your updated `firebase.json` now includes:

### 1. SEO Headers (Production Only)
```json
{
  "key": "X-Robots-Tag",
  "value": "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
}
```

**Important:** This header is set in `firebase.json` but **only applies to production deployments**. Preview channels ignore this and force `noindex`.

### 2. Security Headers
```json
{
  "key": "X-Content-Type-Options",
  "value": "nosniff"
}
```

Prevents XSS attacks, clickjacking, and other security issues.

### 3. Cache Headers

**Static Assets** (1 year):
- Images: `.jpg`, `.png`, `.svg`, `.webp`
- Fonts: `.woff`, `.woff2`, `.ttf`
- Scripts/Styles: `.js`, `.css`

**Dynamic Content** (no cache):
- HTML: `.html`
- Data: `.json`, `.xml`

### 4. Clean URLs & Rewrites
```json
"cleanUrls": true,
"trailingSlash": false,
"rewrites": [...]
```

Enables pretty URLs like `/about` instead of `/about.html`.

---

## 📋 Complete Deployment Workflow

### For Production Deployment

```bash
# 1. Build the site
pnpm build

# 2. Test locally (optional)
firebase serve

# 3. Deploy to production
firebase deploy --only hosting

# 4. Verify it's live
# Visit: https://nilushansilva.web.app
# Check headers: curl -I https://nilushansilva.web.app/
```

### For Preview Testing

```bash
# 1. Build the site
pnpm build

# 2. Deploy to preview channel
firebase hosting:channel:deploy testing

# 3. Visit the preview URL (provided in terminal output)
# Example: https://nilushansilva--testing-xyz.web.app

# 4. When satisfied, deploy to production
firebase deploy --only hosting
```

---

## 🔍 Verifying Production is Indexable

### Method 1: cURL
```bash
curl -I https://nilushansilva.web.app/ | grep -i x-robots
```

**Expected output:**
```
x-robots-tag: index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1
```

**If you see `noindex`**: You're checking a preview URL, not production!

---

### Method 2: Browser DevTools
1. Open https://nilushansilva.web.app/ (production URL)
2. Press F12 (DevTools)
3. Network tab
4. Reload page
5. Click on the main document
6. Check "Response Headers"
7. Look for `X-Robots-Tag: index, follow`

---

### Method 3: View Page Source
Right-click → View Source, look for:
```html
<meta name="robots" content="index, follow, max-image-preview:large...">
```

---

## 🚀 GitHub Actions CI/CD (Optional)

If you want automatic deployments, create `.github/workflows/firebase-deploy.yml`:

```yaml
name: Deploy to Firebase Hosting

on:
  push:
    branches:
      - main

jobs:
  build_and_deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup pnpm
        uses: pnpm/action-setup@v2

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install

      - name: Build
        run: pnpm build
        env:
          PUBLIC_ALLOW_INDEXING: true

      - name: Deploy to Firebase
        uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: '${{ secrets.GITHUB_TOKEN }}'
          firebaseServiceAccount: '${{ secrets.FIREBASE_SERVICE_ACCOUNT }}'
          channelId: live  # Deploy to production
          projectId: nilushandevelopment
```

---

## 🎯 Common Scenarios

### Scenario 1: Testing New Features
```bash
# Deploy to preview for testing
firebase hosting:channel:deploy feature-test

# Visit: nilushansilva--feature-test-xyz.web.app
# Will show noindex ✅ (correct - prevents indexing of test site)

# When ready, deploy to production
firebase deploy --only hosting
```

---

### Scenario 2: Pull Request Previews
Many teams use GitHub Actions to auto-deploy PRs to preview channels:
- Each PR gets its own preview URL
- All preview URLs have `noindex` (good!)
- Only merged PRs deploy to production (indexable)

---

### Scenario 3: Custom Domain
If you've connected a custom domain (`www.nilushansilva.info`):

```bash
# Deploy to production
firebase deploy --only hosting

# Your custom domain will serve the production version
# Check: curl -I https://www.nilushansilva.info/
# Should show: x-robots-tag: index, follow
```

---

## 🐛 Troubleshooting

### "I deployed to production but still see noindex"

**1. Verify you're checking the right URL:**
```bash
# ❌ WRONG - This is a preview channel
https://nilushansilva--anything.web.app

# ✅ CORRECT - This is production
https://nilushansilva.web.app
https://www.nilushansilva.info
```

**2. Clear browser cache:**
```bash
# Hard reload
Ctrl+Shift+R (Windows/Linux)
Cmd+Shift+R (Mac)
```

**3. Check Firebase console:**
- Go to: https://console.firebase.google.com/
- Select project: `nilushandevelopment`
- Hosting → Dashboard
- Verify the deployment to the production channel

**4. Verify firebase.json was deployed:**
```bash
# Check your local firebase.json
cat firebase.json | grep "X-Robots-Tag"

# Should show:
# "key": "X-Robots-Tag",
# "value": "index, follow..."
```

---

## 📊 Summary

| Deployment Type | Command | URL Pattern | Indexable? |
|----------------|---------|-------------|------------|
| **Production** | `firebase deploy --only hosting` | `site.web.app` | ✅ YES |
| **Preview** | `firebase hosting:channel:deploy name` | `site--name-xyz.web.app` | ❌ NO |
| **Custom Domain** | `firebase deploy --only hosting` | `yourdomain.com` | ✅ YES |

---

## ✅ Quick Checklist

Before submitting to Google Search Console:

- [ ] Deployed to **production** (not preview)
- [ ] Verified URL has **no `--` in it**
- [ ] Checked headers show `x-robots-tag: index, follow`
- [ ] Confirmed `firebase.json` has headers configuration
- [ ] Tested with `curl -I https://nilushansilva.web.app/`
- [ ] Verified `robots.txt` is accessible
- [ ] Confirmed `sitemap-index.xml` is accessible

---

## 🎉 You're Ready!

Once you deploy to **production** (not preview), your site will be fully indexable.

The `noindex` you're seeing is **expected behavior for preview channels** and actually protects your SEO by preventing test URLs from appearing in search results!

---

**Last Updated:** 2025-10-31
**Firebase Project:** nilushandevelopment
**Production URL:** https://nilushansilva.web.app
**Site ID:** nilushansilva
