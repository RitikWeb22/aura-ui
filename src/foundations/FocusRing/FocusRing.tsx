import React, { forwardRef } from "react";
import { cx } from "../../utils/cx";
import "./FocusRing.css";

export interface FocusRingProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  visible?: boolean;
}

export const FocusRing = forwardRef<HTMLDivElement, FocusRingProps>(
  ({ children, visible, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cx("aura-focus-ring", visible && "aura-focus-ring--visible", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

FocusRing.displayName = "FocusRing";
