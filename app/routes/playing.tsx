import playingCss from "@/styles/playing.css?url";

import noSong from "/images/no_song.png?url";

import { createFileRoute } from "@tanstack/react-router";
import usePlayer from "@/hooks/usePlayer";

import { store } from "@/state/store";
import { activeProviderAtom } from "@/state/player";
import usePlayingImage from "@/hooks/Playing/usePlayingImage";
import usePlayingProgress from "@/hooks/Playing/usePlayingProgress";

import PlayingLoad from "@/components/playing/PlayingLoad";
import useActiveWakeLock from "@/hooks/useActiveWakeLock";
import usePlayingDevice from "@/hooks/Playing/usePlayingDevice";
import Background from "@/components/playing/Background";
import SettingsOverlay from "@/components/playing/PlayerOverlay";
import AlbumArt from "@/components/playing/AlbumArt";
import SongInfo from "@/components/playing/SongInfo";

export const Route = createFileRoute("/playing")({
  head: () => ({
    links: [
      {
        rel: "stylesheet",
        href: playingCss,
      },
    ],
  }),
  component: PlayingRouteComponent,
  onLeave: async () => {
    await store.get(activeProviderAtom)?.unregisterPlayer();
  },
});

function PlayingRouteComponent() {
  useActiveWakeLock();

  const { activePlayer, activeProvider, playerState, previousPlayerState } =
    usePlayer();
  const showLoading = activePlayer === null;

  const { positionNow, positionTotal, positionPercent, shouldAnimateProgress } =
    usePlayingProgress(previousPlayerState, playerState);

  const image = playerState?.meta.main_img_url ?? noSong;
  const imageSrc = usePlayingImage(image);

  const title = playerState?.item?.title;
  const artist =
    playerState &&
    "artists" in playerState?.item &&
    playerState?.item?.artists?.map((artist) => artist.name).join(", ");
  const album =
    playerState &&
    "album" in playerState?.item &&
    playerState?.item?.album?.name;

  const isEpisode =
    playerState &&
    "type" in playerState?.item &&
    playerState?.item?.type === "episode";

  const isPaused = !playerState || playerState.meta.is_playing === false;

  const { device, DeviceIcon } = usePlayingDevice(
    previousPlayerState,
    playerState
  );

  const providerName = activeProvider?.meta.name ?? "Unknown";
  const playerName = activePlayer ?? "Unknown";
  let statePlayerStr = providerName;

  const currentProvider = playerState?.meta.provider;
  if (
    currentProvider &&
    currentProvider.toLowerCase() !== statePlayerStr.toLowerCase() &&
    currentProvider !== playerState?.device?.id
  ) {
    statePlayerStr = `${currentProvider} • ${playerName}`;
  }

  const titleStr = title ? `${title} - ${artist} • NowPlaying` : "NowPlaying";

  return (
    <main className="relative flex h-full w-full">
      <title>{titleStr}</title>

      {showLoading && <PlayingLoad />}

      <Background imageSrc={imageSrc} />

      <SettingsOverlay
        onUnregisterPlayer={async () => {
          await activeProvider?.unregisterPlayer();
        }}
      />

      <div className="h-full w-full flex align-center justify-center z-20">
        <div className="flex flex-col landscape:flex-row lg:flex-row gap-6 lg:gap-12 xl:gap-16 justify-center items-center px-6 lg:px-12 xl:px-0 w-full xl:w-5/6">
          <AlbumArt imageSrc={imageSrc} isPaused={Boolean(isPaused)} />

          <SongInfo
            title={title || undefined}
            artist={artist || undefined}
            album={album || undefined}
            positionNow={positionNow ?? undefined}
            positionTotal={positionTotal ?? undefined}
            positionPercent={positionPercent ?? undefined}
            shouldAnimateProgress={shouldAnimateProgress}
            device={device ?? null}
            DeviceIcon={DeviceIcon}
            statePlayerStr={statePlayerStr}
            isEpisode={Boolean(isEpisode)}
          />
        </div>
      </div>
    </main>
  );
}
