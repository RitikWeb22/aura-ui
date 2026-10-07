import React, { forwardRef, useEffect, useRef } from "react";
import { cx } from "../../utils/cx";
import "./Checkbox.css";

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  indeterminate?: boolean;
  label?: React.ReactNode;
  description?: React.ReactNode;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      indeterminate = false,
      checked,
      disabled = false,
      label,
      description,
      className,
      style,
      id: customId,
      ...props
    },
    ref
  ) => {
    const internalRef = useRef<HTMLInputElement>(null);
    const inputRef = (ref || internalRef) as React.MutableRefObject<HTMLInputElement>;
    const generatedId = React.useId();
    const inputId = customId || generatedId;

    useEffect(() => {
      if (inputRef.current) {
        inputRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate, inputRef]);

    return (
      <label
        htmlFor={inputId}
        className={cx(
          "aura-checkbox-container",
          disabled && "aura-checkbox-container--disabled",
          className
        )}
        style={style}
      >
        <span className="aura-checkbox-wrapper">
          <input
            ref={inputRef}
            id={inputId}
            type="checkbox"
            checked={checked}
            disabled={disabled}
            className="aura-checkbox-input"
            {...props}
          />
          <span className="aura-checkbox-indicator" aria-hidden="true">
            {indeterminate ? (
              <svg viewBox="0 0 16 16" fill="currentColor" className="aura-checkbox-icon">
                <rect x="3" y="7" width="10" height="2" rx="1" />
              </svg>
            ) : (
              <svg
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="aura-checkbox-icon"
              >
                <path d="M3.5 8.5 6.5 11.5 12.5 4.5" />
              </svg>
            )}
          </span>
        </span>
        {(label || description) && (
          <span className="aura-checkbox-content">
            {label && <span className="aura-checkbox-label">{label}</span>}
            {description && (
              <span className="aura-checkbox-description">{description}</span>
            )}
          </span>
        )}
      </label>
    );
  }
);

Checkbox.displayName = "Checkbox";
