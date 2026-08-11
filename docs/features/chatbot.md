# AI chatbot

The portfolio includes a React chat widget backed by Google Gemini and a deterministic client-side fallback.

## Architecture

```text
Chatbot.tsx
├── POST /api/chat
│   ├── chatbot-context.ts aggregates portfolio, blog, and project content
│   └── Gemini generates a context-grounded response
└── local portfolio fallback when the API request fails
```

Relevant files:

- `src/components/Chatbot.tsx` — interface, local history, sanitization, and fallback answers
- `src/pages/api/chat.ts` — server endpoint and Gemini configuration
- `src/lib/chatbot-context.ts` — context aggregation and system prompt
- `functions/index.js` — Firebase Cloud Function wrapper

## Configuration

Copy the environment template for local development:

```bash
cp .env.example .env.local
```

Set these values in `.env.local`:

```dotenv
GEMINI_API_KEY=your_key
GEMINI_MODEL=gemini-3.5-flash-lite
```

`GEMINI_MODEL` is optional; `gemini-3.5-flash-lite` is the code default. Obtain keys from [Google AI Studio](https://aistudio.google.com/app/apikey). Never commit an API key.

For Firebase production, use Secret Manager:

```bash
firebase functions:secrets:set GEMINI_API_KEY --project nilushandevelopment
```

See [Firebase deployment](../deployment/firebase.md) for the complete release process.

## Content sources

Every AI request receives context generated from:

- Personal details, skills, experience, education, and interests in `src/data/portfolio.ts`
- Published entries in `src/content/blog/`
- Project case studies in `src/content/projects/`

Update those source files rather than maintaining a separate chatbot knowledge base.

## Behavior

- The API accepts POST requests with `message` and optional `conversationHistory`.
- Gemini responses are limited to 800 output tokens.
- Chat responses are not cached by the server.
- The widget stores up to 50 messages in browser `localStorage`.
- Rendered response markup is sanitized with DOMPurify.
- If the API is unavailable, common questions receive answers generated locally from portfolio data.

## Local testing

```bash
pnpm dev
```

Open the chat widget and ask about skills, experience, projects, GCP, CI/CD, or contact details. To test the fallback, leave `GEMINI_API_KEY` empty or temporarily make `/api/chat` unavailable.

You can test the API directly:

```bash
curl -X POST http://localhost:4321/api/chat \
  -H 'content-type: application/json' \
  -d '{"message":"What is Nilushan’s GCP experience?"}'
```

## Customization

- Model and generation limits: `src/pages/api/chat.ts`
- Tone and grounding rules: `generateSystemPrompt()` in `src/lib/chatbot-context.ts`
- Common offline answers: `getPortfolioFallback()` in `src/components/Chatbot.tsx`
- Widget styles and behavior: `src/components/Chatbot.tsx`

## Security and operations

- Keep keys in `.env.local` or Firebase Secret Manager only.
- Rotate a key immediately if it appears in a commit, log, screenshot, or document.
- The endpoint currently has no durable distributed rate limiter. Add platform-level protection before high-traffic promotion.
- Avoid adding private information to the aggregated collections: content included in the prompt is sent to Gemini.

## Troubleshooting

### The widget does not appear

Confirm `Chatbot` is rendered with `client:load` in `src/layouts/Layout.astro` and check the browser console.

### The API returns a configuration error

Confirm `GEMINI_API_KEY` is available to the Astro process locally or bound to the Firebase function in production.

### The response uses fallback content

Inspect the browser network request to `/api/chat`, then check Firebase logs if the production request failed.
