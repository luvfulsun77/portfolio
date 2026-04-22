"use client";

import { useEffect, useRef, useState } from "react";
import type { AspectRatio } from "../../lib/types";
import { getPosterFallback } from "../../lib/youtube-poster";

// Minimal subset of the YT IFrame API we touch. Avoids pulling @types/youtube.
interface YTPlayer {
  destroy: () => void;
}
interface YTPlayerConstructor {
  new (
    el: HTMLElement,
    opts: {
      videoId: string;
      playerVars?: Record<string, number | string>;
      events?: { onStateChange?: (e: { data: number }) => void };
    },
  ): YTPlayer;
}
interface YTNamespace {
  Player: YTPlayerConstructor;
  PlayerState: { ENDED: 0 };
}
declare global {
  interface Window {
    YT?: YTNamespace;
    onYouTubeIframeAPIReady?: () => void;
  }
}

let apiReady: Promise<void> | null = null;
function loadIframeApi(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.YT?.Player) return Promise.resolve();
  if (apiReady) return apiReady;
  apiReady = new Promise<void>((resolve) => {
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      prev?.();
      resolve();
    };
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    tag.async = true;
    document.body.appendChild(tag);
  });
  return apiReady;
}

const ASPECT_PAD: Record<AspectRatio, string> = {
  "16:9": "56.25%",
  "9:16": "177.78%",
  "1:1": "100%",
  "4:5": "125%",
};

export interface YouTubeEmbedProps {
  youtubeId: string;
  /** Custom poster URL. Falls back to maxresdefault, then hqdefault on error. */
  poster?: string;
  aspectRatio?: AspectRatio;
  /** Used in aria-label of the play button. */
  title?: string;
  startAt?: number;
  endAt?: number;
}

export function YouTubeEmbed({
  youtubeId,
  poster,
  aspectRatio = "16:9",
  title,
  startAt,
  endAt,
}: YouTubeEmbedProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [posterErrored, setPosterErrored] = useState(false);
  const hostRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YTPlayer | null>(null);

  useEffect(() => {
    if (!isPlaying || !hostRef.current) return;
    let cancelled = false;
    loadIframeApi().then(() => {
      if (cancelled || !hostRef.current || !window.YT) return;
      playerRef.current = new window.YT.Player(hostRef.current, {
        videoId: youtubeId,
        playerVars: {
          autoplay: 1,
          rel: 0,
          modestbranding: 1,
          controls: 1,
          showinfo: 0,
          iv_load_policy: 3,
          playsinline: 1,
          color: "white",
          disablekb: 0,
          ...(startAt ? { start: startAt } : {}),
          ...(endAt ? { end: endAt } : {}),
        },
        events: {
          onStateChange: (e) => {
            // ENDED — return to poster + play button so YouTube end-screen UI
            // never appears (CLAUDE.md §5.2 ⑤).
            if (e.data === 0) setIsPlaying(false);
          },
        },
      });
    });
    return () => {
      cancelled = true;
      if (playerRef.current) {
        try {
          playerRef.current.destroy();
        } catch {
          // ignore — already torn down
        }
        playerRef.current = null;
      }
    };
  }, [isPlaying, youtubeId, startAt, endAt]);

  const defaultPoster = `https://i.ytimg.com/vi/${youtubeId}/maxresdefault.jpg`;
  const posterUrl = posterErrored
    ? getPosterFallback(youtubeId)
    : (poster ?? defaultPoster);

  return (
    <div
      className="yt-embed"
      style={{
        position: "relative",
        width: "100%",
        paddingBottom: ASPECT_PAD[aspectRatio],
        background: "var(--ink-100)",
        overflow: "hidden",
      }}
    >
      {!isPlaying ? (
        <button
          type="button"
          onClick={() => setIsPlaying(true)}
          aria-label={title ? `${title} 재생` : "영상 재생"}
          className="yt-embed__poster"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            padding: 0,
            border: "none",
            background: "transparent",
            cursor: "pointer",
            color: "rgba(255,255,255,0.9)",
          }}
        >
          {/* External YouTube poster — plain img to allow onError fallback. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={posterUrl}
            alt=""
            onError={() => setPosterErrored(true)}
            className="yt-embed__poster-img"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
          <span
            aria-hidden="true"
            className="yt-embed__play"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              color: "currentColor",
              display: "inline-flex",
            }}
          >
            <PlayIcon />
          </span>
        </button>
      ) : (
        <div
          ref={hostRef}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
          }}
        />
      )}

      <style>{`
        .yt-embed__poster {
          transition: opacity var(--dur-fast) var(--ease-out);
        }
        .yt-embed__poster-img {
          transition: filter var(--dur-base) var(--ease-out);
        }
        .yt-embed__poster:hover .yt-embed__poster-img,
        .yt-embed__poster:focus-visible .yt-embed__poster-img {
          filter: brightness(1.05);
        }
        .yt-embed__poster:hover,
        .yt-embed__poster:focus-visible {
          color: var(--najeon-teal);
        }
        .yt-embed__play svg {
          width: 48px;
          height: 48px;
        }
        @media (min-width: 768px) {
          .yt-embed__play svg {
            width: 64px;
            height: 64px;
          }
        }
      `}</style>
    </div>
  );
}

function PlayIcon() {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <circle cx="32" cy="32" r="31" />
      <polygon points="26,21 26,43 45,32" fill="currentColor" stroke="none" />
    </svg>
  );
}
