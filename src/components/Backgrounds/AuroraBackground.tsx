import React, { forwardRef } from "react";
import { cx } from "../../utils/cx";
import "./AuroraBackground.css";

export type AuroraVariant = "subtle" | "vibrant" | "sunset";

export interface AuroraBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: AuroraVariant;
  speed?: "slow" | "normal" | "fast";
  children?: React.ReactNode;
}

export const AuroraBackground = forwardRef<HTMLDivElement, AuroraBackgroundProps>(
  (
    {
      variant = "subtle",
      speed = "normal",
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cx(
          "aura-aurora-bg",
          `aura-aurora-bg--${variant}`,
          `aura-aurora-bg--speed-${speed}`,
          className
        )}
        data-variant={variant}
        {...props}
      >
        <div className="aura-aurora-bg__aurora" aria-hidden="true" />
        {children && <div className="aura-aurora-bg__content">{children}</div>}
      </div>
    );
  }
);

AuroraBackground.displayName = "AuroraBackground";
