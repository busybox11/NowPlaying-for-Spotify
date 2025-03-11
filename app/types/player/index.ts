type ArtistItem = {
  name: string;
  images?: string[];
  url?: string;
};

type AlbumItem = {
  name?: string;
  images?: string[];
  url?: string;
};

type PlayerTrackItem = {
  title: string;
  artists: ArtistItem[];
  album?: AlbumItem;
  duration_ms?: number;

  type?: "track" | string;
  url?: string;
};

type PlayerShowItem = {
  name: string;
  episodes?: PlayerEpisodeItem[];
  images?: string[];
  url?: string;
};

type PlayerEpisodeItem = {
  title: string;
  show?: PlayerShowItem;
  season?: number;
  episode?: number;

  type: "episode";
  url?: string;
};

export type PlayerMeta = {
  is_playing?: boolean;
  shuffle_state?: boolean;
  repeat_state?: "off" | "track" | "context";
  position_ms?: number;
  duration_ms?: number;
  main_img_url?: string;
  provider?: string;
};

export type PlayerObj = {
  item: PlayerTrackItem | PlayerEpisodeItem;
  meta: PlayerMeta;
};

export type PlayerState = PlayerObj | null;
