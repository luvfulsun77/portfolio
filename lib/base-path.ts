// Single source of truth for the basePath used in next.config.ts.
// Plain <img>, <video>, <a href> tags do NOT receive Next's basePath rewriting,
// so when referencing /public assets directly, prepend this constant.
export const BASE_PATH = "";

export function withBasePath(p: string): string {
  if (p.startsWith("http://") || p.startsWith("https://")) return p;
  return p.startsWith("/") ? p : `/${p}`;
}
