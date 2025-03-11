import type { PlayerObj, PlayerState } from "@/types/player";
import type { PlaybackState } from "@spotify/web-api-ts-sdk";

function makeItemObj(item: PlaybackState["item"]): PlayerObj["item"] {
  const baseObj = {
    title: item.name,
    url: item.external_urls.spotify,
  };

  if (item.type === "episode" && "show" in item) {
    const show = item.show;

    return {
      ...baseObj,
      show: {
        name: show.name,
        url: show.external_urls.spotify,
      },
      type: "episode",
    };
  }

  const artists = "artists" in item ? item.artists : [];
  const album = "album" in item ? item.album : null;

  return {
    ...baseObj,
    artists: artists.map((artist) => ({
      name: artist.name,
      url: artist.external_urls.spotify,
    })),
    album: album
      ? {
          name: album.name,
          url: album.external_urls.spotify,
        }
      : undefined,
    type: "track",
  };
}

export default function makePlayerStateObj(
  state: PlaybackState | null
): PlayerState {
  if (!state) return null;

  const item = state.item;
  if (!item) return null;

  const playerObj: PlayerState = {
    item: makeItemObj(item),
    meta: {
      is_playing: state.is_playing,
      shuffle_state: state.shuffle_state,
      repeat_state: state.repeat_state as "off" | "track" | "context",
      position_ms: state.progress_ms,
      duration_ms: state.item.duration_ms,
      main_img_url: ("album" in state.item ? state.item.album : state.item)
        .images[0]?.url,
      provider: "spotify",
    },
    device: {
      id: state.device.id ?? undefined,
      name: state.device.name,
      type: state.device.type.toLowerCase(),
      volume_percent: state.device.volume_percent ?? undefined,
    },
  };

  return playerObj;
}
