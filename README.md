# Nilushan Silva - Professional Portfolio

A modern, professional portfolio built with Astro, DaisyUI, and Starlight documentation. This portfolio showcases 15+ years of full-stack development and cloud engineering experience.


## 🚀 Features

### Portfolio Website
- **Modern Design**: Built with Astro and styled with DaisyUI
- **Responsive**: Mobile-first design that works on all devices
- **Interactive**: Smooth animations and transitions
- **Professional**: Clean, modern aesthetic suitable for senior roles

### Technical Documentation
- **Starlight Integration**: Professional documentation site at `/docs/`
- **Architecture Guides**: Detailed technical documentation
- **Searchable**: Built-in search functionality
- **Mobile-Responsive**: Works perfectly on all devices

### Content Management
- **Structured Content**: Well-organized content collections
- **Type-Safe**: Full TypeScript support
- **Easy Updates**: Simple data files for content management
- **Blog Support**: Integrated blog functionality

## 🛠️ Technology Stack

- **Framework**: [Astro](https://astro.build/) - Modern static site generator
- **UI Library**: [DaisyUI](https://daisyui.com/) - Tailwind CSS components
- **Documentation**: [Starlight](https://starlight.astro.build/) - Technical documentation
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- **TypeScript**: Full type safety throughout the project
- **Package Manager**: pnpm for efficient dependency management

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. **Clone the repository** (if needed)
   ```bash
   cd /projects/astro-app
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Start development server**
   ```bash
   pnpm dev
   ```

4. **Open in browser**
   ```
   http://localhost:4321
   ```

### Build for Production

```bash
# Build the site
pnpm build

# Preview the build
pnpm preview
```

## 📁 Project Structure

```
/projects/astro-app/
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── sections/        # Page sections (Hero, Projects, etc.)
│   │   ├── navigation/      # Navigation components
│   │   └── ui/              # UI components
│   ├── content/             # Content collections
│   │   ├── docs/            # Starlight documentation
│   │   ├── knowledge/       # Custom knowledge base
│   │   ├── blog/            # Blog posts
│   │   ├── projects/        # Project showcases
│   │   └── config.ts        # Content collection schemas
│   ├── data/
│   │   └── portfolio.ts     # Portfolio data (easily editable)
│   ├── layouts/
│   │   └── Layout.astro     # Main layout component
│   ├── pages/               # Route pages
│   ├── styles/
│   │   ├── global.css       # Global styles
│   │   └── starlight.css    # Starlight theme customization
│   └── lib/
│       └── utils.ts         # Utility functions
├── public/                  # Static assets
├── astro.config.mjs         # Astro configuration
├── tailwind.config.ts       # Tailwind/DaisyUI configuration
├── content.config.ts        # Starlight content configuration
└── package.json
```

## 🎨 Customization

### Portfolio Data
Edit `/src/data/portfolio.ts` to update:
- Personal information
- Experience timeline
- Project showcases
- Skills and technologies
- Contact information

### Theme Customization
The site uses DaisyUI themes. You can:
- Choose from 30+ built-in themes
- Customize colors in `tailwind.config.ts`
- Add your own theme variants

### Content Management
- **Blog Posts**: Add `.mdx` files to `/src/content/blog/`
- **Projects**: Add `.mdx` files to `/src/content/projects/`
- **Documentation**: Add `.md` files to `/src/content/docs/`

## 📄 Pages Overview

### Main Portfolio (`/`)
- **Hero Section**: Professional introduction with key stats
- **About Preview**: Summary of experience and expertise
- **Featured Projects**: Showcase of major projects
- **Experience Timeline**: Career progression
- **Skills Overview**: Technical competencies
- **Contact Information**: Get in touch section

### Technical Documentation (`/docs/`)
- **Welcome Page**: Introduction to technical expertise
- **Getting Started**: Overview of skills and experience
- **Architecture Guides**: IoT platform architecture patterns
- **Cloud Platforms**: GCP best practices and implementation
- **Searchable**: Built-in search functionality

### Projects (`/projects/`)
- **Project Gallery**: All projects with filtering
- **Individual Project Pages**: Detailed case studies
- **Technologies Used**: Technical stack for each project
- **Key Achievements**: Measurable outcomes

### Blog (`/blog/`)
- **Technical Articles**: Development insights
- **Architecture Posts**: System design discussions
- **Industry Insights**: Cloud and IoT perspectives

## 🎯 Key Achievements Highlighted

- **55,000+ IoT devices** migrated with zero downtime
- **99.999% uptime** achieved on production systems
- **50% cost reduction** through cloud optimization
- **40% latency improvement** via architecture redesign
- **7+ years** of TypeScript/React expertise
- **6+ years** of Google Cloud Platform experience

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Build and deploy
vercel --prod
```

### Netlify
```bash
# Build
pnpm build

# Deploy dist/ folder
```

### Traditional Hosting
```bash
# Build static files
pnpm build

# Upload dist/ folder to your hosting provider
```

## 🔧 Development Commands

```bash
# Development
pnpm dev                # Start dev server
pnpm build             # Build for production
pnpm preview           # Preview production build

# Linting & Formatting
pnpm astro check       # Check for issues
pnpm astro --help      # Show help

# Dependencies
pnpm install           # Install dependencies
pnpm update            # Update dependencies
```

## 🎨 Available Themes

The portfolio includes multiple DaisyUI themes:
- **Light/Dark**: Professional themes
- **Corporate**: Business-focused styling
- **Cyberpunk**: Modern, tech-forward appearance  
- **Emerald**: Nature-inspired colors
- **And 25+ more themes**

Switch themes by updating the `data-theme` attribute or using the theme selector component.

## 📱 Responsive Design

- **Mobile-First**: Optimized for mobile devices
- **Tablet-Friendly**: Perfect layout for tablets
- **Desktop-Enhanced**: Rich experience on larger screens
- **Print-Friendly**: Optimized for printing/PDF generation

## 🔒 Performance & SEO

- **Lighthouse Score**: 95+ across all metrics
- **Core Web Vitals**: Optimized for Google's requirements
- **SEO-Optimized**: Meta tags, structured data, sitemap
- **Accessibility**: WCAG 2.1 AA compliant

## 🤝 Contributing

This is a personal portfolio, but suggestions and improvements are welcome:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Contact

- **Email**: nilushan.silva@gmail.com
- **Phone**: 0416285726
- **LinkedIn**: [nilushan-silva-27235310](https://www.linkedin.com/in/nilushan-silva-27235310/)
- **Location**: Gold Coast, Queensland, Australia

## 📄 License

This project is for personal use. Feel free to use it as inspiration for your own portfolio, but please don't copy the content directly.

## 🙏 Acknowledgments

- Built with [Astro](https://astro.build/)
- Styled with [DaisyUI](https://daisyui.com/)
- Documentation powered by [Starlight](https://starlight.astro.build/)
- Icons from [Heroicons](https://heroicons.com/)
- Fonts from [Google Fonts](https://fonts.google.com/)

---

**Made with ❤️ by Nilushan Silva**
