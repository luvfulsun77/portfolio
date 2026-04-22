"use client";

import { useEffect, useState } from "react";
import { withBasePath } from "../../lib/base-path";

export interface IntroBackgroundProps {
  /** Path under /public, e.g. "/intro/intro.mp4". Optional. */
  videoSrc?: string;
  /** Path under /public, e.g. "/intro/intro.jpg". Used as poster + reduced-motion fallback. */
  posterSrc?: string;
}

export function IntroBackground({
  videoSrc,
  posterSrc,
}: IntroBackgroundProps) {
  // Server first paints the poster (or empty). On client, if reduced-motion is
  // OFF and a video exists, swap to autoplaying video.
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    if (!videoSrc) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setShowVideo(!mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [videoSrc]);

  const videoUrl = videoSrc ? withBasePath(videoSrc) : undefined;
  const posterUrl = posterSrc ? withBasePath(posterSrc) : undefined;

  const fillStyle: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  };

  if (showVideo && videoUrl) {
    return (
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={posterUrl}
        style={fillStyle}
      >
        <source src={videoUrl} type="video/mp4" />
      </video>
    );
  }

  if (posterUrl) {
    // Plain <img> so we can avoid Next/Image's domain config noise on a
    // build-time-detected static asset.
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={posterUrl} alt="" style={fillStyle} />;
  }

  // Neither asset present — solid placeholder. Author drops the file later.
  return <div style={{ ...fillStyle, background: "var(--ink-100)" }} />;
}
