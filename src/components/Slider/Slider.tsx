import React, { forwardRef } from "react";
import { cx } from "../../utils/cx";
import "./Slider.css";

export interface SliderProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  showValue?: boolean;
}

export const Slider = forwardRef<HTMLInputElement, SliderProps>(
  (
    {
      min = 0,
      max = 100,
      value,
      defaultValue = 50,
      label,
      showValue = false,
      disabled = false,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const currentValue = Number(value !== undefined ? value : defaultValue);
    const minVal = Number(min);
    const maxVal = Number(max);
    const percentage = Math.min(Math.max(((currentValue - minVal) / (maxVal - minVal)) * 100, 0), 100);

    return (
      <div className={cx("aura-slider-wrapper", disabled && "aura-slider-wrapper--disabled", className)} style={style}>
        {(label || showValue) && (
          <div className="aura-slider-header">
            {label && <span className="aura-slider-label">{label}</span>}
            {showValue && <span className="aura-slider-value">{currentValue}</span>}
          </div>
        )}
        <div className="aura-slider-track-container">
          <input
            ref={ref}
            type="range"
            min={min}
            max={max}
            value={value}
            defaultValue={defaultValue}
            disabled={disabled}
            className="aura-slider-input"
            style={{
              background: `linear-gradient(to right, var(--aura-accent) ${percentage}%, var(--aura-surface-raised) ${percentage}%)`,
            }}
            {...props}
          />
        </div>
      </div>
    );
  }
);

Slider.displayName = "Slider";
