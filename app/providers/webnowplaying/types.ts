export type WebNowPlayingPlayerState = {
  id: number;
  name: string /* Website name */;

  title: string;
  artist: string;
  album: string;
  cover: string;

  state: number;

  duration: number;
  position: number;
  volume: number;
  rating: number;
  repeat: number;
  shuffle: boolean;

  ratingSystem: number;
  availableRepeat: number;

  canSetState: boolean;
  canSkipPrevious: boolean;
  canSkipNext: boolean;
  canSetPosition: boolean;
  canSetVolume: boolean;
  canSetRating: boolean;
  canSetRepeat: boolean;
  canSetShuffle: boolean;

  createdAt: number;
  updatedAt: number;
  activeAt: number;
};
