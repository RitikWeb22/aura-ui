import React, { useState } from "react";
import { CopyIcon, CheckIcon } from "../src/icons";
import { Button } from "../src/components/Button/Button";
import { Text } from "../src/typography/Text/Text";
import { Badge } from "../src/components/Badge/Badge";

export interface ComponentShowcaseProps {
  title: string;
  description: string;
  badge?: string;
  importCode: string;
  codeSnippet: string;
  children: React.ReactNode;
  onCopySuccess?: (message: string) => void;
}

export const ComponentShowcase: React.FC<ComponentShowcaseProps> = ({
  title,
  description,
  badge,
  importCode,
  codeSnippet,
  children,
  onCopySuccess,
}) => {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedImport, setCopiedImport] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard?.writeText(codeSnippet);
    setCopiedCode(true);
    onCopySuccess?.(`Copied ${title} code to clipboard!`);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyImport = () => {
    navigator.clipboard?.writeText(importCode);
    setCopiedImport(true);
    onCopySuccess?.(`Copied import statement!`);
    setTimeout(() => setCopiedImport(false), 2000);
  };

  return (
    <div
      style={{
        borderRadius: "var(--aura-radius-lg)",
        border: "1px solid var(--aura-border)",
        backgroundColor: "var(--aura-surface)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        boxShadow: "var(--aura-shadow-xs)",
        transition: "border-color 0.2s ease, box-shadow 0.2s ease",
      }}
    >
      {/* Header with Title and Mode Switcher */}
      <div
        style={{
          padding: "var(--aura-space-4) var(--aura-space-6)",
          borderBottom: "1px solid var(--aura-border-subtle)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "var(--aura-space-3)",
          backgroundColor: "var(--aura-bg-subtle)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "var(--aura-space-3)" }}>
          <Text weight="semibold" size="base">
            {title}
          </Text>
          {badge && (
            <Badge variant="soft" color="accent" size="sm">
              {badge}
            </Badge>
          )}
        </div>

        {/* Action Controls */}
        <div style={{ display: "flex", alignItems: "center", gap: "var(--aura-space-2)" }}>
          {/* Preview / Code Tab */}
          <div
            style={{
              display: "inline-flex",
              backgroundColor: "var(--aura-surface-raised)",
              padding: "2px",
              borderRadius: "var(--aura-radius-sm)",
              border: "1px solid var(--aura-border)",
            }}
          >
            <button
              type="button"
              onClick={() => setActiveTab("preview")}
              style={{
                padding: "3px 10px",
                fontSize: "12px",
                fontWeight: 500,
                borderRadius: "var(--aura-radius-xs)",
                border: "none",
                cursor: "pointer",
                background: activeTab === "preview" ? "var(--aura-surface)" : "transparent",
                color: activeTab === "preview" ? "var(--aura-fg)" : "var(--aura-fg-muted)",
                boxShadow: activeTab === "preview" ? "0 1px 2px rgba(0,0,0,0.2)" : "none",
                transition: "all 0.15s ease",
              }}
            >
              Preview
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("code")}
              style={{
                padding: "3px 10px",
                fontSize: "12px",
                fontWeight: 500,
                borderRadius: "var(--aura-radius-xs)",
                border: "none",
                cursor: "pointer",
                background: activeTab === "code" ? "var(--aura-surface)" : "transparent",
                color: activeTab === "code" ? "var(--aura-fg)" : "var(--aura-fg-muted)",
                boxShadow: activeTab === "code" ? "0 1px 2px rgba(0,0,0,0.2)" : "none",
                transition: "all 0.15s ease",
              }}
            >
              Code
            </button>
          </div>

          {/* Copy Import Button */}
          <Button
            variant="ghost"
            size="xs"
            onClick={handleCopyImport}
            title={importCode}
            leftIcon={copiedImport ? <CheckIcon size={12} /> : <CopyIcon size={12} />}
          >
            {copiedImport ? "Import Copied" : "Copy Import"}
          </Button>

          {/* Copy Snippet Button */}
          <Button
            variant="solid"
            size="xs"
            onClick={handleCopyCode}
            leftIcon={copiedCode ? <CheckIcon size={12} /> : <CopyIcon size={12} />}
          >
            {copiedCode ? "Copied" : "Copy Code"}
          </Button>
        </div>
      </div>

      {/* Description */}
      {description && (
        <div style={{ padding: "var(--aura-space-3) var(--aura-space-6) 0" }}>
          <Text size="xs" variant="muted">
            {description}
          </Text>
        </div>
      )}

      {/* Content Area */}
      {activeTab === "preview" ? (
        <div
          style={{
            padding: "var(--aura-space-6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "160px",
            background: "radial-gradient(ellipse at top, var(--aura-surface-raised) 0%, var(--aura-surface) 80%)",
          }}
        >
          {children}
        </div>
      ) : (
        <div
          style={{
            backgroundColor: "var(--aura-bg-subtle)",
            padding: "var(--aura-space-4) var(--aura-space-6)",
            overflowX: "auto",
            maxHeight: "360px",
          }}
        >
          <pre
            style={{
              margin: 0,
              fontFamily: "var(--aura-font-mono)",
              fontSize: "12.5px",
              lineHeight: 1.6,
              color: "var(--aura-fg)",
              whiteSpace: "pre",
            }}
          >
            <code>{codeSnippet.trim()}</code>
          </pre>
        </div>
      )}
    </div>
  );
};
