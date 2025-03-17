import MiniPlayer, { type MiniPlayerProps } from "@/components/miniplayer";
import { MiscLinks } from "@/components/MiscLinks";
import usePlayer from "@/hooks/usePlayer";
import { createFileRoute, Navigate } from "@tanstack/react-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";

export const Route = createFileRoute("/miniplayer/generate")({
  component: RouteComponent,
});

function RouteComponent() {
  const { activePlayer } = usePlayer();
  const { t } = useTranslation();

  const [miniPlayerProps, setMiniPlayerProps] = useState<MiniPlayerProps>({
    showAlbum: true,
    showArtwork: true,
    showProgress: true,
    showPause: true,
    transparentBackground: false,
    hideOnPauseOrEmpty: false,
  });

  if (!activePlayer) {
    return <Navigate to="/" />;
  }

  const title = `${t("miniplayer.generate")} • NowPlaying`;

  return (
    <main className="flex flex-col items-center justify-center h-screen gap-12">
      <title>{title}</title>

      <section className="flex flex-row gap-6 items-center">
        <img
          src="/images/favicon.png"
          alt="NowPlaying for Spotify"
          className="size-24"
        />

        <div className="flex flex-col gap-3">
          <h1 className="text-4xl font-bold">{t("miniplayer.generate")}</h1>

          <MiscLinks />
        </div>
      </section>

      <div className="flex flex-col gap-6">
        <section className="bg-white/5 backdrop-blur-sm rounded-2xl p-2 border-2 border-black/50 ring-1 ring-white/15 shadow-lg">
          <div
            className={twMerge(
              "h-[130px] w-[550px] rounded-lg overflow-hidden",
              !miniPlayerProps.transparentBackground && "ring-2 ring-black"
            )}
          >
            <iframe
              src={`/miniplayer?${Object.entries(miniPlayerProps)
                .map(([key, value]) => `${key}=${value}`)
                .join("&")}`}
              width="100%"
              height="130px"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            ></iframe>
          </div>
        </section>
      </div>
    </main>
  );
}
