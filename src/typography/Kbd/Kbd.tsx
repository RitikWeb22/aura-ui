import React, { forwardRef } from "react";
import { cx } from "../../utils/cx";
import "./Kbd.css";

export interface KbdProps extends React.HTMLAttributes<HTMLElement> {
  size?: "sm" | "md" | "lg";
}

export const Kbd = forwardRef<HTMLElement, KbdProps>(
  ({ size = "md", className, children, ...props }, ref) => {
    const classes = cx("aura-kbd", `aura-kbd--size-${size}`, className);

    return (
      <kbd ref={ref} className={classes} {...props}>
        {children}
      </kbd>
    );
  }
);

Kbd.displayName = "Kbd";
