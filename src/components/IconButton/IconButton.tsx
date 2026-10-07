import React, { forwardRef } from "react";
import { cx } from "../../utils/cx";
import { Slot, type AsChildProp } from "../../foundations/Slot/Slot";
import { Spinner } from "../Spinner/Spinner";
import type { ButtonVariant, ButtonSize } from "../Button/Button";
import "./IconButton.css";

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    AsChildProp {
  "aria-label": string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  shape?: "circle" | "square";
  loading?: boolean;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      "aria-label": ariaLabel,
      asChild = false,
      variant = "ghost",
      size = "md",
      shape = "square",
      loading = false,
      disabled = false,
      className,
      children,
      type = "button",
      ...props
    },
    ref
  ) => {
    const Component = asChild ? Slot : "button";
    const isDisabled = disabled || loading;

    const classes = cx(
      "aura-icon-button",
      `aura-button--${variant}`,
      `aura-icon-button--${size}`,
      `aura-icon-button--${shape}`,
      loading && "aura-icon-button--loading",
      isDisabled && "aura-icon-button--disabled",
      className
    );

    return (
      <Component
        ref={ref}
        type={asChild ? undefined : type}
        aria-label={ariaLabel}
        disabled={asChild ? undefined : isDisabled}
        aria-disabled={isDisabled ? true : undefined}
        aria-busy={loading ? true : undefined}
        data-variant={variant}
        data-size={size}
        className={classes}
        {...props}
      >
        {loading ? (
          <Spinner size={size === "xs" || size === "sm" ? "xs" : "sm"} />
        ) : (
          children
        )}
      </Component>
    );
  }
);

IconButton.displayName = "IconButton";
