import React, { useRef, useState, forwardRef } from "react";
import { cx } from "../../utils/cx";
import "./MagneticButton.css";

export type MagneticButtonVariant = "default" | "glow" | "elastic" | "ghost";

export interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: MagneticButtonVariant;
  strength?: number; // Magnet pull distance in px (default 16)
  glowColor?: string; // Custom glow tint for variant="glow"
  children: React.ReactNode;
}

export const MagneticButton = forwardRef<HTMLButtonElement, MagneticButtonProps>(
  (
    {
      variant = "default",
      strength = 16,
      glowColor,
      className,
      style,
      children,
      onMouseMove,
      onMouseLeave,
      ...props
    },
    ref
  ) => {
    const internalRef = useRef<HTMLButtonElement>(null);
    const buttonRef = (ref || internalRef) as React.MutableRefObject<HTMLButtonElement>;
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!buttonRef.current) return;
      const rect = buttonRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) / (rect.width / 2);
      const deltaY = (e.clientY - centerY) / (rect.height / 2);

      const multiplier = variant === "elastic" ? 1.4 : 1.0;

      setOffset({
        x: deltaX * strength * multiplier,
        y: deltaY * strength * multiplier,
      });

      // Calculate percentage inside button for specular radial glow
      const px = ((e.clientX - rect.left) / rect.width) * 100;
      const py = ((e.clientY - rect.top) / rect.height) * 100;
      setGlowPos({ x: px, y: py });

      setIsHovered(true);
      onMouseMove?.(e);
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
      setOffset({ x: 0, y: 0 });
      setIsHovered(false);
      onMouseLeave?.(e);
    };

    const resolvedStyle: React.CSSProperties = {
      transform: `translate3d(${offset.x}px, ${offset.y}px, 0)${
        variant === "elastic" && isHovered ? " scale(1.06)" : ""
      }`,
      ...(glowColor ? { "--aura-magnetic-glow": glowColor } : {}),
      ...style,
    };

    return (
      <button
        ref={buttonRef}
        type="button"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={cx(
          "aura-magnetic-button",
          `aura-magnetic-button--${variant}`,
          isHovered && "aura-magnetic-button--active",
          className
        )}
        data-variant={variant}
        style={resolvedStyle}
        {...props}
      >
        {variant === "glow" && isHovered && (
          <span
            className="aura-magnetic-button__glow-flare"
            aria-hidden="true"
            style={{
              background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, var(--aura-magnetic-glow, rgba(255, 255, 255, 0.45)), transparent 65%)`,
            }}
          />
        )}
        <span
          className="aura-magnetic-button__content"
          style={{
            transform: `translate3d(${offset.x * 0.35}px, ${offset.y * 0.35}px, 0)`,
          }}
        >
          {children}
        </span>
      </button>
    );
  }
);

MagneticButton.displayName = "MagneticButton";
