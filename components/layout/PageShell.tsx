import type { ReactNode } from "react";
import { Nav } from "../nav/Nav";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <>
      <Nav />
      <main
        className="page-shell"
        style={{
          minHeight: "100dvh",
          background: "var(--paper)",
          color: "var(--ink-100)",
          paddingTop: 88,
        }}
      >
        {children}
      </main>
    </>
  );
}

export function Container({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        maxWidth: 1440,
        marginInline: "auto",
        paddingInline: "var(--gutter)",
        paddingBlock: "var(--page-pad-y)",
      }}
    >
      {children}
    </div>
  );
}
