import Image from "next/image";
import Link from "next/link";
import type { Work, WorkType } from "../../lib/types";

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

export function WorkCard({ work }: { work: Work }) {
  const isVideo = !!work.video;
  const aspect = work.video?.aspectRatio ?? "16:9";
  const [w, h] = aspect.split(":").map(Number);
  const ratioPad = (h / w) * 100;

  return (
    <Link
      href={`/works/${work.slug}`}
      className="work-card"
      style={{ display: "block", color: "var(--ink-100)" }}
    >
      <div
        className="work-card__media"
        style={{
          position: "relative",
          width: "100%",
          paddingBottom: `${ratioPad}%`,
          background: "var(--ink-100)",
          overflow: "hidden",
        }}
      >
        <Image
          src={work.thumbnail}
          alt=""
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          style={{ objectFit: "cover" }}
        />
        {isVideo ? (
          <span
            aria-hidden="true"
            style={{
              position: "absolute",
              right: 12,
              bottom: 12,
              padding: "4px 8px",
              background: "rgba(10,10,10,0.5)",
              color: "var(--paper)",
              fontSize: "var(--text-xs)",
              letterSpacing: "0.04em",
              lineHeight: 1,
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <span>▷</span>
            {work.video?.duration ? (
              <span style={{ fontVariantNumeric: "tabular-nums" }}>
                {formatDuration(work.video.duration)}
              </span>
            ) : null}
          </span>
        ) : null}
      </div>

      <div style={{ marginTop: 16 }}>
        <h2
          style={{
            fontSize: "var(--text-lg)",
            color: "var(--ink-100)",
            lineHeight: 1.3,
            margin: 0,
            fontWeight: 500,
          }}
        >
          {work.title.ko}
        </h2>
        <p
          style={{
            fontSize: "var(--text-sm)",
            color: "var(--ink-60)",
            lineHeight: 1.4,
            margin: "4px 0 0 0",
          }}
        >
          {work.title.en}
        </p>
        <p
          style={{
            fontSize: "var(--text-xs)",
            color: "var(--ink-60)",
            letterSpacing: "0.08em",
            marginTop: 8,
            textTransform: "uppercase",
          }}
        >
          {work.year} · {TYPE_LABEL[work.type]}
        </p>
      </div>
    </Link>
  );
}
