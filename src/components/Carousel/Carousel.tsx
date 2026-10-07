import React, {
  forwardRef,
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
  createContext,
  useContext,
} from "react";
import { cx } from "../../utils/cx";
import { ChevronLeftIcon, ChevronRightIcon } from "../../icons";
import "./Carousel.css";

export type CarouselVariant = "slide" | "fade" | "card";

interface CarouselContextValue {
  activeIndex: number;
  totalSlides: number;
  goToIndex: (index: number) => void;
  next: () => void;
  prev: () => void;
  variant: CarouselVariant;
}

const CarouselContext = createContext<CarouselContextValue | null>(null);

export const useCarousel = () => {
  const context = useContext(CarouselContext);
  if (!context) {
    throw new Error("useCarousel must be used within a Carousel component");
  }
  return context;
};

export interface CarouselSlideItem {
  id?: string | number;
  image?: string;
  alt?: string;
  title?: string;
  description?: string;
  badge?: string;
  content?: React.ReactNode;
}

export interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  items?: CarouselSlideItem[];
  variant?: CarouselVariant;
  autoplay?: boolean;
  interval?: number;
  pauseOnHover?: boolean;
  loop?: boolean;
  showArrows?: boolean;
  showIndicators?: boolean;
  showCounter?: boolean;
  aspectRatio?: string;
  onSlideChange?: (index: number) => void;
}

const CarouselRoot = forwardRef<HTMLDivElement, CarouselProps>(
  (
    {
      items,
      variant = "slide",
      autoplay = false,
      interval = 4000,
      pauseOnHover = true,
      loop = true,
      showArrows = true,
      showIndicators = true,
      showCounter = false,
      aspectRatio = "16 / 9",
      onSlideChange,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const dragStartX = useRef<number | null>(null);

    // If children are passed, count child slides
    const childArray = useMemo(() => {
      return React.Children.toArray(children);
    }, [children]);

    const totalSlides = items ? items.length : childArray.length;

    const goToIndex = useCallback(
      (newIndex: number) => {
        let target = newIndex;
        if (target < 0) {
          target = loop ? totalSlides - 1 : 0;
        } else if (target >= totalSlides) {
          target = loop ? 0 : totalSlides - 1;
        }
        setActiveIndex(target);
        onSlideChange?.(target);
      },
      [loop, totalSlides, onSlideChange]
    );

    const next = useCallback(() => goToIndex(activeIndex + 1), [goToIndex, activeIndex]);
    const prev = useCallback(() => goToIndex(activeIndex - 1), [goToIndex, activeIndex]);

    // Autoplay Timer
    useEffect(() => {
      if (!autoplay || totalSlides <= 1 || (pauseOnHover && isHovered)) return;

      const timer = setInterval(() => {
        next();
      }, interval);

      return () => clearInterval(timer);
    }, [autoplay, interval, pauseOnHover, isHovered, totalSlides, next]);

    // Keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "ArrowLeft") {
        prev();
      } else if (e.key === "ArrowRight") {
        next();
      }
    };

    // Touch & Mouse Drag gesture handling
    const handlePointerDown = (e: React.PointerEvent) => {
      dragStartX.current = e.clientX;
    };

    const handlePointerUp = (e: React.PointerEvent) => {
      if (dragStartX.current === null) return;
      const deltaX = e.clientX - dragStartX.current;
      dragStartX.current = null;

      if (deltaX > 40) {
        prev();
      } else if (deltaX < -40) {
        next();
      }
    };

    return (
      <CarouselContext.Provider
        value={{
          activeIndex,
          totalSlides,
          goToIndex,
          next,
          prev,
          variant,
        }}
      >
        <div
          ref={(node) => {
            containerRef.current = node;
            if (typeof ref === "function") ref(node);
            else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
          }}
          className={cx(
            "aura-carousel",
            `aura-carousel--${variant}`,
            className
          )}
          style={{ "--aura-carousel-aspect": aspectRatio } as React.CSSProperties}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onKeyDown={handleKeyDown}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          tabIndex={0}
          role="region"
          aria-roledescription="carousel"
          aria-label="Image & Content Carousel"
          {...props}
        >
          {/* Main viewport */}
          <div className="aura-carousel__viewport">
            {items ? (
              <div
                className="aura-carousel__track"
                style={
                  variant === "slide"
                    ? { transform: `translateX(-${activeIndex * 100}%)` }
                    : undefined
                }
              >
                {items.map((item, idx) => {
                  const isActive = idx === activeIndex;

                  let cardStyle: React.CSSProperties | undefined = undefined;
                  let isSide = false;
                  if (variant === "card") {
                    let diff = idx - activeIndex;
                    if (loop && totalSlides > 2) {
                      if (diff > totalSlides / 2) diff -= totalSlides;
                      if (diff < -totalSlides / 2) diff += totalSlides;
                    }
                    const isCenter = diff === 0;
                    const isNext = diff === 1;
                    const isPrev = diff === -1;
                    const isVisible = Math.abs(diff) <= 1;
                    isSide = !isCenter && isVisible;

                    cardStyle = {
                      transform: isCenter
                        ? "translate3d(-50%, -50%, 0) scale(1) rotateY(0deg)"
                        : isNext
                        ? "translate3d(calc(-50% + 52%), -50%, -90px) scale(0.85) rotateY(-16deg)"
                        : isPrev
                        ? "translate3d(calc(-50% - 52%), -50%, -90px) scale(0.85) rotateY(16deg)"
                        : `translate3d(calc(-50% + ${diff > 0 ? "90%" : "-90%"}), -50%, -180px) scale(0.7) rotateY(${diff > 0 ? "-30deg" : "30deg"})`,
                      opacity: isCenter ? 1 : isVisible ? 0.65 : 0,
                      zIndex: isCenter ? 10 : isVisible ? 5 : 1,
                      pointerEvents: isCenter || isVisible ? "auto" : "none",
                      cursor: isSide ? "pointer" : undefined,
                    };
                  }

                  return (
                    <div
                      key={item.id ?? idx}
                      className={cx(
                        "aura-carousel__slide",
                        isActive && "aura-carousel__slide--active",
                        isSide && "aura-carousel__slide--side"
                      )}
                      style={cardStyle}
                      onClick={() => {
                        if (isSide) goToIndex(idx);
                      }}
                      aria-hidden={!isActive}
                    >
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.alt || item.title || `Slide ${idx + 1}`}
                          className="aura-carousel__image"
                          loading="lazy"
                        />
                      )}
                      {(item.title || item.description || item.badge) && (
                        <div className="aura-carousel__overlay">
                          {item.badge && (
                            <span className="aura-carousel__badge">{item.badge}</span>
                          )}
                          {item.title && (
                            <h4 className="aura-carousel__title">{item.title}</h4>
                          )}
                          {item.description && (
                            <p className="aura-carousel__description">
                              {item.description}
                            </p>
                          )}
                        </div>
                      )}
                      {item.content}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div
                className="aura-carousel__track"
                style={
                  variant === "slide"
                    ? { transform: `translateX(-${activeIndex * 100}%)` }
                    : undefined
                }
              >
                {childArray.map((child, idx) => {
                  const isActive = idx === activeIndex;

                  let cardStyle: React.CSSProperties | undefined = undefined;
                  let isSide = false;
                  if (variant === "card") {
                    let diff = idx - activeIndex;
                    if (loop && totalSlides > 2) {
                      if (diff > totalSlides / 2) diff -= totalSlides;
                      if (diff < -totalSlides / 2) diff += totalSlides;
                    }
                    const isCenter = diff === 0;
                    const isNext = diff === 1;
                    const isPrev = diff === -1;
                    const isVisible = Math.abs(diff) <= 1;
                    isSide = !isCenter && isVisible;

                    cardStyle = {
                      transform: isCenter
                        ? "translate3d(-50%, -50%, 0) scale(1) rotateY(0deg)"
                        : isNext
                        ? "translate3d(calc(-50% + 52%), -50%, -90px) scale(0.85) rotateY(-16deg)"
                        : isPrev
                        ? "translate3d(calc(-50% - 52%), -50%, -90px) scale(0.85) rotateY(16deg)"
                        : `translate3d(calc(-50% + ${diff > 0 ? "90%" : "-90%"}), -50%, -180px) scale(0.7) rotateY(${diff > 0 ? "-30deg" : "30deg"})`,
                      opacity: isCenter ? 1 : isVisible ? 0.65 : 0,
                      zIndex: isCenter ? 10 : isVisible ? 5 : 1,
                      pointerEvents: isCenter || isVisible ? "auto" : "none",
                      cursor: isSide ? "pointer" : undefined,
                    };
                  }

                  return (
                    <div
                      key={idx}
                      className={cx(
                        "aura-carousel__slide",
                        isActive && "aura-carousel__slide--active",
                        isSide && "aura-carousel__slide--side"
                      )}
                      style={cardStyle}
                      onClick={() => {
                        if (isSide) goToIndex(idx);
                      }}
                      aria-hidden={!isActive}
                    >
                      {child}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Controls: Prev & Next Arrows */}
          {showArrows && totalSlides > 1 && (
            <div className="aura-carousel__arrows">
              <button
                type="button"
                className="aura-carousel__arrow aura-carousel__arrow--prev"
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
                aria-label="Previous slide"
              >
                <ChevronLeftIcon size={18} />
              </button>
              <button
                type="button"
                className="aura-carousel__arrow aura-carousel__arrow--next"
                onClick={(e) => {
                  e.stopPropagation();
                  next();
                }}
                aria-label="Next slide"
              >
                <ChevronRightIcon size={18} />
              </button>
            </div>
          )}

          {/* Indicators / Pagination Dots */}
          {showIndicators && totalSlides > 1 && (
            <div className="aura-carousel__indicators" role="tablist">
              {Array.from({ length: totalSlides }).map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={cx(
                    "aura-carousel__indicator",
                    idx === activeIndex && "aura-carousel__indicator--active"
                  )}
                  onClick={(e) => {
                    e.stopPropagation();
                    goToIndex(idx);
                  }}
                  role="tab"
                  aria-selected={idx === activeIndex}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          )}

          {/* Slide Counter */}
          {showCounter && totalSlides > 1 && (
            <div className="aura-carousel__counter">
              <span>{String(activeIndex + 1).padStart(2, "0")}</span>
              <span className="aura-carousel__counter-sep">/</span>
              <span>{String(totalSlides).padStart(2, "0")}</span>
            </div>
          )}
        </div>
      </CarouselContext.Provider>
    );
  }
);
CarouselRoot.displayName = "Carousel";

export interface CarouselSlideProps extends React.HTMLAttributes<HTMLDivElement> {
  active?: boolean;
}
const CarouselSlide = forwardRef<HTMLDivElement, CarouselSlideProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cx("aura-carousel__slide-content", className)} {...props}>
      {children}
    </div>
  )
);
CarouselSlide.displayName = "Carousel.Slide";

export const Carousel = Object.assign(CarouselRoot, {
  Slide: CarouselSlide,
});
