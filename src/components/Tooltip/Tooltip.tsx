import React, { useState, useRef, useId, cloneElement, isValidElement } from "react";
import { cx } from "../../utils/cx";
import "./Tooltip.css";

export type TooltipPlacement = "top" | "bottom" | "left" | "right";

export interface TooltipProps {
  children: React.ReactElement<any>;
  content: React.ReactNode;
  placement?: TooltipPlacement;
  delay?: number;
  className?: string;
  disabled?: boolean;
}

export const Tooltip: React.FC<TooltipProps> = ({
  children,
  content,
  placement = "top",
  delay = 200,
  className,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<number | null>(null);
  const tooltipId = useId();

  if (!isValidElement(children) || !content || disabled) {
    return <>{children}</>;
  }

  const handleOpen = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => {
      setIsOpen(true);
    }, delay);
  };

  const handleClose = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(false);
  };

  const childProps = children.props as Record<string, any>;

  const trigger = cloneElement(children as React.ReactElement<any>, {
    "aria-describedby": isOpen ? tooltipId : undefined,
    onMouseEnter: (e: React.MouseEvent) => {
      childProps.onMouseEnter?.(e);
      handleOpen();
    },
    onMouseLeave: (e: React.MouseEvent) => {
      childProps.onMouseLeave?.(e);
      handleClose();
    },
    onFocus: (e: React.FocusEvent) => {
      childProps.onFocus?.(e);
      handleOpen();
    },
    onBlur: (e: React.FocusEvent) => {
      childProps.onBlur?.(e);
      handleClose();
    },
  });

  return (
    <span className="aura-tooltip-wrapper">
      {trigger}
      {isOpen && (
        <span
          id={tooltipId}
          role="tooltip"
          className={cx(
            "aura-tooltip",
            `aura-tooltip--${placement}`,
            className
          )}
        >
          {content}
          <span className="aura-tooltip__arrow" aria-hidden="true" />
        </span>
      )}
    </span>
  );
};
