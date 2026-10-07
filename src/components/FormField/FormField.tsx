import React, { forwardRef } from "react";
import { cx } from "../../utils/cx";
import { Label } from "../../typography/Label/Label";
import "./FormField.css";

export interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  required?: boolean;
  error?: string;
  helperText?: string;
  htmlFor?: string;
  children: React.ReactNode;
}

export const FormField = forwardRef<HTMLDivElement, FormFieldProps>(
  (
    {
      label,
      required = false,
      error,
      helperText,
      htmlFor,
      children,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div ref={ref} className={cx("aura-form-field", error && "aura-form-field--error", className)} {...props}>
        {label && (
          <Label htmlFor={htmlFor} required={required} size="sm">
            {label}
          </Label>
        )}
        <div className="aura-form-field__control">{children}</div>
        {error ? (
          <span className="aura-form-field__error" role="alert">
            {error}
          </span>
        ) : helperText ? (
          <span className="aura-form-field__helper">{helperText}</span>
        ) : null}
      </div>
    );
  }
);

FormField.displayName = "FormField";
