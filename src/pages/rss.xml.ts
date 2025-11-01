import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { portfolioData } from '@/data/portfolio';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const blog = await getCollection('blog');

  // Filter out drafts and sort by publish date
  const publishedPosts = blog
    .filter((post) => !post.data.draft)
    .sort((a, b) => {
      const dateA = new Date(a.data.publishDate);
      const dateB = new Date(b.data.publishDate);
      return dateB.getTime() - dateA.getTime();
    });

  return rss({
    title: `${portfolioData.personal.name}'s Blog`,
    description: 'Technical articles about software development, cloud architecture, and IoT',
    site: context.site || 'https://www.nilushansilva.info',
    items: publishedPosts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: new Date(post.data.publishDate),
      author: post.data.author || portfolioData.personal.email,
      categories: [...(post.data.tags || []), post.data.category].filter(Boolean),
      link: `/blog/${post.slug}/`,
    })),
    customData: `<language>en-us</language>`,
    stylesheet: '/rss-styles.xsl',
  });
}
