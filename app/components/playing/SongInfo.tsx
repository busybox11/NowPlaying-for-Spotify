import { memo } from "react";
import { twMerge } from "tailwind-merge";
import { useTranslation } from "react-i18next";

interface SongInfoProps {
  title?: string;
  artist?: string;
  album?: string;
  positionNow?: number;
  positionTotal?: number;
  positionPercent?: number;
  shouldAnimateProgress: boolean;
  device: { name?: string } | null;
  DeviceIcon: React.ComponentType<{ className?: string }>;
  statePlayerStr: string | undefined;
  isEpisode: boolean;
}

const msToTime = (ms: number) => {
  const minutes = Math.floor(ms / 60000);
  const seconds = parseInt(((ms % 60000) / 1000).toFixed(0));
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

const SongInfo = ({
  title,
  artist,
  album,
  positionNow,
  positionTotal,
  positionPercent,
  shouldAnimateProgress,
  device,
  DeviceIcon,
  statePlayerStr,
  isEpisode,
}: SongInfoProps) => {
  const { t } = useTranslation();

  const progressNow = positionNow ? msToTime(positionNow) : "--:--";
  const progressTotal = positionTotal ? msToTime(positionTotal) : "--:--";

  return (
    <div className="flex flex-col lg:gap-1 xl:gap-2 w-full text-white">
      <h1
        id="song-title"
        className="text-4xl lg:text-7xl font-bold text-pretty"
      >
        {title ?? t("playing.default_title_song")}
      </h1>
      <h2
        id="song-artist"
        className="text-2xl lg:text-5xl font-bold text-pretty"
      >
        {artist ?? t("playing.default_artist_song")}
      </h2>
      {album && (
        <h3
          id="song-album"
          className="text-xl lg:text-4xl font-semibold opacity-80 text-pretty"
        >
          {album}
        </h3>
      )}

      <div className="flex flex-col mt-4 lg:mt-8 w-full">
        <div
          className="text-xl flex flex-row justify-between w-full font-semibold mb-2"
          id="progress-time"
        >
          <span
            id="progress-time-now"
            className={twMerge(
              "text-sm text-white",
              !positionNow && "text-white/50"
            )}
          >
            {progressNow}
          </span>
          <span
            id="progress-time-total"
            className={twMerge(
              "text-sm text-white",
              !positionTotal && "text-white/50"
            )}
          >
            {progressTotal}
          </span>
        </div>

        <div className="relative h-3 w-full rounded-full overflow-hidden bg-white/20 ring-2 ring-white/25 ring-inset shadow-sm">
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

        <div
          className="flex flex-row gap-4 items-center mt-3"
          id="player-controls"
        >
          <DeviceIcon className="size-6" />

          <span className="text-xl">
            <div className="flex flex-row gap-2 items-center">
              {device?.name && (
                <>
                  <span className="font-semibold">{device?.name}</span>
                  <span className="opacity-80">•</span>
                </>
              )}
              <span className="opacity-80">{statePlayerStr}</span>
            </div>
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
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
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
  );
};

export default memo(SongInfo);
