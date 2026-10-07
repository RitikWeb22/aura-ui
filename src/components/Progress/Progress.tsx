import React, { forwardRef } from "react";
import { cx } from "../../utils/cx";
import "./Progress.css";

export type ProgressSize = "xs" | "sm" | "md" | "lg";
export type ProgressColor = "accent" | "success" | "warning" | "destructive";

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  max?: number;
  size?: ProgressSize;
  color?: ProgressColor;
  label?: string;
  showValueLabel?: boolean;
}

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      value,
      max = 100,
      size = "md",
      color = "accent",
      label,
      showValueLabel = false,
      className,
      ...props
    },
    ref
  ) => {
    const isIndeterminate = value === undefined || value === null;
    const percentage = isIndeterminate
      ? undefined
      : Math.min(Math.max((value / max) * 100, 0), 100);

    const classes = cx(
      "aura-progress",
      `aura-progress--size-${size}`,
      `aura-progress--color-${color}`,
      isIndeterminate && "aura-progress--indeterminate",
      className
    );

    return (
      <div className="aura-progress__wrapper">
        {(label || showValueLabel) && (
          <div className="aura-progress__header">
            {label && <span className="aura-progress__label">{label}</span>}
            {showValueLabel && !isIndeterminate && (
              <span className="aura-progress__value-text">{Math.round(percentage!)}%</span>
            )}
          </div>
        )}
        <div
          ref={ref}
          className={classes}
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={max}
          aria-valuenow={isIndeterminate ? undefined : value}
          aria-label={label || "Progress"}
          {...props}
        >
          <div
            className="aura-progress__indicator"
            style={{
              width: isIndeterminate ? undefined : `${percentage}%`,
            }}
          />
        </div>
      </div>
    );
  }
);

Progress.displayName = "Progress";
