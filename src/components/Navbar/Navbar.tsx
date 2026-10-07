import React, {
  forwardRef,
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { cx } from "../../utils/cx";
import "./Navbar.css";

export type NavbarVariant = "default" | "floating" | "saas" | "minimal";

interface NavbarContextValue {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  toggle: () => void;
  close: () => void;
}

const NavbarContext = createContext<NavbarContextValue | null>(null);

export const useNavbar = () => {
  const context = useContext(NavbarContext);
  if (!context) {
    throw new Error("useNavbar must be used within a Navbar component");
  }
  return context;
};

export interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  /** Shorthand for variant="floating" */
  floating?: boolean;
  /** Modern visual variants: "default", "floating", "saas", or "minimal" */
  variant?: NavbarVariant;
  /** Whether the navbar sticks to the top of viewport */
  sticky?: boolean;
  /** Controlled open state for mobile menu */
  isOpen?: boolean;
  /** Alias for isOpen */
  mobileOpen?: boolean;
  /** Default open state for uncontrolled mobile menu */
  defaultOpen?: boolean;
  /** Callback fired when mobile menu open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Alias for onOpenChange */
  onMobileOpenChange?: (open: boolean) => void;
}

const NavbarRoot = forwardRef<HTMLElement, NavbarProps>(
  (
    {
      floating = false,
      variant = "default",
      sticky = false,
      isOpen: controlledOpen,
      mobileOpen,
      defaultOpen = false,
      onOpenChange,
      onMobileOpenChange,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const effectiveControlledOpen = mobileOpen !== undefined ? mobileOpen : controlledOpen;
    const effectiveOnOpenChange = onMobileOpenChange || onOpenChange;

    const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
    const isControlled = effectiveControlledOpen !== undefined;
    const open = isControlled ? effectiveControlledOpen : uncontrolledOpen;

    const setOpen = useCallback(
      (newOpen: boolean) => {
        if (!isControlled) {
          setUncontrolledOpen(newOpen);
        }
        effectiveOnOpenChange?.(newOpen);
      },
      [isControlled, effectiveOnOpenChange]
    );

    const toggle = useCallback(() => setOpen(!open), [open, setOpen]);
    const close = useCallback(() => setOpen(false), [setOpen]);

    const resolvedVariant = floating ? "floating" : variant;

    // Handle Escape key to close mobile menu
    useEffect(() => {
      if (!open) return;
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          close();
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, [open, close]);

    return (
      <NavbarContext.Provider value={{ isOpen: open, setIsOpen: setOpen, toggle, close }}>
        <header
          ref={ref}
          className={cx(
            "aura-navbar",
            `aura-navbar--${resolvedVariant}`,
            sticky && "aura-navbar--sticky",
            open && "aura-navbar--open",
            className
          )}
          data-variant={resolvedVariant}
          data-open={open ? "true" : "false"}
          {...props}
        >
          <div className="aura-navbar__container">{children}</div>
        </header>
      </NavbarContext.Provider>
    );
  }
);
NavbarRoot.displayName = "Navbar";

export interface NavbarBrandProps extends React.HTMLAttributes<HTMLElement> {
  href?: string;
}
const NavbarBrand = forwardRef<HTMLElement, NavbarBrandProps>(
  ({ href, className, children, ...props }, ref) => {
    if (href) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={cx("aura-navbar__brand", className)}
          {...props}
        >
          {children}
        </a>
      );
    }
    return (
      <div
        ref={ref as React.Ref<HTMLDivElement>}
        className={cx("aura-navbar__brand", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
NavbarBrand.displayName = "Navbar.Brand";

export interface NavbarNavProps extends React.HTMLAttributes<HTMLElement> {
  animatedIndicator?: boolean;
}
const NavbarNav = forwardRef<HTMLElement, NavbarNavProps>(
  ({ animatedIndicator = false, className, children, ...props }, ref) => (
    <nav
      ref={ref}
      className={cx(
        "aura-navbar__nav",
        animatedIndicator && "aura-navbar__nav--animated",
        className
      )}
      {...props}
    >
      {children}
    </nav>
  )
);
NavbarNav.displayName = "Navbar.Nav";

export interface NavbarLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  active?: boolean;
}
const NavbarLink = forwardRef<HTMLAnchorElement, NavbarLinkProps>(
  ({ active = false, className, children, ...props }, ref) => (
    <a
      ref={ref}
      className={cx("aura-navbar__link", active && "aura-navbar__link--active", className)}
      {...props}
    >
      {children}
    </a>
  )
);
NavbarLink.displayName = "Navbar.Link";

export interface NavbarActionsProps extends React.HTMLAttributes<HTMLDivElement> {}
const NavbarActions = forwardRef<HTMLDivElement, NavbarActionsProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cx("aura-navbar__actions", className)} {...props}>
      {children}
    </div>
  )
);
NavbarActions.displayName = "Navbar.Actions";

export interface NavbarToggleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
}

/**
 * Animated Hamburger Toggle Button
 * Transforms into an "X" when open with zero external dependencies.
 */
const NavbarToggle = forwardRef<HTMLButtonElement, NavbarToggleProps>(
  ({ label = "Toggle navigation menu", className, onClick, ...props }, ref) => {
    const { isOpen, toggle } = useNavbar();

    return (
      <button
        ref={ref}
        type="button"
        className={cx(
          "aura-navbar__toggle",
          isOpen && "aura-navbar__toggle--open",
          className
        )}
        onClick={(e) => {
          toggle();
          onClick?.(e);
        }}
        aria-label={label}
        aria-expanded={isOpen}
        aria-controls="aura-navbar-mobile-menu"
        {...props}
      >
        <span className="aura-navbar__toggle-line aura-navbar__toggle-line--top" />
        <span className="aura-navbar__toggle-line aura-navbar__toggle-line--middle" />
        <span className="aura-navbar__toggle-line aura-navbar__toggle-line--bottom" />
      </button>
    );
  }
);
NavbarToggle.displayName = "Navbar.Toggle";

export interface NavbarMobileMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Automatically close mobile menu when clicking inside */
  autoClose?: boolean;
}

/**
 * Animated Mobile Drawer / Sheet
 * Staggered animation effect, backdrop blur, Escape key and outside click handling.
 */
const NavbarMobileMenu = forwardRef<HTMLDivElement, NavbarMobileMenuProps>(
  ({ autoClose = true, className, children, ...props }, ref) => {
    const { isOpen, close } = useNavbar();
    const menuRef = useRef<HTMLDivElement | null>(null);

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (autoClose) {
        // If clicked on a link or button, close the menu
        const target = e.target as HTMLElement;
        if (target.closest("a, button")) {
          close();
        }
      }
    };

    if (!isOpen) return null;

    return (
      <div
        ref={(node) => {
          menuRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }}
        id="aura-navbar-mobile-menu"
        className={cx("aura-navbar__mobile-menu", className)}
        onClick={handleClick}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation"
        {...props}
      >
        <div className="aura-navbar__mobile-content">{children}</div>
      </div>
    );
  }
);
NavbarMobileMenu.displayName = "Navbar.MobileMenu";

export interface NavbarMobileLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  active?: boolean;
}
const NavbarMobileLink = forwardRef<HTMLAnchorElement, NavbarMobileLinkProps>(
  ({ active = false, className, children, ...props }, ref) => (
    <a
      ref={ref}
      className={cx(
        "aura-navbar__mobile-link",
        active && "aura-navbar__mobile-link--active",
        className
      )}
      {...props}
    >
      {children}
    </a>
  )
);
NavbarMobileLink.displayName = "Navbar.MobileLink";

/* -------------------------------------------------------------
 * Dropdown & Mega Menu System
 * ------------------------------------------------------------- */

interface DropdownContextValue {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

const DropdownContext = createContext<DropdownContextValue | null>(null);

const useDropdown = () => {
  const ctx = useContext(DropdownContext);
  if (!ctx) throw new Error("Dropdown components must be used within a Navbar.Dropdown");
  return ctx;
};

export interface NavbarDropdownProps extends React.HTMLAttributes<HTMLDivElement> {
  triggerMode?: "hover" | "click";
}

const NavbarDropdown = forwardRef<HTMLDivElement, NavbarDropdownProps>(
  ({ triggerMode = "hover", className, children, ...props }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const timeoutRef = useRef<any>(null);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    const open = useCallback(() => {
      clearTimeout(timeoutRef.current);
      setIsOpen(true);
    }, []);

    const close = useCallback(() => {
      clearTimeout(timeoutRef.current);
      setIsOpen(false);
    }, []);

    const toggle = useCallback(() => {
      setIsOpen((prev) => !prev);
    }, []);

    const handleMouseEnter = () => {
      if (triggerMode === "hover") open();
    };

    const handleMouseLeave = () => {
      if (triggerMode === "hover") {
        timeoutRef.current = setTimeout(close, 150);
      }
    };

    // Close on outside click
    useEffect(() => {
      if (!isOpen) return;
      const handleClickOutside = (e: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
          close();
        }
      };
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") close();
      };
      document.addEventListener("mousedown", handleClickOutside);
      window.addEventListener("keydown", handleEscape);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        window.removeEventListener("keydown", handleEscape);
      };
    }, [isOpen, close]);

    return (
      <DropdownContext.Provider value={{ isOpen, open, close, toggle }}>
        <div
          ref={(node) => {
            dropdownRef.current = node;
            if (typeof ref === "function") ref(node);
            else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
          }}
          className={cx(
            "aura-navbar__dropdown",
            isOpen && "aura-navbar__dropdown--open",
            className
          )}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          {...props}
        >
          {children}
        </div>
      </DropdownContext.Provider>
    );
  }
);
NavbarDropdown.displayName = "Navbar.Dropdown";

export interface NavbarDropdownTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  chevron?: boolean;
}

const NavbarDropdownTrigger = forwardRef<HTMLButtonElement, NavbarDropdownTriggerProps>(
  ({ chevron = true, className, children, onClick, ...props }, ref) => {
    const { isOpen, toggle } = useDropdown();

    return (
      <button
        ref={ref}
        type="button"
        className={cx(
          "aura-navbar__dropdown-trigger",
          isOpen && "aura-navbar__dropdown-trigger--active",
          className
        )}
        onClick={(e) => {
          toggle();
          onClick?.(e);
        }}
        aria-expanded={isOpen}
        aria-haspopup="true"
        {...props}
      >
        <span>{children}</span>
        {chevron && (
          <svg
            className={cx(
              "aura-navbar__dropdown-chevron",
              isOpen && "aura-navbar__dropdown-chevron--open"
            )}
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        )}
      </button>
    );
  }
);
NavbarDropdownTrigger.displayName = "Navbar.DropdownTrigger";

export interface NavbarDropdownMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: "left" | "right" | "center";
}

const NavbarDropdownMenu = forwardRef<HTMLDivElement, NavbarDropdownMenuProps>(
  ({ align = "left", className, children, ...props }, ref) => {
    const { isOpen } = useDropdown();

    if (!isOpen) return null;

    return (
      <div
        ref={ref}
        className={cx(
          "aura-navbar__dropdown-menu",
          `aura-navbar__dropdown-menu--align-${align}`,
          className
        )}
        role="menu"
        aria-orientation="vertical"
        {...props}
      >
        <div className="aura-navbar__dropdown-menu-content">{children}</div>
      </div>
    );
  }
);
NavbarDropdownMenu.displayName = "Navbar.DropdownMenu";

export interface NavbarDropdownItemProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  badge?: React.ReactNode;
}

const NavbarDropdownItem = forwardRef<HTMLAnchorElement, NavbarDropdownItemProps>(
  ({ icon, title, description, badge, className, children, ...props }, ref) => {
    const { close } = useDropdown();

    return (
      <a
        ref={ref}
        className={cx("aura-navbar__dropdown-item", className)}
        role="menuitem"
        onClick={() => close()}
        {...props}
      >
        {icon && <span className="aura-navbar__dropdown-item-icon">{icon}</span>}
        <div className="aura-navbar__dropdown-item-text">
          <div className="aura-navbar__dropdown-item-title">
            <span>{title || children}</span>
            {badge && <span className="aura-navbar__dropdown-item-badge">{badge}</span>}
          </div>
          {description && (
            <span className="aura-navbar__dropdown-item-desc">{description}</span>
          )}
        </div>
      </a>
    );
  }
);
NavbarDropdownItem.displayName = "Navbar.DropdownItem";

export interface NavbarMegaMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: number;
  width?: number | string;
}

const NavbarMegaMenu = forwardRef<HTMLDivElement, NavbarMegaMenuProps>(
  ({ columns = 2, width, style, className, children, ...props }, ref) => {
    const { isOpen } = useDropdown();

    if (!isOpen) return null;

    const customStyle: React.CSSProperties = {
      "--mega-columns": columns,
      ...(width !== undefined ? { width: typeof width === "number" ? `${width}px` : width } : {}),
      ...style,
    } as React.CSSProperties;

    return (
      <div
        ref={ref}
        className={cx("aura-navbar__dropdown-menu", "aura-navbar__mega-menu", className)}
        style={customStyle}
        role="menu"
        {...props}
      >
        <div className="aura-navbar__mega-menu-grid">{children}</div>
      </div>
    );
  }
);
NavbarMegaMenu.displayName = "Navbar.MegaMenu";

export const Navbar = Object.assign(NavbarRoot, {
  Brand: NavbarBrand,
  Nav: NavbarNav,
  Link: NavbarLink,
  Item: NavbarLink,
  Actions: NavbarActions,
  Toggle: NavbarToggle,
  MobileMenu: NavbarMobileMenu,
  MobileLink: NavbarMobileLink,
  Dropdown: NavbarDropdown,
  DropdownTrigger: NavbarDropdownTrigger,
  DropdownMenu: NavbarDropdownMenu,
  DropdownItem: NavbarDropdownItem,
  MegaMenu: NavbarMegaMenu,
});
