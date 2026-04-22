"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export interface WorkNavProps {
  prev?: { slug: string; title: string };
  next?: { slug: string; title: string };
}

export function WorkNav({ prev, next }: WorkNavProps) {
  const router = useRouter();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // Ignore when typing in an input or holding a modifier
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === "ArrowLeft" && prev) {
        router.push(`/works/${prev.slug}`);
      } else if (e.key === "ArrowRight" && next) {
        router.push(`/works/${next.slug}`);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next, router]);

  return (
    <nav
      aria-label="작품 이동"
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 24,
        marginTop: 96,
        paddingTop: 32,
        borderTop: "1px solid var(--ink-30)",
      }}
    >
      <div>
        {prev ? (
          <Link
            href={`/works/${prev.slug}`}
            style={{
              display: "block",
              color: "var(--ink-100)",
            }}
          >
            <span
              style={{
                display: "block",
                fontSize: "var(--text-xs)",
                color: "var(--ink-60)",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: 8,
              }}
            >
              ← Prev
            </span>
            <span style={{ fontSize: "var(--text-base)" }}>{prev.title}</span>
          </Link>
        ) : null}
      </div>
      <div style={{ textAlign: "right" }}>
        {next ? (
          <Link
            href={`/works/${next.slug}`}
            style={{
              display: "block",
              color: "var(--ink-100)",
            }}
          >
            <span
              style={{
                display: "block",
                fontSize: "var(--text-xs)",
                color: "var(--ink-60)",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: 8,
              }}
            >
              Next →
            </span>
            <span style={{ fontSize: "var(--text-base)" }}>{next.title}</span>
          </Link>
        ) : null}
      </div>
    </nav>
  );
}
