// Build-time content loaders. Reads JSON fixtures from /content/<dir>/*.json.
// Server-only — these helpers use Node fs and are safe inside Server Components
// because Next.js runs them at build time for `output: "export"`.

import fs from "node:fs";
import path from "node:path";
import type { About, Recognition, Work } from "./types";

const CONTENT_DIR = path.join(process.cwd(), "content");

function readJsonDir<T>(subdir: string): T[] {
  const dir = path.join(CONTENT_DIR, subdir);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .map((f) => {
      const raw = fs.readFileSync(path.join(dir, f), "utf-8");
      return JSON.parse(raw) as T;
    });
}

export function getAllWorks(): Work[] {
  return readJsonDir<Work>("works").sort((a, b) => b.year - a.year);
}

export function getWorkBySlug(slug: string): Work | undefined {
  return getAllWorks().find((w) => w.slug === slug);
}

export function getAllRecognitions(): Recognition[] {
  return readJsonDir<Recognition>("recognitions").sort((a, b) => {
    if (b.year !== a.year) return b.year - a.year;
    if (a.date && b.date) return b.date.localeCompare(a.date);
    return 0;
  });
}

export function getRecognitionsForWork(workSlug: string): Recognition[] {
  return getAllRecognitions().filter((r) => r.relatedWorkSlug === workSlug);
}

export function getAbout(): About {
  const file = path.join(CONTENT_DIR, "about.json");
  const raw = fs.readFileSync(file, "utf-8");
  return JSON.parse(raw) as About;
}
