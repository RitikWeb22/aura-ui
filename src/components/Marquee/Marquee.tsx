import React, { forwardRef } from "react";
import { cx } from "../../utils/cx";
import "./Marquee.css";

export type MarqueeVariant = "default" | "vertical" | "3d-tilt" | "cards";

export interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: MarqueeVariant;
  pauseOnHover?: boolean;
  reverse?: boolean;
  speed?: number; // seconds per cycle
  fade?: boolean; // gradient edge fade
  gap?: string; // spacing between elements (e.g. "1.5rem")
}

export const Marquee = forwardRef<HTMLDivElement, MarqueeProps>(
  (
    {
      variant = "default",
      pauseOnHover = true,
      reverse = false,
      speed = 30,
      fade = true,
      gap,
      className,
      style,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cx(
          "aura-marquee",
          `aura-marquee--${variant}`,
          pauseOnHover && "aura-marquee--pause-on-hover",
          fade && "aura-marquee--fade",
          className
        )}
        data-variant={variant}
        style={
          {
            "--marquee-duration": `${speed}s`,
            "--marquee-direction": reverse ? "reverse" : "normal",
            ...(gap ? { "--marquee-gap": gap } : {}),
            ...style,
          } as React.CSSProperties
        }
        {...props}
      >
        <div className="aura-marquee__track">
          <div className="aura-marquee__content">{children}</div>
          <div className="aura-marquee__content" aria-hidden="true">
            {children}
          </div>
        </div>
      </div>
    );
  }
);

Marquee.displayName = "Marquee";
