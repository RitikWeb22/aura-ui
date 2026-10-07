import React, { forwardRef } from "react";
import { cx } from "../../utils/cx";
import { Slot, type AsChildProp } from "../../foundations/Slot/Slot";
import "./Text.css";

export type TextVariant = "default" | "muted" | "subtle" | "accent" | "destructive" | "success";
export type TextSize = "xs" | "sm" | "base" | "lg" | "xl";
export type TextWeight = "regular" | "medium" | "semibold" | "bold";
export type TextAlign = "left" | "center" | "right" | "justify";

export interface TextProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    AsChildProp {
  as?: React.ElementType;
  variant?: TextVariant;
  size?: TextSize;
  weight?: TextWeight;
  align?: TextAlign;
  truncate?: boolean;
}

export const Text = forwardRef<HTMLElement, TextProps>(
  (
    {
      as: Tag = "p",
      asChild = false,
      variant = "default",
      size = "base",
      weight = "regular",
      align,
      truncate = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const Component = asChild ? Slot : Tag;
    const classes = cx(
      "aura-text",
      `aura-text--${variant}`,
      `aura-text--size-${size}`,
      `aura-text--weight-${weight}`,
      align && `aura-text--align-${align}`,
      truncate && "aura-text--truncate",
      className
    );

    return (
      <Component ref={ref as any} className={classes} {...props}>
        {children}
      </Component>
    );
  }
);

Text.displayName = "Text";
