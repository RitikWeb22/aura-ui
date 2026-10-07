import React, { forwardRef } from "react";
import { cx } from "../../utils/cx";
import "./ShineBorder.css";

export interface ShineBorderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "color"> {
  borderRadius?: number;
  borderWidth?: number;
  duration?: number; // duration in seconds (default 8)
  color?: string[]; // array of gradient colors
}

export const ShineBorder = forwardRef<HTMLDivElement, ShineBorderProps>(
  (
    {
      borderRadius = 16,
      borderWidth = 1.5,
      duration = 8,
      color = ["#6366f1", "#a855f7", "#ec4899", "#6366f1"],
      className,
      style,
      children,
      ...props
    },
    ref
  ) => {
    const gradientColors = color.join(", ");

    return (
      <div
        ref={ref}
        className={cx("aura-shine-border", className)}
        style={{
          borderRadius: `${borderRadius}px`,
          padding: `${borderWidth}px`,
          ...style,
        }}
        {...props}
      >
        <div
          className="aura-shine-border__gradient"
          style={{
            backgroundImage: `conic-gradient(from 0deg, ${gradientColors})`,
            animationDuration: `${duration}s`,
          }}
        />
        <div
          className="aura-shine-border__inner"
          style={{
            borderRadius: `${Math.max(borderRadius - borderWidth, 0)}px`,
          }}
        >
          {children}
        </div>
      </div>
    );
  }
);

ShineBorder.displayName = "ShineBorder";
