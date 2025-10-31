import { defineMiddleware } from 'astro:middleware';

/**
 * Middleware to ensure proper SEO headers are set
 * This explicitly allows search engine indexing by setting X-Robots-Tag
 * and overrides any default noindex headers
 */
export const onRequest = defineMiddleware(async (context, next) => {
  const response = await next();

  // Only set indexing headers in production or if explicitly enabled
  const isProduction = import.meta.env.PROD;
  const allowIndexing = import.meta.env.PUBLIC_ALLOW_INDEXING === 'true' || isProduction;

  if (allowIndexing) {
    // Set X-Robots-Tag header to allow indexing
    response.headers.set('X-Robots-Tag', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');

    // Remove any existing noindex headers
    if (response.headers.get('X-Robots-Tag')?.includes('noindex')) {
      response.headers.set('X-Robots-Tag', 'index, follow');
    }
  } else {
    // In development, prevent indexing (good practice)
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
  }

  // Add security headers
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  // Block FLoC (Google's tracking)
  response.headers.set('Permissions-Policy', 'interest-cohort=()');

  return response;
});
