export const getThemeStyles = (isDark: boolean) => ({
    background: isDark ? "bg-dark-background" : "bg-background",
    text: isDark ? "text-dark-foreground" : "text-foreground",
    textMuted: isDark ? "text-dark-muted" : "text-muted",
    card:isDark ? "bg-dark-card" : "bg-card",
    colorSecondary: isDark ? "text-dark-primary":"text-primary",
    border:isDark ? "bg-dark-border" : "bg-border",
    progress: isDark? "bg-dark-primary" : "bg-primary"
  });