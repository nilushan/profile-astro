/**
 * Portfolio Chatbot Widget
 *
 * A floating chatbot interface that helps visitors learn about
 * the portfolio through conversational AI.
 */

import { useState, useRef, useEffect } from 'react';
import DOMPurify from 'dompurify';
import { portfolioData } from '@/data/portfolio';

/**
 * Mobile keyboard detection hook using Visual Viewport API
 * Returns the current viewport height adjusted for keyboard presence
 */
function useViewportHeight() {
  const [viewportHeight, setViewportHeight] = useState<number>(() => {
    if (typeof window === 'undefined') return 0;
    return window.visualViewport?.height || window.innerHeight;
  });

  useEffect(() => {
    if (typeof window === 'undefined' || !window.visualViewport) return;

    const handleResize = () => {
      setViewportHeight(window.visualViewport!.height);
    };

    window.visualViewport.addEventListener('resize', handleResize);
    window.visualViewport.addEventListener('scroll', handleResize);

    return () => {
      window.visualViewport?.removeEventListener('resize', handleResize);
      window.visualViewport?.removeEventListener('scroll', handleResize);
    };
  }, []);

  return viewportHeight;
}

/**
 * Simple markdown-to-HTML converter for chat messages
 * Supports: links, bold, italic, code blocks, inline code
 * Output is sanitized with DOMPurify for XSS protection
 */
function parseMarkdown(text: string): string {
  const html = text
    // Links: [text](url)
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="link link-primary underline" target="_blank" rel="noopener noreferrer">$1</a>')
    // Bold: **text** or __text__
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/__([^_]+)__/g, '<strong>$1</strong>')
    // Italic: *text* or _text_
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replace(/_([^_]+)_/g, '<em>$1</em>')
    // Inline code: `code`
    .replace(/`([^`]+)`/g, '<code class="bg-base-300 px-1 rounded">$1</code>')
    // Line breaks
    .replace(/\n/g, '<br/>');

  // Sanitize to prevent XSS attacks
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['a', 'strong', 'em', 'code', 'br'],
    ALLOWED_ATTR: ['href', 'class', 'target', 'rel'],
  });
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

/**
 * Reliable, client-side answers for the most common portfolio questions.
 * Firebase Hosting can serve these even when the optional AI API is unavailable.
 */
function getPortfolioFallback(question: string): string {
  const query = question.toLowerCase();
  const { personal, skills, experience } = portfolioData;
  const currentRole = experience[0];

  if (/contact|email|phone|linkedin|github|reach/.test(query)) {
    return `You can contact Nilushan at **${personal.email}**, connect on [LinkedIn](https://linkedin.com/in/${personal.social.linkedin}), or view his work on [GitHub](https://github.com/${personal.social.github}).`;
  }

  if (/c#|c sharp|java|c\+\+|older language|previous language/.test(query)) {
    return `Nilushan's current hands-on stack is TypeScript and Node.js. He previously worked professionally with **C#, Java, C++, and PHP** and can refresh those ecosystems when a role requires them. See [Skills](/skills) for context.`;
  }

  if (/typescript|node|current stack|tech stack|programming|language/.test(query)) {
    return `Nilushan currently works primarily with **TypeScript, Node.js, React, PostgreSQL, and Google Cloud Platform**. His backend experience includes ${skills.backend.slice(0, 4).join(', ')}. See the full [Skills page](/skills).`;
  }

  if (/cost|partition|postgres|cloud sql|logging|stackdriver/.test(query)) {
    return `His recent GCP cost-optimisation work uses **monthly Cloud SQL PostgreSQL partitions**, historical-data archival, partition-based retention, and focused Cloud Logging. This controls active storage growth and improves recent time-series query paths. Read the [GCP cost optimisation case study](/projects/gcp-cost-optimization).`;
  }

  if (/ci\/cd|pipeline|artifact|kustomize|federation|wif|identity|keyless/.test(query)) {
    return `Nilushan built a build-once, multi-environment delivery workflow using **GitHub Actions, Artifact Registry, Kubernetes, Kustomize, Cloud Run, Firebase, and Workload Identity Federation**. Read the [keyless CI/CD case study](/projects/cicd-keyless-delivery).`;
  }

  if (/agent|ai|llm|claude|codex|grok|voice/.test(query)) {
    return `Nilushan uses coding agents during planning, implementation, testing, and review while retaining human ownership of architecture and quality. His learning projects include [SmartSMB](/projects/smartsmb-agentic-workflow), a human-in-the-loop quoting workflow, and an [AI voice service-agent prototype](/projects/ai-voice-service-agent).`;
  }

  if (/experience|career|current role|work|zimi/.test(query)) {
    return `Nilushan has **${personal.yearsExperience}+ years** of software experience and currently works as **${currentRole.title} at ${currentRole.company}**. His work spans production GCP infrastructure, TypeScript services, React interfaces, IoT systems, CI/CD, and third-party integrations. See [Experience](/experience).`;
  }

  if (/project|portfolio|built|case stud/.test(query)) {
    return `Key projects include a 55,000+ device [IoT platform migration](/projects/iot-platform-migration), [GCP cost optimisation](/projects/gcp-cost-optimization), [keyless CI/CD](/projects/cicd-keyless-delivery), third-party APIs, voice integrations, and agentic-AI learning projects. Browse [all projects](/projects).`;
  }

  return `I can help with Nilushan's **skills, experience, GCP work, CI/CD, programming languages, AI projects, or contact details**. You can also explore [Projects](/projects), [Experience](/experience), and [Skills](/skills).`;
}

const CHAT_STORAGE_KEY = 'portfolio-chatbot-history';
const MAX_STORED_MESSAGES = 50; // Limit storage size

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const viewportHeight = useViewportHeight();

  // Detect if we're on mobile (screen width < 640px, which is Tailwind's 'sm' breakpoint)
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Initialize messages from localStorage or default welcome message
  const [messages, setMessages] = useState<Message[]>(() => {
    if (typeof window === 'undefined') return [];

    try {
      const stored = localStorage.getItem(CHAT_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Convert timestamp strings back to Date objects
        return parsed.map((msg: Message) => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
        }));
      }
    } catch (error) {
      console.error('Failed to load chat history:', error);
    }

    // Default welcome message
    return [
      {
        role: 'assistant',
        content: "Hi! I'm here to help you learn about Nilushan Silva's background, skills, and projects. What would you like to know?",
        timestamp: new Date(),
      },
    ];
  });

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      // Keep only the last MAX_STORED_MESSAGES to prevent localStorage from getting too large
      const messagesToStore = messages.slice(-MAX_STORED_MESSAGES);
      localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(messagesToStore));
    } catch (error) {
      console.error('Failed to save chat history:', error);
    }
  }, [messages]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when chat opens and scroll into view on mobile
  useEffect(() => {
    if (isOpen) {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        inputRef.current?.focus();

        // On mobile, scroll input into view when keyboard opens
        if (isMobile && inputRef.current) {
          inputRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }, 100);
    }
  }, [isOpen, isMobile]);

  // Re-scroll to bottom when viewport height changes (keyboard opens/closes)
  useEffect(() => {
    if (isOpen && isMobile) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [viewportHeight, isOpen, isMobile]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Call API with conversation history
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage.content,
          conversationHistory: messages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.error || `Chat request failed (${response.status})`);
      }

      if (typeof data.response !== 'string' || !data.response.trim()) {
        throw new Error('Chat API returned an empty response');
      }

      const assistantMessage: Message = {
        role: 'assistant',
        content: data.response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat error:', error);

      const errorMessage: Message = {
        role: 'assistant',
        content: getPortfolioFallback(userMessage.content),
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearHistory = () => {
    if (confirm('Clear all chat history? This cannot be undone.')) {
      const welcomeMessage: Message = {
        role: 'assistant',
        content: "Hi! I'm here to help you learn about Nilushan Silva's background, skills, and projects. What would you like to know?",
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
      localStorage.removeItem(CHAT_STORAGE_KEY);
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="btn btn-circle btn-primary btn-lg fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 shadow-lg hover:shadow-xl transition-all"
        aria-label="Toggle chat"
      >
        {isOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
            />
          </svg>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          className="card bg-base-100 shadow-2xl fixed w-full sm:w-96 max-w-[calc(100vw-2rem)] sm:max-w-[calc(100vw-3rem)] z-40 border border-base-300"
          style={
            isMobile
              ? {
                  bottom: '80px', // Space for floating button
                  maxHeight: `${viewportHeight - 100}px`, // Adjust for keyboard
                  right: '0.5rem',
                  left: '0.5rem',
                  width: 'calc(100% - 1rem)',
                }
              : {
                  bottom: '6rem',
                  right: '1.5rem',
                }
          }
        >
          {/* Header */}
          <div className="card-body p-0">
            <div className="bg-primary text-primary-content px-3 py-2.5 sm:px-4 sm:py-3 rounded-t-2xl flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-base sm:text-lg">Ask About Nilushan</h3>
                <p className="text-xs sm:text-sm opacity-90">Answers from portfolio content</p>
              </div>
              <button
                onClick={clearHistory}
                className="btn btn-ghost btn-xs btn-circle text-primary-content opacity-70 hover:opacity-100"
                title="Clear chat history"
                aria-label="Clear chat history"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div
              className="flex flex-col gap-3 p-3 sm:p-4 overflow-y-auto"
              style={
                isMobile
                  ? {
                      height: `${Math.min(viewportHeight - 280, viewportHeight * 0.6)}px`,
                      maxHeight: `${viewportHeight - 280}px`, // Subtract header + input area + margins
                    }
                  : {
                      height: '24rem', // 384px (sm:h-96)
                      maxHeight: '500px',
                    }
              }
            >
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`chat ${msg.role === 'user' ? 'chat-end' : 'chat-start'}`}
                >
                  <div className="chat-image avatar">
                    <div className="w-7 sm:w-8 h-7 sm:h-8 rounded-full bg-base-300 flex items-center justify-center">
                      {msg.role === 'user' ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
                          />
                        </svg>
                      )}
                    </div>
                  </div>
                  <div
                    className={`chat-bubble ${
                      msg.role === 'user'
                        ? 'chat-bubble-primary'
                        : 'bg-base-200 text-base-content'
                    } max-w-[75%] sm:max-w-xs text-sm sm:text-base`}
                  >
                    {msg.role === 'user' ? (
                      msg.content
                    ) : (
                      <span dangerouslySetInnerHTML={{ __html: parseMarkdown(msg.content) }} />
                    )}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="chat chat-start">
                  <div className="chat-image avatar">
                    <div className="w-7 sm:w-8 h-7 sm:h-8 rounded-full bg-base-300 flex items-center justify-center">
                      <span className="loading loading-dots loading-xs"></span>
                    </div>
                  </div>
                  <div className="chat-bubble bg-base-200 text-base-content text-sm sm:text-base">
                    <span className="loading loading-dots loading-sm"></span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="px-3 pb-3 pt-2 sm:px-4 sm:pb-4 border-t border-base-300">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask a question..."
                  className="input input-bordered flex-1 input-sm sm:input-md text-sm sm:text-base"
                  disabled={isLoading}
                />
                <button
                  onClick={sendMessage}
                  disabled={!input.trim() || isLoading}
                  className="btn btn-primary btn-sm sm:btn-md px-3 sm:px-4"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                    />
                  </svg>
                </button>
              </div>
              <p className="text-xs sm:text-sm text-base-content/60 mt-1.5 sm:mt-2">
                Answers are based on published portfolio information
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
