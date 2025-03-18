import MiniPlayer, { type MiniPlayerProps } from "@/components/miniplayer";
import { MiscLinks } from "@/components/MiscLinks";
import usePlayer from "@/hooks/usePlayer";
import { createFileRoute, Navigate } from "@tanstack/react-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  LuBookImage,
  LuClock4,
  LuDisc3,
  LuDroplet,
  LuEyeOff,
  LuPause,
} from "react-icons/lu";
import { twMerge } from "tailwind-merge";

export const Route = createFileRoute("/miniplayer/generate")({
  component: RouteComponent,
});

function MiniPlayerPropItem({
  Icon,
  id,
  value,
  toggle,
}: {
  Icon: React.ComponentType<{ className?: string }>;
  id: string;
  value: boolean;
  toggle: () => void;
}) {
  return (
    <div className="flex flex-row gap-3 items-center">
      <input
        type="checkbox"
        id={id}
        checked={value}
        onChange={toggle}
        className="accent-[#1ab852] size-4"
      ></input>
      <label htmlFor={id}>
        <Icon className="size-6" />
      </label>
    </div>
  );
}

const MINI_PLAYER_PROPS_ICONS: Record<
  keyof MiniPlayerProps,
  React.ComponentType<{ className?: string }>
> = {
  showAlbum: LuDisc3,
  showArtwork: LuBookImage,
  showProgress: LuClock4,
  showPause: LuPause,
  transparentBackground: LuDroplet,
  hideOnPauseOrEmpty: LuEyeOff,
};

function RouteComponent() {
  const { activePlayer } = usePlayer();
  const { t } = useTranslation();

  const [miniPlayerProps, setMiniPlayerProps] = useState<
    Required<MiniPlayerProps>
  >({
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
        <section className="flex flex-col gap-2 bg-white/5 backdrop-blur-sm rounded-2xl p-2 border-2 border-black/50 ring-1 ring-white/15 shadow-lg">
          <div
            className={twMerge(
              "rounded-xl p-1 border-1 border-transparent",
              !miniPlayerProps.transparentBackground &&
                "ring-2 ring-black border-white/10 bg-black shadow-lg"
            )}
          >
            <div className="h-[130px] w-[550px] rounded-lg overflow-hidden">
              <MiniPlayer {...miniPlayerProps} />
            </div>
          </div>

          <div className="flex flex-row mx-6 justify-between gap-2 my-2">
            {Object.entries(miniPlayerProps).map(([key, value]) => (
              <MiniPlayerPropItem
                key={key}
                Icon={MINI_PLAYER_PROPS_ICONS[key as keyof MiniPlayerProps]}
                id={key}
                value={value}
                toggle={() =>
                  setMiniPlayerProps({
                    ...miniPlayerProps,
                    [key]: !value,
                  })
                }
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
