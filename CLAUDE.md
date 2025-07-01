# Claude Development Guide

This document outlines the development practices and conventions for this Astro portfolio project.

## Project Architecture

### Framework Stack
- **Astro 5.x** - Main framework for static site generation
- **React 19.x** - For interactive components (islands architecture)
- **TypeScript** - Strict typing with path aliases (`@/*`)
- **Tailwind CSS v4** - Utility-first styling
- **DaisyUI** - Component library with theme support
- **shadcn/ui** - Radix UI primitives for advanced components

### Package Manager
- Use **pnpm** for all package management
- Lock file: `pnpm-lock.yaml`

## File Structure & Conventions

### Directory Organization
```
src/
├── components/
│   ├── ui/           # shadcn/ui components (React)
│   ├── navigation/   # Navigation components
│   ├── sections/     # Page sections (Astro)
│   └── *.astro       # Reusable Astro components
├── content/
│   ├── blog/         # Blog posts (.mdx)
│   ├── projects/     # Project case studies (.mdx)
│   └── docs/         # Knowledge base (Starlight)
├── data/             # Centralized data (portfolio.ts)
├── layouts/          # Page layouts
├── lib/              # Utilities and helpers
├── pages/            # Route pages
└── styles/           # Global CSS
```

### Naming Conventions
- **Files**: kebab-case (`hero-section.astro`)
- **Components**: PascalCase (`HeroSection`)
- **Directories**: lowercase with hyphens
- **TypeScript interfaces**: PascalCase with descriptive names

## Component Architecture

### Astro Components (.astro)
- Use for static content and layouts
- Import data from `@/data/portfolio.ts`
- Follow frontmatter → template structure
- Example: `src/components/sections/Hero.astro`

### React Components (.tsx)
- Use for interactive elements only
- Import from `@/components/ui/` for shadcn components
- Use TypeScript interfaces for props
- Example: `src/components/ModeToggle.tsx`

### Component Variants
- Use `class-variance-authority` for systematic styling variants
- Pattern: `buttonVariants = cva(baseClasses, { variants: {...} })`
- Example: `src/components/ui/button.tsx`

## Styling Practices

### CSS Framework
- **Primary**: DaisyUI component classes (`btn`, `hero`, `card`)
- **Utility**: Tailwind classes for customization
- **Custom**: CSS custom properties for theme variables

### Theme System
- **Multi-theme support**: 20+ DaisyUI themes configured
- **Theme-specific fonts**: Different fonts per theme in `global.css`
- **Theme persistence**: Uses localStorage with FART prevention
- **Theme switching**: Via `ModeToggle.tsx` component

### Responsive Design
- **Mobile-first**: Design for mobile, enhance for desktop
- **Breakpoints**: Use Tailwind's responsive prefixes (`sm:`, `lg:`)
- **Containers**: Use DaisyUI container classes

## Content Management

### Content Collections
- **Projects**: `.mdx` files in `src/content/projects/`
- **Blog**: `.mdx` files in `src/content/blog/`
- **Docs**: Starlight integration for knowledge base

### Data Structure
- **Portfolio data**: Centralized in `src/data/portfolio.ts`
- **Type safety**: Zod schemas in `src/content.config.ts`
- **Content frontmatter**: Follow established schema patterns

### Content Schema Example
```typescript
// For projects
{
  title: string
  description: string
  period: string
  technologies: string[]
  achievements: string[]
  // ... see content.config.ts for full schema
}
```

## Development Practices

### TypeScript Configuration
- **Strict mode**: Enabled with Astro's strict tsconfig
- **Path aliases**: `@/*` maps to `./src/*`
- **JSX**: React JSX with `react-jsx` transform

### Import Patterns
```typescript
// Correct import patterns
import { portfolioData } from '@/data/portfolio'
import { Button } from '@/components/ui/button'
import Layout from '@/layouts/Layout.astro'
```

### Component Patterns
```astro
---
// Astro component frontmatter
import { portfolioData } from '@/data/portfolio'
const { personal } = portfolioData
---

<section class="hero min-h-screen">
  <!-- Use DaisyUI classes for base styling -->
  <!-- Add Tailwind utilities for customization -->
</section>
```

## Build & Development

### Scripts
- `pnpm dev` - Development server
- `pnpm build` - Production build
- `pnpm preview` - Preview production build

### Configuration Files
- `astro.config.mjs` - Astro configuration with integrations
- `tsconfig.json` - TypeScript configuration
- `components.json` - shadcn/ui configuration

## Performance & SEO

### Optimization Practices
- **Static generation**: Pre-render all possible pages
- **Font loading**: Preload critical fonts with `display=swap`
- **Image optimization**: Use Astro's built-in optimizations
- **Bundle splitting**: Leverage Astro's automatic code splitting

### SEO Implementation
- **Meta tags**: Comprehensive OpenGraph and Twitter cards
- **Canonical URLs**: Dynamic canonical URL generation
- **Structured data**: Use semantic HTML and proper headings

## Code Quality

### Accessibility
- Use semantic HTML elements
- Include `sr-only` classes for screen readers
- Proper ARIA labels and roles
- Keyboard navigation support

### Performance
- Minimize JavaScript: Use Astro components when possible
- Optimize images: Proper sizing and formats
- Font optimization: Strategic font loading

## Theme Integration

### DaisyUI Themes
- **Default**: `light` theme
- **Dark mode**: `dark` theme with `prefers-color-scheme`
- **Additional themes**: Corporate, synthwave, retro, etc.
- **Font mapping**: Each theme has specific font families

### Custom Utilities
```css
.font-theme-sans { font-family: var(--font-family-sans); }
.line-clamp-3 { /* WebKit line clamping */ }
```

## Content Guidelines

### Writing Style
- **Concise**: Clear, professional language
- **Technical**: Include specific technologies and metrics
- **Consistent**: Follow established tone and structure

### Project Documentation
- Include problem, solution, and outcomes
- List technologies and achievements
- Add challenges and learnings when relevant

## Future Considerations

### CMS Integration
- Portfolio data structure is CMS-ready
- Content collections support external data sources
- Schema validation ensures data consistency

### Deployment
- Static site generation compatible with any hosting
- Build output in `dist/` directory
- Environment-specific configurations supported

---

**Last Updated**: 2025-01-01
**Astro Version**: 5.10.1
**Node Version**: 18.x or higher required