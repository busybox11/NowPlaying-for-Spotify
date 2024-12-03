import { WebNowPlayingPlayerState } from "@/providers/webnowplaying/types";
import type { PlayerState } from "@/types/player";

export default function makePlayerStateObj(
  state: WebNowPlayingPlayerState | null
): PlayerState {
  if (!state) return null;

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
      duration_ms: state.duration * 1000,
      type: "track",
    },
    meta: {
      is_playing: state.state === 0,
      shuffle_state: state.shuffle,
      repeat_state:
        state.repeat === 1 ? "track"
        : state.repeat === 2 ? "context"
        : "off",
      position_ms: state.position * 1000,
      duration_ms: state.duration * 1000,
      main_img_url: state.cover,
      provider: state.name,
    },
  };

  return playerObj;
}
