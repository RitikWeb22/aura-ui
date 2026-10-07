import React, { forwardRef } from "react";
import { cx } from "../../utils/cx";
import { Slot, type AsChildProp } from "../Slot/Slot";
import type { StackGap, StackAlign, StackJustify } from "../Stack/Stack";
import "./Inline.css";

export interface InlineProps extends React.HTMLAttributes<HTMLDivElement>, AsChildProp {
  gap?: StackGap;
  align?: StackAlign;
  justify?: StackJustify;
  wrap?: boolean | "wrap" | "nowrap" | "wrap-reverse";
}

export const Inline = forwardRef<HTMLDivElement, InlineProps>(
  (
    {
      asChild,
      gap = 3,
      align = "center",
      justify = "start",
      wrap = true,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const Component = asChild ? Slot : "div";
    const wrapClass = typeof wrap === "boolean" 
      ? (wrap ? "aura-inline--wrap" : "aura-inline--nowrap")
      : `aura-inline--${wrap}`;

    const classes = cx(
      "aura-inline",
      `aura-inline--gap-${gap}`,
      `aura-inline--align-${align}`,
      `aura-inline--justify-${justify}`,
      wrapClass,
      className
    );

    return (
      <Component ref={ref} className={classes} {...props}>
        {children}
      </Component>
    );
  }
);

Inline.displayName = "Inline";
