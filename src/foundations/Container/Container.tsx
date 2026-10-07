import React, { forwardRef } from "react";
import { cx } from "../../utils/cx";
import { Slot, type AsChildProp } from "../Slot/Slot";
import "./Container.css";

export type ContainerSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "full";

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    AsChildProp {
  size?: ContainerSize;
  centered?: boolean;
  padding?: boolean;
}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  (
    {
      asChild,
      size = "lg",
      centered = true,
      padding = true,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const Component = asChild ? Slot : "div";
    const classes = cx(
      "aura-container",
      `aura-container--${size}`,
      centered && "aura-container--centered",
      padding && "aura-container--padded",
      className
    );

    return (
      <Component ref={ref} className={classes} {...props}>
        {children}
      </Component>
    );
  }
);

Container.displayName = "Container";
