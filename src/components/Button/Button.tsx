import React, { forwardRef } from "react";
import { cx } from "../../utils/cx";
import { Slot, type AsChildProp } from "../../foundations/Slot/Slot";
import { Spinner } from "../Spinner/Spinner";
import "./Button.css";

export type ButtonVariant = "solid" | "soft" | "outline" | "ghost" | "glass";
export type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    AsChildProp {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  accentColor?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      asChild = false,
      variant = "solid",
      size = "md",
      loading = false,
      disabled = false,
      leftIcon,
      rightIcon,
      accentColor,
      className,
      style,
      children,
      type = "button",
      ...props
    },
    ref
  ) => {
    const Component = asChild ? Slot : "button";
    const isDisabled = disabled || loading;

    const customStyle: React.CSSProperties = {
      ...(accentColor ? ({ "--aura-button-accent": accentColor } as any) : {}),
      ...style,
    };

    const classes = cx(
      "aura-button",
      `aura-button--${variant}`,
      `aura-button--${size}`,
      loading && "aura-button--loading",
      isDisabled && "aura-button--disabled",
      className
    );

    return (
      <Component
        ref={ref}
        type={asChild ? undefined : type}
        disabled={asChild ? undefined : isDisabled}
        aria-disabled={isDisabled ? true : undefined}
        aria-busy={loading ? true : undefined}
        data-variant={variant}
        data-size={size}
        data-loading={loading ? "" : undefined}
        data-disabled={isDisabled ? "" : undefined}
        className={classes}
        style={customStyle}
        {...props}
      >
        {loading && (
          <span className="aura-button__spinner-wrapper">
            <Spinner size={size === "xs" || size === "sm" ? "xs" : "sm"} />
          </span>
        )}
        {leftIcon && <span className="aura-button__icon aura-button__icon--left">{leftIcon}</span>}
        <span className="aura-button__content">{children}</span>
        {rightIcon && <span className="aura-button__icon aura-button__icon--right">{rightIcon}</span>}
      </Component>
    );
  }
);

Button.displayName = "Button";
