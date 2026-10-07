import type { AuraTokens } from "./types";

export * from "./types";

export function tokensToCssVars(tokens?: AuraTokens): Record<string, string> {
  if (!tokens) return {};
  const vars: Record<string, string> = {};

  if (tokens.colors) {
    if (tokens.colors.bg) vars["--aura-bg"] = tokens.colors.bg;
    if (tokens.colors.bgSubtle) vars["--aura-bg-subtle"] = tokens.colors.bgSubtle;
    if (tokens.colors.surface) vars["--aura-surface"] = tokens.colors.surface;
    if (tokens.colors.surfaceRaised) vars["--aura-surface-raised"] = tokens.colors.surfaceRaised;
    if (tokens.colors.surfaceHover) vars["--aura-surface-hover"] = tokens.colors.surfaceHover;
    if (tokens.colors.fg) vars["--aura-fg"] = tokens.colors.fg;
    if (tokens.colors.fgMuted) vars["--aura-fg-muted"] = tokens.colors.fgMuted;
    if (tokens.colors.fgSubtle) vars["--aura-fg-subtle"] = tokens.colors.fgSubtle;
    if (tokens.colors.border) vars["--aura-border"] = tokens.colors.border;
    if (tokens.colors.borderSubtle) vars["--aura-border-subtle"] = tokens.colors.borderSubtle;
    if (tokens.colors.borderStrong) vars["--aura-border-strong"] = tokens.colors.borderStrong;
    if (tokens.colors.accent) vars["--aura-accent"] = tokens.colors.accent;
    if (tokens.colors.accentFg) vars["--aura-accent-fg"] = tokens.colors.accentFg;
    if (tokens.colors.accentHover) vars["--aura-accent-hover"] = tokens.colors.accentHover;
    if (tokens.colors.accentSubtle) vars["--aura-accent-subtle"] = tokens.colors.accentSubtle;
    if (tokens.colors.accentGlow) vars["--aura-accent-glow"] = tokens.colors.accentGlow;
    if (tokens.colors.destructive) vars["--aura-destructive"] = tokens.colors.destructive;
    if (tokens.colors.destructiveFg) vars["--aura-destructive-fg"] = tokens.colors.destructiveFg;
    if (tokens.colors.success) vars["--aura-success"] = tokens.colors.success;
    if (tokens.colors.successFg) vars["--aura-success-fg"] = tokens.colors.successFg;
    if (tokens.colors.warning) vars["--aura-warning"] = tokens.colors.warning;
    if (tokens.colors.warningFg) vars["--aura-warning-fg"] = tokens.colors.warningFg;
    if (tokens.colors.info) vars["--aura-info"] = tokens.colors.info;
    if (tokens.colors.infoFg) vars["--aura-info-fg"] = tokens.colors.infoFg;
  }

  if (tokens.radii) {
    if (tokens.radii.xs) vars["--aura-radius-xs"] = tokens.radii.xs;
    if (tokens.radii.sm) vars["--aura-radius-sm"] = tokens.radii.sm;
    if (tokens.radii.md) vars["--aura-radius-md"] = tokens.radii.md;
    if (tokens.radii.lg) vars["--aura-radius-lg"] = tokens.radii.lg;
    if (tokens.radii.xl) vars["--aura-radius-xl"] = tokens.radii.xl;
    if (tokens.radii.full) vars["--aura-radius-full"] = tokens.radii.full;
  }

  if (tokens.fonts) {
    if (tokens.fonts.sans) vars["--aura-font-sans"] = tokens.fonts.sans;
    if (tokens.fonts.mono) vars["--aura-font-mono"] = tokens.fonts.mono;
  }

  return vars;
}
