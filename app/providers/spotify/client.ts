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
import makePlayerStateObj from "@/providers/spotify/utils/makePlayerStateObj";

const { VITE_SPOTIFY_CLIENT_ID, VITE_SPOTIFY_REDIRECT_URI } = providerConfig;

export default class SpotifyProvider implements IProviderClient {
  readonly meta = spotifyProviderMeta;
  isAuthenticated = false;

  // API event handlers
  private onAuth: () => void;
  private onUnregister: () => void;
  private sendPlayerState: (playerObj: PlayerState) => void;
  private onReady: () => void;

  constructor({
    onAuth,
    onUnregister,
    sendPlayerState,
    onReady,
  }: IProviderClientConstructor) {
    this.onAuth = onAuth;
    this.onUnregister = onUnregister;
    this.sendPlayerState = sendPlayerState;
    this.onReady = onReady;
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

  private async _playerLoop() {
    const playerState = await this._getPlayerState();

    this.sendPlayerState(makePlayerStateObj(playerState));
  }

  // Public implemented methods

  async authenticate() {
    try {
      if (this.isAuthenticated && this._client?.currentUser) {
        this.onAuth();
        return;
      }

      const auth = new AuthorizationCodeWithPKCEStrategy(
        VITE_SPOTIFY_CLIENT_ID,
        VITE_SPOTIFY_REDIRECT_URI,
        [...SPOTIFY_OAUTH_SCOPES]
      );
      this._client = new SpotifyApi(auth);

      const { authenticated } = await this._client.authenticate();
      this.isAuthenticated = authenticated;

      if (authenticated) {
        this.onAuth();
      }
    } catch (e) {
      console.error(e);
      this.onUnregister();

      throw e;
    }
  }

  async callback() {
    await this.authenticate();
  }

  async registerPlayer() {
    // Initial call for faster response
    this._playerLoop().then(() => {
      this.onReady();
    });

    this._playerLoopInstance = window.setInterval(
      () => this._playerLoop(),
      1000
    );
  }

  async unregisterPlayer() {
    if (this._playerLoopInstance) {
      clearInterval(this._playerLoopInstance);
      this._playerLoopInstance = NaN;
    }

    this.onUnregister();
  }

  updateHandlers(handlers: IProviderClientConstructor) {
    this.onAuth = handlers.onAuth;
    this.onUnregister = handlers.onUnregister;
    this.sendPlayerState = handlers.sendPlayerState;
    this.onReady = handlers.onReady;
  }
}
