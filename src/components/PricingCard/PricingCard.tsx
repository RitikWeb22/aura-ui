import React, { forwardRef } from "react";
import { cx } from "../../utils/cx";
import { CheckIcon } from "../../icons";
import { Button } from "../Button/Button";
import { Badge } from "../Badge/Badge";
import "./PricingCard.css";

export type PricingCardVariant = "default" | "glass" | "gradient" | "minimal";

export interface PricingCardProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  description: string;
  price: string;
  period?: string;
  features: string[];
  featured?: boolean;
  variant?: PricingCardVariant;
  badge?: string;
  ctaText?: string;
  onCtaClick?: () => void;
}

export const PricingCard = forwardRef<HTMLDivElement, PricingCardProps>(
  (
    {
      name,
      description,
      price,
      period = "/ month",
      features,
      featured = false,
      variant = "default",
      badge,
      ctaText = "Get Started",
      onCtaClick,
      className,
      style,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cx(
          "aura-pricing-card",
          `aura-pricing-card--${variant}`,
          featured && "aura-pricing-card--featured",
          className
        )}
        data-variant={variant}
        data-featured={featured ? "true" : "false"}
        style={style}
        {...props}
      >
        {(featured || variant === "gradient") && (
          <div className="aura-pricing-card__glow" aria-hidden="true" />
        )}
        <div className="aura-pricing-card__header">
          <div className="aura-pricing-card__top">
            <h3 className="aura-pricing-card__name">{name}</h3>
            {badge && (
              <Badge
                variant={variant === "glass" ? "glass" : "solid"}
                color="accent"
                size="sm"
              >
                {badge}
              </Badge>
            )}
          </div>
          <p className="aura-pricing-card__description">{description}</p>
        </div>

        <div className="aura-pricing-card__price-section">
          <span className="aura-pricing-card__price">{price}</span>
          {period && <span className="aura-pricing-card__period">{period}</span>}
        </div>

        <ul className="aura-pricing-card__features" aria-label="Included features">
          {features.map((feature, idx) => (
            <li key={idx} className="aura-pricing-card__feature-item">
              <span className="aura-pricing-card__check-icon">
                <CheckIcon size={14} />
              </span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <div className="aura-pricing-card__cta">
          <Button
            variant={
              featured
                ? "solid"
                : variant === "glass"
                ? "glass"
                : variant === "gradient"
                ? "solid"
                : "outline"
            }
            size="md"
            onClick={onCtaClick}
            style={{ width: "100%" }}
          >
            {ctaText}
          </Button>
        </div>
      </div>
    );
  }
);

PricingCard.displayName = "PricingCard";
