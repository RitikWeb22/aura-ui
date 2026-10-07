import React, { useState, useMemo } from "react";
import {
  Button,
  Badge,
  Input,
  Text,
  Heading,
} from "../src";
import * as Icons from "../src/icons";
import { DOCS_DATA, DOC_CATEGORIES, type DocItem } from "./docsData";

interface DocsViewProps {
  activeId: string;
  onSelectComponent: (id: string) => void;
  onNavigateHome: () => void;
  theme: "dark" | "light";
  onToggleTheme: () => void;
}

export const DocsView: React.FC<DocsViewProps> = ({
  activeId,
  onSelectComponent,
  onNavigateHome,
  theme,
  onToggleTheme,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeVariantIndex, setActiveVariantIndex] = useState(0);
  const [viewMode, setViewMode] = useState<"preview" | "code">("preview");
  const [copiedImport, setCopiedImport] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  // Active document item
  const currentDoc: DocItem = DOCS_DATA[activeId] || DOCS_DATA["navbar"] || DOCS_DATA["introduction"];

  // Reset active variant when component changes
  React.useEffect(() => {
    setActiveVariantIndex(0);
    setViewMode("preview");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeId]);

  const activeVariant = currentDoc.variants[activeVariantIndex] || currentDoc.variants[0];

  // Filtered categories and items based on search query
  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return DOC_CATEGORIES;
    const q = searchQuery.toLowerCase();
    return DOC_CATEGORIES.map((cat) => {
      const matchedItems = cat.items.filter((itemId) => {
        const item = DOCS_DATA[itemId];
        if (!item) return false;
        return (
          item.title.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          cat.name.toLowerCase().includes(q)
        );
      });
      return { ...cat, items: matchedItems };
    }).filter((cat) => cat.items.length > 0);
  }, [searchQuery]);

  // Flat list for next/previous navigation
  const allNavItems = useMemo(() => {
    const list: string[] = [];
    DOC_CATEGORIES.forEach((cat) => {
      cat.items.forEach((itemId) => {
        if (DOCS_DATA[itemId]) list.push(itemId);
      });
    });
    return list;
  }, []);

  const currentIndex = allNavItems.indexOf(currentDoc.id);
  const prevItemId = currentIndex > 0 ? allNavItems[currentIndex - 1] : null;
  const nextItemId = currentIndex < allNavItems.length - 1 ? allNavItems[currentIndex + 1] : null;

  const copyImportCode = () => {
    navigator.clipboard.writeText(currentDoc.importCode);
    setCopiedImport(true);
    setTimeout(() => setCopiedImport(false), 2000);
  };

  const copyVariantCode = () => {
    if (!activeVariant) return;
    navigator.clipboard.writeText(activeVariant.code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Top Docs Header */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 90,
          background: "var(--aura-glass-bg)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: "1px solid var(--aura-border)",
          padding: "0.75rem 1.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <div
            onClick={onNavigateHome}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
              cursor: "pointer",
              userSelect: "none",
            }}
          >
            <div
              style={{
                width: 30,
                height: 30,
                borderRadius: 8,
                background: "linear-gradient(135deg, var(--aura-accent), #ec4899)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icons.SparklesIcon size={16} color="#fff" />
            </div>
            <span style={{ fontWeight: 800, letterSpacing: "-0.03em", fontSize: "1.1rem" }}>AURA UI</span>
            <Badge variant="soft" size="sm">v2.2.0</Badge>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              fontSize: "0.85rem",
              color: "var(--aura-fg-muted)",
              marginLeft: "1rem",
            }}
          >
            <span>/</span>
            <span style={{ color: "var(--aura-fg)" }}>Documentation</span>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <Button size="sm" variant="outline" onClick={onNavigateHome} leftIcon={<Icons.ArrowLeftIcon size={14} />}>
            Back to Home
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={onToggleTheme}
            leftIcon={theme === "dark" ? <Icons.SunIcon size={16} /> : <Icons.MoonIcon size={16} />}
          >
            {theme === "dark" ? "Light" : "Dark"}
          </Button>
          <a
            href="https://www.npmjs.com/package/aura-ui-library"
            target="_blank"
            rel="noreferrer"
            style={{ textDecoration: "none" }}
          >
            <Button size="sm" variant="solid" leftIcon={<Icons.ExternalLinkIcon size={14} />}>
              npm v2.2.0
            </Button>
          </a>
        </div>
      </header>

      {/* Main Documentation Layout (Sidebar + Content) */}
      <div style={{ display: "flex", flex: 1, maxWidth: 1440, width: "100%", margin: "0 auto" }}>
        {/* Left Sticky Sidebar (Tailwind / Bootstrap Style) */}
        <aside
          style={{
            width: 280,
            flexShrink: 0,
            borderRight: "1px solid var(--aura-border)",
            padding: "1.5rem 1rem",
            height: "calc(100vh - 61px)",
            position: "sticky",
            top: 61,
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "1.25rem",
          }}
        >
          {/* Quick Search Input */}
          <div style={{ position: "relative" }}>
            <Input
              inputSize="sm"
              placeholder="Search components..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Icons.SearchIcon size={14} color="var(--aura-fg-muted)" />}
            />
          </div>

          {/* Categories & Links */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {filteredCategories.map((cat) => (
              <div key={cat.name}>
                <div
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    color: "var(--aura-fg-muted)",
                    marginBottom: "0.5rem",
                    padding: "0 0.5rem",
                  }}
                >
                  {cat.name}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
                  {cat.items.map((itemId) => {
                    const item = DOCS_DATA[itemId];
                    if (!item) return null;
                    const isActive = item.id === currentDoc.id;
                    return (
                      <div
                        key={item.id}
                        onClick={() => onSelectComponent(item.id)}
                        style={{
                          padding: "0.45rem 0.75rem",
                          borderRadius: 8,
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          fontSize: "0.875rem",
                          fontWeight: isActive ? 600 : 500,
                          color: isActive ? "var(--aura-accent)" : "var(--aura-fg-muted)",
                          background: isActive ? "rgba(124, 58, 237, 0.12)" : "transparent",
                          transition: "all 0.15s ease",
                        }}
                      >
                        <span>{item.title}</span>
                        {item.badge && (
                          <span
                            style={{
                              fontSize: "0.68rem",
                              padding: "0.1rem 0.4rem",
                              borderRadius: 4,
                              background: isActive ? "var(--aura-accent)" : "var(--aura-surface-raised)",
                              color: isActive ? "#fff" : "var(--aura-fg-muted)",
                              border: "1px solid var(--aura-border)",
                            }}
                          >
                            {item.badge}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Main Content Area */}
        <main
          style={{
            flex: 1,
            padding: "2.5rem 3rem",
            maxWidth: 1060,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "2.5rem",
          }}
        >
          {/* Breadcrumb & Header */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                fontSize: "0.8rem",
                color: "var(--aura-fg-muted)",
                marginBottom: "0.75rem",
              }}
            >
              <span>Docs</span>
              <span>/</span>
              <span>{currentDoc.category}</span>
              <span>/</span>
              <span style={{ color: "var(--aura-fg)", fontWeight: 600 }}>{currentDoc.title}</span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
              <Heading level={1} style={{ fontSize: "2.4rem", letterSpacing: "-0.03em" }}>
                {currentDoc.title}
              </Heading>
              {currentDoc.badge && (
                <Badge variant="soft" size="md">{currentDoc.badge}</Badge>
              )}
            </div>

            <Text size="lg" color="muted" style={{ marginTop: "0.75rem", lineHeight: 1.6 }}>
              {currentDoc.description}
            </Text>

            {/* Quick Install / Import Command Box */}
            <div
              style={{
                marginTop: "1.25rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0.75rem 1.25rem",
                background: "var(--aura-surface)",
                borderRadius: 10,
                border: "1px solid var(--aura-border)",
                maxWidth: 620,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <Icons.CodeIcon size={16} color="var(--aura-accent)" />
                <code style={{ fontFamily: "var(--aura-font-mono)", fontSize: "0.85rem", color: "var(--aura-fg)" }}>
                  {currentDoc.importCode}
                </code>
              </div>
              <Button size="sm" variant="ghost" onClick={copyImportCode} leftIcon={copiedImport ? <Icons.CheckIcon size={14} /> : <Icons.CopyIcon size={14} />}>
                {copiedImport ? "Copied" : "Copy"}
              </Button>
            </div>
          </div>

          {/* Interactive Multi-Variant Showcase */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <Heading level={3} style={{ fontSize: "1.35rem" }}>Interactive Preview</Heading>
                {currentDoc.variants.length > 1 && (
                  <Badge variant="solid" size="sm">{currentDoc.variants.length} Variants Available</Badge>
                )}
              </div>

              {/* Toggle Preview vs Code */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", background: "var(--aura-surface)", padding: 4, borderRadius: 8, border: "1px solid var(--aura-border)" }}>
                <Button
                  size="sm"
                  variant={viewMode === "preview" ? "solid" : "ghost"}
                  onClick={() => setViewMode("preview")}
                  leftIcon={<Icons.EyeIcon size={14} />}
                >
                  Preview
                </Button>
                <Button
                  size="sm"
                  variant={viewMode === "code" ? "solid" : "ghost"}
                  onClick={() => setViewMode("code")}
                  leftIcon={<Icons.CodeIcon size={14} />}
                >
                  Code
                </Button>
              </div>
            </div>

            {/* If component has multiple variants, render tab pills */}
            {currentDoc.variants.length > 1 && (
              <div
                style={{
                  display: "flex",
                  gap: "0.5rem",
                  flexWrap: "wrap",
                  padding: "0.5rem",
                  background: "var(--aura-surface)",
                  borderRadius: 10,
                  border: "1px solid var(--aura-border)",
                }}
              >
                {currentDoc.variants.map((variant, idx) => (
                  <button
                    key={variant.id}
                    onClick={() => setActiveVariantIndex(idx)}
                    style={{
                      padding: "0.45rem 0.9rem",
                      borderRadius: 7,
                      border: "none",
                      cursor: "pointer",
                      fontSize: "0.85rem",
                      fontWeight: idx === activeVariantIndex ? 600 : 500,
                      background: idx === activeVariantIndex ? "var(--aura-accent)" : "transparent",
                      color: idx === activeVariantIndex ? "#fff" : "var(--aura-fg-muted)",
                      transition: "all 0.15s ease",
                    }}
                  >
                    {variant.title}
                  </button>
                ))}
              </div>
            )}

            {/* Variant Description */}
            {activeVariant && (
              <Text size="sm" color="muted">
                {activeVariant.description}
              </Text>
            )}

            {/* Live Preview Container or Code Display */}
            {viewMode === "preview" ? (
              <div
                style={{
                  padding: "2.5rem 1.5rem",
                  borderRadius: 14,
                  background: "var(--aura-surface-raised)",
                  border: "1px solid var(--aura-border)",
                  minHeight: 200,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {activeVariant?.render()}
              </div>
            ) : (
              <div style={{ position: "relative" }}>
                <pre
                  style={{
                    margin: 0,
                    padding: "1.25rem 1.5rem",
                    borderRadius: 14,
                    background: "#09090f",
                    border: "1px solid var(--aura-border)",
                    fontSize: "0.85rem",
                    fontFamily: "var(--aura-font-mono)",
                    color: "#e2e8f0",
                    overflowX: "auto",
                    lineHeight: 1.6,
                  }}
                >
                  <code>{activeVariant?.code}</code>
                </pre>
                <div style={{ position: "absolute", top: "0.75rem", right: "0.75rem" }}>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={copyVariantCode}
                    leftIcon={copiedCode ? <Icons.CheckIcon size={14} /> : <Icons.CopyIcon size={14} />}
                  >
                    {copiedCode ? "Copied!" : "Copy Code"}
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* API Reference & Props Table */}
          {currentDoc.props && currentDoc.props.length > 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <Heading level={3} style={{ fontSize: "1.35rem" }}>Props API Reference</Heading>
              <div
                style={{
                  overflowX: "auto",
                  borderRadius: 12,
                  border: "1px solid var(--aura-border)",
                  background: "var(--aura-surface)",
                }}
              >
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem", textAlign: "left" }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid var(--aura-border)", background: "rgba(255,255,255,0.02)" }}>
                      <th style={{ padding: "0.75rem 1rem", fontWeight: 600 }}>Property</th>
                      <th style={{ padding: "0.75rem 1rem", fontWeight: 600 }}>Type</th>
                      <th style={{ padding: "0.75rem 1rem", fontWeight: 600 }}>Default</th>
                      <th style={{ padding: "0.75rem 1rem", fontWeight: 600 }}>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentDoc.props.map((p) => (
                      <tr key={p.name} style={{ borderBottom: "1px solid var(--aura-border)" }}>
                        <td style={{ padding: "0.75rem 1rem", fontFamily: "var(--aura-font-mono)", color: "var(--aura-accent)", fontWeight: 600 }}>
                          {p.name}
                        </td>
                        <td style={{ padding: "0.75rem 1rem", fontFamily: "var(--aura-font-mono)", fontSize: "0.8rem", color: "var(--aura-fg-muted)" }}>
                          {p.type}
                        </td>
                        <td style={{ padding: "0.75rem 1rem", fontFamily: "var(--aura-font-mono)", fontSize: "0.8rem", color: "var(--aura-fg-muted)" }}>
                          {p.default || "-"}
                        </td>
                        <td style={{ padding: "0.75rem 1rem", color: "var(--aura-fg-muted)" }}>
                          {p.description}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Bottom Next / Previous Component Navigation */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "2rem",
              paddingTop: "2rem",
              borderTop: "1px solid var(--aura-border)",
            }}
          >
            {prevItemId && DOCS_DATA[prevItemId] ? (
              <Button
                variant="outline"
                size="md"
                onClick={() => onSelectComponent(prevItemId)}
                leftIcon={<Icons.ArrowLeftIcon size={16} />}
              >
                Previous: {DOCS_DATA[prevItemId].title}
              </Button>
            ) : <div />}

            {nextItemId && DOCS_DATA[nextItemId] ? (
              <Button
                variant="solid"
                size="md"
                onClick={() => onSelectComponent(nextItemId)}
                rightIcon={<Icons.ArrowRightIcon size={16} />}
              >
                Next: {DOCS_DATA[nextItemId].title}
              </Button>
            ) : <div />}
          </div>
        </main>
      </div>
    </div>
  );
};
