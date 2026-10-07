import React, { forwardRef } from "react";
import { cx } from "../../utils/cx";
import "./Textarea.css";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  isInvalid?: boolean;
  resize?: "none" | "vertical" | "horizontal" | "both";
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      isInvalid = false,
      disabled = false,
      resize = "vertical",
      className,
      style,
      rows = 4,
      ...props
    },
    ref
  ) => {
    const classes = cx(
      "aura-textarea",
      `aura-textarea--resize-${resize}`,
      isInvalid && "aura-textarea--invalid",
      disabled && "aura-textarea--disabled",
      className
    );

    return (
      <textarea
        ref={ref}
        rows={rows}
        disabled={disabled}
        aria-invalid={isInvalid ? true : undefined}
        className={classes}
        style={style}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";
