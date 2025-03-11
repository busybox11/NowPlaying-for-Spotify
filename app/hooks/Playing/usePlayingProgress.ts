import { PlayerState } from "@/types/player";

export default function usePlayingProgress(
  previousPlayerState: PlayerState,
  playerState: PlayerState
) {
  const positionNow = playerState?.meta.position_ms ?? undefined;
  const positionTotal = playerState?.meta.duration_ms ?? undefined;
  const positionPercent =
    positionNow && positionTotal ? positionNow / positionTotal : undefined;

  const shouldAnimateProgress =
    playerState?.item.url === previousPlayerState?.item.url &&
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
