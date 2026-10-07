import React, { forwardRef } from "react";
import { cx } from "../../utils/cx";
import "./Label.css";

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  size?: "sm" | "md" | "lg";
  required?: boolean;
  disabled?: boolean;
}

export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ size = "md", required = false, disabled = false, className, children, ...props }, ref) => {
    const classes = cx(
      "aura-label",
      `aura-label--size-${size}`,
      disabled && "aura-label--disabled",
      className
    );

    return (
      <label ref={ref} className={classes} aria-disabled={disabled} {...props}>
        {children}
        {required && <span className="aura-label__asterisk" aria-hidden="true">*</span>}
      </label>
    );
  }
);

Label.displayName = "Label";
