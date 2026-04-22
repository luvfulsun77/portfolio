// Single source of truth for the basePath used in next.config.ts.
// Plain <img>, <video>, <a href> tags do NOT receive Next's basePath rewriting,
// so when referencing /public assets directly, prepend this constant.
export const BASE_PATH = "/portfolio";

export function withBasePath(p: string): string {
  if (p.startsWith("http://") || p.startsWith("https://")) return p;
  if (p.startsWith(BASE_PATH)) return p;
  return BASE_PATH + (p.startsWith("/") ? p : `/${p}`);
}
