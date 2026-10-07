import React from "react";
import {
  Button,
  Badge,
  Card,
  TiltCard,
  Navbar,
  Sidebar,
  Carousel,
  PricingCard,
  BentoGrid,
  BentoCard,
  Confetti,
  type ConfettiHandle,
  MagneticButton,
  TextReveal,
  ShineBorder,
  Meteors,
  Marquee,
  Input,
  Switch,
  Dialog,
  Skeleton,
  Spinner,
  Stack,
  Inline,
  Text,
  Heading,
  Kbd,
  DotBackground,
  GridPattern,
  AuroraBackground,
} from "../src";

import * as Icons from "../src/icons";

export interface ComponentPropDoc {
  name: string;
  type: string;
  default?: string;
  description: string;
}

export interface ComponentVariantDoc {
  id: string;
  title: string;
  description: string;
  code: string;
  render: () => React.ReactNode;
}

export interface DocItem {
  id: string;
  title: string;
  category: string;
  badge?: string;
  description: string;
  importCode: string;
  variants: ComponentVariantDoc[];
  props?: ComponentPropDoc[];
  notes?: string;
}

export interface DocCategory {
  name: string;
  items: string[]; // ids
}

export const DOC_CATEGORIES: DocCategory[] = [
  {
    name: "Getting Started",
    items: ["introduction", "installation", "theming"],
  },
  {
    name: "Navigation & Headers",
    items: ["navbar", "sidebar"],
  },
  {
    name: "Icons (56+)",
    items: ["icons"],
  },
  {
    name: "General & Actions",
    items: ["button", "magnetic-button", "badge"],
  },
  {
    name: "Modern & Animated",
    items: [
      "carousel",
      "tilt-card",
      "bento-grid",
      "pricing-card",
      "confetti",
      "shine-border",
      "meteors",
      "marquee",
      "text-reveal",
    ],
  },
  {
    name: "Data Display & Surfaces",
    items: ["card", "skeleton", "spinner"],
  },
  {
    name: "Forms & Inputs",
    items: ["input", "textarea", "select", "checkbox", "switch", "slider", "form-field"],
  },
  {
    name: "Overlays & Feedback",
    items: ["dialog", "alert"],
  },
  {
    name: "Backgrounds & Patterns",
    items: ["aurora-background", "dot-background", "grid-pattern"],
  },
  {
    name: "Layout & Typography",
    items: ["container", "stack", "grid", "heading", "text", "kbd"],
  },
];

// Helper demo wrapper for Navbar variants
const FloatingNavbarDemo = () => (
  <div style={{ padding: "1.5rem 0", background: "rgba(0,0,0,0.2)", borderRadius: 12 }}>
    <Navbar floating>
      <Navbar.Brand>
        <div style={{ width: 28, height: 28, borderRadius: 8, background: "var(--aura-accent)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icons.SparklesIcon size={16} color="#fff" />
        </div>
        <span style={{ fontWeight: 700, letterSpacing: "-0.02em" }}>Aura</span>
      </Navbar.Brand>
      <Navbar.Nav>
        <Navbar.Link href="#docs/navbar" active>Overview</Navbar.Link>
        <Navbar.Link href="#docs/navbar">Features</Navbar.Link>
        <Navbar.Link href="#docs/navbar">Showcase</Navbar.Link>
        <Navbar.Link href="#docs/navbar">Docs</Navbar.Link>
      </Navbar.Nav>
      <Navbar.Actions>
        <Button size="sm" variant="ghost">Sign In</Button>
        <Button size="sm" variant="solid">Get Started</Button>
      </Navbar.Actions>
    </Navbar>
  </div>
);

const SaasNavbarDemo = () => (
  <div style={{ background: "rgba(0,0,0,0.2)", borderRadius: 12, overflow: "hidden" }}>
    <Navbar variant="saas">
      <Navbar.Brand>
        <Icons.LayersIcon size={20} color="var(--aura-accent)" />
        <span style={{ fontWeight: 700 }}>Aura Cloud</span>
        <Badge variant="soft" size="sm">v2.2</Badge>
      </Navbar.Brand>
      <Navbar.Nav>
        <Navbar.Link href="#docs/navbar" active>Projects</Navbar.Link>
        <Navbar.Link href="#docs/navbar">Deployments</Navbar.Link>
        <Navbar.Link href="#docs/navbar">Analytics</Navbar.Link>
        <Navbar.Link href="#docs/navbar">Settings</Navbar.Link>
      </Navbar.Nav>
      <Navbar.Actions>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: "var(--aura-surface)", padding: "0.25rem 0.6rem", borderRadius: 8, border: "1px solid var(--aura-border)" }}>
          <Icons.SearchIcon size={14} color="var(--aura-fg-muted)" />
          <span style={{ fontSize: "0.75rem", color: "var(--aura-fg-muted)" }}>Search...</span>
          <Kbd size="sm">⌘K</Kbd>
        </div>
        <div style={{ width: 28, height: 28, borderRadius: "50%", background: "var(--aura-surface-raised)", border: "1px solid var(--aura-border)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icons.UserIcon size={14} />
        </div>
      </Navbar.Actions>
    </Navbar>
  </div>
);

const MinimalNavbarDemo = () => (
  <div style={{ padding: "0.5rem 0", background: "rgba(0,0,0,0.2)", borderRadius: 12 }}>
    <Navbar variant="minimal">
      <Navbar.Brand>
        <span style={{ fontWeight: 800, letterSpacing: "-0.04em", fontSize: "1.1rem" }}>STUDIO // AURA</span>
      </Navbar.Brand>
      <Navbar.Nav>
        <Navbar.Link href="#docs/navbar" active>Works</Navbar.Link>
        <Navbar.Link href="#docs/navbar">Agency</Navbar.Link>
        <Navbar.Link href="#docs/navbar">Journal</Navbar.Link>
        <Navbar.Link href="#docs/navbar">Contact</Navbar.Link>
      </Navbar.Nav>
      <Navbar.Actions>
        <Button size="sm" variant="outline">Schedule Call</Button>
      </Navbar.Actions>
    </Navbar>
  </div>
);

const AnimatedHamburgerNavbarDemo = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div style={{ position: "relative", minHeight: 280, background: "var(--aura-bg-subtle)", borderRadius: 16, overflow: "hidden", border: "1px solid var(--aura-border)", padding: "1rem" }}>
      <Navbar isOpen={isOpen} onOpenChange={setIsOpen}>
        <Navbar.Brand>
          <div style={{ width: 28, height: 28, borderRadius: 8, background: "linear-gradient(135deg, var(--aura-accent), #ec4899)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icons.SparklesIcon size={16} color="#fff" />
          </div>
          <span style={{ fontWeight: 700, letterSpacing: "-0.02em" }}>Aura UI</span>
        </Navbar.Brand>
        <Navbar.Nav>
          <Navbar.Link href="#docs/navbar" active>Overview</Navbar.Link>
          <Navbar.Link href="#docs/navbar">Features</Navbar.Link>
          <Navbar.Link href="#docs/navbar">Pricing</Navbar.Link>
        </Navbar.Nav>
        <Navbar.Actions>
          <Button size="sm" variant="solid">Get Started</Button>
          <Navbar.Toggle />
        </Navbar.Actions>

        <Navbar.MobileMenu>
          <Navbar.MobileLink href="#docs/navbar" active>Overview</Navbar.MobileLink>
          <Navbar.MobileLink href="#docs/navbar">Features & Primitives</Navbar.MobileLink>
          <Navbar.MobileLink href="#docs/navbar">Components (30+)</Navbar.MobileLink>
          <Navbar.MobileLink href="#docs/navbar">Pricing Tiers</Navbar.MobileLink>
          <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
            <Button size="sm" variant="solid" style={{ width: "100%" }}>Create Account</Button>
          </div>
        </Navbar.MobileMenu>
      </Navbar>

      <div style={{ padding: "2.5rem 1rem", textAlign: "center" }}>
        <Badge variant="soft" size="sm" style={{ marginBottom: "0.5rem" }}>Live Interactive Demo</Badge>
        <Heading level={4}>Click the Animated Hamburger Icon</Heading>
        <Text size="sm" color="muted" style={{ maxWidth: 440, margin: "0.5rem auto" }}>
          Notice how the hamburger 3-line bars smoothly morph into an &apos;X&apos; while a modern frosted glass mobile drawer slides open with keyboard Escape close support!
        </Text>
      </div>
    </div>
  );
};

const StandardSidebarDemo = () => {
  const [collapsed, setCollapsed] = React.useState(false);
  const [activeItem, setActiveItem] = React.useState("dashboard");

  return (
    <div style={{ display: "flex", height: 420, borderRadius: 16, border: "1px solid var(--aura-border)", overflow: "hidden", background: "var(--aura-bg)" }}>
      <Sidebar collapsed={collapsed} onCollapseChange={setCollapsed} variant="standard">
        <Sidebar.Header>
          <Sidebar.Brand
            logo={
              <div style={{ width: 28, height: 28, borderRadius: 8, background: "var(--aura-accent)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icons.SparklesIcon size={16} color="#fff" />
              </div>
            }
            name="Aura Studio"
          />
        </Sidebar.Header>

        <Sidebar.Nav>
          <Sidebar.Group label="Workspace">
            <Sidebar.Item
              icon={<Icons.GridIcon size={16} />}
              active={activeItem === "dashboard"}
              onClick={() => setActiveItem("dashboard")}
            >
              Dashboard
            </Sidebar.Item>
            <Sidebar.Item
              icon={<Icons.LayersIcon size={16} />}
              active={activeItem === "projects"}
              badge={<Badge size="sm" variant="soft">12</Badge>}
              onClick={() => setActiveItem("projects")}
            >
              Projects
            </Sidebar.Item>
            <Sidebar.Item
              icon={<Icons.SparklesIcon size={16} />}
              active={activeItem === "analytics"}
              shortcut="⌘A"
              onClick={() => setActiveItem("analytics")}
            >
              Analytics
            </Sidebar.Item>
          </Sidebar.Group>

          <Sidebar.Group label="Management">
            <Sidebar.Item
              icon={<Icons.ShieldIcon size={16} />}
              active={activeItem === "security"}
              onClick={() => setActiveItem("security")}
            >
              Security
            </Sidebar.Item>
            <Sidebar.Item
              icon={<Icons.UserIcon size={16} />}
              active={activeItem === "team"}
              onClick={() => setActiveItem("team")}
            >
              Team Members
            </Sidebar.Item>
          </Sidebar.Group>
        </Sidebar.Nav>

        <Sidebar.Footer>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", overflow: "hidden" }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: "var(--aura-surface-raised)", border: "1px solid var(--aura-border)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Icons.UserIcon size={14} />
            </div>
            {!collapsed && (
              <div style={{ fontSize: "0.8rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                <strong>Alex Rivera</strong>
              </div>
            )}
          </div>
          <Sidebar.CollapseButton />
        </Sidebar.Footer>
      </Sidebar>

      <div style={{ flex: 1, padding: "2rem", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", background: "var(--aura-surface)" }}>
        <Heading level={3}>Main Workspace</Heading>
        <Text color="muted" size="sm" style={{ maxWidth: 360, marginTop: "0.5rem" }}>
          Active View: <strong>{activeItem.toUpperCase()}</strong>. Click the chevron button at the bottom of the sidebar to collapse/expand smoothly!
        </Text>
      </div>
    </div>
  );
};

const DockSidebarDemo = () => {
  const [activeItem, setActiveItem] = React.useState("home");

  return (
    <div style={{ display: "flex", height: 340, borderRadius: 16, border: "1px solid var(--aura-border)", overflow: "hidden", background: "var(--aura-bg)" }}>
      <Sidebar variant="dock">
        <Sidebar.Header>
          <div style={{ width: 32, height: 32, borderRadius: 10, background: "var(--aura-accent)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icons.SparklesIcon size={18} color="#fff" />
          </div>
        </Sidebar.Header>
        <Sidebar.Nav>
          <Sidebar.Item icon={<Icons.GridIcon size={18} />} active={activeItem === "home"} onClick={() => setActiveItem("home")}>
            Home
          </Sidebar.Item>
          <Sidebar.Item icon={<Icons.LayersIcon size={18} />} active={activeItem === "layers"} onClick={() => setActiveItem("layers")}>
            Layers
          </Sidebar.Item>
          <Sidebar.Item icon={<Icons.TerminalIcon size={18} />} active={activeItem === "code"} onClick={() => setActiveItem("code")}>
            Code
          </Sidebar.Item>
          <Sidebar.Item icon={<Icons.FlameIcon size={18} />} active={activeItem === "trends"} onClick={() => setActiveItem("trends")}>
            Trends
          </Sidebar.Item>
        </Sidebar.Nav>
        <Sidebar.Footer>
          <div style={{ width: 28, height: 28, borderRadius: "50%", background: "var(--aura-surface)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icons.UserIcon size={14} />
          </div>
        </Sidebar.Footer>
      </Sidebar>
      <div style={{ flex: 1, padding: "2rem", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--aura-surface)" }}>
        <Text color="muted">Dock Rail View: <strong>{activeItem}</strong></Text>
      </div>
    </div>
  );
};

const FloatingSidebarDemo = () => {
  const [activeItem, setActiveItem] = React.useState("overview");

  return (
    <div style={{ display: "flex", height: 360, borderRadius: 16, border: "1px solid var(--aura-border)", overflow: "hidden", background: "linear-gradient(135deg, rgba(99,102,241,0.06), rgba(236,72,153,0.06))" }}>
      <Sidebar variant="floating" style={{ margin: "1rem", minHeight: "auto", height: "calc(100% - 2rem)" }}>
        <Sidebar.Header>
          <Sidebar.Brand
            logo={<Icons.SparklesIcon size={18} color="var(--aura-accent)" />}
            name="Glass Island"
          />
        </Sidebar.Header>
        <Sidebar.Nav>
          <Sidebar.Item icon={<Icons.GridIcon size={16} />} active={activeItem === "overview"} onClick={() => setActiveItem("overview")}>
            Overview
          </Sidebar.Item>
          <Sidebar.Item icon={<Icons.LayersIcon size={16} />} active={activeItem === "integrations"} onClick={() => setActiveItem("integrations")}>
            Integrations
          </Sidebar.Item>
          <Sidebar.Item icon={<Icons.ShieldIcon size={16} />} active={activeItem === "audit"} onClick={() => setActiveItem("audit")}>
            Audit Log
          </Sidebar.Item>
        </Sidebar.Nav>
      </Sidebar>
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Text color="muted">Floating Island View: <strong>{activeItem}</strong></Text>
      </div>
    </div>
  );
};

const sampleCarouselSlides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    badge: "Cinema VFX",
    title: "Cinematic Dark Experiences",
    description: "Architect interfaces that stand out with quiet luxury motion and native GPU acceleration.",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1200&q=80",
    badge: "Zero Runtime",
    title: "Zero-Dependency Engineering",
    description: "Built strictly on modern browser platform APIs, CSS custom properties, and inline SVGs.",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80",
    badge: "Modern Architecture",
    title: "Composability Without Bloat",
    description: "Every primitive is independently tree-shakable with maximum customizability.",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80",
    badge: "Design Tokens",
    title: "High-Contrast Adaptive Colors",
    description: "Tailored HSL tokens crafted for AAA accessibility in both dark and light modes.",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    badge: "3D Motion",
    title: "Silky 120fps Coverflow Deck",
    description: "Hardware-accelerated perspective rotation with interactive card click navigation.",
  },
];

const CarouselSlideDemo = () => (
  <div style={{ maxWidth: 780, margin: "0 auto", width: "100%" }}>
    <Carousel
      items={sampleCarouselSlides}
      variant="slide"
      autoplay
      interval={4500}
      aspectRatio="16 / 9"
      showArrows
      showIndicators
      showCounter
    />
  </div>
);

const CarouselFadeDemo = () => (
  <div style={{ maxWidth: 780, margin: "0 auto", width: "100%" }}>
    <Carousel
      items={sampleCarouselSlides}
      variant="fade"
      autoplay
      interval={4000}
      aspectRatio="16 / 9"
      showArrows
      showIndicators
    />
  </div>
);

const CarouselCardDemo = () => (
  <div style={{ maxWidth: 840, margin: "0 auto", width: "100%", padding: "0.5rem 0" }}>
    <Carousel
      items={sampleCarouselSlides}
      variant="card"
      autoplay
      interval={5000}
      aspectRatio="16 / 9"
      showArrows
      showIndicators
      showCounter
    />
  </div>
);

const PricingCardDefaultDemo = () => (
  <div style={{ maxWidth: 360, margin: "0 auto" }}>
    <PricingCard
      variant="default"
      name="Starter Tier"
      description="Essential primitives for solo builders and indie creators."
      price="$19"
      period="/ month"
      features={["Zero-dependency bundle", "56+ Inline SVG icons", "Access to 30+ components", "Community Discord support"]}
      ctaText="Start Building Free"
    />
  </div>
);

const PricingCardGlassDemo = () => (
  <div style={{ maxWidth: 360, margin: "0 auto" }}>
    <PricingCard
      variant="glass"
      name="Pro Studio"
      description="Frosted glassmorphic card for high-end digital agencies."
      price="$49"
      period="/ month"
      badge="Popular"
      features={["All Starter features", "Modern Animated Navbars", "Collapsible Sidebars", "Hardware-accelerated Carousels", "Priority 24/7 Slack channel"]}
      ctaText="Upgrade to Pro Studio"
    />
  </div>
);

const PricingCardGradientDemo = () => (
  <div style={{ maxWidth: 360, margin: "0 auto" }}>
    <PricingCard
      variant="gradient"
      featured
      name="Enterprise Cloud"
      description="High-converting gradient aura with glowing accent highlights."
      price="$99"
      period="/ month"
      badge="Recommended"
      features={["All Pro Studio features", "Custom CSS theme generation", "Infinite SLA guarantee", "Dedicated solutions architect", "Custom contract & security audit"]}
      ctaText="Deploy Enterprise"
    />
  </div>
);

const PricingCardMinimalDemo = () => (
  <div style={{ maxWidth: 360, margin: "0 auto" }}>
    <PricingCard
      variant="minimal"
      name="Open Source"
      description="Understated distraction-free editorial layout."
      price="$0"
      period="forever"
      features={["Full MIT Source Code", "Self-hosted NPM package", "GitHub Community Discussions", "Accessible ARIA patterns"]}
      ctaText="Read Documentation"
    />
  </div>
);

const DropdownNavbarDemo = () => (
  <div style={{ position: "relative", minHeight: 320, background: "var(--aura-bg-subtle)", borderRadius: 16, border: "1px solid var(--aura-border)", padding: "1.25rem" }}>
    <Navbar>
      <Navbar.Brand>
        <div style={{ width: 28, height: 28, borderRadius: 8, background: "var(--aura-accent)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icons.SparklesIcon size={16} color="#fff" />
        </div>
        <span style={{ fontWeight: 700 }}>Aura UI</span>
      </Navbar.Brand>

      <Navbar.Nav>
        <Navbar.Link href="#docs/navbar" active>Home</Navbar.Link>
        <Navbar.Dropdown>
          <Navbar.DropdownTrigger>Products</Navbar.DropdownTrigger>
          <Navbar.DropdownMenu>
            <Navbar.DropdownItem
              icon={<Icons.GridIcon size={18} />}
              title="UI Primitives"
              description="32+ zero-dependency accessible building blocks."
              badge={<Badge size="sm" variant="soft">New</Badge>}
            />
            <Navbar.DropdownItem
              icon={<Icons.LayersIcon size={18} />}
              title="Animated Navbars"
              description="Responsive dropdowns and morphing hamburger menu."
            />
            <Navbar.DropdownItem
              icon={<Icons.FlameIcon size={18} />}
              title="Visual Effects"
              description="3D tilt, canvas confetti, and shooting meteors."
            />
          </Navbar.DropdownMenu>
        </Navbar.Dropdown>

        <Navbar.Dropdown>
          <Navbar.DropdownTrigger>Developers</Navbar.DropdownTrigger>
          <Navbar.DropdownMenu>
            <Navbar.DropdownItem
              icon={<Icons.TerminalIcon size={18} />}
              title="Documentation"
              description="Comprehensive guides and API reference."
            />
            <Navbar.DropdownItem
              icon={<Icons.CodeIcon size={18} />}
              title="GitHub Repo"
              description="100% open-source MIT licensed codebase."
            />
          </Navbar.DropdownMenu>
        </Navbar.Dropdown>

        <Navbar.Link href="#docs/navbar">Pricing</Navbar.Link>
      </Navbar.Nav>

      <Navbar.Actions>
        <Button size="sm" variant="outline">Sign In</Button>
        <Button size="sm" variant="solid">Get Started</Button>
      </Navbar.Actions>
    </Navbar>

    <div style={{ padding: "3rem 1rem", textAlign: "center" }}>
      <Badge variant="soft" size="sm" style={{ marginBottom: "0.5rem" }}>Interactive Dropdown Demo</Badge>
      <Heading level={4}>Hover Over &apos;Products&apos; or &apos;Developers&apos;</Heading>
      <Text size="sm" color="muted" style={{ maxWidth: 460, margin: "0.5rem auto" }}>
        Notice the smooth rotating chevron arrow, frosted glass floating menu with entrance scale animation, and rich icon items.
      </Text>
    </div>
  </div>
);

const DotBackgroundDemo = () => (
  <div style={{ borderRadius: 16, overflow: "hidden", border: "1px solid var(--aura-border)" }}>
    <DotBackground variant="radial" dotSpacing={22} style={{ minHeight: 280, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center", padding: "2rem" }}>
        <Badge variant="solid" size="sm" style={{ marginBottom: "0.75rem" }}>Dot Matrix</Badge>
        <Heading level={3}>Radial Mask Dot Matrix</Heading>
        <Text color="muted" size="sm" style={{ maxWidth: 380, margin: "0.5rem auto" }}>
          Modern Vercel / Linear inspired technical dot grid that gracefully fades away toward the container boundaries.
        </Text>
      </div>
    </DotBackground>
  </div>
);

const GridPatternDemo = () => (
  <div style={{ borderRadius: 16, overflow: "hidden", border: "1px solid var(--aura-border)" }}>
    <GridPattern variant="lines" size={32} maskRadial style={{ minHeight: 280, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center", padding: "2rem" }}>
        <Badge variant="solid" size="sm" style={{ marginBottom: "0.75rem" }}>Technical Grid</Badge>
        <Heading level={3}>Geometric Blueprint Grid</Heading>
        <Text color="muted" size="sm" style={{ maxWidth: 380, margin: "0.5rem auto" }}>
          High-precision architectural blueprint grid pattern with radial vignette edge fade.
        </Text>
      </div>
    </GridPattern>
  </div>
);

const AuroraBackgroundDemo = () => (
  <div style={{ borderRadius: 16, overflow: "hidden", border: "1px solid var(--aura-border)" }}>
    <AuroraBackground variant="subtle" style={{ minHeight: 320, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center", padding: "2rem" }}>
        <Badge variant="solid" size="sm" style={{ marginBottom: "0.75rem" }}>Ambient Aurora</Badge>
        <Heading level={3}>Breathing Atmospheric Aurora</Heading>
        <Text color="muted" size="sm" style={{ maxWidth: 400, margin: "0.5rem auto" }}>
          Quiet luxury multi-color atmospheric glow that pulses and breathes organically with pure CSS keyframes.
        </Text>
      </div>
    </AuroraBackground>
  </div>
);

export const DOCS_DATA: Record<string, DocItem> = {
  introduction: {
    id: "introduction",
    title: "Introduction",
    category: "Getting Started",
    badge: "v2.2.0",
    description: "Aura UI is a production-grade, zero-runtime-dependency React UI system engineered for high-converting and award-winning digital experiences.",
    importCode: `npm install aura-ui-library`,
    variants: [
      {
        id: "overview",
        title: "Core Philosophy",
        description: "Zero external runtime dependencies. React and React DOM are peer dependencies only. No GSAP, Framer Motion, Tailwind, or React Icons.",
        code: `// Zero runtime dependencies in package.json
// Handcrafted CSS tokens, native Web Animations API, 56+ SVG icons`,
        render: () => (
          <Stack gap={4}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1rem" }}>
              <Card variant="outline" style={{ padding: "1.5rem" }}>
                <Icons.ZapIcon size={24} color="var(--aura-accent)" />
                <Heading level={4} style={{ marginTop: "0.75rem", marginBottom: "0.25rem" }}>Zero Runtime Deps</Heading>
                <Text size="sm" color="muted">Only pure React, modern browser APIs, and native CSS variables. Ultra-light bundle footprint.</Text>
              </Card>
              <Card variant="outline" style={{ padding: "1.5rem" }}>
                <Icons.SparklesIcon size={24} color="#00e5ff" />
                <Heading level={4} style={{ marginTop: "0.75rem", marginBottom: "0.25rem" }}>Award-Grade Motion</Heading>
                <Text size="sm" color="muted">3D Tilt Cards, Canvas Confetti, Meteors, Shine Borders, and Spring Magnetic Buttons without Framer or GSAP.</Text>
              </Card>
              <Card variant="outline" style={{ padding: "1.5rem" }}>
                <Icons.ShieldIcon size={24} color="#10b981" />
                <Heading level={4} style={{ marginTop: "0.75rem", marginBottom: "0.25rem" }}>Quiet Luxury Aesthetics</Heading>
                <Text size="sm" color="muted">Curated typography tokens, high-contrast accessible states, and sleek dark mode glassmorphism.</Text>
              </Card>
            </div>
          </Stack>
        ),
      },
    ],
  },

  installation: {
    id: "installation",
    title: "Installation",
    category: "Getting Started",
    badge: "npm",
    description: "Install Aura UI via npm, yarn, or pnpm, import the token stylesheet, and wrap your application with AuraProvider.",
    importCode: `npm install aura-ui-library`,
    variants: [
      {
        id: "setup",
        title: "Quick Setup Guide",
        description: "Import styles in your main entry point (main.tsx or App.tsx).",
        code: `// 1. Install package
npm i aura-ui-library

// 2. Import stylesheet in your root file (main.tsx or layout.tsx)
import "aura-ui-library/dist/styles.css";

// 3. Wrap your root with AuraProvider
import { AuraProvider, Button } from "aura-ui-library";

export default function App() {
  return (
    <AuraProvider theme="dark" accentColor="#7c3aed">
      <Button variant="solid">Hello Aura UI</Button>
    </AuraProvider>
  );
}`,
        render: () => (
          <Card variant="outline" style={{ padding: "1.5rem" }}>
            <Stack gap={3}>
              <Inline gap={2} align="center">
                <Icons.TerminalIcon size={18} color="var(--aura-accent)" />
                <Heading level={4}>1. Run Installation</Heading>
              </Inline>
              <pre style={{ margin: 0, padding: "0.75rem 1rem", background: "var(--aura-surface)", borderRadius: 8, border: "1px solid var(--aura-border)", fontSize: "0.85rem" }}>
                <code>npm install aura-ui-library</code>
              </pre>
              <Inline gap={2} align="center" style={{ marginTop: "0.5rem" }}>
                <Icons.CodeIcon size={18} color="var(--aura-accent)" />
                <Heading level={4}>2. Import Styles & Provider</Heading>
              </Inline>
              <Text size="sm" color="muted">Include the static CSS stylesheet once in your application entry file.</Text>
            </Stack>
          </Card>
        ),
      },
    ],
  },

  navbar: {
    id: "navbar",
    title: "Navbar",
    category: "Navigation & Headers",
    badge: "3 Modern Variants",
    description: "High-performance responsive navigation headers supporting 3 distinct modern variants: Floating Glass Island, Modern SaaS Command Bar, and Minimal Split Editorial.",
    importCode: `import { Navbar } from "aura-ui-library";`,
    props: [
      { name: "variant", type: '"default" | "floating" | "saas" | "minimal"', default: '"default"', description: "Modern visual aesthetic preset" },
      { name: "floating", type: "boolean", default: "false", description: "Shorthand for variant='floating' with rounded pill shape" },
      { name: "sticky", type: "boolean", default: "false", description: "Affixes navbar to the top of viewport" },
      { name: "className", type: "string", default: "undefined", description: "Custom CSS class for override styling" },
    ],
    variants: [
      {
        id: "variant-floating",
        title: "Variant 1: Floating Glass Island",
        description: "Centered pill-shaped floating navbar with backdrop blur and subtle border glow. Ideal for modern landing pages.",
        code: `<Navbar floating>
  <Navbar.Brand>
    <SparklesIcon size={18} />
    <span>Aura</span>
  </Navbar.Brand>
  <Navbar.Nav>
    <Navbar.Link href="#overview" active>Overview</Navbar.Link>
    <Navbar.Link href="#features">Features</Navbar.Link>
    <Navbar.Link href="#showcase">Showcase</Navbar.Link>
    <Navbar.Link href="#docs">Docs</Navbar.Link>
  </Navbar.Nav>
  <Navbar.Actions>
    <Button size="sm" variant="ghost">Sign In</Button>
    <Button size="sm" variant="solid">Get Started</Button>
  </Navbar.Actions>
</Navbar>`,
        render: () => <FloatingNavbarDemo />,
      },
      {
        id: "variant-saas",
        title: "Variant 2: Modern SaaS Command Bar",
        description: "Full-width dashboard & SaaS header with subtle accent gradient highlight line, quick command palette search slot, and profile action.",
        code: `<Navbar variant="saas">
  <Navbar.Brand>
    <LayersIcon size={20} color="var(--aura-accent)" />
    <span>Aura Cloud</span>
    <Badge variant="subtle" size="sm">v2.2</Badge>
  </Navbar.Brand>
  <Navbar.Nav>
    <Navbar.Link href="#projects" active>Projects</Navbar.Link>
    <Navbar.Link href="#deployments">Deployments</Navbar.Link>
    <Navbar.Link href="#analytics">Analytics</Navbar.Link>
  </Navbar.Nav>
  <Navbar.Actions>
    <div className="search-slot">
      <SearchIcon size={14} />
      <span>Search...</span>
      <Kbd size="sm">⌘K</Kbd>
    </div>
    <Button size="sm" variant="solid">New Project</Button>
  </Navbar.Actions>
</Navbar>`,
        render: () => <SaasNavbarDemo />,
      },
      {
        id: "variant-minimal",
        title: "Variant 3: Minimal Split Editorial",
        description: "Ultra-clean minimalist layout with sharp typography, animated underline link transitions, and high-fashion split brand layout.",
        code: `<Navbar variant="minimal">
  <Navbar.Brand>
    <span style={{ fontWeight: 800 }}>STUDIO // AURA</span>
  </Navbar.Brand>
  <Navbar.Nav>
    <Navbar.Link href="#works" active>Works</Navbar.Link>
    <Navbar.Link href="#agency">Agency</Navbar.Link>
    <Navbar.Link href="#journal">Journal</Navbar.Link>
  </Navbar.Nav>
  <Navbar.Actions>
    <Button size="sm" variant="outline">Schedule Call</Button>
  </Navbar.Actions>
</Navbar>`,
        render: () => <MinimalNavbarDemo />,
      },
      {
        id: "variant-hamburger",
        title: "Variant 4: Animated Mobile Hamburger & Sheet Drawer",
        description: "Mobile-responsive navbar with an animated 3-bar hamburger icon that smoothly morphs into an 'X', revealing a frosted glass mobile drawer with keyboard Escape close support.",
        code: `<Navbar>
  <Navbar.Brand>
    <SparklesIcon size={18} />
    <span>Aura UI</span>
  </Navbar.Brand>
  <Navbar.Nav>
    <Navbar.Link href="#overview" active>Overview</Navbar.Link>
    <Navbar.Link href="#features">Features</Navbar.Link>
  </Navbar.Nav>
  <Navbar.Actions>
    <Button size="sm" variant="solid">Get Started</Button>
    <Navbar.Toggle />
  </Navbar.Actions>

  <Navbar.MobileMenu>
    <Navbar.MobileLink href="#overview" active>Overview</Navbar.MobileLink>
    <Navbar.MobileLink href="#features">Features</Navbar.MobileLink>
    <Navbar.MobileLink href="#pricing">Pricing</Navbar.MobileLink>
    <Button size="sm" variant="solid" style={{ width: "100%" }}>Create Account</Button>
  </Navbar.MobileMenu>
</Navbar>`,
        render: () => <AnimatedHamburgerNavbarDemo />,
      },
      {
        id: "variant-dropdowns",
        title: "Variant 5: Interactive Dropdowns & Mega-Menu",
        description: "Interactive nested flyout menus and multi-column mega-menus with quiet luxury micro-animations.",
        code: `<Navbar>
  <Navbar.Brand>✦ Aura UI</Navbar.Brand>
  <Navbar.Nav>
    <Navbar.Dropdown>
      <Navbar.DropdownTrigger>Products</Navbar.DropdownTrigger>
      <Navbar.DropdownMenu>
        <Navbar.DropdownItem icon={<GridIcon size={18} />} title="UI Primitives" description="32+ zero-dependency building blocks." />
        <Navbar.DropdownItem icon={<LayersIcon size={18} />} title="Animated Navbars" description="Responsive dropdowns and hamburger menu." />
      </Navbar.DropdownMenu>
    </Navbar.Dropdown>
  </Navbar.Nav>
</Navbar>`,
        render: () => <DropdownNavbarDemo />,
      },
    ],
  },

  sidebar: {
    id: "sidebar",
    title: "Sidebar",
    category: "Navigation & Headers",
    badge: "3 Modern Variants",
    description: "Production-grade, zero-dependency collapsible side navigation supporting 3 visual presets: Standard SaaS Sidebar with expandable groups, macOS/Linear Style Dock Rail, and Island Floating Glass Sidebar.",
    importCode: `import { Sidebar } from "aura-ui-library";`,
    props: [
      { name: "variant", type: '"standard" | "dock" | "floating"', default: '"standard"', description: "Visual preset and layout behavior" },
      { name: "collapsed", type: "boolean", default: "false", description: "Controlled collapsed state (compact width)" },
      { name: "defaultCollapsed", type: "boolean", default: "false", description: "Initial collapsed state for uncontrolled usage" },
      { name: "onCollapseChange", type: "(collapsed: boolean) => void", default: "undefined", description: "Callback when collapse toggle button is clicked" },
      { name: "mobileOpen", type: "boolean", default: "false", description: "Whether to render as a slide-out drawer on mobile screens" },
    ],
    variants: [
      {
        id: "sidebar-standard",
        title: "Variant 1: Standard Modern SaaS Sidebar",
        description: "Collapsible vertical navigation with workspace headers, grouped sections, badge counts, keyboard shortcuts, profile footer, and smooth width transition.",
        code: `<Sidebar collapsed={collapsed} onCollapseChange={setCollapsed} variant="standard">
  <Sidebar.Header>
    <Sidebar.Brand logo={<SparklesIcon size={16} />} name="Aura Studio" />
  </Sidebar.Header>

  <Sidebar.Nav>
    <Sidebar.Group label="Workspace">
      <Sidebar.Item icon={<GridIcon size={16} />} active>Dashboard</Sidebar.Item>
      <Sidebar.Item icon={<LayersIcon size={16} />} badge={<Badge size="sm">12</Badge>}>Projects</Sidebar.Item>
      <Sidebar.Item icon={<SparklesIcon size={16} />} shortcut="⌘A">Analytics</Sidebar.Item>
    </Sidebar.Group>
  </Sidebar.Nav>

  <Sidebar.Footer>
    <Sidebar.CollapseButton />
  </Sidebar.Footer>
</Sidebar>`,
        render: () => <StandardSidebarDemo />,
      },
      {
        id: "sidebar-dock",
        title: "Variant 2: macOS / Linear Dock Rail",
        description: "Ultra-compact icon rail layout designed for maximal screen real estate in complex web apps and creative canvases.",
        code: `<Sidebar variant="dock">
  <Sidebar.Header>
    <SparklesIcon size={18} />
  </Sidebar.Header>
  <Sidebar.Nav>
    <Sidebar.Item icon={<GridIcon size={18} />} active>Home</Sidebar.Item>
    <Sidebar.Item icon={<LayersIcon size={18} />}>Layers</Sidebar.Item>
    <Sidebar.Item icon={<TerminalIcon size={18} />}>Code</Sidebar.Item>
  </Sidebar.Nav>
</Sidebar>`,
        render: () => <DockSidebarDemo />,
      },
      {
        id: "sidebar-floating",
        title: "Variant 3: Island Floating Glass Sidebar",
        description: "Elevated frosted glass side navbar with rounded corners, backdrop blur, and modern border glow.",
        code: `<Sidebar variant="floating">
  <Sidebar.Header>
    <Sidebar.Brand logo={<SparklesIcon size={18} />} name="Glass Island" />
  </Sidebar.Header>
  <Sidebar.Nav>
    <Sidebar.Item icon={<GridIcon size={16} />} active>Overview</Sidebar.Item>
    <Sidebar.Item icon={<LayersIcon size={16} />}>Integrations</Sidebar.Item>
  </Sidebar.Nav>
</Sidebar>`,
        render: () => <FloatingSidebarDemo />,
      },
    ],
  },

  icons: {
    id: "icons",
    title: "Icons Catalog",
    category: "Icons (56+)",
    badge: "56+ Built-in SVGs",
    description: "56+ zero-dependency inline SVG icons handcrafted with pixel-perfect 24x24 viewBox. Accessible, customizable with `size` and `color` props, and ready to import directly.",
    importCode: `import { SparklesIcon, ZapIcon, ShieldIcon } from "aura-ui-library";`,
    props: [
      { name: "size", type: "number | string", default: "20", description: "Width and height in pixels or CSS units" },
      { name: "color", type: "string", default: '"currentColor"', description: "Stroke or fill color" },
      { name: "className", type: "string", default: "undefined", description: "Additional custom class names" },
      { name: "aria-hidden", type: "boolean", default: "true", description: "Accessibility attribute for decorative icons" },
    ],
    variants: [
      {
        id: "all-icons",
        title: "Interactive Icon Explorer",
        description: "Search and preview all 56+ icons. Click any icon to copy its React component name or import code.",
        code: `// Import any icon without installing react-icons or lucide-react:
import { 
  CheckIcon, SparklesIcon, ZapIcon, ShieldIcon, 
  TerminalIcon, GlobeIcon, BentoGrid 
} from "aura-ui-library";

<SparklesIcon size={24} color="#7c3aed" />`,
        render: () => <IconsExplorer />,
      },
    ],
  },

  button: {
    id: "button",
    title: "Button",
    category: "General & Actions",
    badge: "5 Variants",
    description: "Accessible button primitive with 5 visual variants, 4 sizes, loading spinner state, and optional left/right icon slots.",
    importCode: `import { Button } from "aura-ui-library";`,
    props: [
      { name: "variant", type: '"solid" | "soft" | "outline" | "ghost" | "glass"', default: '"solid"', description: "Visual variant style" },
      { name: "size", type: '"sm" | "md" | "lg" | "xl"', default: '"md"', description: "Button sizing and padding" },
      { name: "loading", type: "boolean", default: "false", description: "Shows accessible loading spinner and disables interaction" },
      { name: "disabled", type: "boolean", default: "false", description: "Standard disabled state" },
      { name: "leftIcon", type: "ReactNode", default: "undefined", description: "Icon rendered before the label" },
      { name: "rightIcon", type: "ReactNode", default: "undefined", description: "Icon rendered after the label" },
    ],
    variants: [
      {
        id: "button-variants",
        title: "Visual Variants",
        description: "Choose from solid, soft, outline, ghost, and glass styles.",
        code: `<Inline gap={3}>
  <Button variant="solid">Solid Accent</Button>
  <Button variant="soft">Soft Surface</Button>
  <Button variant="outline">Border Outline</Button>
  <Button variant="ghost">Minimal Ghost</Button>
  <Button variant="glass">Glass Backdrop</Button>
</Inline>`,
        render: () => (
          <Inline gap={3} wrap>
            <Button variant="solid">Solid Accent</Button>
            <Button variant="soft">Soft Surface</Button>
            <Button variant="outline">Border Outline</Button>
            <Button variant="ghost">Minimal Ghost</Button>
            <Button variant="glass">Glass Backdrop</Button>
          </Inline>
        ),
      },
      {
        id: "button-sizes",
        title: "Sizes & States",
        description: "Available in sm, md, lg, and xl with native loading states.",
        code: `<Inline gap={3} align="center">
  <Button size="sm">Small (sm)</Button>
  <Button size="md">Medium (md)</Button>
  <Button size="lg">Large (lg)</Button>
  <Button size="md" loading>Loading...</Button>
</Inline>`,
        render: () => (
          <Inline gap={3} align="center" wrap>
            <Button size="sm">Small (sm)</Button>
            <Button size="md">Medium (md)</Button>
            <Button size="lg">Large (lg)</Button>
            <Button size="md" loading>Loading...</Button>
          </Inline>
        ),
      },
    ],
  },

  carousel: {
    id: "carousel",
    title: "Carousel",
    category: "Modern & Animated",
    badge: "3 Modern Variants",
    description: "Zero-dependency responsive image and content slider with touch/drag gesture swipe, keyboard navigation, configurable autoplay, indicators, and 3 visual presets.",
    importCode: `import { Carousel } from "aura-ui-library";`,
    props: [
      { name: "variant", type: '"slide" | "fade" | "card"', default: '"slide"', description: "Slide transition style preset" },
      { name: "items", type: "CarouselSlideItem[]", default: "undefined", description: "Array of slide objects with image, title, badge, description" },
      { name: "autoplay", type: "boolean", default: "false", description: "Enables automatic slide advance on timer" },
      { name: "interval", type: "number", default: "4000", description: "Autoplay slide advance delay in milliseconds" },
      { name: "pauseOnHover", type: "boolean", default: "true", description: "Pauses autoplay cycle when hovered" },
      { name: "showArrows", type: "boolean", default: "true", description: "Renders previous and next navigation arrows" },
      { name: "showIndicators", type: "boolean", default: "true", description: "Renders clickable pagination indicator dots" },
      { name: "showCounter", type: "boolean", default: "false", description: "Renders slide fraction badge counter (e.g. 01 / 03)" },
      { name: "aspectRatio", type: "string", default: '"16 / 9"', description: "CSS aspect-ratio string for carousel viewport" },
    ],
    variants: [
      {
        id: "carousel-slide",
        title: "Variant 1: Smooth Slide with Touch Gestures",
        description: "Horizontal spring transition with touch/drag swipe support, next/prev arrow buttons, and autoplay timer.",
        code: `<Carousel
  items={slides}
  variant="slide"
  autoplay
  interval={4500}
  aspectRatio="16 / 9"
  showArrows
  showIndicators
  showCounter
/>`,
        render: () => <CarouselSlideDemo />,
      },
      {
        id: "carousel-fade",
        title: "Variant 2: Cinematic Crossfade",
        description: "Smooth opacity crossfade between slides with subtle scale zoom for editorial imagery.",
        code: `<Carousel
  items={slides}
  variant="fade"
  autoplay
  aspectRatio="16 / 9"
  showArrows
  showIndicators
/>`,
        render: () => <CarouselFadeDemo />,
      },
      {
        id: "carousel-card",
        title: "Variant 3: Elevated Card Carousel",
        description: "Frosted glass card viewport with blur backdrop, elevated depth, and indicator controls.",
        code: `<Carousel
  items={slides}
  variant="card"
  aspectRatio="16 / 9"
  showArrows
  showIndicators
/>`,
        render: () => <CarouselCardDemo />,
      },
    ],
  },

  "tilt-card": {
    id: "tilt-card",
    title: "TiltCard",
    category: "Modern & Animated",
    badge: "Award Motion",
    description: "Interactive 3D perspective mouse tilt card with dynamic specular glare, calibrated spring dampening, and reduced motion safety.",
    importCode: `import { TiltCard } from "aura-ui-library";`,
    props: [
      { name: "maxTilt", type: "number", default: "15", description: "Maximum tilt angle in degrees" },
      { name: "perspective", type: "number", default: "1000", description: "CSS 3D perspective distance in px" },
      { name: "glare", type: "boolean", default: "true", description: "Whether to render interactive specular reflection" },
    ],
    variants: [
      {
        id: "tilt-demo",
        title: "Interactive 3D Hover",
        description: "Hover over the card with your cursor to test the realistic 3D depth and light reflection.",
        code: `<TiltCard maxTilt={18} glare style={{ maxWidth: 360, padding: "2rem" }}>
  <SparklesIcon size={32} color="var(--aura-accent)" />
  <Heading level={3}>Spatial Computing</Heading>
  <Text color="muted">Interactive physics calculated via RAF without external libraries.</Text>
</TiltCard>`,
        render: () => (
          <div style={{ display: "flex", justifyContent: "center", padding: "1.5rem" }}>
            <TiltCard maxTilt={18} glare style={{ maxWidth: 380, width: "100%", padding: "2rem", border: "1px solid var(--aura-border-strong)", borderRadius: 16 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(124, 58, 237, 0.15)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
                <Icons.SparklesIcon size={24} color="var(--aura-accent)" />
              </div>
              <Heading level={3} style={{ marginBottom: "0.5rem" }}>Spatial Engine 3D</Heading>
              <Text color="muted" size="sm">Hover over this card to witness dynamic perspective rotation and dynamic radial specular reflection with zero GSAP.</Text>
            </TiltCard>
          </div>
        ),
      },
    ],
  },

  confetti: {
    id: "confetti",
    title: "Confetti",
    category: "Modern & Animated",
    badge: "Physics Canvas",
    description: "Zero-dependency HTML5 Canvas particle burst with gravity, drag, velocity decay, and 3D rotation. Trigger on conversions or button clicks.",
    importCode: `import { Confetti, type ConfettiHandle } from "aura-ui-library";`,
    props: [
      { name: "ref", type: "RefObject<ConfettiHandle>", default: "undefined", description: "Ref exposing .fire({ particleCount, spread })" },
      { name: "particleCount", type: "number", default: "60", description: "Default particles per explosion burst" },
      { name: "colors", type: "string[]", default: "['#7c3aed', '#00e5ff', ...]", description: "Chromatic palette array" },
    ],
    variants: [
      {
        id: "confetti-demo",
        title: "Interactive Burst",
        description: "Click the trigger button below to launch realistic celebration physics.",
        code: `const confettiRef = useRef<ConfettiHandle>(null);

<Button onClick={() => confettiRef.current?.fire({ particleCount: 80 })}>
  Celebrate Conversion 🎉
</Button>
<Confetti ref={confettiRef} />`,
        render: () => <ConfettiTriggerDemo />,
      },
    ],
  },

  "bento-grid": {
    id: "bento-grid",
    title: "BentoGrid",
    category: "Modern & Animated",
    badge: "5 Variants",
    description: "Apple & Linear inspired BentoGrid layout engine with 5 styling variants, real-time GPU cursor spotlight tracking, frosted glassmorphism, responsive column spans, and zero dependencies.",
    importCode: `import { BentoGrid, BentoCard } from "aura-ui-library";`,
    props: [
      { name: "columns", type: "2 | 3 | 4", default: "3", description: "Number of grid columns on desktop" },
      { name: "gap", type: '"sm" | "md" | "lg"', default: '"md"', description: "Spacing between bento cards" },
      { name: "variant", type: '"default" | "glow" | "glass" | "gradient" | "cards"', default: '"default"', description: "Global grid styling theme" },
      { name: "colSpan", type: "1 | 2 | 3 | 4", default: "1", description: "Number of columns card spans" },
      { name: "rowSpan", type: "1 | 2", default: "1", description: "Number of rows card spans" },
      { name: "variant (card)", type: '"default" | "glow" | "glass" | "gradient" | "interactive"', default: '"default"', description: "Individual card aesthetic variant" },
      { name: "glowColor", type: "string", default: '"rgba(124, 58, 237, 0.22)"', description: "Custom radial glow color on hover" },
      { name: "badge", type: "ReactNode", default: "undefined", description: "Pill badge in card header" },
      { name: "graphic", type: "ReactNode", default: "undefined", description: "Background illustration / subtle watermark" },
    ],
    variants: [
      {
        id: "bento-glow",
        title: "Variant 1: Spotlight Glow (Cursor-Tracking)",
        description: "Interactive radial spotlight that follows the cursor in real-time without React re-renders.",
        code: `<BentoGrid columns={3} gap="md">
  <BentoCard
    colSpan={2}
    variant="glow"
    glowColor="rgba(124, 58, 237, 0.25)"
    badge="FEATURED"
    icon={<Icons.CpuIcon size={22} />}
    title="Real-Time GPU Spotlight"
    description="Calculates mouse coordinates directly to CSS custom properties for 120 FPS performance."
    cta={<Button size="sm" variant="soft">Explore Core</Button>}
  />
  <BentoCard
    colSpan={1}
    variant="glow"
    glowColor="rgba(16, 185, 129, 0.25)"
    badge="TURBO"
    icon={<Icons.ZapIcon size={22} color="#10b981" />}
    title="Zero Dependencies"
    description="No Framer Motion, GSAP, or Lucide. 100% pure React and CSS."
  />
  <BentoCard
    colSpan={1}
    variant="glow"
    glowColor="rgba(245, 158, 11, 0.25)"
    badge="SECURE"
    icon={<Icons.ShieldIcon size={22} color="#f59e0b" />}
    title="Strict TypeScript"
    description="Complete type inference and discriminant union safety."
  />
  <BentoCard
    colSpan={2}
    variant="glow"
    glowColor="rgba(59, 130, 246, 0.25)"
    badge="CINEMATIC"
    icon={<Icons.SparklesIcon size={22} color="#3b82f6" />}
    title="Editorial Layout Engine"
    description="Asymmetrical spans dynamically collapse gracefully to mobile touchscreens."
  />
</BentoGrid>`,
        render: () => (
          <BentoGrid columns={3} gap="md">
            <BentoCard
              colSpan={2}
              variant="glow"
              glowColor="rgba(124, 58, 237, 0.25)"
              badge="FEATURED"
              icon={<Icons.CpuIcon size={22} color="var(--aura-accent)" />}
              title="Real-Time GPU Spotlight"
              description="Calculates mouse coordinates directly to CSS custom properties for silky 120 FPS performance without React re-renders."
              cta={<Button size="sm" variant="soft">Explore Architecture</Button>}
            />
            <BentoCard
              colSpan={1}
              variant="glow"
              glowColor="rgba(16, 185, 129, 0.25)"
              badge="TURBO"
              icon={<Icons.ZapIcon size={22} color="#10b981" />}
              title="Zero Dependencies"
              description="No Framer Motion, GSAP, or Lucide. 100% native platform."
            />
            <BentoCard
              colSpan={1}
              variant="glow"
              glowColor="rgba(245, 158, 11, 0.25)"
              badge="SECURE"
              icon={<Icons.ShieldIcon size={22} color="#f59e0b" />}
              title="Strict TypeScript"
              description="Full discriminated union types for layout parameters."
            />
            <BentoCard
              colSpan={2}
              variant="glow"
              glowColor="rgba(59, 130, 246, 0.25)"
              badge="RESPONSIVE"
              icon={<Icons.SparklesIcon size={22} color="#3b82f6" />}
              title="Editorial Layout Flow"
              description="Asymmetrical multi-span grids that automatically reflow on tablets and mobile devices."
            />
          </BentoGrid>
        ),
      },
      {
        id: "bento-glass",
        title: "Variant 2: Frosted Glassmorphism",
        description: "Translucent glass panels with backdrop blur, specular borders, and subtle elevation.",
        code: `<BentoGrid columns={3} gap="md">
  <BentoCard
    colSpan={1}
    variant="glass"
    badge="CLOUD"
    icon={<Icons.CloudIcon size={22} />}
    title="Global Edge Edge"
    description="Sub-millisecond global CDN routing across 320 points of presence."
  />
  <BentoCard
    colSpan={2}
    variant="glass"
    badge="ANALYTICS"
    icon={<Icons.TerminalIcon size={22} />}
    title="Telemetry Stream"
    description="Instant live telemetry streams with zero cold starts."
    cta={<Button size="sm" variant="glass">View Telemetry</Button>}
  />
</BentoGrid>`,
        render: () => (
          <div style={{ position: "relative", padding: "16px", borderRadius: "16px", background: "radial-gradient(circle at 50% 50%, color-mix(in srgb, var(--aura-accent) 15%, transparent), transparent 70%)" }}>
            <BentoGrid columns={3} gap="md">
              <BentoCard
                colSpan={1}
                variant="glass"
                badge="CLOUD"
                icon={<Icons.CloudIcon size={22} color="var(--aura-accent)" />}
                title="Global Edge"
                description="Sub-millisecond global edge routing across 320 locations."
              />
              <BentoCard
                colSpan={2}
                variant="glass"
                badge="ANALYTICS"
                icon={<Icons.TerminalIcon size={22} color="#10b981" />}
                title="Telemetry Streaming"
                description="Instant observability with zero cold starts and end-to-end encryption."
                cta={<Button size="sm" variant="glass">View Pipeline</Button>}
              />
            </BentoGrid>
          </div>
        ),
      },
      {
        id: "bento-interactive",
        title: "Variant 3: Micro-Lift & Gradient Mesh",
        description: "Tactile lift on hover, interactive click press state, and subtle ambient gradient undertone.",
        code: `<BentoGrid columns={2} gap="lg">
  <BentoCard
    colSpan={1}
    variant="interactive"
    badge="TACTILE"
    icon={<Icons.LayersIcon size={22} />}
    title="Interactive Micro-Lift"
    description="Click to feel tactile scale response with spring physics."
  />
  <BentoCard
    colSpan={1}
    variant="gradient"
    badge="GRADIENT"
    icon={<Icons.SlidersIcon size={22} />}
    title="Ambient Sheen Mesh"
    description="Harmonious brand gradient that adapts seamlessly to light & dark modes."
  />
</BentoGrid>`,
        render: () => (
          <BentoGrid columns={2} gap="lg">
            <BentoCard
              colSpan={1}
              variant="interactive"
              badge="TACTILE"
              icon={<Icons.LayersIcon size={22} color="var(--aura-accent)" />}
              title="Interactive Micro-Lift"
              description="Click or hover to experience tactile elevation with smooth spring damping."
              cta={<Button size="sm" variant="outline">Interactive Card</Button>}
            />
            <BentoCard
              colSpan={1}
              variant="gradient"
              badge="GRADIENT"
              icon={<Icons.SlidersIcon size={22} color="#8b5cf6" />}
              title="Ambient Sheen Mesh"
              description="Harmonious brand gradient that adapts cleanly between light & dark themes."
              cta={<Button size="sm" variant="solid">Explore Gradient</Button>}
            />
          </BentoGrid>
        ),
      },
    ],
  },

  "pricing-card": {
    id: "pricing-card",
    title: "PricingCard",
    category: "Modern & Animated",
    badge: "4 Variants",
    description: "High-converting SaaS pricing tier card with 4 distinct visual presets: Default Surface, Frosted Glass, Cinematic Gradient Border & Glow, and Clean Minimal Editorial.",
    importCode: `import { PricingCard } from "aura-ui-library";`,
    props: [
      { name: "variant", type: '"default" | "glass" | "gradient" | "minimal"', default: '"default"', description: "Visual styling preset" },
      { name: "name", type: "string", default: "required", description: "Plan tier name" },
      { name: "price", type: "string", default: "required", description: "Price tag label" },
      { name: "period", type: "string", default: '"/ month"', description: "Billing cadence suffix" },
      { name: "features", type: "string[]", default: "required", description: "List of plan capabilities" },
      { name: "featured", type: "boolean", default: "false", description: "Highlights tier with accent glow" },
      { name: "badge", type: "string", default: "undefined", description: "Optional ribbon badge text" },
      { name: "ctaText", type: "string", default: '"Get Started"', description: "CTA button text" },
    ],
    variants: [
      {
        id: "pricing-default",
        title: "Variant 1: Default Surface",
        description: "Crisp card surface with high-contrast borders and clean typography.",
        code: `<PricingCard
  variant="default"
  name="Starter Tier"
  description="Essential primitives for solo builders and indie creators."
  price="$19"
  period="/ month"
  features={["Zero-dependency bundle", "56+ Inline SVG icons", "Access to 30+ components", "Community Discord support"]}
  ctaText="Start Building Free"
/>`,
        render: () => <PricingCardDefaultDemo />,
      },
      {
        id: "pricing-glass",
        title: "Variant 2: Frosted Glass",
        description: "Translucent glassmorphic card with backdrop blur and sleek glass button.",
        code: `<PricingCard
  variant="glass"
  name="Pro Studio"
  description="Frosted glassmorphic card for high-end digital agencies."
  price="$49"
  period="/ month"
  badge="Popular"
  features={["All Starter features", "Modern Animated Navbars", "Collapsible Sidebars", "Hardware-accelerated Carousels", "Priority 24/7 Slack channel"]}
  ctaText="Upgrade to Pro Studio"
/>`,
        render: () => <PricingCardGlassDemo />,
      },
      {
        id: "pricing-gradient",
        title: "Variant 3: Cinematic Gradient Border & Glow",
        description: "High-impact highlighted tier featuring a multi-color gradient shimmer top bar and accent glow.",
        code: `<PricingCard
  variant="gradient"
  featured
  name="Enterprise Cloud"
  description="High-converting gradient aura with glowing accent highlights."
  price="$99"
  period="/ month"
  badge="Recommended"
  features={["All Pro Studio features", "Custom CSS theme generation", "Infinite SLA guarantee", "Dedicated solutions architect", "Custom contract & security audit"]}
  ctaText="Deploy Enterprise"
/>`,
        render: () => <PricingCardGradientDemo />,
      },
      {
        id: "pricing-minimal",
        title: "Variant 4: Clean Minimal Editorial",
        description: "Understated subtle surface with borderless layout and clean typography.",
        code: `<PricingCard
  variant="minimal"
  name="Open Source"
  description="Understated distraction-free editorial layout."
  price="$0"
  period="forever"
  features={["Full MIT Source Code", "Self-hosted NPM package", "GitHub Community Discussions", "Accessible ARIA patterns"]}
  ctaText="Read Documentation"
/>`,
        render: () => <PricingCardMinimalDemo />,
      },
    ],
  },

  "magnetic-button": {
    id: "magnetic-button",
    title: "MagneticButton",
    category: "General & Actions",
    badge: "Physics Motion",
    description: "Hardware-accelerated cursor attraction primitive with spring physics, specular flare tracking, and elastic tension.",
    importCode: `import { MagneticButton } from "aura-ui-library";`,
    props: [
      { name: "variant", type: '"default" | "glow" | "elastic" | "ghost"', default: '"default"', description: "Interaction style & visual flare variant" },
      { name: "strength", type: "number", default: "0.35", description: "Magnetic attraction multiplier factor" },
      { name: "glowColor", type: "string", default: "rgba(124, 58, 237, 0.45)", description: "Radial specular spotlight color for glow variant" },
      { name: "scaleOnHover", type: "number", default: "1.04", description: "Scale magnification factor on hover" },
      { name: "disabled", type: "boolean", default: "false", description: "Disables magnetic tracking physics" },
    ],
    variants: [
      {
        id: "magnetic-default",
        title: "Variant 1: Spring Pull (Default)",
        description: "Smooth magnetic physics following cursor proximity with dampening.",
        code: `<MagneticButton strength={0.4}>
  <Button size="lg" variant="solid" leftIcon={<Icons.SparklesIcon size={18} />}>
    Magnetic Pull
  </Button>
</MagneticButton>`,
        render: () => (
          <div style={{ padding: "2rem", display: "flex", justifyContent: "center" }}>
            <MagneticButton strength={0.4}>
              <Button size="lg" variant="solid" leftIcon={<Icons.SparklesIcon size={18} />}>
                Magnetic Pull
              </Button>
            </MagneticButton>
          </div>
        ),
      },
      {
        id: "magnetic-glow",
        title: "Variant 2: Specular Cursor Glow",
        description: "Cursor-following radial specular sheen that highlights the button surface as the pointer moves across.",
        code: `<MagneticButton variant="glow" strength={0.45} glowColor="rgba(0, 229, 255, 0.45)">
  <Button size="lg" variant="outline" leftIcon={<Icons.ZapIcon size={18} />}>
    Interactive Glow
  </Button>
</MagneticButton>`,
        render: () => (
          <div style={{ padding: "2rem", display: "flex", justifyContent: "center" }}>
            <MagneticButton variant="glow" strength={0.45} glowColor="rgba(0, 229, 255, 0.45)">
              <Button size="lg" variant="outline" leftIcon={<Icons.ZapIcon size={18} />}>
                Interactive Glow
              </Button>
            </MagneticButton>
          </div>
        ),
      },
      {
        id: "magnetic-elastic",
        title: "Variant 3: Elastic Tension Stretch",
        description: "Higher attraction strength (0.6) with dynamic spring elasticity that stretches along cursor velocity vector.",
        code: `<MagneticButton variant="elastic" strength={0.6}>
  <Button size="lg" variant="solid" leftIcon={<Icons.FlameIcon size={18} />}>
    Elastic Snap
  </Button>
</MagneticButton>`,
        render: () => (
          <div style={{ padding: "2rem", display: "flex", justifyContent: "center" }}>
            <MagneticButton variant="elastic" strength={0.6}>
              <Button size="lg" variant="solid" leftIcon={<Icons.FlameIcon size={18} />}>
                Elastic Snap
              </Button>
            </MagneticButton>
          </div>
        ),
      },
      {
        id: "magnetic-ghost",
        title: "Variant 4: Subtle Ghost Pull",
        description: "Lightweight floating outline with gentle magnetic pull suitable for secondary or navigation actions.",
        code: `<MagneticButton variant="ghost" strength={0.3}>
  <Button size="lg" variant="ghost" leftIcon={<Icons.ArrowUpRightIcon size={18} />}>
    Ghost Magnetic
  </Button>
</MagneticButton>`,
        render: () => (
          <div style={{ padding: "2rem", display: "flex", justifyContent: "center" }}>
            <MagneticButton variant="ghost" strength={0.3}>
              <Button size="lg" variant="ghost" leftIcon={<Icons.ArrowUpRightIcon size={18} />}>
                Ghost Magnetic
              </Button>
            </MagneticButton>
          </div>
        ),
      },
    ],
  },

  "shine-border": {
    id: "shine-border",
    title: "ShineBorder",
    category: "Modern & Animated",
    badge: "Chromatic Glow",
    description: "Continuous rotating chromatic beam border effect that wraps any content with quiet luxury brilliance.",
    importCode: `import { ShineBorder } from "aura-ui-library";`,
    props: [
      { name: "borderWidth", type: "number", default: "1.5", description: "Border thickness in px" },
      { name: "duration", type: "number", default: "10", description: "Rotation period in seconds" },
      { name: "color", type: "string | string[]", default: "['#7c3aed', '#00e5ff', '#ec4899']", description: "Beam colors" },
    ],
    variants: [
      {
        id: "shine-demo",
        title: "Rotating Beam Border",
        description: "Wraps a card with continuous chromatic light beam.",
        code: `<ShineBorder borderRadius={16} color={["#7c3aed", "#00e5ff", "#ec4899"]}>
  <div style={{ padding: "2rem" }}>
    <h3>Chromatic Beam</h3>
    <p>Pure CSS conic-gradient rotation.</p>
  </div>
</ShineBorder>`,
        render: () => (
          <div style={{ display: "flex", justifyContent: "center", padding: "1.5rem" }}>
            <ShineBorder borderRadius={16} color={["#7c3aed", "#00e5ff", "#ec4899"]} style={{ maxWidth: 360, width: "100%", padding: "1.75rem", background: "var(--aura-surface-raised)" }}>
              <Heading level={4} style={{ marginBottom: "0.5rem" }}>Chromatic Beam Engine</Heading>
              <Text size="sm" color="muted">Continuous rotating beam powered by hardware-accelerated CSS custom properties.</Text>
            </ShineBorder>
          </div>
        ),
      },
    ],
  },

  meteors: {
    id: "meteors",
    title: "Meteors",
    category: "Modern & Animated",
    badge: "VFX Particle",
    description: "Celestial shooting star meteor shower effect for hero banners, cards, and cosmic surfaces with zero canvas overhead.",
    importCode: `import { Meteors } from "aura-ui-library";`,
    props: [
      { name: "variant", type: '"shower" | "aurora" | "burst" | "subtle"', default: '"shower"', description: "Particle tail style & color dynamics" },
      { name: "number", type: "number", default: "20", description: "Total meteor streaks rendered" },
      { name: "speed", type: "number", default: "1", description: "Animation velocity multiplier" },
      { name: "angle", type: "number", default: "215", description: "Trajectory flight angle in degrees" },
    ],
    variants: [
      {
        id: "meteors-shower",
        title: "Variant 1: Celestial Shower (Default)",
        description: "Classic diagonal cosmic shooting stars with silver-white light trails.",
        code: `<div style={{ position: "relative", overflow: "hidden", minHeight: 180, borderRadius: 16 }}>
  <Meteors variant="shower" number={24} />
  <h3>Celestial Velocity</h3>
</div>`,
        render: () => (
          <div style={{ position: "relative", overflow: "hidden", minHeight: 180, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#06060c", borderRadius: 16, border: "1px solid var(--aura-border)" }}>
            <Meteors variant="shower" number={24} />
            <Heading level={3} style={{ zIndex: 1, position: "relative", marginBottom: "0.5rem" }}>Celestial Velocity</Heading>
            <Text size="sm" color="muted" style={{ zIndex: 1, position: "relative" }}>Dynamic randomized shooting stars without canvas overhead.</Text>
          </div>
        ),
      },
      {
        id: "meteors-aurora",
        title: "Variant 2: Aurora Chromatic Trails",
        description: "Multi-colored neon trails shifting between cyan, electric violet, and magenta streaks.",
        code: `<div style={{ position: "relative", overflow: "hidden", minHeight: 180, borderRadius: 16 }}>
  <Meteors variant="aurora" number={26} speed="fast" />
  <h3>Aurora Atmosphere</h3>
</div>`,
        render: () => (
          <div style={{ position: "relative", overflow: "hidden", minHeight: 180, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#050512", borderRadius: 16, border: "1px solid rgba(124, 58, 237, 0.3)" }}>
            <Meteors variant="aurora" number={26} speed="fast" />
            <Heading level={3} style={{ zIndex: 1, position: "relative", marginBottom: "0.5rem", color: "#f8fafc" }}>Aurora Ionosphere</Heading>
            <Text size="sm" style={{ zIndex: 1, position: "relative", color: "#94a3b8" }}>Cyan, violet & pink chromatic energy streams.</Text>
          </div>
        ),
      },
      {
        id: "meteors-burst",
        title: "Variant 3: High-Energy Cosmic Burst",
        description: "Dense 100px elongated streaks at high velocity for energetic hero headlines.",
        code: `<div style={{ position: "relative", overflow: "hidden", minHeight: 180, borderRadius: 16 }}>
  <Meteors variant="burst" number={35} speed="fast" />
  <h3>Hyperdrive Burst</h3>
</div>`,
        render: () => (
          <div style={{ position: "relative", overflow: "hidden", minHeight: 180, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#09090b", borderRadius: 16, border: "1px solid var(--aura-border-strong)" }}>
            <Meteors variant="burst" number={35} speed="fast" />
            <Heading level={3} style={{ zIndex: 1, position: "relative", marginBottom: "0.5rem" }}>Hyperdrive Burst</Heading>
            <Text size="sm" color="muted" style={{ zIndex: 1, position: "relative" }}>Longer 100px trails with high luminosity.</Text>
          </div>
        ),
      },
      {
        id: "meteors-subtle",
        title: "Variant 4: Quiet Luxury Subtle Stardust",
        description: "Gentle, understated slow-floating stardust trails ideal for minimal dark cards.",
        code: `<div style={{ position: "relative", overflow: "hidden", minHeight: 180, borderRadius: 16 }}>
  <Meteors variant="subtle" number={14} speed="slow" />
  <h3>Quiet Horizon</h3>
</div>`,
        render: () => (
          <div style={{ position: "relative", overflow: "hidden", minHeight: 180, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "var(--aura-surface)", borderRadius: 16, border: "1px solid var(--aura-border)" }}>
            <Meteors variant="subtle" number={14} speed="slow" />
            <Heading level={3} style={{ zIndex: 1, position: "relative", marginBottom: "0.5rem" }}>Quiet Horizon</Heading>
            <Text size="sm" color="muted" style={{ zIndex: 1, position: "relative" }}>Soft, non-intrusive trails respecting visual hierarchy.</Text>
          </div>
        ),
      },
    ],
  },

  marquee: {
    id: "marquee",
    title: "Marquee",
    category: "Modern & Animated",
    badge: "Infinite Stream",
    description: "Seamless infinite ribbon and ticker stream with pause-on-hover, 3D perspective tilt, and vertical modes.",
    importCode: `import { Marquee } from "aura-ui-library";`,
    props: [
      { name: "variant", type: '"default" | "vertical" | "3d-tilt" | "cards"', default: '"default"', description: "Display orientation and spatial layout style" },
      { name: "pauseOnHover", type: "boolean", default: "true", description: "Pauses ticker animation when hovered" },
      { name: "reverse", type: "boolean", default: "false", description: "Reverses scrolling direction" },
      { name: "speed", type: "number", default: "40", description: "Animation duration in seconds" },
      { name: "fadeEdges", type: "boolean", default: "true", description: "Applies mask-image gradient fade to edges" },
      { name: "gap", type: "string | number", default: '"1.5rem"', description: "Spacing between item children" },
    ],
    variants: [
      {
        id: "marquee-default",
        title: "Variant 1: Infinite Brand Ribbon",
        description: "Continuous horizontal ticker with edge fade masks and automatic hover-pause.",
        code: `<Marquee pauseOnHover speed={28}>
  <span>✦ Zero Dependencies</span>
  <span>✦ 56+ SVG Icons</span>
  <span>✦ TypeScript First</span>
</Marquee>`,
        render: () => (
          <div style={{ padding: "1.5rem 0", background: "var(--aura-surface)", borderRadius: 12 }}>
            <Marquee pauseOnHover speed={28}>
              {["✦ Zero Runtime Dependencies", "✦ 56+ Inline Icons", "✦ Pure CSS Tokens", "✦ 3D Perspective Tilt", "✦ HTML5 Canvas Confetti", "✦ TypeScript First"].map((text, i) => (
                <div key={i} style={{ padding: "0.5rem 1.25rem", borderRadius: 999, background: "var(--aura-surface-raised)", border: "1px solid var(--aura-border)", fontSize: "0.85rem", fontWeight: 600 }}>
                  {text}
                </div>
              ))}
            </Marquee>
          </div>
        ),
      },
      {
        id: "marquee-3d",
        title: "Variant 2: 3D Angled Perspective Ribbon",
        description: "Marketing hero banner angled at 14° perspective with hardware-accelerated transforms.",
        code: `<Marquee variant="3d-tilt" speed={22}>
  <span>✦ NEXT-GEN DIGITAL EXPERIENCES</span>
  <span>✦ ZERO DEPENDENCIES</span>
</Marquee>`,
        render: () => (
          <div style={{ padding: "3rem 0", overflow: "hidden", background: "var(--aura-surface)", borderRadius: 16 }}>
            <Marquee variant="3d-tilt" speed={22}>
              {["✦ ARCHITECTURAL PRECISION", "✦ ZERO EXTERNAL LIBRARIES", "✦ HARDWARE ACCELERATED", "✦ QUIET LUXURY INTERFACES"].map((text, i) => (
                <div key={i} style={{ padding: "0.6rem 1.5rem", borderRadius: 8, background: "var(--aura-accent)", color: "#fff", fontWeight: 700, letterSpacing: "0.05em", fontSize: "0.9rem" }}>
                  {text}
                </div>
              ))}
            </Marquee>
          </div>
        ),
      },
      {
        id: "marquee-cards",
        title: "Variant 3: Customer Testimonial Stream",
        description: "Pre-spaced card layout stream designed for review highlights and partner badges.",
        code: `<Marquee variant="cards" speed={35} pauseOnHover>
  <Card>...</Card>
  <Card>...</Card>
</Marquee>`,
        render: () => (
          <div style={{ padding: "1rem 0", background: "var(--aura-surface)", borderRadius: 12 }}>
            <Marquee variant="cards" speed={32} pauseOnHover>
              {[
                { name: "Alex Chen", role: "Design Lead", quote: "Aura UI replaced 4 separate packages in our app." },
                { name: "Sophia Ray", role: "CTO", quote: "Zero runtime dependencies saved us 140KB bundle weight." },
                { name: "Marcus Vance", role: "Staff Engineer", quote: "The motion primitives feel like native 120fps hardware." },
              ].map((item, idx) => (
                <div key={idx} style={{ width: 280, padding: "1rem 1.25rem", borderRadius: 12, background: "var(--aura-surface-raised)", border: "1px solid var(--aura-border)" }}>
                  <Text size="sm" weight="semibold">{item.name}</Text>
                  <Text size="xs" color="muted">{item.role}</Text>
                  <Text size="xs" style={{ marginTop: "0.5rem" }}>"{item.quote}"</Text>
                </div>
              ))}
            </Marquee>
          </div>
        ),
      },
      {
        id: "marquee-vertical",
        title: "Variant 4: Vertical Live Stream Ticker",
        description: "Vertical stream ideal for live activity feeds, changelog alerts, and sidebars.",
        code: `<Marquee variant="vertical" speed={18} style={{ height: 180 }}>
  <div>Event 1</div>
  <div>Event 2</div>
</Marquee>`,
        render: () => (
          <div style={{ display: "flex", justifyContent: "center", padding: "1rem" }}>
            <div style={{ width: 320, background: "var(--aura-surface)", borderRadius: 12, border: "1px solid var(--aura-border)", padding: "0.5rem" }}>
              <Marquee variant="vertical" speed={16} style={{ height: 170 }} pauseOnHover>
                {[
                  "🚀 Deployed Aura v2.2 to Edge",
                  "✨ Added 3 new Background primitives",
                  "🛡️ Zero CVE dependencies verified",
                  "⚡ Web Animation API 120fps verified",
                  "💎 Light mode contrast tuned to AAA",
                ].map((log, i) => (
                  <div key={i} style={{ padding: "0.6rem 1rem", borderRadius: 8, background: "var(--aura-surface-raised)", border: "1px solid var(--aura-border)", fontSize: "0.8rem", fontWeight: 500 }}>
                    {log}
                  </div>
                ))}
              </Marquee>
            </div>
          </div>
        ),
      },
    ],
  },

  "text-reveal": {
    id: "text-reveal",
    title: "TextReveal",
    category: "Modern & Animated",
    badge: "Typography VFX",
    description: "Cinematic typography entrance animation system with 5 distinct reveal choreography variants.",
    importCode: `import { TextReveal } from "aura-ui-library";`,
    props: [
      { name: "variant", type: '"words" | "characters" | "blur" | "gradient" | "lines"', default: '"words"', description: "Choreography animation style" },
      { name: "text", type: "string", description: "Headline text to reveal" },
      { name: "delay", type: "number", default: "0", description: "Initial entrance delay in seconds" },
      { name: "stagger", type: "number", default: "0.04", description: "Per-unit stagger delay in seconds" },
      { name: "duration", type: "number", default: "0.6", description: "Per-unit transition duration in seconds" },
      { name: "triggerOnScroll", type: "boolean", default: "true", description: "Uses IntersectionObserver to reveal on scroll" },
    ],
    variants: [
      {
        id: "reveal-words",
        title: "Variant 1: Staggered Words (Default)",
        description: "Each word slides up smoothly with subtle opacity fade.",
        code: `<TextReveal
  variant="words"
  text="Craft cinematic interfaces without importing an entire ecosystem."
/>`,
        render: () => (
          <div style={{ padding: "2rem", textAlign: "center" }}>
            <TextReveal
              variant="words"
              text="Craft cinematic digital interfaces without importing an entire ecosystem."
              style={{ fontSize: "1.5rem", fontWeight: 700, lineHeight: 1.4, letterSpacing: "-0.02em" }}
            />
          </div>
        ),
      },
      {
        id: "reveal-blur",
        title: "Variant 2: Frosted De-blur Entrance",
        description: "Text transitions from 12px frosted glass blur into crisp razor-sharp focus.",
        code: `<TextReveal
  variant="blur"
  text="Quiet luxury engineered into every single interaction."
/>`,
        render: () => (
          <div style={{ padding: "2rem", textAlign: "center" }}>
            <TextReveal
              variant="blur"
              text="Quiet luxury engineered into every single interaction."
              style={{ fontSize: "1.5rem", fontWeight: 700, lineHeight: 1.4, color: "var(--aura-accent)" }}
            />
          </div>
        ),
      },
      {
        id: "reveal-characters",
        title: "Variant 3: Letter-by-Letter Matrix Entrance",
        description: "High-precision character-by-character cascade for high-impact hero titles.",
        code: `<TextReveal
  variant="characters"
  text="THE ZERO-DEPENDENCY REVOLUTION"
/>`,
        render: () => (
          <div style={{ padding: "2rem", textAlign: "center" }}>
            <TextReveal
              variant="characters"
              text="THE ZERO-DEPENDENCY REVOLUTION"
              style={{ fontSize: "1.4rem", fontWeight: 800, letterSpacing: "0.15em" }}
            />
          </div>
        ),
      },
      {
        id: "reveal-gradient",
        title: "Variant 4: Chromatic Shimmer Sweep",
        description: "Dynamic metallic gradient shine wiping continuously across the headline typography.",
        code: `<TextReveal
  variant="gradient"
  text="Aura UI: Engineered For The Modern Web"
/>`,
        render: () => (
          <div style={{ padding: "2rem", textAlign: "center" }}>
            <TextReveal
              variant="gradient"
              text="Aura UI: Engineered For The Modern Web"
              style={{ fontSize: "1.6rem", fontWeight: 800, letterSpacing: "-0.02em" }}
            />
          </div>
        ),
      },
      {
        id: "reveal-lines",
        title: "Variant 5: Editorial Sentence Reveal",
        description: "Line-by-line editorial transition for long-form quotes or magazine headlines.",
        code: `<TextReveal
  variant="lines"
  text="Zero dependencies. Maximum control. Uncompromising aesthetic perfection."
/>`,
        render: () => (
          <div style={{ padding: "2rem", textAlign: "center" }}>
            <TextReveal
              variant="lines"
              text="Zero dependencies. Maximum control. Uncompromising aesthetic perfection."
              style={{ fontSize: "1.4rem", fontWeight: 600, fontStyle: "italic", lineHeight: 1.5 }}
            />
          </div>
        ),
      },
    ],
  },

  skeleton: {
    id: "skeleton",
    title: "Skeleton",
    category: "Data Display & Surfaces",
    badge: "Shimmer Loader",
    description: "Realistic shimmer placeholder loading skeleton for cards, text blocks, and avatars.",
    importCode: `import { Skeleton } from "aura-ui-library";`,
    props: [
      { name: "variant", type: '"text" | "rectangular" | "circular"', default: '"rectangular"', description: "Shape variant" },
      { name: "width", type: "string | number", default: '"100%"', description: "Width override" },
      { name: "height", type: "string | number", default: '"1rem"', description: "Height override" },
    ],
    variants: [
      {
        id: "skeleton-card",
        title: "Product Card Shimmer",
        description: "Realistic placeholder wireframe while data fetches.",
        code: `<Stack gap={3} style={{ maxWidth: 300 }}>
  <Skeleton variant="rectangular" height={140} borderRadius={12} />
  <Skeleton variant="text" width="60%" height={20} />
  <Skeleton variant="text" width="90%" height={14} />
</Stack>`,
        render: () => (
          <div style={{ maxWidth: 320, padding: "1.25rem", borderRadius: 16, border: "1px solid var(--aura-border)", background: "var(--aura-surface)" }}>
            <Stack gap={3}>
              <Skeleton variant="rectangular" height={130} style={{ borderRadius: 10 }} />
              <Inline gap={2} align="center">
                <Skeleton variant="circular" width={32} height={32} />
                <Stack gap={1} style={{ flex: 1 }}>
                  <Skeleton variant="text" width="70%" height={14} />
                  <Skeleton variant="text" width="40%" height={10} />
                </Stack>
              </Inline>
              <Skeleton variant="text" width="90%" height={12} />
            </Stack>
          </div>
        ),
      },
    ],
  },

  spinner: {
    id: "spinner",
    title: "Spinner",
    category: "Data Display & Surfaces",
    badge: "Progress Indicators",
    description: "Multi-variant motion indicator suite with zero SVG animation overhead, supporting rings, dots, dual orbits, radar pulses, and soundwave bars.",
    importCode: `import { Spinner } from "aura-ui-library";`,
    props: [
      { name: "variant", type: '"ring" | "dots" | "orbit" | "pulse" | "bars"', default: '"ring"', description: "Loader animation architecture" },
      { name: "size", type: '"sm" | "md" | "lg" | "xl"', default: '"md"', description: "Indicator scale dimension" },
      { name: "color", type: "string", default: '"currentColor"', description: "Stroke or fill accent color" },
      { name: "speed", type: "number", default: "1", description: "Rotation/pulse speed multiplier factor" },
    ],
    variants: [
      {
        id: "spinner-ring",
        title: "Variant 1: Thin Dash Ring (Default)",
        description: "Classic thin stroke indicator with quiet luxury cubic-bezier dash rotation.",
        code: `<Inline gap={4} align="center">
  <Spinner variant="ring" size="sm" />
  <Spinner variant="ring" size="md" />
  <Spinner variant="ring" size="lg" />
  <Spinner variant="ring" size="md" color="var(--aura-accent)" />
</Inline>`,
        render: () => (
          <Inline gap={4} align="center" style={{ padding: "1.5rem" }}>
            <Spinner variant="ring" size="sm" />
            <Spinner variant="ring" size="md" />
            <Spinner variant="ring" size="lg" />
            <Spinner variant="ring" size="md" color="var(--aura-accent)" />
          </Inline>
        ),
      },
      {
        id: "spinner-dots",
        title: "Variant 2: Wave Bounce Dots",
        description: "Horizontal 3-dot wave ripple for conversational typing indicators and button states.",
        code: `<Inline gap={4} align="center">
  <Spinner variant="dots" size="sm" />
  <Spinner variant="dots" size="md" />
  <Spinner variant="dots" size="lg" color="var(--aura-accent)" />
</Inline>`,
        render: () => (
          <Inline gap={4} align="center" style={{ padding: "1.5rem" }}>
            <Spinner variant="dots" size="sm" />
            <Spinner variant="dots" size="md" />
            <Spinner variant="dots" size="lg" color="var(--aura-accent)" />
          </Inline>
        ),
      },
      {
        id: "spinner-orbit",
        title: "Variant 3: Dual Satellite Orbit",
        description: "Dual concentric rotating orbits for high-tech telemetry and sync indicators.",
        code: `<Inline gap={4} align="center">
  <Spinner variant="orbit" size="sm" />
  <Spinner variant="orbit" size="md" />
  <Spinner variant="orbit" size="lg" color="#00e5ff" />
</Inline>`,
        render: () => (
          <Inline gap={4} align="center" style={{ padding: "1.5rem" }}>
            <Spinner variant="orbit" size="sm" />
            <Spinner variant="orbit" size="md" />
            <Spinner variant="orbit" size="lg" color="#00e5ff" />
          </Inline>
        ),
      },
      {
        id: "spinner-pulse",
        title: "Variant 4: Concentric Radar Pulse",
        description: "Expanding radar ripples with fading alpha for live beacon and connection status.",
        code: `<Inline gap={4} align="center">
  <Spinner variant="pulse" size="sm" />
  <Spinner variant="pulse" size="md" />
  <Spinner variant="pulse" size="lg" color="var(--aura-accent)" />
</Inline>`,
        render: () => (
          <Inline gap={4} align="center" style={{ padding: "1.5rem" }}>
            <Spinner variant="pulse" size="sm" />
            <Spinner variant="pulse" size="md" />
            <Spinner variant="pulse" size="lg" color="var(--aura-accent)" />
          </Inline>
        ),
      },
      {
        id: "spinner-bars",
        title: "Variant 5: Soundwave Equalizer Bars",
        description: "Rhythmically oscillating vertical bars for audio, media, and streaming loaders.",
        code: `<Inline gap={4} align="center">
  <Spinner variant="bars" size="sm" />
  <Spinner variant="bars" size="md" />
  <Spinner variant="bars" size="lg" color="var(--aura-accent)" />
</Inline>`,
        render: () => (
          <Inline gap={4} align="center" style={{ padding: "1.5rem" }}>
            <Spinner variant="bars" size="sm" />
            <Spinner variant="bars" size="md" />
            <Spinner variant="bars" size="lg" color="var(--aura-accent)" />
          </Inline>
        ),
      },
    ],
  },

  input: {
    id: "input",
    title: "Input",
    category: "Forms & Inputs",
    badge: "Clean Primitives",
    description: "Accessible form text input with prefix/suffix icons, error states, and refined focus rings.",
    importCode: `import { Input } from "aura-ui-library";`,
    props: [
      { name: "placeholder", type: "string", description: "Placeholder guide text" },
      { name: "disabled", type: "boolean", default: "false", description: "Disabled input state" },
      { name: "error", type: "boolean", default: "false", description: "Error outline indicator" },
    ],
    variants: [
      {
        id: "input-demo",
        title: "Form Inputs",
        description: "Refined input fields with focus indicators.",
        code: `<Stack gap={3} style={{ maxWidth: 360 }}>
  <Input placeholder="Enter your email..." />
  <Input placeholder="Disabled input" disabled />
  <Input placeholder="Invalid field" error />
</Stack>`,
        render: () => (
          <Stack gap={3} style={{ maxWidth: 360 }}>
            <Input placeholder="name@company.com" />
            <Input placeholder="Disabled input" disabled />
            <Input placeholder="Error field" isInvalid />
          </Stack>
        ),
      },
    ],
  },

  switch: {
    id: "switch",
    title: "Switch",
    category: "Forms & Inputs",
    badge: "Toggle Control",
    description: "Accessible toggle switch primitive with smooth slide animation and keyboard accessibility.",
    importCode: `import { Switch } from "aura-ui-library";`,
    props: [
      { name: "checked", type: "boolean", description: "Controlled checked boolean state" },
      { name: "onCheckedChange", type: "(checked: boolean) => void", description: "Change callback" },
    ],
    variants: [
      {
        id: "switch-demo",
        title: "Interactive Toggle",
        description: "Smooth sliding toggle with label.",
        code: `<Switch defaultChecked label="Enable Dark Mode" />`,
        render: () => <SwitchInteractiveDemo />,
      },
    ],
  },

  dialog: {
    id: "dialog",
    title: "Dialog",
    category: "Overlays & Feedback",
    badge: "Accessible Modal",
    description: "Accessible modal overlay with focus trapping, Escape key listener, scroll locking, and smooth scale transitions.",
    importCode: `import { Dialog } from "aura-ui-library";`,
    props: [
      { name: "open", type: "boolean", description: "Whether the dialog modal is visible" },
      { name: "onClose", type: "() => void", description: "Callback when closed via Escape, backdrop, or close button" },
    ],
    variants: [
      {
        id: "dialog-demo",
        title: "Interactive Modal",
        description: "Open the modal dialog and test keyboard accessibility (Esc to close).",
        code: `const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Open Dialog</Button>
<Dialog open={open} onClose={() => setOpen(false)}>
  <Dialog.Header>
    <Dialog.Title>Deploy Project</Dialog.Title>
  </Dialog.Header>
  <Dialog.Body>
    <p>Are you sure you want to push to production?</p>
  </Dialog.Body>
  <Dialog.Footer>
    <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
    <Button variant="solid" onClick={() => setOpen(false)}>Confirm</Button>
  </Dialog.Footer>
</Dialog>`,
        render: () => <DialogInteractiveDemo />,
      },
    ],
  },

  "aurora-background": {
    id: "aurora-background",
    title: "AuroraBackground",
    category: "Backgrounds & Patterns",
    badge: "Ambient Atmosphere",
    description: "Hypnotic animated chromatic northern-lights gradient background with zero external runtime dependencies.",
    importCode: `import { AuroraBackground } from "aura-ui-library";`,
    props: [
      { name: "variant", type: '"subtle" | "vibrant" | "sunset"', default: '"subtle"', description: "Aurora color scheme & intensity" },
      { name: "speed", type: "number", default: "1", description: "Animation duration multiplier" },
      { name: "showRadialMask", type: "boolean", default: "true", description: "Applies edge vignette feathering" },
    ],
    variants: [
      {
        id: "aurora-demo",
        title: "Breathing Ambient Aurora",
        description: "Quiet luxury multi-color atmospheric glow that pulses and breathes organically with pure CSS keyframes.",
        code: `<AuroraBackground variant="subtle">
  <div style={{ textAlign: "center", padding: "2rem" }}>
    <Heading level={3}>Breathing Atmospheric Aurora</Heading>
  </div>
</AuroraBackground>`,
        render: () => <AuroraBackgroundDemo />,
      },
    ],
  },

  "dot-background": {
    id: "dot-background",
    title: "DotBackground",
    category: "Backgrounds & Patterns",
    badge: "Grid Surface",
    description: "Architectural dot matrix background pattern with radial spotlight mask and customizable spacing.",
    importCode: `import { DotBackground } from "aura-ui-library";`,
    props: [
      { name: "variant", type: '"default" | "radial" | "subtle"', default: '"radial"', description: "Dot intensity & radial mask style" },
      { name: "dotSize", type: "number", default: "1.2", description: "Diameter of dots in pixels" },
      { name: "gap", type: "number", default: "24", description: "Grid cell spacing in pixels" },
      { name: "dotColor", type: "string", description: "Color override for dots" },
    ],
    variants: [
      {
        id: "dot-demo",
        title: "Radial Masked Dot Matrix",
        description: "Modern Vercel/Linear inspired technical dot grid that gracefully fades away toward container boundaries.",
        code: `<DotBackground variant="radial" dotSpacing={22}>
  <div style={{ textAlign: "center", padding: "2rem" }}>
    <Heading level={3}>Radial Mask Dot Matrix</Heading>
  </div>
</DotBackground>`,
        render: () => <DotBackgroundDemo />,
      },
    ],
  },

  "grid-pattern": {
    id: "grid-pattern",
    title: "GridPattern",
    category: "Backgrounds & Patterns",
    badge: "Blueprint Matrix",
    description: "SVG-based technical blueprint grid pattern with line, crosshair, and dashed variations.",
    importCode: `import { GridPattern } from "aura-ui-library";`,
    props: [
      { name: "variant", type: '"lines" | "crosses" | "dashed"', default: '"lines"', description: "Blueprint geometry style" },
      { name: "size", type: "number", default: "32", description: "Grid square dimension in pixels" },
      { name: "strokeDasharray", type: "string", default: '"0"', description: "SVG stroke dasharray" },
      { name: "showRadialMask", type: "boolean", default: "true", description: "Soft radial vignette falloff" },
    ],
    variants: [
      {
        id: "grid-demo",
        title: "Geometric Blueprint Grid",
        description: "High-precision architectural blueprint grid pattern with radial vignette edge fade.",
        code: `<GridPattern variant="lines" size={32} maskRadial>
  <div style={{ textAlign: "center", padding: "2rem" }}>
    <Heading level={3}>Geometric Blueprint Grid</Heading>
  </div>
</GridPattern>`,
        render: () => <GridPatternDemo />,
      },
    ],
  },
};

function DialogInteractiveDemo() {
  const [open, setOpen] = React.useState(false);
  return (
    <div style={{ padding: "1.5rem", display: "flex", justifyContent: "center" }}>
      <Button variant="solid" onClick={() => setOpen(true)}>Open Interactive Modal</Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <Dialog.Header>
          <Dialog.Title>Deployment Confirmation</Dialog.Title>
        </Dialog.Header>
        <Dialog.Body>
          <Text size="sm" color="muted">
            Are you sure you want to deploy Aura UI v2.2.0 to your production edge network?
          </Text>
        </Dialog.Body>
        <Dialog.Footer>
          <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="solid" onClick={() => setOpen(false)}>Deploy Now</Button>
        </Dialog.Footer>
      </Dialog>
    </div>
  );
}

function SwitchInteractiveDemo() {
  const [checked, setChecked] = React.useState(true);
  return (
    <Inline gap={3} align="center" style={{ padding: "1rem" }}>
      <Switch checked={checked} onCheckedChange={setChecked} />
      <Text size="sm" weight="medium">
        {checked ? "GPU Acceleration Enabled" : "Software Rendering"}
      </Text>
    </Inline>
  );
}


// Helper for Confetti interactive demo
function ConfettiTriggerDemo() {
  const confettiRef = React.useRef<ConfettiHandle>(null);
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem", padding: "2rem" }}>
      <Confetti ref={confettiRef} />
      <Button
        variant="solid"
        size="lg"
        leftIcon={<Icons.SparklesIcon size={18} />}
        onClick={() => confettiRef.current?.fire()}
      >
        Click to Trigger Particle Burst 🎉
      </Button>
      <Text size="sm" color="muted">Canvas animation running natively without external dependencies.</Text>
    </div>
  );
}

// Helper for Icons Catalog Explorer
function IconsExplorer() {
  const [query, setQuery] = React.useState("");
  const [copiedName, setCopiedName] = React.useState<string | null>(null);

  const iconEntries = Object.entries(Icons).filter(([name]) => name.endsWith("Icon"));

  const filteredIcons = iconEntries.filter(([name]) =>
    name.toLowerCase().includes(query.toLowerCase())
  );

  const handleCopy = (iconName: string) => {
    navigator.clipboard.writeText(`<${iconName} size={20} />`);
    setCopiedName(iconName);
    setTimeout(() => setCopiedName(null), 2000);
  };

  return (
    <Stack gap={4}>
      <Inline gap={3} align="center" wrap>
        <div style={{ position: "relative", maxWidth: 360, width: "100%" }}>
          <Input
            placeholder="Filter 56+ icons (e.g. search, shield, flame)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <Badge variant="soft">{filteredIcons.length} of {iconEntries.length} Icons Found</Badge>
      </Inline>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))",
          gap: "0.75rem",
          maxHeight: 520,
          overflowY: "auto",
          padding: "0.5rem",
          background: "var(--aura-surface)",
          borderRadius: 12,
          border: "1px solid var(--aura-border)",
        }}
      >
        {filteredIcons.map(([name, IconComponent]) => (
          <div
            key={name}
            onClick={() => handleCopy(name)}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "1rem 0.5rem",
              borderRadius: 8,
              border: copiedName === name ? "1px solid var(--aura-accent)" : "1px solid var(--aura-border)",
              background: copiedName === name ? "rgba(124, 58, 237, 0.15)" : "var(--aura-surface-raised)",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
            title="Click to copy JSX code"
          >
            {/* @ts-ignore */}
            <IconComponent size={24} color={copiedName === name ? "var(--aura-accent)" : "var(--aura-fg)"} />
            <span
              style={{
                marginTop: "0.5rem",
                fontSize: "0.72rem",
                fontWeight: 500,
                textAlign: "center",
                wordBreak: "break-all",
                color: copiedName === name ? "var(--aura-accent)" : "var(--aura-fg-muted)",
              }}
            >
              {copiedName === name ? "Copied!" : name.replace("Icon", "")}
            </span>
          </div>
        ))}
      </div>
    </Stack>
  );
}


