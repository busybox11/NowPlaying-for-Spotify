import noSong from "/images/no_song.png?url";
import { useTranslation } from "react-i18next";
import usePlayingImage from "@/hooks/Playing/usePlayingImage";
import usePlayingProgress from "@/hooks/Playing/usePlayingProgress";
import usePlayer from "@/hooks/usePlayer";
import { LuPause, LuPodcast } from "react-icons/lu";
import { twMerge } from "tailwind-merge";

export interface MiniPlayerProps {
  showAlbum?: boolean;
  showArtwork?: boolean;
  showProgress?: boolean;
  showPause?: boolean;
  transparentBackground?: boolean;
  hideOnPauseOrEmpty?: boolean;
}

export default function MiniPlayer({
  showAlbum = false,
  showArtwork = false,
  showProgress = false,
  showPause = false,
  transparentBackground = true,
  hideOnPauseOrEmpty = true,
}: MiniPlayerProps) {
  const { t } = useTranslation();

  const { activeProvider, playerState, previousPlayerState } = usePlayer();

  const { positionPercent, shouldAnimateProgress } = usePlayingProgress(
    previousPlayerState,
    playerState
  );

  const image = playerState?.meta.main_img_url ?? noSong;
  const imageSrc = usePlayingImage(image);

  if (!activeProvider) return null;

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

  return (
    <>
      <div
        className={twMerge(
          "flex flex-row justify-center items-center h-full transition-all duration-150 ease-out",
          !transparentBackground && "bg-black",
          hideOnPauseOrEmpty && isPaused && "opacity-0"
        )}
      >
        <div className="relative h-full w-auto flex-shrink-0">
          {showArtwork && (
            <img
              src={imageSrc}
              id="album-cover"
              className="h-full w-auto flex-shrink-0 aspect-square object-cover"
            />
          )}

          {showArtwork && showPause && isPaused && !hideOnPauseOrEmpty && (
            <div
              id="pause-icon"
              className="absolute bottom-[10%] right-[10%] z-30 p-2 bg-black/20 border-2 border-white/60 text-white rounded-full backdrop-blur-lg"
            >
              <LuPause
                className="size-8"
                fill="currentColor"
                stroke="transparent"
              />
            </div>
          )}
        </div>

        <div className="relative flex flex-col h-full w-full text-white">
          <div className="flex flex-col my-auto mx-6">
            <h1
              x-text="$store.player.playbackObj.item?.name ?? translations.defaultTitleSong"
              id="song-title"
              className={twMerge(
                "text-3xl font-bold text-pretty line-clamp-1",
                showAlbum ? "line-clamp-1" : "line-clamp-2"
              )}
            >
              {title ?? t("playing.default_title_song")}
            </h1>

            <div id="artist-or-podcast-container" className="flex gap-2">
              {isEpisode && <LuPodcast className="my-auto opacity-75" />}

              <h2
                id="song-artist"
                className={twMerge(
                  "text-xl font-semibold line-clamp-1 text-pretty",
                  !showAlbum && "opacity-80"
                )}
              >
                {artist ?? t("playing.default_artist_song")}
              </h2>
            </div>

            {showAlbum && album && (
              <h3
                id="song-album"
                className="text-lg font-normal tracking-wider opacity-70 line-clamp-1 text-pretty"
              >
                {album}
              </h3>
            )}
          </div>

          {!showArtwork && showPause && isPaused && !hideOnPauseOrEmpty && (
            <div
              id="pause-icon"
              className="absolute right-8 top-1/2 -translate-y-1/2 z-30 p-3 bg-black/20 border-2 border-white/60 text-white rounded-full backdrop-blur-lg"
            >
              <LuPause
                className="size-8"
                fill="currentColor"
                stroke="transparent"
              />
            </div>
          )}

          {showProgress && (
            <div
              id="progressbar_container"
              className="h-1 w-full overflow-hidden bg-white/20"
            >
              <div
                id="progressbar"
                className={twMerge(
                  "h-full bg-white",
                  shouldAnimateProgress &&
                    "transition-all duration-1000 ease-linear z-10"
                )}
                style={{
                  width: `${(positionPercent ?? 0) * 100}%`,
                }}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
