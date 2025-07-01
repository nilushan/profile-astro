/**
 * Unified theme management for DaisyUI themes
 * Handles theme switching, persistence, and initialization
 */

// DaisyUI themes organized by categories
export const lightThemes = [
  { name: "light", emoji: "☀️", label: "Light" },
  { name: "autumn", emoji: "🍂", label: "Autumn" },
  { name: "cupcake", emoji: "🧁", label: "Cupcake" },
  { name: "bumblebee", emoji: "🐝", label: "Bumblebee" },
  { name: "emerald", emoji: "💎", label: "Emerald" },
  { name: "corporate", emoji: "🏢", label: "Corporate" },
  { name: "valentine", emoji: "💝", label: "Valentine" },
  { name: "garden", emoji: "🌻", label: "Garden" },
  { name: "aqua", emoji: "🌊", label: "Aqua" },
  { name: "lofi", emoji: "🎵", label: "Lo-Fi" },
  { name: "pastel", emoji: "🎨", label: "Pastel" },
  { name: "fantasy", emoji: "🧚", label: "Fantasy" },
  { name: "wireframe", emoji: "📐", label: "Wireframe" },
  { name: "lemonade", emoji: "🍋", label: "Lemonade" },
  { name: "winter", emoji: "❄️", label: "Winter" },
  { name: "nord", emoji: "🏔️", label: "Nord" },
  { name: "caramellatte", emoji: "🍮", label: "Caramel Latte" },
  { name: "silk", emoji: "🪞", label: "Silk" },
  { name: "retro", emoji: "📻", label: "Retro" },
  { name: "cyberpunk", emoji: "🤖", label: "Cyberpunk" },
  { name: "acid", emoji: "🧪", label: "Acid" },

] as const;

export const darkThemes = [
  { name: "dark", emoji: "🌙", label: "Dark" },
  { name: "synthwave", emoji: "🌆", label: "Synthwave" },
  { name: "halloween", emoji: "🎃", label: "Halloween" },
  { name: "sunset", emoji: "🌅", label: "Sunset" },
  { name: "forest", emoji: "🌲", label: "Forest" },
  { name: "luxury", emoji: "💰", label: "Luxury" },
  { name: "dracula", emoji: "🧛", label: "Dracula" },
  { name: "black", emoji: "⚫", label: "Black" },
  { name: "business", emoji: "💼", label: "Business" },
  { name: "night", emoji: "🌃", label: "Night" },
  { name: "coffee", emoji: "☕", label: "Coffee" },
  { name: "dim", emoji: "🔅", label: "Dim" },
  { name: "abyss", emoji: "🕳️", label: "Abyss" }
] as const;

export const specialThemes = [
  { name: "cmyk", emoji: "🖨️", label: "CMYK" }
] as const;

export const allThemes = [...lightThemes, ...darkThemes, ...specialThemes] as const;

export type ThemeName = typeof allThemes[number]['name'];

export class ThemeManager {
  private static readonly STORAGE_KEY = 'theme';
  private static readonly DEFAULT_THEME: ThemeName = 'light';

  /**
   * Get the current theme from localStorage or default
   */
  static getCurrentTheme(): ThemeName {
    if (typeof window === 'undefined') return this.DEFAULT_THEME;

    const saved = localStorage.getItem(this.STORAGE_KEY) as ThemeName;
    return this.isValidTheme(saved) ? saved : this.DEFAULT_THEME;
  }

  /**
   * Set the theme and persist to localStorage
   */
  static setTheme(theme: ThemeName): void {
    if (typeof window === 'undefined') return;

    if (!this.isValidTheme(theme)) {
      console.warn(`Invalid theme: ${theme}. Using default.`);
      theme = this.DEFAULT_THEME;
    }

    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(this.STORAGE_KEY, theme);

    // Dispatch custom event for other components to listen
    window.dispatchEvent(new CustomEvent('theme-changed', {
      detail: { theme }
    }));
  }

  /**
   * Initialize theme on page load
   */
  static initializeTheme(): void {
    if (typeof window === 'undefined') return;

    const theme = this.getCurrentTheme();
    document.documentElement.setAttribute('data-theme', theme);
  }

  /**
   * Get theme metadata by name
   */
  static getThemeInfo(theme: ThemeName) {
    return allThemes.find(t => t.name === theme);
  }

  /**
   * Check if a theme name is valid
   */
  static isValidTheme(theme: string): theme is ThemeName {
    return allThemes.some(t => t.name === theme);
  }

  /**
   * Get themes grouped by category
   */
  static getThemesByCategory() {
    return {
      light: lightThemes,
      dark: darkThemes,
      special: specialThemes
    };
  }

  /**
   * Toggle between light and dark theme
   */
  static toggleLightDark(): void {
    const current = this.getCurrentTheme();
    const isDark = darkThemes.some(t => t.name === current);
    const newTheme = isDark ? 'light' : 'dark';
    this.setTheme(newTheme);
  }
}