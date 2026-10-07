import React, { forwardRef } from "react";
import { cx } from "../../utils/cx";
import "./Input.css";

export type InputSize = "sm" | "md" | "lg";
export type InputVariant = "default" | "filled" | "ghost";

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  inputSize?: InputSize;
  variant?: InputVariant;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isInvalid?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      inputSize = "md",
      variant = "default",
      leftIcon,
      rightIcon,
      isInvalid = false,
      disabled = false,
      className,
      style,
      type = "text",
      ...props
    },
    ref
  ) => {
    const hasIcons = leftIcon || rightIcon;

    const inputClasses = cx(
      "aura-input",
      `aura-input--${inputSize}`,
      `aura-input--${variant}`,
      isInvalid && "aura-input--invalid",
      disabled && "aura-input--disabled",
      leftIcon && "aura-input--has-left-icon",
      rightIcon && "aura-input--has-right-icon",
      className
    );

    if (!hasIcons) {
      return (
        <input
          ref={ref}
          type={type}
          disabled={disabled}
          aria-invalid={isInvalid ? true : undefined}
          className={inputClasses}
          style={style}
          {...props}
        />
      );
    }

    return (
      <div className={cx("aura-input-wrapper", disabled && "aura-input-wrapper--disabled")}>
        {leftIcon && <span className="aura-input__icon aura-input__icon--left">{leftIcon}</span>}
        <input
          ref={ref}
          type={type}
          disabled={disabled}
          aria-invalid={isInvalid ? true : undefined}
          className={inputClasses}
          style={style}
          {...props}
        />
        {rightIcon && <span className="aura-input__icon aura-input__icon--right">{rightIcon}</span>}
      </div>
    );
  }
);

Input.displayName = "Input";
