"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export interface FilterOption {
  /** Value stored in the URL. "all" means no filter (param removed). */
  value: string;
  /** Korean label shown to the user. */
  label: string;
  /** Optional count badge. */
  count?: number;
}

export interface FilterBarProps {
  /** URL search-param key, e.g. "category". */
  paramName: string;
  /** DOM attribute on each filterable row, e.g. "data-category". */
  attributeName: string;
  /** Options. First entry should be the "all" / no-filter choice. */
  options: FilterOption[];
  /** CSS selector that scopes the show/hide rule. Defaults to ".filterable". */
  scopeSelector?: string;
}

export function FilterBar({
  paramName,
  attributeName,
  options,
  scopeSelector = ".filterable",
}: FilterBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const active = searchParams?.get(paramName) ?? "all";

  const setActive = (value: string) => {
    const params = new URLSearchParams(searchParams?.toString() ?? "");
    if (value === "all") params.delete(paramName);
    else params.set(paramName, value);
    const qs = params.toString();
    router.replace(`${pathname}${qs ? `?${qs}` : ""}`, { scroll: false });
  };

  // Hide non-matching rows via a single attribute selector. Server renders all
  // rows with the attribute; this style tag toggles visibility client-side
  // without re-rendering the list.
  const hideCss =
    active === "all"
      ? ""
      : `${scopeSelector} [${attributeName}]:not([${attributeName}="${active}"]) { display: none !important; }`;

  return (
    <>
      <ul
        role="tablist"
        aria-label="필터"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 4,
          listStyle: "none",
          padding: 0,
          margin: "0 0 32px 0",
        }}
      >
        {options.map((opt) => {
          const isActive = active === opt.value;
          return (
            <li key={opt.value}>
              <button
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(opt.value)}
                className="filter-pill"
                data-active={isActive ? "true" : undefined}
                style={{
                  appearance: "none",
                  background: isActive ? "var(--ink-100)" : "transparent",
                  color: isActive ? "var(--paper)" : "var(--ink-60)",
                  border: "1px solid var(--ink-30)",
                  padding: "8px 16px",
                  fontSize: "var(--text-xs)",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  fontWeight: 500,
                  cursor: "pointer",
                  transition: "background var(--dur-fast) linear, color var(--dur-fast) linear",
                }}
              >
                {opt.label}
                {opt.count != null ? (
                  <span
                    style={{
                      marginLeft: 8,
                      opacity: 0.7,
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {opt.count}
                  </span>
                ) : null}
              </button>
            </li>
          );
        })}
      </ul>
      {hideCss ? <style>{hideCss}</style> : null}
    </>
  );
}
