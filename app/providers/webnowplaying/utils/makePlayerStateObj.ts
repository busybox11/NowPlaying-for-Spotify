import { WebNowPlayingPlayerState } from "@/providers/webnowplaying/types";
import type { PlayerState } from "@/types/player";

export default function makePlayerStateObj(
  state: WebNowPlayingPlayerState | null
): PlayerState {
  if (!state) return null;

  // Sometimes WNP sends empty states in their structured JSON format.
  // This is a workaround to prevent empty states from being processed.
  if (
    state.id == 0 &&
    state.name == "" &&
    state.artist == "" &&
    state.album == "" &&
    state.cover == ""
  )
    return null;

  // Sometimes, WNP reports position in seconds and duration in ms.
  // Normalize to ms for consistency
  const normalizeToMs = (value: number): number => {
    return value > 100000 ? value : value * 1000;
  };

  const duration = normalizeToMs(state.duration);
  const position = normalizeToMs(state.position);

  const playerObj: PlayerState = {
    item: {
      title: state.title,
      artists: [
        {
          name: state.artist,
        },
      ],
      album: {
        name: state.album,
        images: [state.cover],
      },
      duration_ms: duration,
      type: "track",
    },
    meta: {
      is_playing: state.state === 0,
      shuffle_state: state.shuffle,
      repeat_state:
        state.repeat === 1 ? "track" : state.repeat === 2 ? "context" : "off",
      position_ms: position,
      duration_ms: duration,
      main_img_url: state.cover,
      provider: state.name,
    },
    device: {
      id: state.name,
      name: state.name,
    },
  };

  return playerObj;
}
