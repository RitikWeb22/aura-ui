import React, { forwardRef } from "react";
import { cx } from "../../utils/cx";
import "./Code.css";

export interface CodeProps extends React.HTMLAttributes<HTMLElement> {
  size?: "xs" | "sm" | "base";
  variant?: "soft" | "outline" | "solid";
}

export const Code = forwardRef<HTMLElement, CodeProps>(
  ({ size = "sm", variant = "soft", className, children, ...props }, ref) => {
    const classes = cx(
      "aura-code",
      `aura-code--size-${size}`,
      `aura-code--variant-${variant}`,
      className
    );

    return (
      <code ref={ref} className={classes} {...props}>
        {children}
      </code>
    );
  }
);

Code.displayName = "Code";
