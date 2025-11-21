/**
 * Chatbot API Endpoint
 *
 * Handles chat requests using Google Gemini Flash 2.0
 * with full portfolio context loaded into system prompt.
 *
 * Cost: ~$0.075 per 1M input tokens, $0.30 per 1M output tokens
 * Typical chat: ~0.0001 USD per conversation
 */

import type { APIRoute } from 'astro';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { aggregatePortfolioContext, generateSystemPrompt } from '@/lib/chatbot-context';

// Initialize Gemini with API key from environment
const GEMINI_API_KEY = import.meta.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  console.error('GEMINI_API_KEY not found in environment variables');
}

interface ChatRequest {
  message: string;
  conversationHistory?: Array<{
    role: 'user' | 'assistant';
    content: string;
  }>;
}

export const POST: APIRoute = async ({ request }) => {
  // Validate API key
  if (!GEMINI_API_KEY) {
    return new Response(
      JSON.stringify({
        error: 'Server configuration error: GEMINI_API_KEY not configured',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  try {
    // Parse request body
    const body: ChatRequest = await request.json();
    const { message, conversationHistory = [] } = body;

    if (!message || typeof message !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Invalid request: message is required' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Aggregate portfolio context
    const contextData = await aggregatePortfolioContext();
    const systemPrompt = generateSystemPrompt(contextData.text);

    // Initialize Gemini
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.0-flash-exp', // Ultra-cheap: $0.075/1M tokens input
      systemInstruction: systemPrompt,
    });

    // Build conversation history for Gemini format
    // Note: Gemini requires first message to be from 'user', so skip initial assistant greeting
    const history = conversationHistory
      .slice() // Create a copy to avoid modifying original
      .map((msg, idx) => {
        // Skip the first message if it's from assistant (welcome message)
        if (idx === 0 && msg.role === 'assistant') {
          return null;
        }
        return {
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.content }],
        };
      })
      .filter((msg) => msg !== null) as Array<{ role: string; parts: Array<{ text: string }> }>;

    // Start chat with history
    const chat = model.startChat({
      history,
      generationConfig: {
        maxOutputTokens: 800, // Keep responses concise
        temperature: 0.7, // Balanced creativity/consistency
        topP: 0.9,
        topK: 40,
      },
    });

    // Send message and get response
    const result = await chat.sendMessage(message);
    const response = result.response;
    const responseText = response.text();

    return new Response(
      JSON.stringify({
        response: responseText,
        metadata: {
          model: 'gemini-2.0-flash-exp',
          contextSize: contextData.metadata.totalCharacters,
          sources: contextData.metadata.contentSources,
          timestamp: new Date().toISOString(),
        },
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache', // Don't cache chat responses
        },
      }
    );
  } catch (error) {
    console.error('Chat API error:', error);

    return new Response(
      JSON.stringify({
        error: 'Failed to process chat request',
        details: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};

// Prerender: false to make this a server endpoint (SSR)
export const prerender = false;
