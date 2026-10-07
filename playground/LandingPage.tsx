import React from "react";
import {
  Button,
  Badge,
  Card,
  Navbar,
  Confetti,
  type ConfettiHandle,
  MagneticButton,
  ShineBorder,
  Meteors,
  Marquee,
  Container,
  Stack,
  Inline,
  Text,
  Heading,
  Carousel,
  PricingCard,
} from "../src";

import * as Icons from "../src/icons";

interface LandingPageProps {
  onNavigateToDocs: (componentId?: string) => void;
  theme: "dark" | "light";
  onToggleTheme: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onNavigateToDocs,
  theme,
  onToggleTheme,
}) => {
  const confettiRef = React.useRef<ConfettiHandle>(null);
  const [copiedInstall, setCopiedInstall] = React.useState(false);

  const copyInstall = () => {
    navigator.clipboard.writeText("npm i aura-ui-library");
    setCopiedInstall(true);
    confettiRef.current?.fire();
    setTimeout(() => setCopiedInstall(false), 2500);
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Confetti ref={confettiRef} />

      {/* Floating Modern Header */}
      <div style={{ position: "sticky", top: "1rem", zIndex: 100, padding: "0 1rem" }}>
        <Navbar floating>
          <Navbar.Brand>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 10,
                background: "linear-gradient(135deg, var(--aura-accent), #ec4899)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icons.SparklesIcon size={18} color="#fff" />
            </div>
            <span style={{ fontWeight: 800, letterSpacing: "-0.03em", fontSize: "1.1rem" }}>AURA UI</span>
            <Badge variant="soft" size="sm">v2.2.0</Badge>
          </Navbar.Brand>

          <Navbar.Nav>
            <Navbar.Link href="#home" active>Home</Navbar.Link>
            <Navbar.Link href="#docs/introduction" onClick={() => onNavigateToDocs("introduction")}>Docs</Navbar.Link>
            <Navbar.Link href="#docs/navbar" onClick={() => onNavigateToDocs("navbar")}>Components</Navbar.Link>
            <Navbar.Link href="#docs/icons" onClick={() => onNavigateToDocs("icons")}>Icons (56+)</Navbar.Link>
          </Navbar.Nav>

          <Navbar.Actions>
            <Button
              size="sm"
              variant="ghost"
              onClick={onToggleTheme}
              leftIcon={theme === "dark" ? <Icons.SunIcon size={16} /> : <Icons.MoonIcon size={16} />}
            >
              {theme === "dark" ? "Light" : "Dark"}
            </Button>
            <Button
              size="sm"
              variant="solid"
              onClick={() => onNavigateToDocs("navbar")}
              rightIcon={<Icons.ArrowRightIcon size={14} />}
            >
              Explore Docs
            </Button>
            <Navbar.Toggle />
          </Navbar.Actions>

          <Navbar.MobileMenu>
            <Navbar.MobileLink href="#home" active>Home</Navbar.MobileLink>
            <Navbar.MobileLink href="#docs/introduction" onClick={() => onNavigateToDocs("introduction")}>Docs & Getting Started</Navbar.MobileLink>
            <Navbar.MobileLink href="#docs/navbar" onClick={() => onNavigateToDocs("navbar")}>Navbar (Animated Drawer)</Navbar.MobileLink>
            <Navbar.MobileLink href="#docs/sidebar" onClick={() => onNavigateToDocs("sidebar")}>Sidebar (3 Presets)</Navbar.MobileLink>
            <Navbar.MobileLink href="#docs/carousel" onClick={() => onNavigateToDocs("carousel")}>Image Carousel</Navbar.MobileLink>
            <Navbar.MobileLink href="#docs/pricing-card" onClick={() => onNavigateToDocs("pricing-card")}>Pricing Cards (4 Variants)</Navbar.MobileLink>
            <Navbar.MobileLink href="#docs/icons" onClick={() => onNavigateToDocs("icons")}>56+ Inline Icons</Navbar.MobileLink>
            <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.75rem", paddingTop: "0.75rem", borderTop: "1px solid var(--aura-border-subtle)" }}>
              <Button size="sm" variant="outline" onClick={onToggleTheme} leftIcon={theme === "dark" ? <Icons.SunIcon size={14} /> : <Icons.MoonIcon size={14} />} style={{ flex: 1 }}>
                {theme === "dark" ? "Light Mode" : "Dark Mode"}
              </Button>
              <Button size="sm" variant="solid" onClick={() => onNavigateToDocs("navbar")} style={{ flex: 1 }}>
                Explore Docs
              </Button>
            </div>
          </Navbar.MobileMenu>
        </Navbar>
      </div>

      {/* Hero Section */}
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          padding: "5rem 1rem 4rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Meteors number={26} />

        <Container size="md" style={{ position: "relative", zIndex: 2 }}>
          <Stack gap={4} align="center">
            <Inline gap={2} align="center">
              <Badge variant="outline" size="md">
                <Icons.FlameIcon size={14} color="#f59e0b" style={{ marginRight: 6 }} />
                New: 3 Modern Navbars & 56+ SVG Icons
              </Badge>
            </Inline>

            <Heading
              level={1}
              style={{
                fontSize: "clamp(2.5rem, 5.5vw, 4.2rem)",
                fontWeight: 900,
                letterSpacing: "-0.04em",
                lineHeight: 1.1,
                maxWidth: 900,
              }}
            >
              The Zero-Dependency React UI System For{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #a78bfa 0%, #ec4899 50%, #00e5ff 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Award-Grade Experiences
              </span>
            </Heading>

            <Text
              size="lg"
              color="muted"
              style={{ maxWidth: 680, fontSize: "clamp(1rem, 2vw, 1.25rem)", lineHeight: 1.6 }}
            >
              Stop importing 15 heavy dependencies for simple animations and icons.
              Aura UI brings cinematic 3D tilt, canvas confetti, shooting meteors, and 56+ inline SVGs with <strong>zero runtime packages</strong>.
            </Text>

            {/* Install Box */}
            <div style={{ marginTop: "1rem", width: "100%", maxWidth: 440 }}>
              <ShineBorder borderRadius={14} color={["#7c3aed", "#00e5ff", "#ec4899"]}>
                <div
                  onClick={copyInstall}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0.85rem 1.25rem",
                    background: "var(--aura-surface)",
                    borderRadius: 14,
                    cursor: "pointer",
                    userSelect: "none",
                  }}
                  title="Click to copy"
                >
                  <Inline gap={2} align="center">
                    <Icons.TerminalIcon size={16} color="var(--aura-accent)" />
                    <code style={{ fontFamily: "var(--aura-font-mono)", fontSize: "0.9rem" }}>
                      npm i aura-ui-library
                    </code>
                  </Inline>
                  <Badge variant={copiedInstall ? "solid" : "soft"} size="sm">
                    {copiedInstall ? "Copied! 🎉" : "Copy"}
                  </Badge>
                </div>
              </ShineBorder>
            </div>

            {/* Action Buttons */}
            <Inline gap={3} align="center" style={{ marginTop: "0.5rem" }} wrap>
              <MagneticButton strength={0.4}>
                <Button
                  size="lg"
                  variant="solid"
                  onClick={() => onNavigateToDocs("navbar")}
                  rightIcon={<Icons.ArrowRightIcon size={16} />}
                >
                  View Documentation
                </Button>
              </MagneticButton>
              <Button
                size="lg"
                variant="outline"
                onClick={() => onNavigateToDocs("icons")}
                leftIcon={<Icons.SparklesIcon size={16} />}
              >
                Browse 56+ Icons
              </Button>
            </Inline>
          </Stack>
        </Container>
      </section>

      {/* Infinite Brand Ribbon */}
      <section style={{ padding: "1.5rem 0", background: "var(--aura-surface)", borderTop: "1px solid var(--aura-border)", borderBottom: "1px solid var(--aura-border)" }}>
        <Marquee pauseOnHover speed={32}>
          {[
            "✦ Zero Runtime Dependencies",
            "✦ 56+ Inline SVG Primitives",
            "✦ 3 Modern Navbar Presets",
            "✦ 3D Perspective Tilt Physics",
            "✦ HTML5 Canvas Particle Confetti",
            "✦ Shooting Star Meteors VFX",
            "✦ Quiet Luxury CSS Tokens",
            "✦ TypeScript 100% Strict Type Safety",
          ].map((item, idx) => (
            <span
              key={idx}
              style={{
                margin: "0 1.5rem",
                fontSize: "0.85rem",
                fontWeight: 600,
                letterSpacing: "0.02em",
                color: "var(--aura-fg-muted)",
              }}
            >
              {item}
            </span>
          ))}
        </Marquee>
      </section>

      {/* Interactive Image Carousel Section */}
      <section style={{ padding: "4rem 1.5rem 3rem", maxWidth: 1100, margin: "0 auto", width: "100%" }}>
        <Stack gap={4} align="center">
          <div style={{ textAlign: "center", maxWidth: 640 }}>
            <Badge variant="soft" size="sm" style={{ marginBottom: "0.5rem" }}>
              <Icons.SparklesIcon size={12} color="var(--aura-accent)" style={{ marginRight: 4 }} />
              Zero-Dependency Image Carousel
            </Badge>
            <Heading level={2} style={{ fontSize: "2.2rem", letterSpacing: "-0.03em" }}>
              Cinematic Motion Primitives
            </Heading>
            <Text color="muted" size="sm" style={{ marginTop: "0.5rem" }}>
              Test native touch swipe, drag, keyboard arrows, and 3 modern visual modes (Slide, Crossfade, Glass Card) with zero third-party slider libraries.
            </Text>
          </div>

          <div style={{ width: "100%", borderRadius: 20, overflow: "hidden", boxShadow: "var(--aura-shadow-lg)" }}>
            <Carousel
              variant="slide"
              autoplay
              interval={4500}
              aspectRatio="16 / 9"
              showArrows
              showIndicators
              showCounter
              items={[
                {
                  id: 1,
                  image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1400&q=85",
                  badge: "Editorial Design",
                  title: "Quiet Luxury Digital Experiences",
                  description: "Designed with harmonious typography scales and high-contrast accessible states that wow users at first glance.",
                },
                {
                  id: 2,
                  image: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1400&q=85",
                  badge: "Zero Runtime Dependencies",
                  title: "Pure Browser & Native CSS Power",
                  description: "No GSAP, no Framer Motion, no Swiper. Every transition and gesture runs smoothly with native Web APIs.",
                },
                {
                  id: 3,
                  image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1400&q=85",
                  badge: "Production Ready",
                  title: "Collapsible Sidebars & Animated Navbars",
                  description: "Includes responsive hamburger menus, macOS dock rails, and 4 high-converting SaaS pricing card variants.",
                },
              ]}
            />
          </div>
        </Stack>
      </section>

      {/* Modern Component Cards Grid (Like Bootstrap/Tailwind Docs) */}
      <section style={{ padding: "4rem 1.5rem", maxWidth: 1200, margin: "0 auto", width: "100%" }}>
        <Stack gap={5}>
          <div style={{ textAlign: "center", maxWidth: 700, margin: "0 auto" }}>
            <Badge variant="soft" style={{ marginBottom: "0.5rem" }}>Documentation Guides</Badge>
            <Heading level={2} style={{ fontSize: "2.4rem", letterSpacing: "-0.03em" }}>
              Explore Individual Component Guides
            </Heading>
            <Text color="muted" size="base" style={{ marginTop: "0.5rem" }}>
              Click any component below to read its complete API guide, test interactive variants, copy code snippets, and review accessibility specifications.
            </Text>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {/* Card 1: Modern Animated Navbars */}
            <Card
              variant="outline"
              onClick={() => onNavigateToDocs("navbar")}
              style={{
                cursor: "pointer",
                padding: "1.75rem",
                borderRadius: 16,
                transition: "all 0.25s ease",
                border: "1px solid var(--aura-border)",
              }}
            >
              <Stack gap={3}>
                <Inline align="center" style={{ justifyContent: "space-between" }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(124, 58, 237, 0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icons.LayersIcon size={20} color="var(--aura-accent)" />
                  </div>
                  <Badge variant="solid" size="sm">4 Styles + Menu</Badge>
                </Inline>
                <Heading level={4}>Navbar & Mobile Drawer</Heading>
                <Text size="sm" color="muted">
                  Floating Glass Island, Modern SaaS Command Bar, and Animated 3-line hamburger menu that morphs into an X with frosted mobile drawer.
                </Text>
                <Inline gap={1} align="center" style={{ color: "var(--aura-accent)", fontWeight: 600, fontSize: "0.85rem", marginTop: "0.5rem" }}>
                  <span>Open Complete Guide</span>
                  <Icons.ArrowRightIcon size={14} />
                </Inline>
              </Stack>
            </Card>

            {/* Card: Collapsible Sidebars */}
            <Card
              variant="outline"
              onClick={() => onNavigateToDocs("sidebar")}
              style={{
                cursor: "pointer",
                padding: "1.75rem",
                borderRadius: 16,
                transition: "all 0.25s ease",
                border: "1px solid var(--aura-border)",
              }}
            >
              <Stack gap={3}>
                <Inline align="center" style={{ justifyContent: "space-between" }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(16, 185, 129, 0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icons.GridIcon size={20} color="#10b981" />
                  </div>
                  <Badge variant="soft" size="sm">3 Variants</Badge>
                </Inline>
                <Heading level={4}>Side Navigation</Heading>
                <Text size="sm" color="muted">
                  Collapsible vertical navigation: Standard SaaS Sidebar with expandable groups, macOS/Linear Dock Rail, and Floating Glass Island.
                </Text>
                <Inline gap={1} align="center" style={{ color: "var(--aura-accent)", fontWeight: 600, fontSize: "0.85rem", marginTop: "0.5rem" }}>
                  <span>Explore Sidebar Guide</span>
                  <Icons.ArrowRightIcon size={14} />
                </Inline>
              </Stack>
            </Card>

            {/* Card: Image Carousel */}
            <Card
              variant="outline"
              onClick={() => onNavigateToDocs("carousel")}
              style={{
                cursor: "pointer",
                padding: "1.75rem",
                borderRadius: 16,
                transition: "all 0.25s ease",
                border: "1px solid var(--aura-border)",
              }}
            >
              <Stack gap={3}>
                <Inline align="center" style={{ justifyContent: "space-between" }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(236, 72, 153, 0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icons.SparklesIcon size={20} color="#ec4899" />
                  </div>
                  <Badge variant="soft" size="sm">Swipe & Autoplay</Badge>
                </Inline>
                <Heading level={4}>Image & Content Carousel</Heading>
                <Text size="sm" color="muted">
                  Native touch swipe and mouse drag gestures, slide/fade/card transition variants, glass controls, and keyboard navigation.
                </Text>
                <Inline gap={1} align="center" style={{ color: "var(--aura-accent)", fontWeight: 600, fontSize: "0.85rem", marginTop: "0.5rem" }}>
                  <span>Explore Carousel Guide</span>
                  <Icons.ArrowRightIcon size={14} />
                </Inline>
              </Stack>
            </Card>

            {/* Card 2: 56+ SVG Icons */}
            <Card
              variant="outline"
              onClick={() => onNavigateToDocs("icons")}
              style={{
                cursor: "pointer",
                padding: "1.75rem",
                borderRadius: 16,
                transition: "all 0.25s ease",
                border: "1px solid var(--aura-border)",
              }}
            >
              <Stack gap={3}>
                <Inline align="center" style={{ justifyContent: "space-between" }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(0, 229, 255, 0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icons.SparklesIcon size={20} color="#00e5ff" />
                  </div>
                  <Badge variant="soft" size="sm">56+ SVGs</Badge>
                </Inline>
                <Heading level={4}>Icons Catalog</Heading>
                <Text size="sm" color="muted">
                  Handcrafted zero-dependency vector icons. Searchable gallery with 1-click React import and JSX copy.
                </Text>
                <Inline gap={1} align="center" style={{ color: "var(--aura-accent)", fontWeight: 600, fontSize: "0.85rem", marginTop: "0.5rem" }}>
                  <span>Browse Icon Gallery</span>
                  <Icons.ArrowRightIcon size={14} />
                </Inline>
              </Stack>
            </Card>

            {/* Card 3: 3D Tilt Card */}
            <Card
              variant="outline"
              onClick={() => onNavigateToDocs("tilt-card")}
              style={{
                cursor: "pointer",
                padding: "1.75rem",
                borderRadius: 16,
                transition: "all 0.25s ease",
                border: "1px solid var(--aura-border)",
              }}
            >
              <Stack gap={3}>
                <Inline align="center" style={{ justifyContent: "space-between" }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(236, 72, 153, 0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icons.FlameIcon size={20} color="#ec4899" />
                  </div>
                  <Badge variant="soft" size="sm">Award 3D</Badge>
                </Inline>
                <Heading level={4}>TiltCard 3D</Heading>
                <Text size="sm" color="muted">
                  Physics mouse tilt with dynamic specular reflection and smooth spring dampening without external libraries.
                </Text>
                <Inline gap={1} align="center" style={{ color: "var(--aura-accent)", fontWeight: 600, fontSize: "0.85rem", marginTop: "0.5rem" }}>
                  <span>Open Complete Guide</span>
                  <Icons.ArrowRightIcon size={14} />
                </Inline>
              </Stack>
            </Card>

            {/* Card 4: Confetti Physics */}
            <Card
              variant="outline"
              onClick={() => onNavigateToDocs("confetti")}
              style={{
                cursor: "pointer",
                padding: "1.75rem",
                borderRadius: 16,
                transition: "all 0.25s ease",
                border: "1px solid var(--aura-border)",
              }}
            >
              <Stack gap={3}>
                <Inline align="center" style={{ justifyContent: "space-between" }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(16, 185, 129, 0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icons.ZapIcon size={20} color="#10b981" />
                  </div>
                  <Badge variant="soft" size="sm">Canvas Burst</Badge>
                </Inline>
                <Heading level={4}>Confetti Particles</Heading>
                <Text size="sm" color="muted">
                  High-performance HTML5 Canvas physics burst with drag, gravity, and decay for conversion celebrations.
                </Text>
                <Inline gap={1} align="center" style={{ color: "var(--aura-accent)", fontWeight: 600, fontSize: "0.85rem", marginTop: "0.5rem" }}>
                  <span>Open Complete Guide</span>
                  <Icons.ArrowRightIcon size={14} />
                </Inline>
              </Stack>
            </Card>

            {/* Card 5: Bento Grid */}
            <Card
              variant="outline"
              onClick={() => onNavigateToDocs("bento-grid")}
              style={{
                cursor: "pointer",
                padding: "1.75rem",
                borderRadius: 16,
                transition: "all 0.25s ease",
                border: "1px solid var(--aura-border)",
              }}
            >
              <Stack gap={3}>
                <Inline align="center" style={{ justifyContent: "space-between" }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(245, 158, 11, 0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icons.GridIcon size={20} color="#f59e0b" />
                  </div>
                  <Badge variant="soft" size="sm">Apple/Linear</Badge>
                </Inline>
                <Heading level={4}>BentoGrid & BentoCard</Heading>
                <Text size="sm" color="muted">
                  Modern feature showcases with cursor spotlight tracking, hover zoom, and responsive span configurations.
                </Text>
                <Inline gap={1} align="center" style={{ color: "var(--aura-accent)", fontWeight: 600, fontSize: "0.85rem", marginTop: "0.5rem" }}>
                  <span>Open Complete Guide</span>
                  <Icons.ArrowRightIcon size={14} />
                </Inline>
              </Stack>
            </Card>

            {/* Card 6: SaaS Pricing Card */}
            <Card
              variant="outline"
              onClick={() => onNavigateToDocs("pricing-card")}
              style={{
                cursor: "pointer",
                padding: "1.75rem",
                borderRadius: 16,
                transition: "all 0.25s ease",
                border: "1px solid var(--aura-border)",
              }}
            >
              <Stack gap={3}>
                <Inline align="center" style={{ justifyContent: "space-between" }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(99, 102, 241, 0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icons.CheckCircleIcon size={20} color="#6366f1" />
                  </div>
                  <Badge variant="solid" size="sm">4 Variants</Badge>
                </Inline>
                <Heading level={4}>Pricing Cards (4 Presets)</Heading>
                <Text size="sm" color="muted">
                  4 distinct visual presets: Default Surface, Frosted Glass, Cinematic Gradient Border with glow, and Clean Minimal Editorial.
                </Text>
                <Inline gap={1} align="center" style={{ color: "var(--aura-accent)", fontWeight: 600, fontSize: "0.85rem", marginTop: "0.5rem" }}>
                  <span>Open Complete Guide</span>
                  <Icons.ArrowRightIcon size={14} />
                </Inline>
              </Stack>
            </Card>
          </div>
        </Stack>
      </section>

      {/* Live Pricing Cards Section (3+ Variants Demo) */}
      <section style={{ padding: "4rem 1.5rem 5rem", maxWidth: 1200, margin: "0 auto", width: "100%" }}>
        <Stack gap={5} align="center">
          <div style={{ textAlign: "center", maxWidth: 650 }}>
            <Badge variant="soft" size="sm" style={{ marginBottom: "0.5rem" }}>
              <Icons.ShieldIcon size={12} color="var(--aura-accent)" style={{ marginRight: 4 }} />
              Flexible SaaS Tiers
            </Badge>
            <Heading level={2} style={{ fontSize: "2.4rem", letterSpacing: "-0.03em" }}>
              3+ Distinct Visual Variants
            </Heading>
            <Text color="muted" size="base" style={{ marginTop: "0.5rem" }}>
              Compare our first-class pricing card variants: Default Surface, Glowing Gradient Aura, and Frosted Glassmorphism.
            </Text>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "2rem",
              width: "100%",
            }}
          >
            <PricingCard
              variant="default"
              name="Starter"
              description="Essential primitives for solo builders and indie creators."
              price="$19"
              period="/ month"
              features={[
                "Zero-dependency core bundle",
                "56+ Inline SVG icon library",
                "Access to all 32+ primitives",
                "Community Discord access",
              ]}
              ctaText="Start Free Trial"
              onCtaClick={() => onNavigateToDocs("pricing-card")}
            />

            <PricingCard
              variant="gradient"
              featured
              name="Pro Studio"
              description="High-converting cinematic tier with glowing accent highlight."
              price="$49"
              period="/ month"
              badge="Most Popular"
              features={[
                "Everything in Starter",
                "Animated Hamburger Navbars",
                "Collapsible Side Navigation",
                "Hardware-accelerated Carousels",
                "Priority Slack channel support",
              ]}
              ctaText="Upgrade to Pro Studio"
              onCtaClick={() => onNavigateToDocs("pricing-card")}
            />

            <PricingCard
              variant="glass"
              name="Enterprise"
              description="Translucent frosted glass card with backdrop blur."
              price="$99"
              period="/ month"
              badge="Custom SLA"
              features={[
                "Everything in Pro Studio",
                "Custom design token generator",
                "Sub-millisecond performance SLA",
                "Dedicated solutions engineer",
                "Security & compliance audit",
              ]}
              ctaText="Contact Enterprise"
              onCtaClick={() => onNavigateToDocs("pricing-card")}
            />
          </div>
        </Stack>
      </section>

      {/* Footer */}
      <footer
        style={{
          marginTop: "auto",
          padding: "3rem 1.5rem",
          background: "var(--aura-surface)",
          borderTop: "1px solid var(--aura-border)",
          textAlign: "center",
        }}
      >
        <Container size="md">
          <Stack gap={3} align="center">
            <Inline gap={2} align="center">
              <Icons.SparklesIcon size={20} color="var(--aura-accent)" />
              <span style={{ fontWeight: 800, letterSpacing: "-0.03em" }}>AURA UI 2.0</span>
            </Inline>
            <Text size="sm" color="muted">
              Built with zero runtime dependencies. React and React DOM are peer dependencies only.
            </Text>
            <Inline gap={4} align="center" style={{ marginTop: "0.5rem" }}>
              <a
                href="#docs/introduction"
                onClick={() => onNavigateToDocs("introduction")}
                style={{ color: "var(--aura-fg-muted)", textDecoration: "none", fontSize: "0.85rem" }}
              >
                Docs
              </a>
              <a
                href="#docs/navbar"
                onClick={() => onNavigateToDocs("navbar")}
                style={{ color: "var(--aura-fg-muted)", textDecoration: "none", fontSize: "0.85rem" }}
              >
                Components
              </a>
              <a
                href="#docs/icons"
                onClick={() => onNavigateToDocs("icons")}
                style={{ color: "var(--aura-fg-muted)", textDecoration: "none", fontSize: "0.85rem" }}
              >
                56+ Icons
              </a>
              <a
                href="https://www.npmjs.com/package/aura-ui-library"
                target="_blank"
                rel="noreferrer"
                style={{ color: "var(--aura-fg-muted)", textDecoration: "none", fontSize: "0.85rem" }}
              >
                npm registry
              </a>
            </Inline>
          </Stack>
        </Container>
      </footer>
    </div>
  );
};
