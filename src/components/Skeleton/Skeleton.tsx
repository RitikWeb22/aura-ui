import React, { forwardRef } from "react";
import { cx } from "../../utils/cx";
import "./Skeleton.css";

export type SkeletonVariant = "text" | "circular" | "rectangular";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: SkeletonVariant;
  width?: string | number;
  height?: string | number;
  radius?: string | number;
  animated?: boolean;
}

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  (
    {
      variant = "rectangular",
      width,
      height,
      radius,
      animated = true,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const customStyle: React.CSSProperties = {
      width: typeof width === "number" ? `${width}px` : width,
      height: typeof height === "number" ? `${height}px` : height,
      borderRadius: typeof radius === "number" ? `${radius}px` : radius,
      ...style,
    };

    const classes = cx(
      "aura-skeleton",
      `aura-skeleton--${variant}`,
      animated && "aura-skeleton--animated",
      className
    );

    return (
      <div
        ref={ref}
        className={classes}
        style={customStyle}
        aria-hidden="true"
        role="presentation"
        {...props}
      />
    );
  }
);

Skeleton.displayName = "Skeleton";
