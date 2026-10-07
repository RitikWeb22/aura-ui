import React, { forwardRef } from "react";
import { cx } from "../../utils/cx";
import "./Separator.css";

export type SeparatorOrientation = "horizontal" | "vertical";

export interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: SeparatorOrientation;
  decorative?: boolean;
}

export const Separator = forwardRef<HTMLDivElement, SeparatorProps>(
  (
    {
      orientation = "horizontal",
      decorative = true,
      className,
      ...props
    },
    ref
  ) => {
    const semanticProps: React.HTMLAttributes<HTMLDivElement> = decorative
      ? { "aria-hidden": true }
      : {
          role: "separator",
          "aria-orientation": orientation === "vertical" ? "vertical" : "horizontal",
        };

    const classes = cx(
      "aura-separator",
      `aura-separator--${orientation}`,
      className
    );

    return (
      <div
        ref={ref}
        className={classes}
        data-orientation={orientation}
        {...semanticProps}
        {...props}
      />
    );
  }
);

Separator.displayName = "Separator";
