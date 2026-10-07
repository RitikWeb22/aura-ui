import React, { forwardRef } from "react";
import { cx } from "../../utils/cx";
import { Slot, type AsChildProp } from "../Slot/Slot";
import type { StackGap } from "../Stack/Stack";
import "./Grid.css";

export type GridColumns = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | "auto-fit" | "auto-fill";

export interface GridProps extends React.HTMLAttributes<HTMLDivElement>, AsChildProp {
  columns?: GridColumns;
  minColWidth?: string;
  gap?: StackGap;
  rowGap?: StackGap;
  columnGap?: StackGap;
}

export const Grid = forwardRef<HTMLDivElement, GridProps>(
  (
    {
      asChild,
      columns = 1,
      minColWidth = "280px",
      gap = 4,
      rowGap,
      columnGap,
      className,
      style,
      children,
      ...props
    },
    ref
  ) => {
    const Component = asChild ? Slot : "div";
    const isAuto = columns === "auto-fit" || columns === "auto-fill";

    const customStyle: React.CSSProperties = { ...style };
    if (isAuto) {
      customStyle.gridTemplateColumns = `repeat(${columns}, minmax(${minColWidth}, 1fr))`;
    }

    const classes = cx(
      "aura-grid",
      !isAuto && `aura-grid--cols-${columns}`,
      gap !== undefined && `aura-grid--gap-${gap}`,
      rowGap !== undefined && `aura-grid--row-gap-${rowGap}`,
      columnGap !== undefined && `aura-grid--col-gap-${columnGap}`,
      className
    );

    return (
      <Component ref={ref} className={classes} style={customStyle} {...props}>
        {children}
      </Component>
    );
  }
);

Grid.displayName = "Grid";
