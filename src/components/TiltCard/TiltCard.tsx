import React, { useRef, useState, forwardRef } from "react";
import { cx } from "../../utils/cx";
import "./TiltCard.css";

export interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  maxTilt?: number; // max tilt angle in degrees (default 12)
  glare?: boolean;
}

export const TiltCard = forwardRef<HTMLDivElement, TiltCardProps>(
  (
    {
      maxTilt = 12,
      glare = true,
      className,
      style,
      children,
      onMouseMove,
      onMouseLeave,
      ...props
    },
    ref
  ) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [transformStyle, setTransformStyle] = useState<string>("");
    const [glarePos, setGlarePos] = useState<{ x: number; y: number; opacity: number }>({
      x: 50,
      y: 50,
      opacity: 0,
    });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -maxTilt;
      const rotateY = ((x - centerX) / centerX) * maxTilt;

      setTransformStyle(
        `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`
      );

      if (glare) {
        setGlarePos({
          x: (x / rect.width) * 100,
          y: (y / rect.height) * 100,
          opacity: 0.35,
        });
      }

      onMouseMove?.(e);
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
      setTransformStyle("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
      setGlarePos((prev) => ({ ...prev, opacity: 0 }));
      onMouseLeave?.(e);
    };

    return (
      <div
        ref={(node) => {
          (cardRef as any).current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) (ref as any).current = node;
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={cx("aura-tilt-card", className)}
        style={{
          transform: transformStyle,
          ...style,
        }}
        {...props}
      >
        {glare && (
          <div
            className="aura-tilt-card__glare"
            style={{
              background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, ${glarePos.opacity}), transparent 60%)`,
            }}
            aria-hidden="true"
          />
        )}
        <div className="aura-tilt-card__content">{children}</div>
      </div>
    );
  }
);

TiltCard.displayName = "TiltCard";
