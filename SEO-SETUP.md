# SEO Setup Guide

## Overview

This site implements **4 layers of protection** to ensure search engines can index your content properly.

---

## 🛡️ Four Layers of SEO Protection

### 1. Astro Middleware (Server-Side)
**File:** `src/middleware.ts`

The middleware automatically sets HTTP headers on every response:

- **Production:** Sets `X-Robots-Tag: index, follow`
- **Development:** Sets `X-Robots-Tag: noindex, nofollow` (prevents dev indexing)

**Behavior:**
- Automatically detects production environment (`import.meta.env.PROD`)
- Can be overridden with `PUBLIC_ALLOW_INDEXING=true` environment variable
- Adds security headers (XSS protection, clickjacking prevention)

---

### 2. HTML Meta Tags
**File:** `src/layouts/Layout.astro`

Every page includes:
```html
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
<meta name="googlebot" content="index, follow">
```

**Benefits:**
- Overrides any conflicting server headers
- Enables rich search results (large image previews, full snippets)
- Explicit Googlebot permission

---

### 3. Deployment Platform Configuration

**Netlify:** `netlify.toml`
- Sets `X-Robots-Tag` header for all routes
- Configures context-specific behavior (production vs preview)
- Preview deployments automatically set to `noindex`

**Vercel:** `vercel.json`
- Sets `X-Robots-Tag` header via Vercel config
- Configures environment variable `PUBLIC_ALLOW_INDEXING=true`

**Generic:** `public/_headers`
- Works with Netlify, Vercel, Cloudflare Pages, and others
- Fallback if other methods fail

---

### 4. robots.txt
**File:** `public/robots.txt`

Explicit permission for all search engines:
```
User-agent: *
Allow: /

User-agent: Googlebot
Allow: /

Sitemap: https://www.nilushansilva.info/sitemap-index.xml
```

---

## 🔧 Configuration

### Environment Variables

**Production** (`.env.production` - committed to git):
```bash
PUBLIC_ALLOW_INDEXING=true
PUBLIC_SITE_URL=https://www.nilushansilva.info
```

**Development** (`.env.local` - gitignored):
```bash
PUBLIC_ALLOW_INDEXING=false  # Good practice: don't index localhost
```

### How It Works

1. **Development (pnpm dev):**
   - Middleware detects `!import.meta.env.PROD`
   - Sets `X-Robots-Tag: noindex, nofollow`
   - ✅ Your localhost won't be indexed

2. **Production Build (pnpm build):**
   - Middleware detects `import.meta.env.PROD === true`
   - Sets `X-Robots-Tag: index, follow`
   - ✅ Your live site will be indexed

3. **Preview Deployments:**
   - Netlify: Automatically sets `PUBLIC_ALLOW_INDEXING=false`
   - Vercel: Uses preview environment settings
   - ✅ Preview URLs won't compete with production in search results

---

## 📊 Verification

### Check Meta Tags
View source of any page and look for:
```html
<meta name="robots" content="index, follow...">
```

### Check HTTP Headers
```bash
curl -I https://www.nilushansilva.info/ | grep -i "x-robots"
```

Should return:
```
X-Robots-Tag: index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1
```

### Check robots.txt
Visit: `https://www.nilushansilva.info/robots.txt`

### Check Sitemap
Visit: `https://www.nilushansilva.info/sitemap-index.xml`

---

## 🚀 Deployment Checklist

### First-Time Setup

1. **Deploy to Production**
   ```bash
   git push origin main
   ```

2. **Verify Indexing is Enabled**
   - Check HTTP headers (see above)
   - Verify meta tags in HTML source
   - Confirm robots.txt is accessible

3. **Submit to Google Search Console**
   - Go to: https://search.google.com/search-console
   - Add property: `https://www.nilushansilva.info`
   - Submit sitemap: `https://www.nilushansilva.info/sitemap-index.xml`

4. **Request Indexing**
   - In Search Console, use "Request Indexing" for homepage
   - Google will discover other pages via sitemap

5. **Monitor Progress**
   - Check Search Console after 24-48 hours
   - Look for "Coverage" report to see indexed pages

---

## 🐛 Troubleshooting

### Still seeing "noindex"?

**Check the environment:**
```bash
# In your terminal during build:
echo $PUBLIC_ALLOW_INDEXING  # Should be "true" in production
```

**Force indexing in development** (for testing):
Create `.env.local`:
```bash
PUBLIC_ALLOW_INDEXING=true
```

**Check deployment platform:**
- Netlify: Settings → Environment Variables → Add `PUBLIC_ALLOW_INDEXING = true`
- Vercel: Settings → Environment Variables → Add `PUBLIC_ALLOW_INDEXING = true`

### Checking which layer is working:

1. **Meta tags:** View page source, search for `<meta name="robots"`
2. **HTTP headers:** Use browser DevTools → Network tab → Select page → Headers
3. **Middleware:** Check build logs for any errors
4. **Platform config:** Check Netlify/Vercel deploy logs

---

## 🔒 Security Headers Included

Beyond SEO, the middleware also adds:

- `X-Content-Type-Options: nosniff` - Prevents MIME sniffing attacks
- `X-Frame-Options: SAMEORIGIN` - Prevents clickjacking
- `Referrer-Policy: strict-origin-when-cross-origin` - Privacy protection
- `Permissions-Policy: interest-cohort=()` - Blocks Google FLoC tracking

---

## 📈 Performance Headers

Optimal caching configured:

- **Static Assets** (`/assets/*`, `/_astro/*`): 1 year cache, immutable
- **Images** (`/images/*`): 1 year cache, immutable
- **HTML Pages** (`/*.html`): No cache, always fresh

---

## 🎯 What Changed

Before these fixes, the site had:
- ❌ `x-robots-tag: noindex` blocking all search engines
- ❌ No control over indexing behavior
- ❌ Dev and production treated the same

After these fixes:
- ✅ Production: Fully indexable with rich search results
- ✅ Development: Protected from accidental indexing
- ✅ Preview deployments: Automatically noindexed
- ✅ 4 layers of redundancy ensure indexing works

---

## 📚 References

- [Google Search Central - Robots Meta Tag](https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag)
- [Astro Middleware Docs](https://docs.astro.build/en/guides/middleware/)
- [Netlify Headers](https://docs.netlify.com/routing/headers/)
- [Vercel Headers](https://vercel.com/docs/projects/project-configuration#headers)

---

**Last Updated:** 2025-10-31
**Status:** ✅ Fully configured and ready for production
