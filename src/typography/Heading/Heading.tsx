import React, { forwardRef } from "react";
import { cx } from "../../utils/cx";
import { Slot, type AsChildProp } from "../../foundations/Slot/Slot";
import "./Heading.css";

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
export type HeadingSize = "display" | "3xl" | "2xl" | "xl" | "lg" | "md" | "sm";

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    AsChildProp {
  level?: HeadingLevel;
  size?: HeadingSize;
  weight?: "medium" | "semibold" | "bold";
  truncate?: boolean;
}

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  (
    {
      level = 2,
      size,
      weight = "semibold",
      truncate = false,
      asChild = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const Tag = `h${level}` as React.ElementType;
    const Component = asChild ? Slot : Tag;

    // Default size based on level if not specified
    const defaultSizes: Record<HeadingLevel, HeadingSize> = {
      1: "3xl",
      2: "2xl",
      3: "xl",
      4: "lg",
      5: "md",
      6: "sm",
    };
    const resolvedSize = size || defaultSizes[level];

    const classes = cx(
      "aura-heading",
      `aura-heading--size-${resolvedSize}`,
      `aura-heading--weight-${weight}`,
      truncate && "aura-heading--truncate",
      className
    );

    return (
      <Component ref={ref as any} className={classes} {...props}>
        {children}
      </Component>
    );
  }
);

Heading.displayName = "Heading";
