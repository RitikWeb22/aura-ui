import React, {
  forwardRef,
  createContext,
  useContext,
  useState,
  useCallback,
} from "react";
import { cx } from "../../utils/cx";
import "./Sidebar.css";

export type SidebarVariant = "standard" | "dock" | "floating";

interface SidebarContextValue {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  toggleCollapse: () => void;
  variant: SidebarVariant;
}

const SidebarContext = createContext<SidebarContextValue | null>(null);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a Sidebar component");
  }
  return context;
};

export interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  variant?: SidebarVariant;
  collapsed?: boolean;
  defaultCollapsed?: boolean;
  onCollapseChange?: (collapsed: boolean) => void;
  /** Whether the sidebar floats over content on mobile as a drawer */
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

const SidebarRoot = forwardRef<HTMLElement, SidebarProps>(
  (
    {
      variant = "standard",
      collapsed: controlledCollapsed,
      defaultCollapsed = false,
      onCollapseChange,
      mobileOpen = false,
      onMobileClose,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [uncontrolledCollapsed, setUncontrolledCollapsed] = useState(defaultCollapsed);
    const isControlled = controlledCollapsed !== undefined;
    const collapsed = isControlled ? controlledCollapsed : uncontrolledCollapsed;

    const setCollapsed = useCallback(
      (next: boolean) => {
        if (!isControlled) {
          setUncontrolledCollapsed(next);
        }
        onCollapseChange?.(next);
      },
      [isControlled, onCollapseChange]
    );

    const toggleCollapse = useCallback(() => {
      setCollapsed(!collapsed);
    }, [collapsed, setCollapsed]);

    return (
      <SidebarContext.Provider
        value={{
          collapsed,
          setCollapsed,
          toggleCollapse,
          variant,
        }}
      >
        {/* Mobile Backdrop Overlay */}
        {mobileOpen && (
          <div
            className="aura-sidebar__backdrop"
            onClick={onMobileClose}
            aria-hidden="true"
          />
        )}

        <aside
          ref={ref}
          className={cx(
            "aura-sidebar",
            `aura-sidebar--${variant}`,
            collapsed && "aura-sidebar--collapsed",
            mobileOpen && "aura-sidebar--mobile-open",
            className
          )}
          data-variant={variant}
          data-collapsed={collapsed ? "true" : "false"}
          {...props}
        >
          <div className="aura-sidebar__inner">{children}</div>
        </aside>
      </SidebarContext.Provider>
    );
  }
);
SidebarRoot.displayName = "Sidebar";

export interface SidebarHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}
const SidebarHeader = forwardRef<HTMLDivElement, SidebarHeaderProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cx("aura-sidebar__header", className)} {...props}>
      {children}
    </div>
  )
);
SidebarHeader.displayName = "Sidebar.Header";

export interface SidebarBrandProps extends React.HTMLAttributes<HTMLDivElement> {
  logo?: React.ReactNode;
  name?: React.ReactNode;
}
const SidebarBrand = forwardRef<HTMLDivElement, SidebarBrandProps>(
  ({ logo, name, className, children, ...props }, ref) => {
    const { collapsed } = useSidebar();
    return (
      <div ref={ref} className={cx("aura-sidebar__brand", className)} {...props}>
        {logo && <div className="aura-sidebar__brand-logo">{logo}</div>}
        {(!collapsed || !logo) && (
          <div className="aura-sidebar__brand-text">
            {name || children}
          </div>
        )}
      </div>
    );
  }
);
SidebarBrand.displayName = "Sidebar.Brand";

export interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {}
const SidebarNav = forwardRef<HTMLElement, SidebarNavProps>(
  ({ className, children, ...props }, ref) => (
    <nav ref={ref} className={cx("aura-sidebar__nav", className)} {...props}>
      {children}
    </nav>
  )
);
SidebarNav.displayName = "Sidebar.Nav";

export interface SidebarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
}
const SidebarGroup = forwardRef<HTMLDivElement, SidebarGroupProps>(
  ({ label, className, children, ...props }, ref) => {
    const { collapsed } = useSidebar();
    return (
      <div ref={ref} className={cx("aura-sidebar__group", className)} {...props}>
        {label && !collapsed && (
          <div className="aura-sidebar__group-label">{label}</div>
        )}
        <div className="aura-sidebar__group-items">{children}</div>
      </div>
    );
  }
);
SidebarGroup.displayName = "Sidebar.Group";

export interface SidebarItemProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  icon?: React.ReactNode;
  active?: boolean;
  badge?: React.ReactNode;
  shortcut?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}
const SidebarItem = forwardRef<HTMLAnchorElement, SidebarItemProps>(
  ({ icon, active = false, badge, shortcut, className, children, ...props }, ref) => {
    const { collapsed } = useSidebar();

    return (
      <a
        ref={ref}
        className={cx(
          "aura-sidebar__item",
          active && "aura-sidebar__item--active",
          collapsed && "aura-sidebar__item--collapsed",
          className
        )}
        title={collapsed && typeof children === "string" ? children : undefined}
        {...props}
      >
        {icon && <span className="aura-sidebar__item-icon">{icon}</span>}
        {!collapsed && (
          <span className="aura-sidebar__item-label">{children}</span>
        )}
        {!collapsed && badge && (
          <span className="aura-sidebar__item-badge">{badge}</span>
        )}
        {!collapsed && shortcut && (
          <span className="aura-sidebar__item-shortcut">{shortcut}</span>
        )}
      </a>
    );
  }
);
SidebarItem.displayName = "Sidebar.Item";

export interface SidebarFooterProps extends React.HTMLAttributes<HTMLDivElement> {}
const SidebarFooter = forwardRef<HTMLDivElement, SidebarFooterProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cx("aura-sidebar__footer", className)} {...props}>
      {children}
    </div>
  )
);
SidebarFooter.displayName = "Sidebar.Footer";

export interface SidebarCollapseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}
const SidebarCollapseButton = forwardRef<HTMLButtonElement, SidebarCollapseButtonProps>(
  ({ className, ...props }, ref) => {
    const { collapsed, toggleCollapse } = useSidebar();

    return (
      <button
        ref={ref}
        type="button"
        className={cx(
          "aura-sidebar__collapse-btn",
          collapsed && "aura-sidebar__collapse-btn--collapsed",
          className
        )}
        onClick={toggleCollapse}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        {...props}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            transform: collapsed ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform var(--aura-duration-normal) var(--aura-ease-out)",
          }}
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>
    );
  }
);
SidebarCollapseButton.displayName = "Sidebar.CollapseButton";

export const Sidebar = Object.assign(SidebarRoot, {
  Header: SidebarHeader,
  Brand: SidebarBrand,
  Nav: SidebarNav,
  Group: SidebarGroup,
  Item: SidebarItem,
  Footer: SidebarFooter,
  CollapseButton: SidebarCollapseButton,
});
