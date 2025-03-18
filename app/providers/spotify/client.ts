import { SPOTIFY_OAUTH_SCOPES } from "./constants";
import {
  SpotifyApi,
  AuthorizationCodeWithPKCEStrategy,
  PlaybackState,
} from "@spotify/web-api-ts-sdk";

import { providerConfig } from "./config";
import {
  IProviderClient,
  type IProviderClientInternalEvents,
  type ProviderClientEventDataMap,
  type ProviderClientEventTypes,
} from "@/types/providers/client";
import spotifyProviderMeta from "@/providers/spotify";
import makePlayerStateObj from "@/providers/spotify/utils/makePlayerStateObj";
import EventManager from "@/lib/eventManager";
import type { PlayerState } from "@/types/player";
import ProviderClientBase from "@/providers/_abstractions/client";

const { VITE_SPOTIFY_CLIENT_ID, VITE_SPOTIFY_REDIRECT_URI } = providerConfig;

export default class SpotifyProvider
  extends ProviderClientBase
  implements IProviderClient
{
  private eventManager = new EventManager<ProviderClientEventDataMap>();
  private onPlayerStateCallback: (playerState: PlayerState) => void;

  constructor() {
    super();

    this.onPlayerStateCallback = () => {};

    const auth = new AuthorizationCodeWithPKCEStrategy(
      VITE_SPOTIFY_CLIENT_ID,
      VITE_SPOTIFY_REDIRECT_URI,
      [...SPOTIFY_OAUTH_SCOPES]
    );
    this._client = new SpotifyApi(auth);
  }

  readonly meta = spotifyProviderMeta;
  isAuthenticated = false;

  // Private properties and methods
  private _client: SpotifyApi;
  private _playerLoopInstance: number = NaN;
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

    this.onPlayerStateCallback(makePlayerStateObj(playerState));
  }

  // Public implemented methods

  async authenticate() {
    try {
      if (this.isAuthenticated && this._client?.currentUser) {
        this.eventManager.triggerEvent("onAuth");
        return;
      }

      const { authenticated } = await this._client.authenticate();
      this.isAuthenticated = authenticated;

      if (authenticated) {
        this.eventManager.triggerEvent("onAuth");
      }
    } catch (e) {
      console.error(e);
      this.eventManager.triggerEvent("onError", {
        message: (e as Error).message,
      });

      throw e;
    }
  }

  async callback() {
    await this.authenticate();
  }

  async registerPlayer() {
    // Initial call for faster response
    this._playerLoop().then(() => {
      this.eventManager.triggerEvent("onReady");
    });

    this._playerLoopInstance = window.setInterval(
      () => this._playerLoop(),
      1000
    );
  }

  async getPlayerState() {
    if (!this._client) return null;

    const playerState = await this._getPlayerState();

    return makePlayerStateObj(playerState);
  }

  async getAuthenticationInfo() {
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

  async unregisterPlayer() {
    if (this._playerLoopInstance) {
      clearInterval(this._playerLoopInstance);
      this._playerLoopInstance = NaN;
    }

    this.eventManager.triggerEvent("onUnregister");
  }

  /**
   * Register a callback for an event type
   * @param eventType Key of the event type to register a callback for
   * @param callback Callback function to be called when the event type is triggered
   * @returns Unregister function to remove the callback
   */
  registerEvent<K extends ProviderClientEventTypes>(
    eventType: K,
    callback: (data: ProviderClientEventDataMap[K]) => void
  ) {
    return this.eventManager.registerEvent(eventType, callback);
  }

  registerInternalEvents(events: IProviderClientInternalEvents) {
    this.onPlayerStateCallback = events.onPlayerState;
  }
}
