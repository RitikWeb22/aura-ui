import React, { forwardRef } from "react";
import { cx } from "../../utils/cx";
import { Slot, type AsChildProp } from "../Slot/Slot";
import "./Stack.css";

export type StackGap = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16;
export type StackAlign = "start" | "center" | "end" | "stretch" | "baseline";
export type StackJustify = "start" | "center" | "end" | "between" | "around" | "evenly";

export interface StackProps extends React.HTMLAttributes<HTMLDivElement>, AsChildProp {
  gap?: StackGap;
  align?: StackAlign;
  justify?: StackJustify;
  inline?: boolean;
}

export const Stack = forwardRef<HTMLDivElement, StackProps>(
  ({ asChild, gap = 4, align = "stretch", justify = "start", inline = false, className, children, ...props }, ref) => {
    const Component = asChild ? Slot : "div";
    const classes = cx(
      "aura-stack",
      `aura-stack--gap-${gap}`,
      `aura-stack--align-${align}`,
      `aura-stack--justify-${justify}`,
      inline && "aura-stack--inline",
      className
    );

    return (
      <Component ref={ref} className={classes} {...props}>
        {children}
      </Component>
    );
  }
);

Stack.displayName = "Stack";
