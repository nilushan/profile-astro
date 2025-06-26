# Nilushan Silva - Portfolio Website

A modern, responsive portfolio website built with Astro, TypeScript, and DaisyUI. This website showcases my professional experience, technical skills, and projects as a Full Stack & Cloud Engineer.

## 🚀 Live Demo

- **Production**: [www.nilushansilva.info](https://www.nilushansilva.info)
- **Development**: `npm run dev` (http://localhost:4321)

## ✨ Features

### 🎨 Modern Design
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Multiple Themes**: 8+ built-in themes including Professional, Dark, Cyberpunk, Synthwave
- **Semantic Colors**: Consistent color system using DaisyUI's semantic approach
- **Smooth Animations**: Subtle animations and transitions for enhanced UX

### 📱 Pages & Sections
- **Homepage**: Hero section, featured projects, skills overview, experience preview
- **About**: Personal background, education, professional journey, interests
- **Experience**: Detailed professional timeline with achievements and technologies
- **Projects**: Showcase of major projects with technical details and impact metrics
- **Skills**: Comprehensive technical skills categorized by domain and proficiency
- **Contact**: Contact information, social links, contact form, and FAQs

### 🛠 Technical Features
- **Static Site Generation**: Built with Astro for optimal performance
- **TypeScript**: Full type safety throughout the codebase
- **SEO Optimized**: Meta tags, structured data, and semantic HTML
- **Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation
- **Theme Persistence**: Theme selection is saved in localStorage

## 🏗 Tech Stack

### Core Technologies
- **[Astro](https://astro.build)** - Static Site Generator
- **[TypeScript](https://www.typescriptlang.org)** - Type Safety
- **[Tailwind CSS 4](https://tailwindcss.com)** - Utility-First Styling
- **[DaisyUI 5](https://daisyui.com)** - Component Library

### Development Tools
- **[Vite](https://vitejs.dev)** - Build Tool
- **[pnpm](https://pnpm.io)** - Package Manager
- **ESLint & Prettier** - Code Quality

## 🚀 Getting Started

### Prerequisites
- Node.js 18.14.1 or higher
- pnpm (recommended) or npm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/nilushan/portfolio-astro.git
   cd portfolio-astro
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Start development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

4. **Open browser**
   Navigate to [http://localhost:4321](http://localhost:4321)

### Build for Production

```bash
# Build the site
pnpm build

# Preview the build
pnpm preview
```

## 📁 Project Structure

```
/
├── public/                 # Static assets
│   ├── favicon.svg
│   └── og-image.png
├── src/
│   ├── components/         # Reusable components
│   │   ├── sections/       # Page sections
│   │   │   └── Hero.astro
│   │   └── ui/             # UI components
│   ├── data/              # Data files
│   │   └── portfolio.ts   # Portfolio content
│   ├── layouts/           # Page layouts
│   │   └── Layout.astro   # Main layout
│   ├── pages/             # Routes (file-based routing)
│   │   ├── index.astro    # Homepage
│   │   ├── about.astro    # About page
│   │   ├── experience.astro
│   │   ├── projects.astro
│   │   ├── skills.astro
│   │   └── contact.astro
│   ├── styles/            # Global styles
│   │   └── global.css     # CSS with DaisyUI config
│   └── types/             # TypeScript type definitions
├── astro.config.mjs       # Astro configuration
├── package.json
└── tsconfig.json
```

## 🎨 Customization

### Portfolio Content
Edit the portfolio data in `src/data/portfolio.ts`:

```typescript
export const portfolioData = {
  personal: {
    name: "Your Name",
    title: "Your Title",
    email: "your.email@example.com",
    // ... other personal info
  },
  experience: [
    // Your work experience
  ],
  projects: [
    // Your projects
  ],
  skills: {
    // Your technical skills
  }
};
```

### Themes
The site uses DaisyUI themes. Available themes:
- Professional (default)
- Modern
- Dark
- Cyberpunk
- Synthwave
- Retro
- Coffee
- Night

Add or modify themes in `src/styles/global.css`:

```css
@plugin "daisyui" {
  themes: light, dark, cupcake, bumblebee, emerald, corporate, synthwave, retro, cyberpunk, valentine, halloween, garden, forest, aqua, lofi, pastel, fantasy, wireframe, black, luxury, dracula, cmyk, autumn, business, acid, lemonade, night, coffee, winter, dim, nord, sunset;
}
```

### Colors
DaisyUI uses semantic color names:
- `primary` - Main brand color
- `secondary` - Secondary brand color  
- `accent` - Accent color
- `neutral` - Neutral colors
- `base-100/200/300` - Background colors
- `info/success/warning/error` - Status colors

### Components
All UI components use DaisyUI classes:

```html
<!-- Card -->
<div class="card bg-base-100 shadow-xl">
  <div class="card-body">
    <h2 class="card-title">Card Title</h2>
    <p>Card content</p>
  </div>
</div>

<!-- Button -->
<button class="btn btn-primary">Primary Button</button>

<!-- Badge -->
<div class="badge badge-secondary">Badge</div>
```

## 📊 Performance

### Lighthouse Scores (Target)
- **Performance**: 95+
- **Accessibility**: 95+
- **Best Practices**: 95+
- **SEO**: 95+

### Optimizations
- Static site generation with Astro
- Optimized images and assets
- Minimal JavaScript bundle
- Critical CSS inlined
- Lazy loading for images
- Semantic HTML structure

## 🔧 Development

### Available Scripts

```bash
# Development
pnpm dev              # Start dev server
pnpm build            # Build for production
pnpm preview          # Preview production build

# Code Quality
pnpm lint             # Run ESLint
pnpm format           # Format with Prettier
pnpm type-check       # TypeScript type checking
```

### Adding New Pages

1. Create a new `.astro` file in `src/pages/`
2. Use the Layout component:

```astro
---
import Layout from '@/layouts/Layout.astro'
---

<Layout title="Page Title" description="Page description">
  <!-- Page content -->
</Layout>
```

3. Add navigation link in `src/layouts/Layout.astro`

### Adding New Components

1. Create component in `src/components/`
2. Use DaisyUI classes for styling
3. Follow Astro component patterns

```astro
---
// Component script (TypeScript)
export interface Props {
  title: string;
}

const { title } = Astro.props;
---

<!-- Component template -->
<div class="card bg-base-100 shadow-xl">
  <div class="card-body">
    <h2 class="card-title">{title}</h2>
    <slot />
  </div>
</div>
```

## 🚀 Deployment

### Netlify (Recommended)
1. Connect your GitHub repository
2. Build command: `pnpm build`
3. Publish directory: `dist`
4. Environment: Node.js 18+

### Vercel
1. Import your repository
2. Framework preset: Astro
3. Build command: `pnpm build`
4. Output directory: `dist`

### GitHub Pages
```bash
# Build and deploy
pnpm build
pnpm deploy
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Make your changes
4. Commit: `git commit -m 'Add new feature'`
5. Push: `git push origin feature/new-feature`
6. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📧 Contact

**Nilushan Silva**
- Email: nilushan.silva@gmail.com
- LinkedIn: [nilushan-silva-27235310](https://linkedin.com/in/nilushan-silva-27235310)
- GitHub: [nilushan](https://github.com/nilushan)
- Website: [www.nilushansilva.info](https://www.nilushansilva.info)

---

Built with ❤️ using [Astro](https://astro.build) and [DaisyUI](https://daisyui.com)
