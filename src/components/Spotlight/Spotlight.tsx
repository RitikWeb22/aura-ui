import React, { useRef, forwardRef } from "react";
import { cx } from "../../utils/cx";
import "./Spotlight.css";

export interface SpotlightProps extends React.HTMLAttributes<HTMLDivElement> {
  spotlightColor?: string;
  spotlightSize?: number;
}

export const Spotlight = forwardRef<HTMLDivElement, SpotlightProps>(
  (
    {
      spotlightColor = "var(--aura-accent-glow)",
      spotlightSize = 400,
      className,
      style,
      children,
      ...props
    },
    ref
  ) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const setRef = (node: HTMLDivElement | null) => {
      (containerRef as any).current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) (ref as any).current = node;
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      containerRef.current.style.setProperty("--mouse-x", `${x}px`);
      containerRef.current.style.setProperty("--mouse-y", `${y}px`);
    };

    return (
      <div
        ref={setRef}
        onMouseMove={handleMouseMove}
        className={cx("aura-spotlight", className)}
        style={
          {
            "--spotlight-color": spotlightColor,
            "--spotlight-size": `${spotlightSize}px`,
            ...style,
          } as React.CSSProperties
        }
        {...props}
      >
        <div className="aura-spotlight__glow" aria-hidden="true" />
        <div className="aura-spotlight__content">{children}</div>
      </div>
    );
  }
);

Spotlight.displayName = "Spotlight";
