# Design Quick Reference

Quick reference for applying the "Digital Architect" design system.

## Typography Quick Reference

```html
<!-- Headings -->
<h1 class="text-3xl lg:text-6xl font-display font-bold leading-tight">
<h2 class="text-2xl lg:text-4xl font-display font-bold">
<h3 class="text-xl lg:text-2xl font-display font-semibold">

<!-- Body text -->
<p class="text-base lg:text-lg text-base-content/80 leading-relaxed">

<!-- Code-style labels -->
<span class="font-mono text-sm text-primary uppercase tracking-widest
  px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
  &lt; Label /&gt;
</span>

<!-- Gradient text -->
<span class="gradient-text">Highlighted Text</span>
```

## Component Patterns

### Enhanced Card

```html
<div class="card bg-base-100 shadow-xl hover:shadow-2xl hover:scale-[1.02]
  transition-all duration-500 group relative overflow-hidden border
  border-base-content/5 hover:border-primary/20 glass">

  <!-- Gradient accent bar -->
  <div class="absolute top-0 left-0 right-0 h-1
    bg-gradient-to-r from-primary via-secondary to-accent
    opacity-50 group-hover:opacity-100 transition-opacity"></div>

  <!-- Floating orb -->
  <div class="absolute -top-20 -right-20 w-40 h-40 bg-primary/10
    rounded-full blur-3xl group-hover:bg-primary/20 transition-all"></div>

  <div class="card-body relative z-10">
    <!-- Content -->
  </div>
</div>
```

### Hero Section

```html
<section class="hero min-h-[60vh] relative overflow-hidden tech-grid">
  <!-- Animated gradient background -->
  <div class="absolute inset-0 animated-gradient opacity-30"></div>

  <div class="container mx-auto px-4 relative z-10">
    <!-- Content -->
  </div>
</section>
```

### Sidebar Card (Project/Blog Pages)

```html
<div class="card bg-base-100 shadow-xl glass border border-primary/10
  relative overflow-hidden">
  <div class="absolute top-0 left-0 right-0 h-1
    bg-gradient-to-r from-primary via-secondary to-accent"></div>
  <div class="card-body">
    <h3 class="card-title text-base font-display">Title</h3>
    <!-- Content -->
  </div>
</div>
```

### Button/CTA

```html
<!-- Primary CTA -->
<a class="btn btn-primary btn-lg font-display shadow-xl hover:shadow-2xl
  hover:scale-105 transition-all duration-300 glow-hover group">
  <span>Button Text</span>
  <svg class="h-5 w-5 transition-transform group-hover:translate-x-1">
    <!-- Arrow icon -->
  </svg>
</a>

<!-- Outline button -->
<a class="btn btn-outline btn-lg font-display shadow-xl hover:shadow-2xl
  hover:scale-105 transition-all duration-300 group border-2">
  <span>Button Text</span>
</a>
```

### Badge

```html
<!-- Tech badge -->
<div class="badge badge-outline hover:badge-primary hover:scale-110
  transition-all font-mono text-xs shadow-sm">
  TypeScript
</div>

<!-- Status badge -->
<div class="badge badge-primary badge-lg font-mono shadow-lg
  hover:scale-110 transition-transform cursor-default">
  Status
</div>
```

## Layout Patterns

### Section Container

```html
<section class="py-16 lg:py-24 relative overflow-hidden">
  <!-- Background decoration -->
  <div class="absolute inset-0 bg-gradient-to-b from-base-100
    via-base-200 to-base-100"></div>

  <div class="container mx-auto px-4 relative z-10">
    <!-- Content -->
  </div>
</section>
```

### Section Header

```html
<div class="text-center mb-16">
  <!-- Section label -->
  <div class="inline-block mb-4">
    <span class="font-mono text-sm text-primary uppercase tracking-widest
      px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
      &lt; Label /&gt;
    </span>
  </div>

  <h2 class="text-4xl lg:text-6xl font-display font-bold mb-6">
    Section <span class="gradient-text">Title</span>
  </h2>

  <p class="text-lg lg:text-xl text-base-content/70 max-w-3xl mx-auto
    leading-relaxed">
    Section description
  </p>
</div>
```

### Three-Column Grid

```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  <!-- Items -->
</div>
```

### Sidebar Layout

```html
<div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
  <!-- Sidebar -->
  <div class="lg:col-span-1">
    <div class="sticky top-8 space-y-6">
      <!-- Sidebar content -->
    </div>
  </div>

  <!-- Main content -->
  <div class="lg:col-span-3">
    <!-- Content -->
  </div>
</div>
```

## Gradient Variations

```css
/* Primary gradient */
from-primary via-secondary to-accent

/* Secondary gradient */
from-secondary via-accent to-primary

/* Accent gradient */
from-accent via-primary to-secondary

/* Info gradient */
from-info via-accent to-primary
```

## Prose Styling

```html
<div class="prose lg:prose-xl max-w-none
  prose-headings:font-display prose-headings:text-base-content
  prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl
  prose-p:text-base-content/80 prose-p:leading-relaxed
  prose-strong:text-base-content prose-strong:font-semibold
  prose-code:text-primary prose-code:font-mono prose-code:text-sm
  prose-pre:bg-base-200 prose-pre:text-base-content prose-pre:border
  prose-pre:border-base-content/10
  prose-a:text-primary hover:prose-a:text-primary-focus
  prose-a:no-underline hover:prose-a:underline
  prose-li:text-base-content/80
  prose-blockquote:border-l-primary prose-blockquote:text-base-content/70
  prose-img:rounded-lg prose-img:shadow-xl">
  <Content />
</div>
```

## Animation Classes

```css
/* Hover transforms */
hover:scale-105        /* Buttons, CTAs */
hover:scale-110        /* Badges */
hover:scale-[1.02]     /* Cards */

/* Transitions */
transition-all duration-300  /* Quick */
transition-all duration-500  /* Medium */

/* Reveal animations */
reveal-item
reveal-item-delay-1
reveal-item-delay-2
reveal-item-delay-3
```

## Common Class Combinations

```css
/* Glass card */
bg-base-100 shadow-xl glass border border-base-content/5

/* Hover glow */
shadow-xl hover:shadow-2xl transition-shadow duration-300

/* Interactive card */
hover:scale-[1.02] transition-all duration-500 group

/* Code label */
font-mono text-xs uppercase tracking-wider

/* Gradient background */
bg-gradient-to-r from-primary/10 to-secondary/10

/* Tech grid */
tech-grid  /* Defined in global.css */

/* Animated gradient */
animated-gradient opacity-30  /* Defined in global.css */
```

## Color Opacity Reference

```css
/* Backgrounds */
/10  /* Very subtle (backgrounds) */
/20  /* Subtle (orbs, accents) */
/30  /* Light (animated gradients) */

/* Borders */
/5   /* Very subtle borders */
/10  /* Subtle borders */
/20  /* Medium borders */

/* Text */
/60  /* Disabled text */
/70  /* Tertiary text */
/80  /* Secondary text */
/100 /* Primary text (default) */
```

## Checklist for New Components

- [ ] Display font for headings (`font-display`)
- [ ] Glass effect (`glass`) if card-like
- [ ] Gradient accent bar if card
- [ ] Hover states (scale, shadow, border)
- [ ] Transition duration 300-500ms
- [ ] Responsive classes (sm:, lg:)
- [ ] Theme-adaptive colors (use CSS variables)
- [ ] Semantic HTML
- [ ] ARIA labels if interactive

## Common Mistakes to Avoid

❌ **Don't**: Use fixed colors (`bg-blue-500`)
✅ **Do**: Use theme variables (`bg-primary`)

❌ **Don't**: Hardcode font families in components
✅ **Do**: Use utility classes (`font-display`, `font-mono`)

❌ **Don't**: Skip hover states
✅ **Do**: Add hover:scale and hover:shadow

❌ **Don't**: Use default prose styling
✅ **Do**: Apply enhanced prose classes

❌ **Don't**: Forget responsive variants
✅ **Do**: Use mobile-first responsive classes

❌ **Don't**: Use instant transitions
✅ **Do**: Add duration-300 or duration-500

## Quick Tips

1. **Layer with z-index**: Backgrounds (z-0) → Orbs (default) → Content (z-10)
2. **Group hover pattern**: Add `group` to parent, use `group-hover:` on children
3. **Sticky sidebar**: Use `sticky top-8` on sidebar containers
4. **Gradient consistency**: Always use primary → secondary → accent order
5. **Shadow progression**: sm → lg → xl → 2xl as elevation increases
6. **Font sizing**: Increase by ~1.5x from mobile to desktop
7. **Spacing rhythm**: Use multiples of 4 (4, 8, 12, 16, 24, 32)
8. **Border radius**: Larger for more prominent elements
