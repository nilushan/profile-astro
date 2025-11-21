/**
 * Chatbot Context Aggregator
 *
 * Aggregates all portfolio content into a single context string
 * for LLM consumption. Designed for small-scale content that fits
 * entirely within modern LLM context windows (1M+ tokens).
 */

import { getCollection } from 'astro:content';
import { portfolioData } from '@/data/portfolio';
import type { CollectionEntry } from 'astro:content';

interface ChatbotContext {
  text: string;
  metadata: {
    lastUpdated: string;
    contentSources: string[];
    totalCharacters: number;
  };
}

/**
 * Aggregates all portfolio content into a structured context string
 * @returns Promise<ChatbotContext> - Full context with metadata
 */
export async function aggregatePortfolioContext(): Promise<ChatbotContext> {
  const sections: string[] = [];
  const sources: string[] = [];

  // 1. Personal Information
  sections.push(`# PERSONAL INFORMATION
Name: ${portfolioData.personal.name}
Title: ${portfolioData.personal.title}
Location: ${portfolioData.personal.location}
Email: ${portfolioData.personal.email}
Years of Experience: ${portfolioData.personal.yearsExperience}
Tagline: ${portfolioData.personal.tagline}

Summary:
${portfolioData.personal.summary.join('\n\n')}

Hero Summary:
${portfolioData.personal.heroSummary}
`);
  sources.push('portfolio.ts:personal');

  // 2. Skills & Technologies
  sections.push(`# SKILLS & TECHNOLOGIES

## Programming Languages
${portfolioData.skills.programming.join(', ')}

## Frontend Development
${portfolioData.skills.frontend.join(', ')}

## Backend Development
${portfolioData.skills.backend.join(', ')}

## Databases
${portfolioData.skills.databases.join(', ')}

## Cloud Platforms

### Google Cloud Platform (GCP) - Actively Used
${portfolioData.skills.cloud.gcp.actively.join(', ')}

### GCP - Familiar With
${portfolioData.skills.cloud.gcp.familiar.join(', ')}

### AWS - Familiar With
${portfolioData.skills.cloud.aws.familiar.join(', ')}

### Azure - Familiar With
${portfolioData.skills.cloud.azure.familiar.join(', ')}

## DevOps & Tools
${portfolioData.skills.devops.join(', ')}

## Project Management & Documentation Tools
${portfolioData.skills.tools.join(', ')}

## Detailed Skill Categories
${portfolioData.skillCategories.map(cat => `
### ${cat.title}
${cat.description}
Skills: ${cat.skills.join(', ')}
`).join('\n')}
`);
  sources.push('portfolio.ts:skills');

  // 3. Work Experience
  sections.push(`# WORK EXPERIENCE

${portfolioData.experience.map(exp => `
## ${exp.title} at ${exp.company}
Period: ${exp.period}
Location: ${exp.location}
Type: ${exp.type}

Description:
${exp.description || 'N/A'}

Key Highlights:
${exp.highlights.map(h => `- **${h.title}**: ${h.description}`).join('\n')}

Technologies: ${exp.technologies.join(', ')}
`).join('\n---\n')}
`);
  sources.push('portfolio.ts:experience');

  // 4. Education
  sections.push(`# EDUCATION
Degree: ${portfolioData.education.degree}
Institution: ${portfolioData.education.institution}
Location: ${portfolioData.education.location}
Period: ${portfolioData.education.period}
`);
  sources.push('portfolio.ts:education');

  // 5. Interests & Learning
  sections.push(`# INTERESTS & CURRENT LEARNING

${portfolioData.interests.map(interest => {
    if (interest.items) {
      return `## ${interest.title}\n${interest.items.map(item => `- ${item}`).join('\n')}`;
    }
    return `## ${interest.title}\n${interest.description}`;
  }).join('\n\n')}

Current Learning: ${portfolioData.currentLearning}
`);
  sources.push('portfolio.ts:interests');

  // 6. Blog Posts
  try {
    const blogPosts = await getCollection('blog');
    sections.push(`# BLOG POSTS (${blogPosts.length} articles)

${blogPosts.map(post => formatBlogPost(post)).join('\n---\n')}
`);
    sources.push(`content/blog (${blogPosts.length} posts)`);
  } catch (error) {
    console.warn('Could not load blog posts:', error);
  }

  // 7. Projects (from content collections)
  try {
    const projects = await getCollection('projects');
    sections.push(`# PROJECTS (${projects.length} case studies)

${projects.map(project => formatProject(project)).join('\n---\n')}
`);
    sources.push(`content/projects (${projects.length} projects)`);
  } catch (error) {
    console.warn('Could not load projects:', error);
  }

  const fullContext = sections.join('\n\n');

  return {
    text: fullContext,
    metadata: {
      lastUpdated: new Date().toISOString(),
      contentSources: sources,
      totalCharacters: fullContext.length,
    },
  };
}

/**
 * Formats a blog post for context inclusion
 */
function formatBlogPost(post: CollectionEntry<'blog'>): string {
  const { data, body, id } = post;
  const content = body || '';
  // Remove file extension from id to get slug
  const slug = id.replace(/\.mdx?$/, '');
  return `
## Blog: ${data.title}
URL: /blog/${slug}
Published: ${data.publishDate}
${data.description ? `Description: ${data.description}` : ''}
${data.tags ? `Tags: ${data.tags.join(', ')}` : ''}

Content:
${content.slice(0, 3000)}${content.length > 3000 ? '...' : ''}
`;
}

/**
 * Formats a project for context inclusion
 */
function formatProject(project: CollectionEntry<'projects'>): string {
  const { data, body, id } = project;
  const content = body || '';
  // Remove file extension from id to get slug
  const slug = id.replace(/\.mdx?$/, '');
  return `
## Project: ${data.title}
URL: /projects/${slug}
Period: ${data.period}
${data.description ? `Description: ${data.description}` : ''}
${data.technologies ? `Technologies: ${data.technologies.join(', ')}` : ''}
${data.achievements ? `\nAchievements:\n${data.achievements.map(a => `- ${a}`).join('\n')}` : ''}

Details:
${content.slice(0, 2000)}${content.length > 2000 ? '...' : ''}
`;
}

/**
 * Generates the system prompt for the chatbot
 */
export function generateSystemPrompt(context: string): string {
  return `You are an AI assistant for Nilushan Silva's portfolio website. Your role is to help visitors learn about Nilushan's background, skills, experience, and projects.

CONTEXT:
You have access to complete information about Nilushan Silva including:
- Personal background and professional summary
- Technical skills and expertise
- Work experience with detailed achievements
- Project case studies
- Blog posts and articles
- Education and interests

Below is the complete portfolio content:

${context}

INSTRUCTIONS:
1. Answer questions accurately based ONLY on the provided context
2. Be friendly, professional, and helpful
3. If asked about something not in the context, politely say you don't have that information
4. Suggest relevant projects, blog posts, or experience when appropriate
5. Keep responses concise but informative (2-4 paragraphs maximum)
6. Use bullet points for lists when helpful
7. Don't make up information - stick to the facts in the context
8. If asked about availability or hiring, direct them to contact Nilushan via email: nilushan.silva@gmail.com

IMPORTANT - PROVIDING LINKS:
9. **ALWAYS provide clickable links** when mentioning blog posts or projects
10. Use this format for links:
    - Blog posts: [Blog Title](/blog/slug-from-filename)
    - Projects: [Project Title](/projects/slug-from-filename)
11. Extract the slug from the filename in the context (e.g., "c4-architecture-diagrams.mdx" → "/blog/c4-architecture-diagrams")
12. **NEVER say "you can find it on the website"** - always provide the actual link
13. When listing multiple items, provide links for each one

EXAMPLES:
- "What's that blog post about Mermaid diagrams?" → "You can read about it here: [Mermaid Diagrams in Software Development](/blog/mermaid-diagrams-software-development)"
- "Tell me about the IoT platform project" → "Here's the full case study: [IoT Platform Migration](/projects/iot-platform-migration)"
- "Show me some blog posts" → "Here are some recent posts: [C4 Architecture Diagrams](/blog/c4-architecture-diagrams), [Choosing the Right Tools](/blog/choosing-right-tools-web-development)"

Remember: You represent Nilushan Silva professionally. Be accurate, helpful, and authentic. Always provide direct links!`;
}
