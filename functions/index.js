/**
 * Firebase Cloud Functions for Portfolio Chatbot API
 *
 * This function proxies requests to the Astro SSR server entry point.
 * Deployed to australia-southeast1 (Sydney) for optimal latency.
 */

const { onRequest } = require('firebase-functions/v2/https');

// Dynamic import of the Astro server entry
let handler;

exports.api = onRequest(
  { region: 'australia-southeast1' }, // Deploy to Sydney region
  async (req, res) => {
  // Lazy load the handler on first request (reduces cold start time)
  if (!handler) {
    try {
      const { handler: astroHandler } = await import('./dist/server/entry.mjs');
      handler = astroHandler;
    } catch (error) {
      console.error('Failed to load Astro server:', error);
      res.status(500).send('Server initialization error');
      return;
    }
  }

  // Forward the request to Astro's handler
  try {
    await handler(req, res);
  } catch (error) {
    console.error('Request handling error:', error);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});
