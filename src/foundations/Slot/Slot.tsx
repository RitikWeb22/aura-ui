import React, { isValidElement, cloneElement, forwardRef } from "react";
import { cx } from "../../utils/cx";

export interface SlotProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

export const Slot = forwardRef<HTMLElement, SlotProps>(({ children, className, style, ...restProps }, ref) => {
  if (!isValidElement(children)) {
    return null;
  }

  const childProps = children.props as Record<string, any>;

  // Merge event handlers if necessary
  const mergedProps: Record<string, any> = { ...restProps };

  for (const propName in restProps) {
    if (propName.startsWith("on") && typeof (restProps as any)[propName] === "function") {
      const childHandler = childProps[propName];
      const parentHandler = (restProps as any)[propName];
      if (childHandler) {
        mergedProps[propName] = (...args: any[]) => {
          childHandler(...args);
          parentHandler(...args);
        };
      }
    }
  }

  // Handle ref merging
  const childRef = (children as any).ref;
  const mergedRef = (node: HTMLElement | null) => {
    if (typeof ref === "function") ref(node);
    else if (ref && "current" in ref) (ref as any).current = node;

    if (typeof childRef === "function") childRef(node);
    else if (childRef && "current" in childRef) (childRef as any).current = node;
  };

  return cloneElement(children, {
    ...mergedProps,
    className: cx(childProps.className, className),
    style: { ...childProps.style, ...style },
    ref: mergedRef,
  });
});

Slot.displayName = "Slot";

export interface AsChildProp {
  asChild?: boolean;
}
