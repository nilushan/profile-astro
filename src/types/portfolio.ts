/**
 * Shared TypeScript interfaces for portfolio data
 * These types ensure consistency across components and data structures
 */

// Personal Information Types
export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  location: string;
  yearsExperience: number;
  summary: string[];
  social: SocialLinks;
  github: string; // Deprecated: use social.github instead
  linkedin: string; // Deprecated: use social.linkedin instead
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
  name: string;
  skills: Skill[];
  icon?: string;
  description?: string;
}

export interface Skill {
  name: string;
  level: SkillLevel;
  yearsExperience?: number;
  category?: string;
  keywords?: string[];
}

export type SkillLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';

// Experience Types
export interface Experience {
  id: string;
  company: string;
  position: string;
  period: string;
  startDate: string;
  endDate?: string;
  location: string;
  type: EmploymentType;
  description: string;
  achievements: string[];
  technologies: string[];
  projects?: ExperienceProject[];
  team_size?: number;
  reporting_to?: string;
}

export interface ExperienceProject {
  name: string;
  description: string;
  technologies: string[];
  achievements: string[];
}

export type EmploymentType = 'full-time' | 'part-time' | 'contract' | 'freelance' | 'internship';

// Education Types
export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  period: string;
  startDate: string;
  endDate: string;
  gpa?: number;
  honors?: string[];
  relevant_courses?: string[];
  projects?: string[];
}

// Certificate Types
export interface Certificate {
  id: string;
  name: string;
  issuer: string;
  date: string;
  expiry?: string;
  credential_id?: string;
  verification_url?: string;
  skills?: string[];
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

// Main Portfolio Data Interface
export interface PortfolioData {
  personal: PersonalInfo;
  navigation: NavigationItem[];
  projects: Project[];
  skills: SkillCategory[];
  experience: Experience[];
  education: Education[];
  certificates: Certificate[];
  featured_projects?: string[]; // Array of project IDs
  featured_skills?: string[]; // Array of skill names
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