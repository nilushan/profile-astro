/**
 * Shared TypeScript interfaces for portfolio data
 * These types ensure consistency across components and data structures
 */

// Personal Information Types
export interface PersonalInfo {
  name: string;
  title: string;
  tagline: string;
  email: string;
  phone: string;
  location: string;
  social: SocialLinks;
  heroSummary: string;
  summary: string[];
  yearsExperience: number;
}

export interface SocialLinks {
  github: string;
  linkedin: string;
  twitter?: string;
  website?: string;
  blog?: string;
}

// Navigation Types
export interface NavigationItem {
  name: string;
  href: string;
  description?: string;
}

// Project Types
export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  period: string;
  status: ProjectStatus;
  type: ProjectType;
  technologies: string[];
  achievements: string[];
  challenges?: string[];
  learnings?: string[];
  image?: string;
  images?: ProjectImage[];
  links?: ProjectLinks;
  metrics?: ProjectMetrics;
  team?: TeamMember[];
}

export interface ProjectImage {
  src: string;
  alt: string;
  caption?: string;
  type?: 'hero' | 'screenshot' | 'diagram' | 'result';
}

export interface ProjectLinks {
  demo?: string;
  github?: string;
  documentation?: string;
  case_study?: string;
  blog_post?: string;
}

export interface ProjectMetrics {
  users?: number;
  performance_improvement?: string;
  cost_savings?: string;
  uptime?: string;
  response_time?: string;
  [key: string]: string | number | undefined;
}

export interface TeamMember {
  name: string;
  role: string;
  linkedin?: string;
}

export type ProjectStatus = 'completed' | 'in-progress' | 'planned' | 'on-hold';
export type ProjectType = 'web-app' | 'mobile-app' | 'api' | 'infrastructure' | 'iot' | 'ai-ml' | 'data' | 'research';

// Skills Types
export interface SkillCategory {
  title: string;
  icon: string;
  color: 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error';
  description?: string;
  skills: string[];
}

export interface Skills {
  programming: string[];
  frontend: string[];
  backend: string[];
  databases: string[];
  cloud: {
    gcp: {
      actively: string[];
      familiar: string[];
    };
    aws: {
      familiar: string[];
    };
    azure: {
      familiar: string[];
    };
  };
  devops: string[];
  tools: string[];
}

export type SkillLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';

// Experience Types
export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  period: string;
  type: EmploymentType;
  description: string;
  highlights: Highlight[];
  technologies: string[];
}

export interface Highlight {
  title: string;
  description: string;
}

export type EmploymentType = 'full-time' | 'part-time' | 'contract' | 'freelance' | 'internship';

// Education Types
export interface Education {
  degree: string;
  institution: string;
  location: string;
  period: string;
}

// Interests Types
export interface Interest {
  title: string;
  description: string;
  items?: string[];
}

// Blog Post Types
export interface BlogPost {
  id: string;
  title: string;
  description: string;
  date: string;
  readTime: number;
  tags: string[];
  featured: boolean;
  published: boolean;
  slug: string;
  excerpt?: string;
  cover_image?: string;
  author?: Author;
  seo?: SEOData;
}

export interface Author {
  name: string;
  avatar?: string;
  bio?: string;
  social?: SocialLinks;
}

// SEO Types
export interface SEOData {
  title?: string;
  description?: string;
  keywords?: string[];
  canonical_url?: string;
  og_image?: string;
  twitter_card?: 'summary' | 'summary_large_image' | 'app' | 'player';
}

// Call to Action Type
export interface CallToAction {
  label: string;
  title: string;
  description: string;
  primaryButton: {
    text: string;
    href: string;
  };
  secondaryButton: {
    text: string;
    href: string;
  };
}

// Main Portfolio Data Interface
export interface PortfolioData {
  personal: PersonalInfo;
  skills: Skills;
  skillCategories: SkillCategory[];
  experience: Experience[];
  education: Education;
  interests: Interest[];
  cta: CallToAction;
  ctas: {
    home: CallToAction;
    experience: CallToAction;
    skills: CallToAction;
    about: CallToAction;
    blog: CallToAction;
    projects: CallToAction;
  };
}

// Component Props Types
export interface ProjectCardProps {
  project: Project;
  showFullDescription?: boolean;
  className?: string;
}

export interface SkillBadgeProps {
  skill: Skill;
  showLevel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outline' | 'secondary';
}

export interface ExperienceCardProps {
  experience: Experience;
  showProjects?: boolean;
  className?: string;
}

// Theme Types (re-exported from theme-manager)
export type { ThemeName } from '@/lib/theme-manager';

// Utility Types
export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type RequiredBy<T, K extends keyof T> = T & Required<Pick<T, K>>;

// API Response Types (for future CMS integration)
export interface APIResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  errors?: APIError[];
}

export interface APIError {
  field?: string;
  message: string;
  code?: string;
}

// Search and Filter Types
export interface SearchFilters {
  query?: string;
  technologies?: string[];
  project_type?: ProjectType[];
  date_range?: {
    start: string;
    end: string;
  };
  status?: ProjectStatus[];
}

export interface SearchResult<T> {
  items: T[];
  total: number;
  page: number;
  per_page: number;
  has_more: boolean;
}

// Form Types
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  honeypot?: string; // Bot detection
}

export interface NewsletterFormData {
  email: string;
  preferences?: string[];
}

// Analytics Types
export interface PageView {
  page: string;
  timestamp: number;
  user_agent?: string;
  referrer?: string;
}

export interface ProjectInteraction {
  project_id: string;
  interaction_type: 'view' | 'demo_click' | 'github_click' | 'share';
  timestamp: number;
}