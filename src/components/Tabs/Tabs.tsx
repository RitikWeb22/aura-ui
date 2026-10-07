import React, { createContext, useContext, useState, forwardRef, useId } from "react";
import { cx } from "../../utils/cx";
import "./Tabs.css";

interface TabsContextValue {
  value: string;
  onChange: (val: string) => void;
  baseId: string;
}

const TabsContext = createContext<TabsContextValue | null>(null);

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue?: string;
  value?: string;
  onValueChange?: (val: string) => void;
  variant?: "pill" | "line" | "soft";
}

const TabsRoot = forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      defaultValue,
      value: controlledValue,
      onValueChange,
      variant = "pill",
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState(defaultValue || "");
    const baseId = useId();

    const currentValue = controlledValue !== undefined ? controlledValue : internalValue;

    const handleValueChange = (val: string) => {
      if (controlledValue === undefined) {
        setInternalValue(val);
      }
      onValueChange?.(val);
    };

    return (
      <TabsContext.Provider value={{ value: currentValue, onChange: handleValueChange, baseId }}>
        <div
          ref={ref}
          className={cx("aura-tabs", `aura-tabs--variant-${variant}`, className)}
          {...props}
        >
          {children}
        </div>
      </TabsContext.Provider>
    );
  }
);
TabsRoot.displayName = "Tabs";

export interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {}

const TabsList = forwardRef<HTMLDivElement, TabsListProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} role="tablist" className={cx("aura-tabs__list", className)} {...props}>
        {children}
      </div>
    );
  }
);
TabsList.displayName = "Tabs.List";

export interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

const TabsTrigger = forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ value, className, children, disabled = false, ...props }, ref) => {
    const context = useContext(TabsContext);
    if (!context) throw new Error("Tabs.Trigger must be inside Tabs");

    const isSelected = context.value === value;
    const tabId = `${context.baseId}-tab-${value}`;
    const panelId = `${context.baseId}-panel-${value}`;

    return (
      <button
        ref={ref}
        id={tabId}
        type="button"
        role="tab"
        aria-selected={isSelected}
        aria-controls={panelId}
        disabled={disabled}
        tabIndex={isSelected ? 0 : -1}
        onClick={() => context.onChange(value)}
        className={cx(
          "aura-tabs__trigger",
          isSelected && "aura-tabs__trigger--selected",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);
TabsTrigger.displayName = "Tabs.Trigger";

export interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

const TabsContent = forwardRef<HTMLDivElement, TabsContentProps>(
  ({ value, className, children, ...props }, ref) => {
    const context = useContext(TabsContext);
    if (!context) throw new Error("Tabs.Content must be inside Tabs");

    const isSelected = context.value === value;
    const tabId = `${context.baseId}-tab-${value}`;
    const panelId = `${context.baseId}-panel-${value}`;

    if (!isSelected) return null;

    return (
      <div
        ref={ref}
        id={panelId}
        role="tabpanel"
        aria-labelledby={tabId}
        tabIndex={0}
        className={cx("aura-tabs__content", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
TabsContent.displayName = "Tabs.Content";

export const Tabs = Object.assign(TabsRoot, {
  List: TabsList,
  Trigger: TabsTrigger,
  Content: TabsContent,
});
