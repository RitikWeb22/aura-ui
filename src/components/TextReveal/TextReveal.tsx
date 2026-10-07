import React, { forwardRef, useMemo } from "react";
import { cx } from "../../utils/cx";
import "./TextReveal.css";

export type TextRevealVariant = "words" | "characters" | "blur" | "gradient" | "lines";

export interface TextRevealProps extends React.HTMLAttributes<HTMLHeadingElement> {
  text: string;
  variant?: TextRevealVariant;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";
  staggerMs?: number; // Delay between segments in ms
  initialDelayMs?: number;
}

export const TextReveal = forwardRef<HTMLElement, TextRevealProps>(
  (
    {
      text,
      variant = "words",
      as: Tag = "h2",
      staggerMs,
      initialDelayMs = 0,
      className,
      ...props
    },
    ref
  ) => {
    const Component = Tag as any;

    // Default stagger timings per variant
    const resolvedStagger = useMemo(() => {
      if (staggerMs !== undefined) return staggerMs;
      if (variant === "characters") return 25;
      if (variant === "blur") return 40;
      if (variant === "lines") return 120;
      return 55; // words
    }, [staggerMs, variant]);

    if (variant === "gradient") {
      return (
        <Component
          ref={ref}
          className={cx("aura-text-reveal", "aura-text-reveal--gradient", className)}
          {...props}
        >
          <span className="aura-text-reveal__gradient-text">{text}</span>
        </Component>
      );
    }

    if (variant === "characters") {
      const chars = Array.from(text);
      return (
        <Component
          ref={ref}
          className={cx("aura-text-reveal", "aura-text-reveal--characters", className)}
          {...props}
        >
          {chars.map((char, index) => (
            <span
              key={`${char}-${index}`}
              className="aura-text-reveal__char"
              style={{
                animationDelay: `${initialDelayMs + index * resolvedStagger}ms`,
              }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </Component>
      );
    }

    if (variant === "lines") {
      const lines = text.split("\n");
      return (
        <Component
          ref={ref}
          className={cx("aura-text-reveal", "aura-text-reveal--lines", className)}
          {...props}
        >
          {lines.map((line, index) => (
            <span
              key={`${line}-${index}`}
              className="aura-text-reveal__line"
              style={{
                animationDelay: `${initialDelayMs + index * resolvedStagger}ms`,
              }}
            >
              {line}
            </span>
          ))}
        </Component>
      );
    }

    if (variant === "blur") {
      const words = text.split(" ");
      return (
        <Component
          ref={ref}
          className={cx("aura-text-reveal", "aura-text-reveal--blur", className)}
          {...props}
        >
          {words.map((word, index) => (
            <span
              key={`${word}-${index}`}
              className="aura-text-reveal__blur-word"
              style={{
                animationDelay: `${initialDelayMs + index * resolvedStagger}ms`,
              }}
            >
              {word}&nbsp;
            </span>
          ))}
        </Component>
      );
    }

    // Default "words"
    const words = text.split(" ");
    return (
      <Component
        ref={ref}
        className={cx("aura-text-reveal", "aura-text-reveal--words", className)}
        {...props}
      >
        {words.map((word, index) => (
          <span
            key={`${word}-${index}`}
            className="aura-text-reveal__word"
            style={{
              animationDelay: `${initialDelayMs + index * resolvedStagger}ms`,
            }}
          >
            {word}&nbsp;
          </span>
        ))}
      </Component>
    );
  }
);

TextReveal.displayName = "TextReveal";
