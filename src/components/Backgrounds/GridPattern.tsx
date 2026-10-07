import React, { forwardRef } from "react";
import { cx } from "../../utils/cx";
import "./GridPattern.css";

export type GridPatternVariant = "lines" | "crosses" | "dashed";

export interface GridPatternProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: GridPatternVariant;
  size?: number; // grid square size in px (default 36)
  strokeColor?: string;
  maskRadial?: boolean;
  children?: React.ReactNode;
}

export const GridPattern = forwardRef<HTMLDivElement, GridPatternProps>(
  (
    {
      variant = "lines",
      size = 36,
      strokeColor,
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
          "aura-grid-pattern",
          `aura-grid-pattern--${variant}`,
          maskRadial && "aura-grid-pattern--radial-mask",
          className
        )}
        style={
          {
            "--aura-grid-size": `${size}px`,
            ...(strokeColor ? { "--aura-grid-stroke": strokeColor } : {}),
            ...style,
          } as React.CSSProperties
        }
        {...props}
      >
        <div className="aura-grid-pattern__canvas" aria-hidden="true" />
        {children && <div className="aura-grid-pattern__content">{children}</div>}
      </div>
    );
  }
);

GridPattern.displayName = "GridPattern";
