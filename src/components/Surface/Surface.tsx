import React, { forwardRef } from "react";
import { cx } from "../../utils/cx";
import { Slot, type AsChildProp } from "../../foundations/Slot/Slot";
import "./Surface.css";

export type SurfaceElevation = "base" | "raised" | "overlay" | "sunken";
export type SurfaceRadius = "none" | "sm" | "md" | "lg" | "xl" | "full";

export interface SurfaceProps
  extends React.HTMLAttributes<HTMLDivElement>,
    AsChildProp {
  elevation?: SurfaceElevation;
  radius?: SurfaceRadius;
  border?: boolean;
}

export const Surface = forwardRef<HTMLDivElement, SurfaceProps>(
  (
    {
      asChild = false,
      elevation = "base",
      radius = "md",
      border = true,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const Component = asChild ? Slot : "div";
    const classes = cx(
      "aura-surface",
      `aura-surface--elevation-${elevation}`,
      `aura-surface--radius-${radius}`,
      border && "aura-surface--bordered",
      className
    );

    return (
      <Component ref={ref} className={classes} {...props}>
        {children}
      </Component>
    );
  }
);

Surface.displayName = "Surface";
