import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import { IntroBackground } from "../components/intro/IntroBackground";

const links = [
  { href: "/works", label: "WORKS" },
  { href: "/recognition", label: "RECOGNITION" },
  { href: "/about", label: "ABOUT" },
];

// File detection runs at build time (server). Drop intro.mp4 / intro.jpg into
// /public/intro/ and the next build picks them up automatically.
function detectIntroAssets() {
  const dir = path.join(process.cwd(), "public", "intro");
  const has = (name: string) =>
    fs.existsSync(path.join(dir, name)) ? `/intro/${name}` : undefined;
  return {
    videoSrc: has("intro.mp4"),
    posterSrc: has("intro.jpg") ?? has("intro.webp") ?? has("intro.png"),
  };
}

export default function Home() {
  const year = new Date().getFullYear();
  const { videoSrc, posterSrc } = detectIntroAssets();

  return (
    <main
      style={{
        position: "relative",
        height: "100dvh",
        width: "100%",
        overflow: "hidden",
        background: "var(--ink-100)",
        color: "var(--paper)",
      }}
    >
      {/* Background (image / video / solid fallback) */}
      <IntroBackground videoSrc={videoSrc} posterSrc={posterSrc} />

      {/* Top scrim — improves logo legibility */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "20vh",
          background:
            "linear-gradient(to bottom, rgba(10,10,10,0.35) 0%, rgba(10,10,10,0) 100%)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* Bottom scrim — improves label + copyright legibility */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "40vh",
          background:
            "linear-gradient(to top, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0) 100%)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* Top-left logo */}
      <Link
        href="/"
        style={{
          position: "absolute",
          top: 24,
          left: 24,
          zIndex: 2,
          color: "rgba(255,255,255,0.95)",
        }}
        className="intro-logo"
      >
        <span
          className="font-display"
          style={{
            display: "block",
            fontSize: "var(--text-sm)",
            letterSpacing: "0.12em",
            fontWeight: 500,
            textTransform: "uppercase",
          }}
        >
          Yu.A.Ye
        </span>
        <span
          style={{
            display: "block",
            fontSize: "var(--text-xs)",
            color: "rgba(255,255,255,0.7)",
            letterSpacing: "0.04em",
            marginTop: 2,
          }}
        >
          유어예
        </span>
      </Link>

      {/* Bottom labels */}
      <nav
        aria-label="주요 섹션"
        className="intro-labels"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 56,
          zIndex: 2,
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="intro-label font-display"
            style={{
              padding: "12px",
              color: "rgba(255,255,255,0.9)",
              textTransform: "uppercase",
              fontWeight: 500,
              fontSize: "var(--text-lg)",
              letterSpacing: "0.16em",
              position: "relative",
              transition: "color var(--dur-fast) linear",
            }}
          >
            {l.label}
          </Link>
        ))}
      </nav>

      {/* Copyright */}
      <p
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 20,
          zIndex: 2,
          textAlign: "center",
          fontSize: "var(--text-xs)",
          color: "rgba(255,255,255,0.6)",
          letterSpacing: "0.04em",
          margin: 0,
        }}
      >
        © {year} Yu.A.Ye
      </p>

      <style>{`
        .intro-labels { gap: 32px; }
        @media (min-width: 768px) {
          .intro-labels { gap: 48px; }
          .intro-label { font-size: var(--text-xl) !important; }
        }
        @media (min-width: 1280px) {
          .intro-labels { gap: 64px; }
        }
        .intro-label::after {
          content: "";
          position: absolute;
          left: 12px;
          right: 12px;
          bottom: 6px;
          height: 1px;
          background: rgba(255,255,255,0.95);
          transform: scaleX(0);
          transform-origin: left center;
          transition: transform var(--dur-base) var(--ease-out);
        }
        .intro-label:hover,
        .intro-label:focus-visible {
          color: var(--paper) !important;
        }
        .intro-label:hover::after,
        .intro-label:focus-visible::after {
          transform: scaleX(1);
        }
        @media (prefers-reduced-motion: reduce) {
          .intro-label::after { transition: none; }
        }
      `}</style>
    </main>
  );
}
