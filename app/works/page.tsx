import { Suspense } from "react";
import { PageShell, Container } from "../../components/layout/PageShell";
import { FilterBar, type FilterOption } from "../../components/filter/FilterBar";
import { WorkCard } from "../../components/work-card/WorkCard";
import { getAllWorks } from "../../lib/content";
import type { WorkType } from "../../lib/types";

export const metadata = {
  title: "Works",
  description: "Yu.A.Ye 작품 아카이브. 미디어 파사드, 영상, 인터랙티브 작업.",
};

const TYPE_LABEL: Record<WorkType, string> = {
  video: "영상",
  installation: "설치",
  "projection-mapping": "프로젝션 매핑",
  "media-facade": "미디어 파사드",
  interactive: "인터랙티브",
  print: "프린트",
  "mixed-media": "혼합매체",
};

export default function WorksPage() {
  const works = getAllWorks();

  // Build filter options from types actually present in the data
  const counts = works.reduce<Record<string, number>>((acc, w) => {
    acc[w.type] = (acc[w.type] ?? 0) + 1;
    return acc;
  }, {});

  const options: FilterOption[] = [
    { value: "all", label: "전체", count: works.length },
    ...(Object.keys(TYPE_LABEL) as WorkType[])
      .filter((t) => counts[t])
      .map((t) => ({ value: t, label: TYPE_LABEL[t], count: counts[t] })),
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
            Works
          </h1>
          <p
            style={{
              fontSize: "var(--text-base)",
              color: "var(--ink-60)",
              marginTop: 8,
            }}
          >
            작품
          </p>
        </header>

        <Suspense fallback={null}>
          <FilterBar
            paramName="type"
            attributeName="data-type"
            options={options}
          />
        </Suspense>

        <ul className="works-grid filterable">
          {works.map((w) => (
            <li
              key={w.slug}
              data-type={w.type}
              style={{ listStyle: "none" }}
            >
              <WorkCard work={w} />
            </li>
          ))}
        </ul>
      </Container>

      <style>{`
        .works-grid {
          display: grid;
          grid-template-columns: 1fr;
          column-gap: 48px;
          row-gap: 64px;
          padding: 0;
          margin: 0;
        }
        @media (min-width: 768px) {
          .works-grid {
            grid-template-columns: 1fr 1fr;
            column-gap: 32px;
            row-gap: 80px;
          }
        }
        @media (min-width: 1280px) {
          .works-grid {
            column-gap: 48px;
            row-gap: 96px;
          }
        }
      `}</style>
    </PageShell>
  );
}
