export type ThemeMode = "light" | "dark" | "system";

export interface AuraColorTokens {
  bg?: string;
  bgSubtle?: string;
  surface?: string;
  surfaceRaised?: string;
  surfaceHover?: string;
  fg?: string;
  fgMuted?: string;
  fgSubtle?: string;
  border?: string;
  borderSubtle?: string;
  borderStrong?: string;
  accent?: string;
  accentFg?: string;
  accentHover?: string;
  accentSubtle?: string;
  accentGlow?: string;
  destructive?: string;
  destructiveFg?: string;
  success?: string;
  successFg?: string;
  warning?: string;
  warningFg?: string;
  info?: string;
  infoFg?: string;
}

export interface AuraRadiusTokens {
  xs?: string;
  sm?: string;
  md?: string;
  lg?: string;
  xl?: string;
  full?: string;
}

export interface AuraTokens {
  colors?: AuraColorTokens;
  radii?: AuraRadiusTokens;
  fonts?: {
    sans?: string;
    mono?: string;
  };
}
