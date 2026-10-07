import React, { forwardRef } from "react";
import { cx } from "../../utils/cx";
import { Slot, type AsChildProp } from "../../foundations/Slot/Slot";
import "./Card.css";

export type CardVariant = "default" | "glass" | "ghost" | "outline";

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    AsChildProp {
  variant?: CardVariant;
  interactive?: boolean;
}

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}
export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: React.ElementType;
}
export interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}
export interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {}
export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

const CardRoot = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      asChild = false,
      variant = "default",
      interactive = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const Component = asChild ? Slot : "div";
    const classes = cx(
      "aura-card",
      `aura-card--${variant}`,
      interactive && "aura-card--interactive",
      className
    );

    return (
      <Component
        ref={ref}
        className={classes}
        tabIndex={interactive ? 0 : undefined}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

CardRoot.displayName = "Card";

const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cx("aura-card__header", className)} {...props}>
      {children}
    </div>
  )
);
CardHeader.displayName = "Card.Header";

const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ as: Tag = "h3", className, children, ...props }, ref) => {
    const Component = Tag as any;
    return (
      <Component ref={ref} className={cx("aura-card__title", className)} {...props}>
        {children}
      </Component>
    );
  }
);
CardTitle.displayName = "Card.Title";

const CardDescription = forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, children, ...props }, ref) => (
    <p ref={ref} className={cx("aura-card__description", className)} {...props}>
      {children}
    </p>
  )
);
CardDescription.displayName = "Card.Description";

const CardBody = forwardRef<HTMLDivElement, CardBodyProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cx("aura-card__body", className)} {...props}>
      {children}
    </div>
  )
);
CardBody.displayName = "Card.Body";

const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cx("aura-card__footer", className)} {...props}>
      {children}
    </div>
  )
);
CardFooter.displayName = "Card.Footer";

export const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Title: CardTitle,
  Description: CardDescription,
  Body: CardBody,
  Footer: CardFooter,
});
