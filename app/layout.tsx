import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import "./globals.css";

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.yuayera.com"),
  title: { default: "Yu.A.Ye", template: "%s — Yu.A.Ye" },
  description:
    "유어예 (遊於藝) — 예술에서 놀다. 색동·오방색·자개의 감각을 생성형 AI와 잇는 미디어 아티스트.",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    alternateLocale: "en_US",
    siteName: "Yu.A.Ye",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={interTight.variable}>
      <body>{children}</body>
    </html>
  );
}
