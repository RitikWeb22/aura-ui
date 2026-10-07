import React, { forwardRef } from "react";
import { cx } from "../../utils/cx";
import "./Badge.css";

export type BadgeVariant = "solid" | "soft" | "outline" | "glass";
export type BadgeColor = "default" | "accent" | "success" | "warning" | "destructive" | "info";
export type BadgeSize = "sm" | "md" | "lg";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  color?: BadgeColor;
  size?: BadgeSize;
  dot?: boolean;
  pulse?: boolean;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      variant = "soft",
      color = "default",
      size = "md",
      dot = false,
      pulse = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const classes = cx(
      "aura-badge",
      `aura-badge--${variant}`,
      `aura-badge--color-${color}`,
      `aura-badge--size-${size}`,
      className
    );

    return (
      <span ref={ref} className={classes} {...props}>
        {dot && (
          <span
            className={cx("aura-badge__dot", pulse && "aura-badge__dot--pulse")}
            aria-hidden="true"
          />
        )}
        <span className="aura-badge__content">{children}</span>
      </span>
    );
  }
);

Badge.displayName = "Badge";
