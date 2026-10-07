import React, { useEffect, useRef, forwardRef } from "react";
import { cx } from "../../utils/cx";
import { Portal } from "../../foundations/Portal/Portal";
import { XIcon } from "../../icons";
import "./Dialog.css";

export interface DialogProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  closeOnOutsideClick?: boolean;
  closeOnEsc?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl" | "full";
}

export interface DialogHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}
export interface DialogTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}
export interface DialogDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}
export interface DialogBodyProps extends React.HTMLAttributes<HTMLDivElement> {}
export interface DialogFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

const DialogRoot: React.FC<DialogProps> = ({
  open,
  onClose,
  children,
  closeOnOutsideClick = true,
  closeOnEsc = true,
  className,
  size = "md",
}) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open || typeof window === "undefined") return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (closeOnEsc && e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, closeOnEsc, onClose]);

  if (!open) return null;

  return (
    <Portal>
      <div className="aura-dialog-backdrop" onClick={closeOnOutsideClick ? onClose : undefined}>
        <div
          ref={contentRef}
          role="dialog"
          aria-modal="true"
          className={cx("aura-dialog", `aura-dialog--size-${size}`, className)}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            className="aura-dialog__close"
            onClick={onClose}
            aria-label="Close dialog"
          >
            <XIcon size={18} />
          </button>
          {children}
        </div>
      </div>
    </Portal>
  );
};

const DialogHeader = forwardRef<HTMLDivElement, DialogHeaderProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cx("aura-dialog__header", className)} {...props}>
      {children}
    </div>
  )
);
DialogHeader.displayName = "Dialog.Header";

const DialogTitle = forwardRef<HTMLHeadingElement, DialogTitleProps>(
  ({ className, children, ...props }, ref) => (
    <h2 ref={ref} className={cx("aura-dialog__title", className)} {...props}>
      {children}
    </h2>
  )
);
DialogTitle.displayName = "Dialog.Title";

const DialogDescription = forwardRef<HTMLParagraphElement, DialogDescriptionProps>(
  ({ className, children, ...props }, ref) => (
    <p ref={ref} className={cx("aura-dialog__description", className)} {...props}>
      {children}
    </p>
  )
);
DialogDescription.displayName = "Dialog.Description";

const DialogBody = forwardRef<HTMLDivElement, DialogBodyProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cx("aura-dialog__body", className)} {...props}>
      {children}
    </div>
  )
);
DialogBody.displayName = "Dialog.Body";

const DialogFooter = forwardRef<HTMLDivElement, DialogFooterProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cx("aura-dialog__footer", className)} {...props}>
      {children}
    </div>
  )
);
DialogFooter.displayName = "Dialog.Footer";

export const Dialog = Object.assign(DialogRoot, {
  Header: DialogHeader,
  Title: DialogTitle,
  Description: DialogDescription,
  Body: DialogBody,
  Footer: DialogFooter,
});
