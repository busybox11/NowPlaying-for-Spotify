import { SPOTIFY_OAUTH_SCOPES } from "./constants";
import {
  SpotifyApi,
  AuthorizationCodeWithPKCEStrategy,
  PlaybackState,
} from "@spotify/web-api-ts-sdk";

import { providerConfig } from "./config";
import {
  IProviderClient,
  IProviderClientConstructor,
} from "@/types/providers/client";
import spotifyProviderMeta from "@/providers/spotify";
import { PlayerState } from "@/types/player";

const { VITE_SPOTIFY_CLIENT_ID, VITE_SPOTIFY_REDIRECT_URI } = providerConfig;

export default class SpotifyProvider implements IProviderClient {
  readonly meta = spotifyProviderMeta;
  isAuthenticated = false;

  // API event handlers
  private onAuth: () => void;
  private sendPlayerState: (playerObj: PlayerState) => void;

  constructor({ onAuth, sendPlayerState }: IProviderClientConstructor) {
    this.onAuth = onAuth;
    this.sendPlayerState = sendPlayerState;
  }

  // Private properties and methods
  private _client: SpotifyApi | null = null;
  private _playerLoopInstance: number = NaN;
  private _lastPlaybackState: PlaybackState | null = null;

  private async _getPlayerState() {
    if (!this._client) return null;

    const playerState = await this._client.player.getPlaybackState(
      undefined,
      "episode"
    );
    this._lastPlaybackState = playerState;

    return playerState;
  }

  // Public implemented methods

  async authenticate() {
    const auth = new AuthorizationCodeWithPKCEStrategy(
      VITE_SPOTIFY_CLIENT_ID,
      VITE_SPOTIFY_REDIRECT_URI,
      [...SPOTIFY_OAUTH_SCOPES]
    );
    this._client = new SpotifyApi(auth);

    try {
      const { authenticated } = await this._client.authenticate();
      this.isAuthenticated = authenticated;

      if (authenticated) {
        this.onAuth();
      }
    } catch (e) {
      console.error(e);
    }
  }

  async callback() {
    await this.authenticate();
  }

  async registerPlayer() {
    this._playerLoopInstance = window.setInterval(async () => {
      const playerState = await this._getPlayerState();

      this.sendPlayerState(playerState);
    }, 1000);
  }

  async unregisterPlayer() {
    if (this._playerLoopInstance) {
      clearInterval(this._playerLoopInstance);
      this._playerLoopInstance = NaN;
    }
  }
}
