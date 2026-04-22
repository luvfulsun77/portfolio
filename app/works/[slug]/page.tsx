import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "../../../components/layout/PageShell";
import { YouTubeEmbed } from "../../../components/media/YouTubeEmbed";
import { WorkNav } from "../../../components/work-detail/WorkNav";
import {
  getAllRecognitions,
  getAllWorks,
  getWorkBySlug,
} from "../../../lib/content";
import type { Work, WorkType } from "../../../lib/types";

const TYPE_LABEL: Record<WorkType, string> = {
  "media-facade": "Media Facade",
  installation: "Installation",
  "projection-mapping": "Projection Mapping",
  video: "Video",
  interactive: "Interactive",
  print: "Print",
  "mixed-media": "Mixed Media",
};

function formatDuration(seconds: number): string {
  if (!seconds || seconds < 0) return "";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}'${s.toString().padStart(2, "0")}"`;
}

export function generateStaticParams() {
  return getAllWorks().map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const w = getWorkBySlug(slug);
  if (!w) return {};
  return {
    title: w.title.ko,
    description: w.statement.ko,
  };
}

export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const work = getWorkBySlug(slug);
  if (!work) notFound();

  // Build prev/next around the year-descending list
  const all = getAllWorks();
  const idx = all.findIndex((w) => w.slug === work.slug);
  const prev = idx > 0 ? all[idx - 1] : undefined;
  const next = idx >= 0 && idx < all.length - 1 ? all[idx + 1] : undefined;

  const related = getAllRecognitions().filter(
    (r) => r.relatedWorkSlug === work.slug,
  );

  return (
    <PageShell>
      {/* Hero — full bleed (escape PageShell's container by spanning 100vw) */}
      <section style={{ width: "100%" }}>
        {work.video ? (
          <YouTubeEmbed
            youtubeId={work.video.youtubeId}
            poster={work.video.poster}
            aspectRatio={work.video.aspectRatio}
            title={work.title.ko}
            startAt={work.video.startAt}
            endAt={work.video.endAt}
          />
        ) : (
          <HeroImage work={work} />
        )}
      </section>

      {/* Body */}
      <article
        style={{
          maxWidth: 720,
          marginInline: "auto",
          paddingInline: "var(--gutter)",
          paddingBlock: "var(--page-pad-y)",
        }}
      >
        <header>
          <h1
            style={{
              fontSize: "var(--text-3xl)",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              fontWeight: 500,
              margin: 0,
              color: "var(--ink-100)",
            }}
          >
            {work.title.ko}
          </h1>
          <p
            style={{
              fontSize: "var(--text-lg)",
              color: "var(--ink-60)",
              margin: "8px 0 0 0",
              lineHeight: 1.3,
            }}
          >
            {work.title.en}
          </p>
          {work.title.hanja ? (
            <p
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "var(--text-base)",
                color: "var(--ink-60)",
                margin: "8px 0 0 0",
              }}
            >
              {work.title.hanja}
            </p>
          ) : null}

          <p
            style={{
              fontSize: "var(--text-xs)",
              color: "var(--ink-60)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              marginTop: 24,
            }}
          >
            {[
              work.year,
              TYPE_LABEL[work.type],
              work.venue,
              work.dimensions,
              work.video ? formatDuration(work.video.duration) : null,
            ]
              .filter(Boolean)
              .join(" · ")}
          </p>
        </header>

        <section style={{ marginTop: 64 }}>
          <p
            style={{
              fontSize: "var(--text-base)",
              color: "var(--ink-100)",
              lineHeight: 1.75,
              margin: 0,
              whiteSpace: "pre-wrap",
            }}
          >
            {work.statement.ko}
          </p>
          <p
            style={{
              fontSize: "var(--text-base)",
              color: "var(--ink-60)",
              lineHeight: 1.6,
              marginTop: 24,
              whiteSpace: "pre-wrap",
            }}
          >
            {work.statement.en}
          </p>
        </section>

        {work.images && work.images.length > 0 ? (
          <section style={{ marginTop: 64, display: "grid", rowGap: 32 }}>
            {work.images.map((img, i) => (
              <figure key={img.src + i} style={{ margin: 0 }}>
                <Image
                  src={img.src}
                  alt={img.caption ?? ""}
                  width={1440}
                  height={960}
                  sizes="(min-width: 768px) 720px, 100vw"
                  style={{
                    width: "100%",
                    height: "auto",
                    display: "block",
                  }}
                />
                {img.caption ? (
                  <figcaption
                    style={{
                      fontSize: "var(--text-xs)",
                      color: "var(--ink-60)",
                      marginTop: 8,
                    }}
                  >
                    {img.caption}
                  </figcaption>
                ) : null}
              </figure>
            ))}
          </section>
        ) : null}

        {work.credits && work.credits.length > 0 ? (
          <section style={{ marginTop: 64 }}>
            <h2
              style={{
                fontSize: "var(--text-xs)",
                color: "var(--ink-60)",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                fontWeight: 500,
                margin: 0,
                marginBottom: 16,
              }}
            >
              Credits
            </h2>
            <dl
              style={{
                display: "grid",
                gridTemplateColumns: "auto 1fr",
                columnGap: 24,
                rowGap: 4,
                fontSize: "var(--text-sm)",
                margin: 0,
              }}
            >
              {work.credits.map((c, i) => (
                <div
                  key={c.role + i}
                  style={{ display: "contents" }}
                >
                  <dt style={{ color: "var(--ink-60)" }}>{c.role}</dt>
                  <dd style={{ margin: 0, color: "var(--ink-100)" }}>
                    {c.name}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        ) : null}

        {related.length > 0 ? (
          <section style={{ marginTop: 64 }}>
            <h2
              style={{
                fontSize: "var(--text-xs)",
                color: "var(--ink-60)",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                fontWeight: 500,
                margin: 0,
                marginBottom: 16,
              }}
            >
              이 작품의 수상 이력 →
            </h2>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {related.map((r, i) => (
                <li
                  key={r.slug ?? `${r.year}-${i}`}
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: 16,
                    padding: "8px 0",
                    fontSize: "var(--text-sm)",
                  }}
                >
                  <time
                    style={{
                      color: "var(--ink-60)",
                      minWidth: 48,
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {r.year}
                  </time>
                  <span style={{ color: "var(--ink-100)" }}>{r.title.ko}</span>
                  {r.link ? (
                    <a
                      href={r.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "var(--ink-60)" }}
                    >
                      ↗
                    </a>
                  ) : null}
                </li>
              ))}
            </ul>
            <Link
              href="/recognition"
              style={{
                display: "inline-block",
                marginTop: 16,
                fontSize: "var(--text-sm)",
                color: "var(--ink-100)",
                borderBottom: "1px solid var(--ink-30)",
              }}
            >
              전체 수상 이력 보기
            </Link>
          </section>
        ) : null}

        <WorkNav
          prev={prev ? { slug: prev.slug, title: prev.title.ko } : undefined}
          next={next ? { slug: next.slug, title: next.title.ko } : undefined}
        />
      </article>
    </PageShell>
  );
}

function HeroImage({ work }: { work: Work }) {
  return (
    <div style={{ position: "relative", width: "100%", aspectRatio: "16 / 9" }}>
      <Image
        src={work.thumbnail}
        alt={work.title.ko}
        fill
        priority
        sizes="100vw"
        style={{ objectFit: "cover" }}
      />
    </div>
  );
}
