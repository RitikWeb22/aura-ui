import { useContext } from "react";
import { AuraThemeContext, type AuraThemeContextValue } from "./AuraProvider";

export function useAuraTheme(): AuraThemeContextValue {
  const context = useContext(AuraThemeContext);
  if (!context) {
    // Provide a safe fallback if used outside of AuraProvider
    return {
      theme: "dark",
      resolvedTheme: "dark",
      setTheme: () => {},
      accentColor: undefined,
      setAccentColor: () => {},
    };
  }
  return context;
}
