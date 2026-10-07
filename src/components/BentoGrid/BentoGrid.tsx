import React, { forwardRef, useRef, useCallback } from "react";
import { cx } from "../../utils/cx";
import "./BentoGrid.css";

export type BentoGridVariant = "default" | "glow" | "glass" | "gradient" | "cards";

export interface BentoGridProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: 2 | 3 | 4;
  variant?: BentoGridVariant;
  gap?: "sm" | "md" | "lg";
}

const BentoGridRoot = forwardRef<HTMLDivElement, BentoGridProps>(
  (
    {
      columns = 3,
      variant = "default",
      gap = "md",
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
          "aura-bento-grid",
          `aura-bento-grid--cols-${columns}`,
          `aura-bento-grid--${variant}`,
          `aura-bento-grid--gap-${gap}`,
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
BentoGridRoot.displayName = "BentoGrid";

export type BentoCardVariant = "default" | "glow" | "glass" | "gradient" | "interactive";

export interface BentoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  colSpan?: 1 | 2 | 3 | 4;
  rowSpan?: 1 | 2;
  variant?: BentoCardVariant;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  title: string;
  description?: string;
  header?: React.ReactNode;
  graphic?: React.ReactNode;
  cta?: React.ReactNode;
  glowColor?: string;
}

export const BentoCard = forwardRef<HTMLDivElement, BentoCardProps>(
  (
    {
      colSpan = 1,
      rowSpan = 1,
      variant = "default",
      icon,
      badge,
      title,
      description,
      header,
      graphic,
      cta,
      glowColor = "rgba(124, 58, 237, 0.22)",
      className,
      children,
      onMouseMove,
      style,
      ...props
    },
    ref
  ) => {
    const cardRef = useRef<HTMLDivElement | null>(null);

    const handleMouseMove = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (variant === "glow" || variant === "interactive") {
          const el = cardRef.current;
          if (el) {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            el.style.setProperty("--mouse-x", `${x}px`);
            el.style.setProperty("--mouse-y", `${y}px`);
          }
        }
        onMouseMove?.(e);
      },
      [variant, onMouseMove]
    );

    return (
      <div
        ref={(node) => {
          cardRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }}
        className={cx(
          "aura-bento-card",
          `aura-bento-card--col-${colSpan}`,
          `aura-bento-card--row-${rowSpan}`,
          `aura-bento-card--${variant}`,
          className
        )}
        style={
          {
            "--bento-glow-color": glowColor,
            ...style,
          } as React.CSSProperties
        }
        onMouseMove={handleMouseMove}
        {...props}
      >
        {/* Glow overlay for cursor-following specular spotlight */}
        {(variant === "glow" || variant === "interactive") && (
          <div className="aura-bento-card__glow-layer" aria-hidden="true" />
        )}

        {/* Optional background graphic / illustration slot */}
        {graphic && (
          <div className="aura-bento-card__graphic" aria-hidden="true">
            {graphic}
          </div>
        )}

        {/* Top header or illustration */}
        {header && <div className="aura-bento-card__header">{header}</div>}

        <div className="aura-bento-card__body">
          <div className="aura-bento-card__meta">
            {icon && <div className="aura-bento-card__icon">{icon}</div>}
            {badge && <div className="aura-bento-card__badge">{badge}</div>}
          </div>

          <h3 className="aura-bento-card__title">{title}</h3>
          {description && (
            <p className="aura-bento-card__description">{description}</p>
          )}

          {children}
        </div>

        {cta && <div className="aura-bento-card__cta">{cta}</div>}
      </div>
    );
  }
);
BentoCard.displayName = "BentoCard";

export const BentoGrid = Object.assign(BentoGridRoot, {
  Card: BentoCard,
});
