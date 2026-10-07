import React, { useMemo } from "react";
import { cx } from "../../utils/cx";
import "./Meteors.css";

export type MeteorsVariant = "shower" | "aurora" | "burst" | "subtle";

export interface MeteorsProps extends React.HTMLAttributes<HTMLDivElement> {
  number?: number;
  variant?: MeteorsVariant;
  colors?: string[];
  angle?: number; // default 215deg
  speed?: "fast" | "normal" | "slow";
}

export const Meteors: React.FC<MeteorsProps> = ({
  number = 24,
  variant = "shower",
  colors,
  angle = 215,
  speed = "normal",
  className,
  style,
  ...props
}) => {
  const defaultPalette = useMemo(() => {
    if (colors && colors.length > 0) return colors;
    if (variant === "aurora") {
      return ["#00e5ff", "#a855f7", "#ec4899", "#3b82f6", "#10b981"];
    }
    return ["#ffffff"];
  }, [colors, variant]);

  const speedMultiplier = speed === "fast" ? 0.6 : speed === "slow" ? 1.6 : 1.0;

  const meteors = useMemo(() => {
    return Array.from({ length: number }).map((_, i) => {
      const color = defaultPalette[i % defaultPalette.length];
      const baseDuration = variant === "subtle" ? 5 : variant === "burst" ? 2.5 : 3.5;
      const duration = (baseDuration + Math.random() * 2) * speedMultiplier;
      return {
        id: i,
        top: -15 + Math.random() * 90,
        left: Math.random() * 110,
        delay: Math.random() * 2 + 0.1,
        duration,
        color,
      };
    });
  }, [number, defaultPalette, variant, speedMultiplier]);

  return (
    <div
      className={cx(
        "aura-meteors-container",
        `aura-meteors--${variant}`,
        className
      )}
      aria-hidden="true"
      style={
        {
          "--aura-meteor-angle": `${angle}deg`,
          ...style,
        } as React.CSSProperties
      }
      {...props}
    >
      {meteors.map((m) => (
        <span
          key={m.id}
          className="aura-meteor"
          style={
            {
              top: `${m.top}%`,
              left: `${m.left}%`,
              animationDelay: `${m.delay}s`,
              animationDuration: `${m.duration}s`,
              backgroundColor: m.color,
              boxShadow: `0 0 4px 1px ${m.color}`,
              "--aura-meteor-color": m.color,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
};
