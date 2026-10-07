import { useState, useEffect } from "react";
import { AuraProvider } from "../src";
import { LandingPage } from "./LandingPage";
import { DocsView } from "./DocsView";

export function App() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [currentView, setCurrentView] = useState<"home" | "docs">("home");
  const [activeComponentId, setActiveComponentId] = useState<string>("navbar");

  // Sync with browser hash (#home, #docs/navbar, #docs/icons, etc.)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace(/^#/, "");
      if (!hash || hash === "home") {
        setCurrentView("home");
      } else if (hash.startsWith("docs/")) {
        const componentId = hash.replace("docs/", "");
        setCurrentView("docs");
        if (componentId) {
          setActiveComponentId(componentId);
        }
      } else if (hash === "docs") {
        setCurrentView("docs");
      }
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const handleNavigateToDocs = (componentId: string = "navbar") => {
    setActiveComponentId(componentId);
    setCurrentView("docs");
    window.location.hash = `docs/${componentId}`;
  };

  const handleNavigateHome = () => {
    setCurrentView("home");
    window.location.hash = "home";
  };

  const handleSelectComponent = (componentId: string) => {
    setActiveComponentId(componentId);
    window.location.hash = `docs/${componentId}`;
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <AuraProvider theme={theme} accentColor="#7c3aed">
      <div
        className="aura-app-root"
        style={{
          minHeight: "100vh",
          backgroundColor: "var(--aura-bg)",
          color: "var(--aura-fg)",
          fontFamily: "var(--aura-font-sans)",
        }}
      >
        {currentView === "home" ? (
          <LandingPage
            onNavigateToDocs={handleNavigateToDocs}
            theme={theme}
            onToggleTheme={toggleTheme}
          />
        ) : (
          <DocsView
            activeId={activeComponentId}
            onSelectComponent={handleSelectComponent}
            onNavigateHome={handleNavigateHome}
            theme={theme}
            onToggleTheme={toggleTheme}
          />
        )}
      </div>
    </AuraProvider>
  );
}

export default App;
