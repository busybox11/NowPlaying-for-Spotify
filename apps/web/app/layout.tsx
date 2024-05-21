import "./globals.css";
import type { Metadata } from "next";
import { Outfit } from "next/font/google";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NowPlaying",
  description:
    "NowPlaying is a smooth Spotify Connect visualizer, updating in real-time and with playback support.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en" className="bg-background text-white">
      <link rel="icon" type="image/png" href="/favicon.png" />

      <meta
        name="description"
        content="NowPlaying is a smooth Spotify Connect visualizer, updating in real-time and with playback support."
      />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:creator" content="@busybox11" />
      <meta name="twitter:image" content="https://nowplayi.ng/favicon.png" />

      <meta property="og:title" content="NowPlaying" />
      <meta property="og:type" content="website" />
      <meta
        property="og:description"
        content="NowPlaying is a smooth Spotify Connect visualizer, updating in real-time and with playback support."
      />
      <meta property="og:image" content="https://nowplayi.ng/favicon.png" />

      <meta name="theme-color" content="#23a92a" />

      <body className={outfit.className}>{children}</body>
    </html>
  );
}
