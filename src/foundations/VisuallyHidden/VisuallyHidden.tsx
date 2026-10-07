import React, { forwardRef } from "react";
import { cx } from "../../utils/cx";
import "./VisuallyHidden.css";

export interface VisuallyHiddenProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  as?: React.ElementType;
}

export const VisuallyHidden = forwardRef<HTMLElement, VisuallyHiddenProps>(
  ({ children, as: Component = "span", className, style, ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cx("aura-visually-hidden", className)}
        style={style}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

VisuallyHidden.displayName = "VisuallyHidden";
