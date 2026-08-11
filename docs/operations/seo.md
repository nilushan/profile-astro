# SEO and indexing

The site combines HTML metadata, a sitemap and robots file, Firebase response headers, and environment-aware Astro middleware.

## Sources of truth

### HTML metadata

`src/layouts/Layout.astro` provides:

- Canonical URLs
- Robots and Googlebot directives
- Open Graph and Twitter metadata
- Person structured data
- RSS discovery

### Sitemap and robots

- `@astrojs/sitemap` generates the sitemap from the production site URL configured in `astro.config.mjs`.
- `public/robots.txt` allows crawling and links to the sitemap.

### Firebase headers

`firebase.json` sets `X-Robots-Tag: index, follow, ...` on production Hosting responses, along with security and cache headers. This is the effective production control for prerendered pages.

Firebase preview channels force `noindex`; this is expected and should not be overridden.

### Astro middleware

`src/middleware.ts` sets:

- `index, follow` in production or when `PUBLIC_ALLOW_INDEXING=true`
- `noindex, nofollow` in development otherwise
- Security headers on responses processed by Astro

Because most pages are prerendered and served by Firebase Hosting, do not rely on middleware alone for their production response headers.

## Environment variables

The template in `.env.example` includes:

```dotenv
PUBLIC_ALLOW_INDEXING=false
PUBLIC_SITE_URL=https://www.nilushansilva.info
```

Production mode already permits indexing in middleware. Keep development and non-Firebase previews set to `false` unless you are deliberately testing headers.

## Verification

After a production deployment:

```bash
curl -I https://www.nilushansilva.info/ | grep -i x-robots-tag
curl https://www.nilushansilva.info/robots.txt
curl -I https://www.nilushansilva.info/sitemap-index.xml
```

Expected production header:

```text
X-Robots-Tag: index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1
```

Also inspect page source for the canonical link and robots metadata.

A preview URL generally contains `--` in its Firebase hostname and should return `noindex`.

## Search Console checklist

1. Verify `https://www.nilushansilva.info` in Google Search Console.
2. Submit `https://www.nilushansilva.info/sitemap-index.xml`.
3. Request indexing for the homepage after a production deployment.
4. Monitor indexing and canonical reports; crawling can take days and is not guaranteed immediately.

## Troubleshooting

### Production returns `noindex`

- Ensure you are testing the custom domain or live Firebase channel, not a preview channel.
- Confirm the latest `firebase.json` was deployed.
- Check for a platform/CDN rule overriding the header.

### Sitemap is missing

- Confirm `@astrojs/sitemap` is installed and configured.
- Run `pnpm build` and inspect `dist/client/`.
- Confirm the `site` value in `astro.config.mjs` is the canonical production origin.

### Metadata conflicts with headers

Search engines generally honor the most restrictive applicable directive. Fix both the HTML metadata and HTTP response rather than relying on one to override the other.
