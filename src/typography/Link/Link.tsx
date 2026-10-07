import React, { forwardRef } from "react";
import { cx } from "../../utils/cx";
import { Slot, type AsChildProp } from "../../foundations/Slot/Slot";
import "./Link.css";

export type LinkUnderline = "always" | "hover" | "none";
export type LinkVariant = "default" | "muted" | "subtle" | "accent";

export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    AsChildProp {
  variant?: LinkVariant;
  underline?: LinkUnderline;
  external?: boolean;
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      asChild = false,
      variant = "accent",
      underline = "hover",
      external = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const Component = asChild ? Slot : "a";

    const externalProps = external
      ? {
          target: "_blank",
          rel: "noopener noreferrer",
        }
      : {};

    const classes = cx(
      "aura-link",
      `aura-link--${variant}`,
      `aura-link--underline-${underline}`,
      className
    );

    return (
      <Component ref={ref as any} className={classes} {...externalProps} {...props}>
        {children}
        {external && (
          <svg
            className="aura-link__external-icon"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M6 3h7v7" />
            <path d="M13 3 7 9" />
          </svg>
        )}
      </Component>
    );
  }
);

Link.displayName = "Link";
