/**
 * Analytics Type Definitions
 * Provides type-safe event tracking across the application
 */

/**
 * Core analytics event categories
 */
export type AnalyticsEventCategory =
  | 'engagement'
  | 'navigation'
  | 'interaction'
  | 'conversion'
  | 'content'

/**
 * Blog-specific analytics events
 */
export interface BlogAnalyticsEvent {
  event: 'view_blog_post' | 'scroll_blog_post' | 'blog_search'
  params: {
    post_title: string
    post_category?: string
    reading_time?: number
    scroll_depth?: number // 0-100 percentage
  }
}

/**
 * Project-related analytics events
 */
export interface ProjectAnalyticsEvent {
  event: 'view_project' | 'click_project_cta' | 'open_project_link'
  params: {
    project_name: string
    project_type?: string
    cta_type?: 'github' | 'demo' | 'details'
  }
}

/**
 * Navigation and UI interaction events
 */
export interface NavigationAnalyticsEvent {
  event: 'toggle_theme' | 'navigate_section' | 'mobile_menu_open'
  params: {
    theme_name?: string
    section_name?: string
    navigation_type?: 'mobile' | 'desktop'
  }
}

/**
 * Conversion and goal events
 */
export interface ConversionAnalyticsEvent {
  event: 'contact_form_view' | 'contact_form_submit' | 'resume_download'
  params: {
    form_type?: string
    submission_status?: 'success' | 'error'
  }
}

/**
 * Union type for all analytics events
 */
export type AnalyticsEvent =
  | BlogAnalyticsEvent
  | ProjectAnalyticsEvent
  | NavigationAnalyticsEvent
  | ConversionAnalyticsEvent

/**
 * Analytics configuration
 */
export interface AnalyticsConfig {
  measurementId: string
  enabled: boolean
  consentMode?: boolean
  debugMode?: boolean
}
