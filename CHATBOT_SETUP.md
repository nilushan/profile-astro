# AI Chatbot Setup Guide

A cost-effective, context-aware chatbot for your portfolio website powered by Google Gemini Flash 2.0.

## Overview

This chatbot implementation provides visitors with an interactive way to learn about your portfolio through conversational AI. It's designed to be:

- **Ultra-low cost**: ~$0.0001 per conversation using Gemini Flash 2.0
- **Simple architecture**: No vector databases or complex RAG pipelines
- **Always accurate**: Full portfolio context loaded into every request
- **Easy to maintain**: Content auto-updates from your portfolio files

## Architecture

```
User → React Chatbot UI → API Route → Context Aggregator → Gemini Flash → Response
```

### How It Works

1. **Content Aggregation** (`src/lib/chatbot-context.ts`):
   - Loads all content from `portfolio.ts`, blog posts, and projects
   - Aggregates into a single context string (~50-100KB)
   - Generates system prompt with full portfolio knowledge

2. **API Endpoint** (`src/pages/api/chat.ts`):
   - Receives user messages via POST request
   - Includes full portfolio context in system prompt
   - Calls Gemini Flash 2.0 with conversation history
   - Streams responses back to UI

3. **UI Component** (`src/components/Chatbot.tsx`):
   - Floating chat button (bottom-right)
   - DaisyUI-styled chat interface
   - Conversation history management
   - Loading states and error handling

## Setup Instructions

### 1. Get a Gemini API Key

1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Get API Key" or "Create API Key"
4. Copy the generated API key

### 2. Configure Environment Variables

Create a `.env` file in the project root (or update existing):

```bash
# AI Chatbot Configuration
GEMINI_API_KEY=your_api_key_here
```

**For production (Firebase/Vercel/Netlify):**
- Add `GEMINI_API_KEY` as a secret/environment variable in your deployment platform
- Ensure the variable is available at build time and runtime

### 3. Test Locally

```bash
# Install dependencies (if not already done)
pnpm install

# Start development server
pnpm dev

# Visit http://localhost:4321
# Look for the floating chat button in bottom-right corner
```

### 4. Test the Chatbot

Try these example questions:
- "What technologies does Nilushan work with?"
- "Tell me about the IoT platform project"
- "What's Nilushan's experience with GCP?"
- "Does Nilushan have experience with React?"

## Cost Analysis

### Gemini Flash 2.0 Pricing (as of 2025)
- **Input**: $0.075 per 1M tokens
- **Output**: $0.30 per 1M tokens

### Typical Usage:
- **Context size**: ~20,000 tokens (your full portfolio)
- **User message**: ~50 tokens
- **Response**: ~200 tokens
- **Total per conversation**: ~20,250 tokens

### Cost Calculation:
```
Input:  20,050 tokens × $0.075 / 1M = $0.0015
Output:    200 tokens × $0.30  / 1M = $0.0001
Total:  ~$0.0016 per conversation
```

### Monthly Estimates:
- **100 conversations/month**: ~$0.16/month
- **500 conversations/month**: ~$0.80/month
- **1,000 conversations/month**: ~$1.60/month

**Note**: These costs are EXTREMELY low compared to:
- Vector databases (Pinecone: $70/month minimum)
- Embedding APIs (OpenAI: $0.13 per 1M tokens)
- Other LLMs (GPT-4: $30 per 1M tokens)

## Content Sources

The chatbot has access to:

1. **Portfolio Data** (`src/data/portfolio.ts`):
   - Personal information
   - Skills and technologies
   - Work experience with detailed achievements
   - Education and interests

2. **Blog Posts** (`src/content/blog/*.mdx`):
   - All published blog articles
   - Technical content and insights

3. **Projects** (`src/content/projects/*.mdx`):
   - Project case studies
   - Technologies used
   - Achievements and outcomes

## Adding Private Content

To include unpublished/private documents:

### Option 1: Add to Content Collections

```markdown
<!-- src/content/private/notes.mdx -->
---
title: "Private Notes"
published: false
---

Your private content here...
```

Then update `chatbot-context.ts`:

```typescript
// Add after projects section
try {
  const privateNotes = await getCollection('private');
  sections.push(`# PRIVATE NOTES\n\n${privateNotes.map(note => note.body).join('\n\n')}`);
  sources.push(`content/private (${privateNotes.length} notes)`);
} catch (error) {
  console.warn('Could not load private notes:', error);
}
```

### Option 2: Load from External Files

```typescript
// In chatbot-context.ts
import { readFile } from 'fs/promises';

// Inside aggregatePortfolioContext()
try {
  const privateContent = await readFile('./private/notes.txt', 'utf-8');
  sections.push(`# PRIVATE INFORMATION\n\n${privateContent}`);
  sources.push('private/notes.txt');
} catch (error) {
  console.warn('Could not load private content:', error);
}
```

## Customization

### Change Response Length

Edit `src/pages/api/chat.ts`:

```typescript
generationConfig: {
  maxOutputTokens: 800, // Increase for longer responses
  temperature: 0.7,     // Higher = more creative, lower = more focused
}
```

### Modify System Prompt

Edit `src/lib/chatbot-context.ts` → `generateSystemPrompt()`:

```typescript
export function generateSystemPrompt(context: string): string {
  return `You are an AI assistant for Nilushan Silva's portfolio...

  // Add custom instructions here
  // Change tone, add constraints, etc.
  `;
}
```

### Styling Changes

Edit `src/components/Chatbot.tsx`:
- DaisyUI classes control the appearance
- Modify colors, sizes, positions as needed
- Chat button position: `bottom-6 right-6` (line 138)
- Chat window size: `w-96` (line 149)

## Deployment

### Firebase Hosting (Current Setup)

Update `.firebaserc` and `firebase.json` if needed. The chatbot will work automatically with hybrid mode.

### Vercel

1. Add `GEMINI_API_KEY` to Environment Variables in Vercel dashboard
2. Deploy normally - hybrid mode is already configured

### Netlify

1. Add `GEMINI_API_KEY` to Environment Variables in Netlify dashboard
2. Add Netlify adapter:
   ```bash
   pnpm add @astrojs/netlify
   ```
3. Update `astro.config.mjs`:
   ```javascript
   import netlify from '@astrojs/netlify';

   export default defineConfig({
     output: 'hybrid',
     adapter: netlify(),
     // ... rest of config
   });
   ```

## Troubleshooting

### Chatbot button doesn't appear
- Check browser console for errors
- Verify `Chatbot` component is imported in `Layout.astro`
- Ensure `client:load` directive is present

### API errors
- Verify `GEMINI_API_KEY` is set correctly
- Check API key has proper permissions at [AI Studio](https://aistudio.google.com)
- Look at server logs for detailed error messages

### "Context too large" errors
- Gemini Flash supports 1M token context window
- If content exceeds this, reduce truncation limits in `chatbot-context.ts`:
  ```typescript
  ${content.slice(0, 2000)}  // Reduce from 3000 to 2000
  ```

### Slow responses
- Normal response time: 1-3 seconds
- Large context increases processing time
- Consider caching context aggregation result

## Security Considerations

### API Key Security
- **Never commit** `.env` files to git (already in `.gitignore`)
- Use environment variables for production
- Rotate keys periodically

### Rate Limiting
Consider adding rate limiting to prevent abuse:

```typescript
// In src/pages/api/chat.ts
const rateLimitMap = new Map();

// Add rate limit check
const clientIp = request.headers.get('x-forwarded-for') || 'unknown';
const lastRequest = rateLimitMap.get(clientIp);
if (lastRequest && Date.now() - lastRequest < 2000) {
  return new Response('Rate limit exceeded', { status: 429 });
}
rateLimitMap.set(clientIp, Date.now());
```

### Content Filtering
The chatbot system prompt instructs it to:
- Only answer based on provided context
- Not make up information
- Direct hiring inquiries to email

## Future Enhancements

Potential improvements for later:

1. **Analytics**: Track popular questions, conversation length
2. **Feedback**: Add thumbs up/down for responses
3. **Suggested Questions**: Show common questions as buttons
4. **Conversation Persistence**: Save chat history to localStorage
5. **Multi-language**: Add translation support
6. **Voice Input**: Add speech-to-text for questions
7. **Upgrade to RAG**: If content grows beyond context window

## Support

For issues or questions:
- Check the Gemini API documentation: https://ai.google.dev/docs
- Review Astro hybrid mode docs: https://docs.astro.build/en/guides/server-side-rendering/

## License

This implementation is part of your portfolio project and follows the same license.

---

**Built with**:
- Google Gemini Flash 2.0 (LLM)
- Astro 5 (Framework)
- React 19 (UI)
- DaisyUI (Styling)
- TypeScript (Type Safety)
