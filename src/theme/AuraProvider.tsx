import React, { createContext, useEffect, useState, useMemo } from "react";
import type { ThemeMode, AuraTokens } from "../tokens";
import { tokensToCssVars } from "../tokens";

export interface AuraThemeContextValue {
  theme: ThemeMode;
  resolvedTheme: "light" | "dark";
  setTheme: (theme: ThemeMode) => void;
  accentColor?: string;
  setAccentColor: (color: string | undefined) => void;
}

export const AuraThemeContext = createContext<AuraThemeContextValue | null>(null);

export interface AuraProviderProps {
  children: React.ReactNode;
  theme?: ThemeMode;
  defaultTheme?: ThemeMode;
  accentColor?: string;
  tokens?: AuraTokens;
  /**
   * If true, applies `data-aura-theme` to document.documentElement instead of wrapper element.
   * Defaults to false for container isolation, but useful for full-page apps.
   */
  attachToRoot?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const AuraProvider: React.FC<AuraProviderProps> = ({
  children,
  theme: controlledTheme,
  defaultTheme = "dark",
  accentColor: controlledAccentColor,
  tokens,
  attachToRoot = false,
  className,
  style,
}) => {
  const [internalTheme, setInternalTheme] = useState<ThemeMode>(controlledTheme ?? defaultTheme);
  const [internalAccent, setInternalAccent] = useState<string | undefined>(controlledAccentColor);

  const currentTheme = controlledTheme ?? internalTheme;
  const currentAccent = controlledAccentColor ?? internalAccent;

  // Resolve system preference
  const [systemTheme, setSystemTheme] = useState<"light" | "dark">(() => {
    if (typeof window === "undefined") return "dark";
    return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(prefers-color-scheme: light)");
    const handler = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? "light" : "dark");
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handler);
      return () => mediaQuery.removeEventListener("change", handler);
    } else {
      mediaQuery.addListener(handler);
      return () => mediaQuery.removeListener(handler);
    }
  }, []);

  const resolvedTheme: "light" | "dark" = currentTheme === "system" ? systemTheme : currentTheme;

  // Apply to documentElement if requested
  useEffect(() => {
    if (!attachToRoot || typeof document === "undefined") return;
    document.documentElement.setAttribute("data-aura-theme", currentTheme);
    if (currentAccent) {
      document.documentElement.style.setProperty("--aura-accent", currentAccent);
    }
  }, [attachToRoot, currentTheme, currentAccent]);

  const cssVars = useMemo(() => {
    const vars: Record<string, string> = {
      ...tokensToCssVars(tokens),
    };
    if (currentAccent) {
      vars["--aura-accent"] = currentAccent;
      vars["--aura-accent-glow"] = `${currentAccent}55`;
    }
    return vars as unknown as React.CSSProperties;
  }, [tokens, currentAccent]);

  const contextValue = useMemo<AuraThemeContextValue>(() => ({
    theme: currentTheme,
    resolvedTheme,
    setTheme: (newTheme) => setInternalTheme(newTheme),
    accentColor: currentAccent,
    setAccentColor: (newAccent) => setInternalAccent(newAccent),
  }), [currentTheme, resolvedTheme, currentAccent]);

  if (attachToRoot) {
    return (
      <AuraThemeContext.Provider value={contextValue}>
        {children}
      </AuraThemeContext.Provider>
    );
  }

  return (
    <AuraThemeContext.Provider value={contextValue}>
      <div
        data-aura-theme={currentTheme}
        className={className}
        style={{
          ...cssVars,
          ...style,
          display: "contents",
        }}
      >
        {children}
      </div>
    </AuraThemeContext.Provider>
  );
};
