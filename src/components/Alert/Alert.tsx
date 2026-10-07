import React, { forwardRef } from "react";
import { cx } from "../../utils/cx";
import { XIcon, InfoIcon, CheckIcon } from "../../icons";
import "./Alert.css";

export type AlertStatus = "info" | "success" | "warning" | "destructive";
export type AlertVariant = "soft" | "outline" | "solid";

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  status?: AlertStatus;
  variant?: AlertVariant;
  title?: string;
  icon?: React.ReactNode;
  onClose?: () => void;
}

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      status = "info",
      variant = "soft",
      title,
      icon,
      onClose,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const defaultIcons: Record<AlertStatus, React.ReactNode> = {
      info: <InfoIcon size={18} />,
      success: <CheckIcon size={18} />,
      warning: (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      ),
      destructive: (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="15" y1="9" x2="9" y2="15" />
          <line x1="9" y1="9" x2="15" y2="15" />
        </svg>
      ),
    };

    const renderedIcon = icon !== undefined ? icon : defaultIcons[status];

    const classes = cx(
      "aura-alert",
      `aura-alert--status-${status}`,
      `aura-alert--variant-${variant}`,
      className
    );

    return (
      <div ref={ref} role="alert" className={classes} {...props}>
        {renderedIcon && <div className="aura-alert__icon">{renderedIcon}</div>}
        <div className="aura-alert__content">
          {title && <h5 className="aura-alert__title">{title}</h5>}
          <div className="aura-alert__description">{children}</div>
        </div>
        {onClose && (
          <button
            type="button"
            className="aura-alert__close"
            onClick={onClose}
            aria-label="Dismiss alert"
          >
            <XIcon size={16} />
          </button>
        )}
      </div>
    );
  }
);

Alert.displayName = "Alert";
