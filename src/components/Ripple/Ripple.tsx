import React, { forwardRef } from "react";
import { cx } from "../../utils/cx";
import "./Ripple.css";

export interface RippleProps extends React.HTMLAttributes<HTMLDivElement> {
  numRings?: number;
  mainCircleSize?: number;
  mainCircleOpacity?: number;
  color?: string;
  children?: React.ReactNode;
}

export const Ripple = forwardRef<HTMLDivElement, RippleProps>(
  (
    {
      numRings = 5,
      mainCircleSize = 140,
      mainCircleOpacity = 0.24,
      color = "var(--aura-accent)",
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
        className={cx("aura-ripple-container", className)}
        style={style}
        {...props}
      >
        {children && <div className="aura-ripple__content">{children}</div>}
        {Array.from({ length: numRings }).map((_, i) => {
          const size = mainCircleSize + i * 65;
          const opacity = mainCircleOpacity - i * 0.035;
          const animationDelay = `${i * 0.2}s`;

          return (
            <div
              key={i}
              className="aura-ripple__circle"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                borderColor: color,
                opacity: Math.max(opacity, 0.04),
                animationDelay,
              }}
            />
          );
        })}
      </div>
    );
  }
);

Ripple.displayName = "Ripple";
