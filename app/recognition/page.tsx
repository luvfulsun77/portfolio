import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { PageShell, Container } from "../../components/layout/PageShell";
import { FilterBar, type FilterOption } from "../../components/filter/FilterBar";
import { withBasePath } from "../../lib/base-path";
import { getAllRecognitions } from "../../lib/content";
import type { Recognition, RecognitionCategory } from "../../lib/types";

export const metadata = {
  title: "Recognition",
  description:
    "Yu.A.Ye 수상·공모전·선정·기고 이력. Awards, competitions, selections and press.",
};

const CATEGORY_LABEL: Record<RecognitionCategory, string> = {
  award: "수상",
  "exhibition-selection": "선정",
  press: "기고",
  publication: "출판",
  screening: "상영",
};

export default function RecognitionPage() {
  const items = getAllRecognitions();

  // Build filter options from categories actually present in the data
  const counts = items.reduce<Record<string, number>>((acc, r) => {
    acc[r.category] = (acc[r.category] ?? 0) + 1;
    return acc;
  }, {});

  const options: FilterOption[] = [
    { value: "all", label: "전체", count: items.length },
    ...(Object.keys(CATEGORY_LABEL) as RecognitionCategory[])
      .filter((cat) => counts[cat])
      .map((cat) => ({
        value: cat,
        label: CATEGORY_LABEL[cat],
        count: counts[cat],
      })),
  ];

  return (
    <PageShell>
      <Container>
        <header style={{ marginBottom: 48 }}>
          <h1
            className="font-display"
            style={{
              fontSize: "var(--text-3xl)",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              fontWeight: 500,
            }}
          >
            Recognition
          </h1>
          <p
            style={{
              fontSize: "var(--text-base)",
              color: "var(--ink-60)",
              marginTop: 8,
            }}
          >
            수상 · 공모전 · 선정 · 기고
          </p>
        </header>

        <Suspense fallback={null}>
          <FilterBar
            paramName="category"
            attributeName="data-category"
            options={options}
          />
        </Suspense>

        <ul
          className="filterable"
          style={{ listStyle: "none", padding: 0, margin: 0 }}
        >
          {items.map((r, i) => (
            <RecognitionRow key={r.slug ?? `${r.year}-${i}`} r={r} />
          ))}
        </ul>
      </Container>
    </PageShell>
  );
}

function RecognitionRow({ r }: { r: Recognition }) {
  return (
    <li
      data-category={r.category}
      style={{
        display: "grid",
        gridTemplateColumns: "auto 1fr auto auto",
        alignItems: "center",
        gap: 24,
        padding: "20px 0",
        borderTop: "1px solid var(--ink-30)",
      }}
    >
      <time
        style={{
          fontSize: "var(--text-sm)",
          color: "var(--ink-60)",
          fontVariantNumeric: "tabular-nums",
          letterSpacing: "0.04em",
          minWidth: 48,
        }}
      >
        {r.year}
      </time>

      <div
        style={{
          fontSize: "var(--text-base)",
          color: "var(--ink-100)",
          display: "flex",
          alignItems: "baseline",
          flexWrap: "wrap",
          gap: 8,
        }}
      >
        <span>{r.title.ko}</span>
        {r.title.en ? (
          <span style={{ color: "var(--ink-60)", fontSize: "var(--text-sm)" }}>
            {r.title.en}
          </span>
        ) : null}
        {r.relatedWorkSlug ? (
          <Link
            href={`/works/${r.relatedWorkSlug}`}
            aria-label={`${r.title.ko} 관련 작품 보기`}
            style={{
              fontSize: "var(--text-sm)",
              color: "var(--ink-60)",
              borderBottom: "1px solid var(--ink-30)",
            }}
          >
            →&nbsp;작품
          </Link>
        ) : null}
        {r.link ? (
          <a
            href={r.link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${r.title.ko} 외부 링크`}
            style={{ color: "var(--ink-60)", fontSize: "var(--text-sm)" }}
          >
            ↗
          </a>
        ) : null}
      </div>

      <span
        style={{
          fontSize: "var(--text-sm)",
          color: "var(--ink-60)",
          textAlign: "right",
        }}
      >
        {r.organization}
      </span>

      {r.image ? (
        <Image
          src={withBasePath(r.image)}
          alt=""
          width={60}
          height={60}
          style={{
            width: 60,
            height: 60,
            objectFit: "cover",
            display: "block",
          }}
        />
      ) : (
        <span style={{ width: 60, height: 60, display: "block" }} />
      )}
    </li>
  );
}
