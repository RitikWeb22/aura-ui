import React, { forwardRef, useState } from "react";
import { cx } from "../../utils/cx";
import "./Avatar.css";

export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";
export type AvatarShape = "circle" | "rounded";
export type AvatarStatus = "online" | "offline" | "busy" | "away";

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  name?: string;
  fallback?: React.ReactNode;
  size?: AvatarSize;
  shape?: AvatarShape;
  status?: AvatarStatus;
}

function getInitials(name?: string): string {
  if (!name) return "";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      src,
      alt,
      name,
      fallback,
      size = "md",
      shape = "circle",
      status,
      className,
      ...props
    },
    ref
  ) => {
    const [hasError, setHasError] = useState(false);

    const classes = cx(
      "aura-avatar",
      `aura-avatar--${size}`,
      `aura-avatar--${shape}`,
      className
    );

    const initials = getInitials(name);
    const showImage = src && !hasError;

    return (
      <div ref={ref} className={classes} {...props}>
        {showImage ? (
          <img
            src={src}
            alt={alt || name || "Avatar"}
            className="aura-avatar__image"
            onError={() => setHasError(true)}
          />
        ) : (
          <span className="aura-avatar__fallback">
            {fallback || initials || (
              <svg
                className="aura-avatar__icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            )}
          </span>
        )}
        {status && (
          <span
            className={cx("aura-avatar__status", `aura-avatar__status--${status}`)}
            aria-label={`Status: ${status}`}
          />
        )}
      </div>
    );
  }
);

Avatar.displayName = "Avatar";
