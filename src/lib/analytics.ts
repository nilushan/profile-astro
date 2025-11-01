/**
 * Analytics Utility Functions
 * Provides type-safe event tracking and analytics helpers
 */

import type {
  AnalyticsEvent,
  BlogAnalyticsEvent,
  ProjectAnalyticsEvent,
  NavigationAnalyticsEvent,
  ConversionAnalyticsEvent,
  AnalyticsConfig,
} from '@/types/analytics'

/**
 * Global analytics configuration
 * Initialized from environment variables
 */
let analyticsConfig: AnalyticsConfig = {
  measurementId: import.meta.env.PUBLIC_GA_ID || '',
  enabled: import.meta.env.PUBLIC_ANALYTICS_ENABLED === 'true',
  consentMode: import.meta.env.PUBLIC_CONSENT_MODE === 'true',
  debugMode: import.meta.env.DEV,
}

/**
 * Initialize analytics configuration
 * Call this early in your application startup
 */
export function initializeAnalytics(config: Partial<AnalyticsConfig>) {
  analyticsConfig = { ...analyticsConfig, ...config }
  if (analyticsConfig.debugMode) {
    console.log('[Analytics] Initialized with config:', analyticsConfig)
  }
}

/**
 * Get current analytics configuration
 */
export function getAnalyticsConfig(): AnalyticsConfig {
  return analyticsConfig
}

/**
 * Check if analytics is enabled and configured
 */
export function isAnalyticsEnabled(): boolean {
  return analyticsConfig.enabled && !!analyticsConfig.measurementId
}

/**
 * Track a generic event
 * Use this for custom events not covered by specific functions
 */
export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>
) {
  if (!isAnalyticsEnabled()) {
    return
  }

  if (typeof window !== 'undefined' && (window as any).gtag) {
    ;(window as any).gtag('event', eventName, params)

    if (analyticsConfig.debugMode) {
      console.log(`[Analytics] Event tracked: ${eventName}`, params)
    }
  }
}

/**
 * Track a blog post view
 */
export function trackBlogView(params: BlogAnalyticsEvent['params']) {
  trackEvent('view_blog_post', {
    post_title: params.post_title,
    post_category: params.post_category || 'uncategorized',
    reading_time: params.reading_time || 0,
  })
}

/**
 * Track blog post scroll depth
 * Call this on scroll events to track engagement
 */
export function trackBlogScroll(
  postTitle: string,
  scrollDepth: number,
  category?: string
) {
  trackEvent('scroll_blog_post', {
    post_title: postTitle,
    scroll_depth: Math.round(scrollDepth),
    post_category: category || 'uncategorized',
  })
}

/**
 * Track project view/impression
 */
export function trackProjectView(params: ProjectAnalyticsEvent['params']) {
  trackEvent('view_project', {
    project_name: params.project_name,
    project_type: params.project_type || 'general',
  })
}

/**
 * Track project CTA click
 */
export function trackProjectCTA(
  projectName: string,
  ctaType: 'github' | 'demo' | 'details',
  projectType?: string
) {
  trackEvent('click_project_cta', {
    project_name: projectName,
    cta_type: ctaType,
    project_type: projectType || 'general',
  })
}

/**
 * Track theme toggle
 */
export function trackThemeToggle(themeName: string) {
  trackEvent('toggle_theme', {
    theme_name: themeName,
  })
}

/**
 * Track section navigation
 */
export function trackSectionNavigation(
  sectionName: string,
  navigationType: 'mobile' | 'desktop' = 'desktop'
) {
  trackEvent('navigate_section', {
    section_name: sectionName,
    navigation_type: navigationType,
  })
}

/**
 * Track mobile menu open
 */
export function trackMobileMenuOpen() {
  trackEvent('mobile_menu_open', {
    navigation_type: 'mobile',
  })
}

/**
 * Track contact form submission
 */
export function trackContactFormSubmit(status: 'success' | 'error') {
  trackEvent('contact_form_submit', {
    submission_status: status,
    form_type: 'contact',
  })
}

/**
 * Track resume/CV download
 */
export function trackResumeDownload() {
  trackEvent('resume_download', {
    content_type: 'pdf',
  })
}

/**
 * Setup scroll depth tracking for blog posts
 * Automatically tracks scroll progress and fires events at 25%, 50%, 75%, 100%
 */
export function setupScrollTracking(postTitle: string, category?: string) {
  if (!isAnalyticsEnabled() || typeof window === 'undefined') {
    return
  }

  const thresholds = [25, 50, 75, 100]
  const trackedThresholds = new Set<number>()

  function handleScroll() {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
    const scrolled = window.scrollY
    const scrollDepth = (scrolled / scrollHeight) * 100

    thresholds.forEach((threshold) => {
      if (
        scrollDepth >= threshold &&
        !trackedThresholds.has(threshold)
      ) {
        trackedThresholds.add(threshold)
        trackBlogScroll(postTitle, threshold, category)
      }
    })
  }

  window.addEventListener('scroll', handleScroll, { passive: true })

  return () => {
    window.removeEventListener('scroll', handleScroll)
  }
}

/**
 * Track page view (usually handled automatically by GA4)
 * Use this only if you need to manually trigger a page view
 */
export function trackPageView(pageTitle: string, pagePath?: string) {
  trackEvent('page_view', {
    page_title: pageTitle,
    page_path: pagePath || window.location.pathname,
  })
}

/**
 * Set user properties/dimensions
 * Use this to identify user segments (e.g., user_type: "blog_reader")
 */
export function setUserProperty(key: string, value: string | number) {
  if (!isAnalyticsEnabled()) {
    return
  }

  if (typeof window !== 'undefined' && (window as any).gtag) {
    ;(window as any).gtag('set', {
      [key]: value,
    })

    if (analyticsConfig.debugMode) {
      console.log(`[Analytics] User property set: ${key} = ${value}`)
    }
  }
}

/**
 * Opt-in to analytics (for consent mode)
 * Call this after user accepts analytics cookies
 */
export function optInAnalytics() {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    ;(window as any).gtag('consent', 'update', {
      analytics_storage: 'granted',
    })

    if (analyticsConfig.debugMode) {
      console.log('[Analytics] User opted in')
    }
  }
}

/**
 * Opt-out of analytics (for consent mode)
 * Call this if user rejects analytics cookies
 */
export function optOutAnalytics() {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    ;(window as any).gtag('consent', 'update', {
      analytics_storage: 'denied',
    })

    if (analyticsConfig.debugMode) {
      console.log('[Analytics] User opted out')
    }
  }
}
