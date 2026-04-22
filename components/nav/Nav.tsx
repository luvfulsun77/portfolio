"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/works", label: "WORKS" },
  { href: "/recognition", label: "RECOGNITION" },
  { href: "/about", label: "ABOUT" },
];

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 4);
      // Hide when scrolling down past nav height; show on scroll up
      if (y > 88 && y > last + 4) setHidden(true);
      else if (y < last - 4) setHidden(false);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Match the longest prefix so /works/[slug] highlights WORKS too
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname?.startsWith(href);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50"
      style={{
        height: 88,
        background: scrolled ? "rgba(250, 250, 247, 0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : undefined,
        WebkitBackdropFilter: scrolled ? "blur(12px)" : undefined,
        transform: hidden ? "translateY(-100%)" : "translateY(0)",
        transition:
          "transform var(--dur-base) var(--ease-out), background var(--dur-fast) linear",
      }}
    >
      <nav
        className="mx-auto flex h-full items-center justify-between"
        style={{
          maxWidth: 1440,
          paddingInline: "var(--gutter)",
        }}
      >
        <Link
          href="/"
          className="font-display uppercase"
          style={{
            fontSize: "var(--text-sm)",
            letterSpacing: "0.12em",
            fontWeight: 500,
            color: "var(--ink-100)",
          }}
        >
          Yu.A.Ye
        </Link>

        <ul className="flex" style={{ gap: 24 }}>
          {links.map((l) => {
            const active = isActive(l.href);
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="font-display uppercase"
                  style={{
                    fontSize: "var(--text-sm)",
                    letterSpacing: "0.12em",
                    fontWeight: 500,
                    color: active ? "var(--ink-100)" : "var(--ink-60)",
                    transition: "color var(--dur-fast) linear",
                  }}
                >
                  {l.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
