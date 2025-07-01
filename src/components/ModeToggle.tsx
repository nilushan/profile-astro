import * as React from "react"
import { Moon, Sun, Palette } from "lucide-react"
import { ThemeManager, allThemes, type ThemeName } from "@/lib/theme-manager"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"

export function ModeToggle() {
  const [currentTheme, setCurrentTheme] = React.useState<ThemeName>('light')

  React.useEffect(() => {
    // Initialize theme on component mount
    const theme = ThemeManager.getCurrentTheme()
    setCurrentTheme(theme)
    ThemeManager.initializeTheme()

    // Listen for theme changes from other components
    const handleThemeChange = (event: CustomEvent) => {
      setCurrentTheme(event.detail.theme)
    }

    window.addEventListener('theme-changed', handleThemeChange as EventListener)
    
    return () => {
      window.removeEventListener('theme-changed', handleThemeChange as EventListener)
    }
  }, [])

  const handleThemeChange = (theme: ThemeName) => {
    ThemeManager.setTheme(theme)
    setCurrentTheme(theme)
  }

  const currentThemeInfo = ThemeManager.getThemeInfo(currentTheme)
  const isDarkTheme = ['dark', 'synthwave', 'retro', 'cyberpunk', 'halloween', 'forest', 'luxury', 'dracula', 'black', 'autumn', 'business', 'acid', 'night', 'coffee', 'dim', 'abyss'].includes(currentTheme)

  const { light, dark, special } = ThemeManager.getThemesByCategory()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          {isDarkTheme ? (
            <Moon className="h-[1.2rem] w-[1.2rem]" />
          ) : (
            <Sun className="h-[1.2rem] w-[1.2rem]" />
          )}
          <span className="sr-only">
            Toggle theme - Current: {currentThemeInfo?.label || currentTheme}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 max-h-96 overflow-y-auto">
        <DropdownMenuLabel className="flex items-center gap-2">
          <Palette className="h-4 w-4" />
          Choose Theme
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <DropdownMenuLabel className="text-xs text-muted-foreground">
          ☀️ Light Themes
        </DropdownMenuLabel>
        {light.map((theme) => (
          <DropdownMenuItem 
            key={theme.name}
            onClick={() => handleThemeChange(theme.name)}
            className={currentTheme === theme.name ? "bg-accent" : ""}
          >
            <span className="mr-2">{theme.emoji}</span>
            {theme.label}
          </DropdownMenuItem>
        ))}
        
        <DropdownMenuSeparator />
        
        <DropdownMenuLabel className="text-xs text-muted-foreground">
          🌙 Dark Themes
        </DropdownMenuLabel>
        {dark.map((theme) => (
          <DropdownMenuItem 
            key={theme.name}
            onClick={() => handleThemeChange(theme.name)}
            className={currentTheme === theme.name ? "bg-accent" : ""}
          >
            <span className="mr-2">{theme.emoji}</span>
            {theme.label}
          </DropdownMenuItem>
        ))}
        
        <DropdownMenuSeparator />
        
        <DropdownMenuLabel className="text-xs text-muted-foreground">
          🎨 Special
        </DropdownMenuLabel>
        {special.map((theme) => (
          <DropdownMenuItem 
            key={theme.name}
            onClick={() => handleThemeChange(theme.name)}
            className={currentTheme === theme.name ? "bg-accent" : ""}
          >
            <span className="mr-2">{theme.emoji}</span>
            {theme.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}