import React, { forwardRef } from "react";
import { cx } from "../../utils/cx";
import "./DotBackground.css";

export type DotBackgroundVariant = "default" | "radial" | "subtle";

export interface DotBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: DotBackgroundVariant;
  dotSize?: number; // size in px (default 1.5)
  dotSpacing?: number; // gap in px (default 24)
  dotColor?: string;
  maskRadial?: boolean; // Radial fade out from center
  children?: React.ReactNode;
}

export const DotBackground = forwardRef<HTMLDivElement, DotBackgroundProps>(
  (
    {
      variant = "radial",
      dotSize = 1.5,
      dotSpacing = 24,
      dotColor,
      maskRadial = true,
      className,
      style,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cx(
          "aura-dot-bg",
          `aura-dot-bg--${variant}`,
          maskRadial && "aura-dot-bg--radial-mask",
          className
        )}
        style={
          {
            "--aura-dot-size": `${dotSize}px`,
            "--aura-dot-spacing": `${dotSpacing}px`,
            ...(dotColor ? { "--aura-dot-color": dotColor } : {}),
            ...style,
          } as React.CSSProperties
        }
        {...props}
      >
        <div className="aura-dot-bg__pattern" aria-hidden="true" />
        {children && <div className="aura-dot-bg__content">{children}</div>}
      </div>
    );
  }
);

DotBackground.displayName = "DotBackground";
