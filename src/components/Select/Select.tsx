import React, { forwardRef } from "react";
import { cx } from "../../utils/cx";
import "./Select.css";

export type SelectSize = "sm" | "md" | "lg";

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  selectSize?: SelectSize;
  isInvalid?: boolean;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      selectSize = "md",
      isInvalid = false,
      disabled = false,
      className,
      style,
      children,
      ...props
    },
    ref
  ) => {
    const classes = cx(
      "aura-select",
      `aura-select--${selectSize}`,
      isInvalid && "aura-select--invalid",
      disabled && "aura-select--disabled",
      className
    );

    return (
      <div className={cx("aura-select-wrapper", disabled && "aura-select-wrapper--disabled")}>
        <select
          ref={ref}
          disabled={disabled}
          aria-invalid={isInvalid ? true : undefined}
          className={classes}
          style={style}
          {...props}
        >
          {children}
        </select>
        <span className="aura-select__chevron" aria-hidden="true">
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m4 6 4 4 4-4" />
          </svg>
        </span>
      </div>
    );
  }
);

Select.displayName = "Select";
