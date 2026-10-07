import React, { forwardRef } from "react";
import { cx } from "../../utils/cx";
import "./Spinner.css";

export type SpinnerSize = "xs" | "sm" | "md" | "lg" | "xl";
export type SpinnerVariant = "ring" | "dots" | "orbit" | "pulse" | "bars";

export interface SpinnerProps extends React.HTMLAttributes<HTMLElement> {
  variant?: SpinnerVariant;
  size?: SpinnerSize;
  label?: string;
  speed?: "fast" | "normal" | "slow";
  color?: string;
}

export const Spinner = forwardRef<HTMLElement, SpinnerProps>(
  (
    {
      variant = "ring",
      size = "md",
      speed = "normal",
      label = "Loading...",
      color,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const customStyle: React.CSSProperties = {
      ...(color ? { color } : {}),
      ...style,
    };

    if (variant === "dots") {
      return (
        <span
          ref={ref as React.Ref<HTMLSpanElement>}
          className={cx(
            "aura-spinner-dots",
            `aura-spinner-dots--${size}`,
            `aura-spinner--speed-${speed}`,
            className
          )}
          style={customStyle}
          role="status"
          aria-label={label}
          {...props}
        >
          <span className="aura-spinner-dots__dot" />
          <span className="aura-spinner-dots__dot" />
          <span className="aura-spinner-dots__dot" />
        </span>
      );
    }

    if (variant === "orbit") {
      return (
        <span
          ref={ref as React.Ref<HTMLSpanElement>}
          className={cx(
            "aura-spinner-orbit",
            `aura-spinner-orbit--${size}`,
            `aura-spinner--speed-${speed}`,
            className
          )}
          style={customStyle}
          role="status"
          aria-label={label}
          {...props}
        >
          <span className="aura-spinner-orbit__ring-outer" />
          <span className="aura-spinner-orbit__ring-inner" />
        </span>
      );
    }

    if (variant === "pulse") {
      return (
        <span
          ref={ref as React.Ref<HTMLSpanElement>}
          className={cx(
            "aura-spinner-pulse",
            `aura-spinner-pulse--${size}`,
            `aura-spinner--speed-${speed}`,
            className
          )}
          style={customStyle}
          role="status"
          aria-label={label}
          {...props}
        >
          <span className="aura-spinner-pulse__core" />
          <span className="aura-spinner-pulse__ripple" />
        </span>
      );
    }

    if (variant === "bars") {
      return (
        <span
          ref={ref as React.Ref<HTMLSpanElement>}
          className={cx(
            "aura-spinner-bars",
            `aura-spinner-bars--${size}`,
            `aura-spinner--speed-${speed}`,
            className
          )}
          style={customStyle}
          role="status"
          aria-label={label}
          {...props}
        >
          <span className="aura-spinner-bars__bar" />
          <span className="aura-spinner-bars__bar" />
          <span className="aura-spinner-bars__bar" />
          <span className="aura-spinner-bars__bar" />
        </span>
      );
    }

    // Default "ring"
    return (
      <svg
        ref={ref as any}
        className={cx(
          "aura-spinner",
          `aura-spinner--size-${size}`,
          `aura-spinner--speed-${speed}`,
          className
        )}
        viewBox="0 0 24 24"
        fill="none"
        role="status"
        aria-label={label}
        style={customStyle}
        {...(props as React.SVGAttributes<SVGSVGElement>)}
      >
        <circle
          className="aura-spinner__track"
          cx="12"
          cy="12"
          r="9.5"
          stroke="currentColor"
          strokeWidth="2.2"
        />
        <circle
          className="aura-spinner__head"
          cx="12"
          cy="12"
          r="9.5"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeDasharray="45"
          strokeDashoffset="35"
          strokeLinecap="round"
        />
      </svg>
    );
  }
);

Spinner.displayName = "Spinner";
