import "@/styles/playing.css";

import noSong from "@/../public/images/no_song.png";

import { createFileRoute, useNavigate } from "@tanstack/react-router";
import usePlayer from "@/hooks/usePlayer";

import { twMerge } from "tailwind-merge";
import { store } from "@/state/store";
import { activeProviderAtom } from "@/state/player";

export const Route = createFileRoute("/playing")({
  component: PlayingRouteComponent,
  onLeave: async () => {
    await store.get(activeProviderAtom)?.unregisterPlayer();
  },
});

const msToTime = (ms: number) => {
  const minutes = Math.floor(ms / 60000);
  const seconds = parseInt(((ms % 60000) / 1000).toFixed(0));
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

function PlayingRouteComponent() {
  const navigate = useNavigate();
  const { activePlayer, activeProvider, playerState, previousPlayerState } =
    usePlayer();

  if (!activePlayer) {
    navigate({ to: "/" });
  }

  const image = playerState?.meta.main_img_url ?? noSong;

  const title = playerState?.item?.title ?? "NowPlaying";
  const artist =
    playerState && "artists" in playerState?.item ?
      playerState?.item?.artists?.map((artist) => artist.name).join(", ")
    : "NowPlaying";
  const album =
    playerState && "album" in playerState?.item ?
      playerState?.item?.album?.name
    : "NowPlaying";

  const isEpisode =
    playerState &&
    "type" in playerState?.item &&
    playerState?.item?.type === "episode";

  const isPaused = !playerState || playerState.meta.is_playing === false;

  const positionNow = playerState?.meta.position_ms ?? 0;
  const positionTotal = playerState?.item.duration_ms ?? 0;
  const positionPercent = positionNow / positionTotal;

  const shouldAnimateProgress =
    Math.abs(
      (playerState?.meta.position_ms ?? 0) -
        (previousPlayerState?.meta.position_ms ?? 0)
    ) < 5000;

  const stateProvider = playerState?.meta.provider ?? activeProvider?.meta.name;

  let statePlayerStr = `${activeProvider?.meta.name ?? activePlayer}`;
  if (statePlayerStr.toLowerCase() !== stateProvider?.toLowerCase())
    statePlayerStr = `${stateProvider} • ${statePlayerStr}`;

  return (
    <main className="flex h-full w-full">
      <div
        id="background-image-div"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 translate-z-0 w-[max(115vh,115vw)] h-[max(115vh,115vw)]"
      >
        <div
          className="bg-cover bg-center transition-[background] duration-[2s] ease-in-out z-[-10] h-full w-full blur-2xl transform-gpu"
          style={{
            backgroundImage: `url(${image})`,
          }}
        >
          <div className="h-full w-full bg-black/30"></div>
        </div>
      </div>

      <div
        id="settings-div"
        className="settings-div fadeInOut z-30 absolute top-6 left-0 right-0 flex items-center justify-center"
      >
        <div className="flex flex-row items-center gap-2 px-4 py-2 bg-white/10 border-2 border-white/40 text-white/80 rounded-full">
          <svg
            className="cursor-pointer"
            width="28"
            height="28"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.66675 6.66666H13.3334V9.33332H9.33341V13.3333H6.66675V6.66666ZM18.6667 6.66666H25.3334V13.3333H22.6667V9.33332H18.6667V6.66666ZM22.6667 18.6667H25.3334V25.3333H18.6667V22.6667H22.6667V18.6667ZM13.3334 22.6667V25.3333H6.66675V18.6667H9.33341V22.6667H13.3334Z"
              fill="white"
            />
          </svg>
        </div>
      </div>

      <div className="h-full w-full flex align-center justify-center z-20">
        <div className="flex flex-col landscape:flex-row lg:flex-row gap-6 lg:gap-12 justify-center items-center px-6 lg:px-12 xl:px-0 w-full xl:w-5/6">
          <div className="relative w-[20rem] landscape:w-[20rem] landscape:lg:w-[30rem] md:w-[30rem] flex-shrink-0">
            <img
              src={image}
              className="rounded-2xl h-auto w-full custom-img-shadow"
            />

            {isPaused && (
              <div className="absolute bottom-6 right-6 z-30 p-3 bg-black/20 border-2 border-white/60 text-white rounded-full backdrop-blur-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="h-10 w-10"
                  fill="currentColor"
                >
                  <path d="M14,19H18V5H14M6,19H10V5H6V19Z" />
                </svg>
              </div>
            )}
          </div>

          <div className="flex flex-col lg:gap-1 xl:gap-2 w-full text-white">
            <h1
              id="song-title"
              className="text-4xl lg:text-7xl font-bold text-pretty"
            >
              {title}
            </h1>
            <h2
              id="song-artist"
              className="text-2xl lg:text-5xl font-bold text-pretty"
            >
              {artist}
            </h2>
            <h3
              id="song-album"
              className="text-xl lg:text-4xl font-semibold opacity-80 text-pretty"
            >
              {album}
            </h3>

            <div className="flex flex-col gap-2 lg:gap-3 mt-4 lg:mt-8 w-full">
              <div
                className="text-xl flex flex-row justify-between w-full font-semibold"
                id="progress-time"
              >
                <span id="progress-time-now">{msToTime(positionNow)}</span>
                <span id="progress-time-total">{msToTime(positionTotal)}</span>
              </div>

              <div className="h-3 w-full rounded-full overflow-hidden bg-white/30">
                <div
                  id="progressbar"
                  className={twMerge(
                    "h-full bg-white",
                    shouldAnimateProgress &&
                      "transition-all duration-1000 ease-linear"
                  )}
                  style={{
                    width: `${positionPercent * 100}%`,
                  }}
                />
              </div>

              <div
                className="flex flex-row gap-3 items-center"
                id="player-controls"
              >
                <div>
                  <svg
                    width="42"
                    height="42"
                    viewBox="0 0 48 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 15H36V30H12M36 33C36.7956 33 37.5587 32.6839 38.1213 32.1213C38.6839 31.5587 39 30.7956 39 30V15C39 14.2044 38.6839 13.4413 38.1213 12.8787C37.5587 12.3161 36.7956 12 36 12H12C10.335 12 9 13.335 9 15V30C9 30.7956 9.31607 31.5587 9.87868 32.1213C10.4413 32.6839 11.2044 33 12 33H6V36H42V33H36Z"
                      fill="white"
                    />
                  </svg>
                </div>

                <span className="text-xl font-bold">
                  <span>{statePlayerStr}</span>
                  <span className="text-white/80 font-semibold"></span>
                </span>

                {isEpisode && (
                  <svg
                    className="lucide lucide-podcast ml-auto opacity-75"
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M16.85 18.58a9 9 0 1 0-9.7 0" />
                    <path d="M8 14a5 5 0 1 1 8 0" />
                    <circle cx="12" cy="11" r="1" />
                    <path d="M13 17a1 1 0 1 0-2 0l.5 4.5a.5.5 0 1 0 1 0Z" />
                  </svg>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
