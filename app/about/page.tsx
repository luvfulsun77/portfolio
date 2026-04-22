import Image from "next/image";
import Link from "next/link";
import { Container, PageShell } from "../../components/layout/PageShell";
import { getAbout } from "../../lib/content";
import type { CVItem } from "../../lib/types";

const about = getAbout();

export const metadata = {
  title: "About",
  description:
    about.bio.ko ||
    "Yu.A.Ye 소개 — Artist statement, biography, CV, contact.",
};

export default function AboutPage() {
  return (
    <PageShell>
      <Container>
        <header style={{ marginBottom: 64 }}>
          <h1
            className="font-display"
            style={{
              fontSize: "var(--text-3xl)",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              fontWeight: 500,
              margin: 0,
            }}
          >
            About
          </h1>
          <p
            style={{
              fontSize: "var(--text-base)",
              color: "var(--ink-60)",
              marginTop: 8,
            }}
          >
            작가
          </p>
        </header>

        {about.portrait ? (
          <div style={{ marginBottom: 64 }}>
            <Image
              src={about.portrait}
              alt="Yu.A.Ye 작가 프로필"
              width={240}
              height={240}
              style={{
                width: 240,
                height: 240,
                objectFit: "cover",
                borderRadius: "50%",
              }}
            />
          </div>
        ) : null}

        {/* Name + hanja + tagline */}
        <section style={{ marginBottom: 96 }}>
          <p
            className="font-display"
            style={{
              fontSize: "var(--text-2xl)",
              letterSpacing: "-0.01em",
              lineHeight: 1.2,
              fontWeight: 500,
              margin: 0,
              color: "var(--ink-100)",
            }}
          >
            Yu.A.Ye <span style={{ color: "var(--ink-60)" }}>· 유어예</span>
            {about.hanja ? (
              <span
                style={{
                  fontFamily: "var(--font-serif)",
                  color: "var(--ink-60)",
                  marginLeft: 12,
                }}
              >
                {about.hanja}
              </span>
            ) : null}
          </p>
          {about.tagline ? (
            <p
              style={{
                fontSize: "var(--text-base)",
                color: "var(--ink-60)",
                marginTop: 8,
              }}
            >
              {about.tagline.ko}
              <span style={{ marginInline: 8, color: "var(--ink-30)" }}>·</span>
              {about.tagline.en}
            </p>
          ) : null}
        </section>

        {/* Artist Statement */}
        <section style={{ maxWidth: 720, marginBottom: 128 }}>
          <h2 style={sectionLabel}>Artist Statement</h2>
          <p style={bodyKo}>{about.statement.ko}</p>
          <p style={bodyEn}>{about.statement.en}</p>
        </section>

        {/* Bio */}
        {about.bio.ko && about.bio.ko !== "추후 추가 예정." ? (
          <section style={{ maxWidth: 720, marginBottom: 128 }}>
            <h2 style={sectionLabel}>Biography</h2>
            <p style={bodyKo}>{about.bio.ko}</p>
            <p style={bodyEn}>{about.bio.en}</p>
          </section>
        ) : null}

        {/* CV */}
        <section style={{ marginBottom: 128 }}>
          <h2 style={{ ...sectionLabel, marginBottom: 32 }}>CV</h2>

          <CVSection title="학력 / Education" items={about.cv.education} />
          {about.cv.experience && about.cv.experience.length > 0 ? (
            <CVSection
              title="경력 / Experience"
              items={about.cv.experience}
            />
          ) : null}
          <CVSection
            title="개인전 / Solo Exhibitions"
            items={about.cv.soloExhibitions}
          />
          <CVSection
            title="단체전 / Group Exhibitions"
            items={about.cv.groupExhibitions}
          />
          <CVSection
            title="출판물 / Publications"
            items={about.cv.publications}
          />

          <p style={{ marginTop: 48, fontSize: "var(--text-sm)" }}>
            <Link
              href="/recognition"
              style={{
                color: "var(--ink-100)",
                borderBottom: "1px solid var(--ink-30)",
              }}
            >
              주요 수상 및 공모전 → Recognition 페이지에서 보기
            </Link>
          </p>
        </section>

        {/* Contact */}
        <section style={{ maxWidth: 720, marginBottom: 64 }}>
          <h2 style={sectionLabel}>Contact</h2>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            <li style={{ padding: "8px 0" }}>
              <a
                href={`mailto:${about.contact.email}`}
                style={{
                  fontSize: "var(--text-base)",
                  color: "var(--ink-100)",
                  borderBottom: "1px solid var(--ink-30)",
                }}
              >
                {about.contact.email}
              </a>
            </li>
            <li style={{ padding: "8px 0" }}>
              <a
                href={`https://www.instagram.com/${about.contact.instagram.replace("@", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: "var(--text-base)",
                  color: "var(--ink-100)",
                  borderBottom: "1px solid var(--ink-30)",
                }}
              >
                Instagram ↗ {about.contact.instagram}
              </a>
            </li>
          </ul>
        </section>
      </Container>
    </PageShell>
  );
}

function CVSection({ title, items }: { title: string; items: CVItem[] }) {
  if (items.length === 0) {
    return (
      <div style={{ marginBottom: 32 }}>
        <h3 style={cvTitle}>{title}</h3>
        <p style={{ fontSize: "var(--text-sm)", color: "var(--ink-60)" }}>
          추후 추가 예정.
        </p>
      </div>
    );
  }
  return (
    <div style={{ marginBottom: 32 }}>
      <h3 style={cvTitle}>{title}</h3>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {items.map((item, i) => (
          <li
            key={`${item.year}-${item.title}-${i}`}
            style={{
              display: "grid",
              gridTemplateColumns: "auto 1fr",
              columnGap: 24,
              padding: "8px 0",
              borderTop: "1px solid var(--ink-30)",
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
              {item.year ? item.year : ""}
            </time>
            <div>
              <span style={{ color: "var(--ink-100)" }}>{item.title}</span>
              {item.venue ? (
                <span
                  style={{
                    color: "var(--ink-60)",
                    marginLeft: 12,
                  }}
                >
                  {item.venue}
                </span>
              ) : null}
              {item.note ? (
                <span
                  style={{
                    color: "var(--ink-60)",
                    marginLeft: 12,
                    fontStyle: "italic",
                  }}
                >
                  {item.note}
                </span>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

const sectionLabel: React.CSSProperties = {
  fontSize: "var(--text-xs)",
  color: "var(--ink-60)",
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  fontWeight: 500,
  margin: 0,
  marginBottom: 16,
};

const cvTitle: React.CSSProperties = {
  fontSize: "var(--text-base)",
  color: "var(--ink-100)",
  margin: 0,
  marginBottom: 12,
  fontWeight: 500,
};

const bodyKo: React.CSSProperties = {
  fontSize: "var(--text-lg)",
  color: "var(--ink-100)",
  lineHeight: 1.75,
  margin: 0,
  whiteSpace: "pre-wrap",
};

const bodyEn: React.CSSProperties = {
  fontSize: "var(--text-base)",
  color: "var(--ink-60)",
  lineHeight: 1.6,
  marginTop: 16,
  whiteSpace: "pre-wrap",
};
