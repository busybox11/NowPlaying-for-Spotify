import { PlayerState } from "@/types/player";

export default function usePlayingProgress(
  previousPlayerState: PlayerState,
  playerState: PlayerState
) {
  const positionNow = playerState?.meta.position_ms ?? 0;
  const positionTotal = playerState?.item.duration_ms ?? 0;
  const positionPercent = positionNow / positionTotal;

  const shouldAnimateProgress =
    Math.abs(
      (playerState?.meta.position_ms ?? 0) -
        (previousPlayerState?.meta.position_ms ?? 0)
    ) < 5000;

  return {
    positionNow,
    positionTotal,
    positionPercent,
    shouldAnimateProgress,
  };
}
