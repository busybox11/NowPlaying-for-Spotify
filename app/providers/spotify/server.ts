import spotifyProviderMeta from "@/providers/spotify";
import { providerConfig } from "@/providers/spotify/config";
import { SPOTIFY_OAUTH_SCOPES } from "@/providers/spotify/constants";
import makePlayerStateObj from "@/providers/spotify/utils/makePlayerStateObj";

import type { PlayerState } from "@/types/player";
import type { IProviderClientAuthenticationInfo } from "@/types/providers/client";
import type {
  IProviderServer,
  ProviderServerEventDataMap,
  ProviderServerEventTypes,
} from "@/types/providers/server";
import EventManager from "@/lib/eventManager";

import {
  AuthorizationCodeWithPKCEStrategy,
  SpotifyApi,
  type PlaybackState,
} from "@spotify/web-api-ts-sdk";
import ProviderServerBase from "@/providers/_abstractions/server";

const { VITE_SPOTIFY_CLIENT_ID, VITE_SPOTIFY_REDIRECT_URI } = providerConfig;

type SpotifyProviderAuthParams = {
  accessToken: string;
  refreshToken: string;
};

type SpotifyProviderServerConstructor = SpotifyProviderAuthParams;

export default class SpotifyProviderServer extends ProviderServerBase {
  private eventManager = new EventManager<ProviderServerEventDataMap>(
    "SpotifyProviderServer"
  );

  constructor({ accessToken, refreshToken }: SpotifyProviderServerConstructor) {
    super();

    const auth = new AuthorizationCodeWithPKCEStrategy(
      VITE_SPOTIFY_CLIENT_ID,
      VITE_SPOTIFY_REDIRECT_URI,
      [...SPOTIFY_OAUTH_SCOPES]
    );
    this._client = new SpotifyApi(auth);

    this._authenticateSpotify({
      accessToken,
      refreshToken,
    }).then(() => {
      this._playerLoopInstance = setInterval(() => this._playerLoop(), 1000);
    });

    this.registerEvent("onPlayerState", (playerState) => {
      // TODO: Implement sockets
      console.log("Player state update");
    });
  }

  static makeInstance(
    constructor: SpotifyProviderServerConstructor
  ): SpotifyProviderServer {
    return new SpotifyProviderServer(constructor);
  }

  readonly meta = spotifyProviderMeta;
  isAuthenticated = false;

  private _client: SpotifyApi;
  private _playerLoopInstance: NodeJS.Timeout | null = null;
  private _lastPlaybackState: PlaybackState | null = null;

  private async _getPlayerState() {
    const playerState = await this._client.player.getPlaybackState(
      undefined,
      "episode"
    );
    this._lastPlaybackState = playerState;

    return playerState;
  }

  private async _playerLoop() {
    const playerState = await this._getPlayerState();

    this.eventManager.triggerEvent(
      "onPlayerState",
      makePlayerStateObj(playerState)
    );
  }

  private async _authenticateSpotify({
    accessToken,
    refreshToken,
  }: SpotifyProviderAuthParams) {
    this._client = SpotifyApi.withAccessToken(VITE_SPOTIFY_CLIENT_ID, {
      access_token: accessToken,
      refresh_token: refreshToken,
      expires_in: 0,
      token_type: "Bearer",
    });
    this.isAuthenticated = true;

    return;
  }

  authenticateFromToken(token: string): Promise<void> {
    // Get spotify token data from NP token

    return Promise.resolve();
  }

  async getPlayerState(): Promise<PlayerState> {
    if (!this._client) return null;

    const playerState = await this._getPlayerState();

    return makePlayerStateObj(playerState);
  }

  async getAuthenticationInfo(): Promise<IProviderClientAuthenticationInfo> {
    const user = await this._client.currentUser.profile();

    return {
      authenticated: this.isAuthenticated,
      isLoading: false,
      data: {
        name: user.display_name,
        id: user.id,
        username: user.display_name,
        profile_url: user.external_urls.spotify,
        avatar: user.images[0].url,
      },
    };
  }

  /**
   * Register a callback for an event type
   * @param eventType Key of the event type to register a callback for
   * @param callback Callback function to be called when the event type is triggered
   * @returns Unregister function to remove the callback
   */
  registerEvent<K extends ProviderServerEventTypes>(
    eventType: K,
    callback: (data: ProviderServerEventDataMap[K]) => void
  ) {
    return this.eventManager.registerEvent(eventType, callback);
  }
}
