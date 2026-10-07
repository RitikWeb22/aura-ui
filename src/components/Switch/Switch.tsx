import React, { forwardRef, useState } from "react";
import { cx } from "../../utils/cx";
import "./Switch.css";

export type SwitchSize = "sm" | "md" | "lg";

export interface SwitchProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  size?: SwitchSize;
  label?: React.ReactNode;
  description?: React.ReactNode;
}

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
  (
    {
      checked: controlledChecked,
      defaultChecked = false,
      onCheckedChange,
      size = "md",
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
    const [internalChecked, setInternalChecked] = useState(defaultChecked);
    const isChecked = controlledChecked !== undefined ? controlledChecked : internalChecked;
    const generatedId = React.useId();
    const switchId = customId || generatedId;

    const handleClick = () => {
      if (disabled) return;
      const nextChecked = !isChecked;
      if (controlledChecked === undefined) {
        setInternalChecked(nextChecked);
      }
      onCheckedChange?.(nextChecked);
    };

    return (
      <div
        className={cx(
          "aura-switch-container",
          disabled && "aura-switch-container--disabled",
          className
        )}
        style={style}
      >
        <button
          ref={ref}
          id={switchId}
          type="button"
          role="switch"
          aria-checked={isChecked}
          disabled={disabled}
          onClick={handleClick}
          className={cx(
            "aura-switch",
            `aura-switch--${size}`,
            isChecked && "aura-switch--checked"
          )}
          {...props}
        >
          <span className="aura-switch__thumb" aria-hidden="true" />
        </button>
        {(label || description) && (
          <label htmlFor={switchId} className="aura-switch-content" onClick={handleClick}>
            {label && <span className="aura-switch-label">{label}</span>}
            {description && (
              <span className="aura-switch-description">{description}</span>
            )}
          </label>
        )}
      </div>
    );
  }
);

Switch.displayName = "Switch";
