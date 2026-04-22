import type { Work } from "./types";

// CLAUDE.md §5.1.1 — picks poster URL with sensible YouTube fallback.
// 1) honor explicit work.video.poster if author overrode it
// 2) maxresdefault.jpg from YouTube (covers most cases since 2018+)
// 3) work.thumbnail (used for static-only works)
export function getPoster(work: Pick<Work, "thumbnail" | "video">): string {
  if (work.video?.poster) return work.video.poster;
  if (work.video?.youtubeId) {
    return `https://i.ytimg.com/vi/${work.video.youtubeId}/maxresdefault.jpg`;
  }
  return work.thumbnail;
}

// hqdefault always exists — used as <img onError> fallback.
export function getPosterFallback(youtubeId: string): string {
  return `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`;
}
