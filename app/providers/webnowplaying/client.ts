import {
  IProviderClient,
  type IProviderClientInternalEvents,
  type ProviderClientEventDataMap,
  type ProviderClientEventTypes,
} from "@/types/providers/client";
import webnowplayingProviderMeta from "@/providers/webnowplaying";
import { WebNowPlayingPlayerState } from "@/providers/webnowplaying/types";
import makePlayerStateObj from "@/providers/webnowplaying/utils/makePlayerStateObj";
import EventManager from "@/utils/eventManager";
import type { PlayerState } from "@/types/player";

export default class WebNowPlayingProvider implements IProviderClient {
  private eventManager = new EventManager<ProviderClientEventDataMap>();
  private onPlayerStateCallback: (playerState: PlayerState) => void;

  readonly meta = webnowplayingProviderMeta;
  isAuthenticated = false;

  constructor() {
    this.onPlayerStateCallback = () => {};
  }

  // Private properties and methods
  private _lastPlaybackState: WebNowPlayingPlayerState | null = null;

  private _handleMessage = (msg: MessageEvent) => {
    if (msg.data.type != "wnp-info" || !msg.data.player) return;

    this._lastPlaybackState = msg.data.player as WebNowPlayingPlayerState;

    this.onPlayerStateCallback(makePlayerStateObj(this._lastPlaybackState));
  };
  private _beginListening() {
    window.addEventListener("message", this._handleMessage);
  }
  private _endListening() {
    window.postMessage(
      {
        type: "wnp-info",
        subscribe: false,
      },
      "*"
    );
    window.removeEventListener("message", this._handleMessage);
    this.isAuthenticated = false;
  }

  // Public implemented methods

  async authenticate() {
    window.postMessage(
      {
        type: "wnp-info",
        subscribe: true,
      },
      "*"
    );
    this.isAuthenticated = true;

    this.eventManager.triggerEvent("onAuth");
  }

  async callback() {
    await this.authenticate();
  }

  async registerPlayer() {
    this._beginListening();

    this.eventManager.triggerEvent("onReady");
  }

  async getPlayerState() {
    return makePlayerStateObj(this._lastPlaybackState);
  }

  async getAuthenticationInfo() {
    return {
      authenticated: true,
      isLoading: false,
      data: null,
    };
  }

  async unregisterPlayer() {
    this._endListening();

    this.eventManager.triggerEvent("onUnregister");
  }

  registerEvent<K extends ProviderClientEventTypes>(
    eventType: K,
    callback: (data: ProviderClientEventDataMap[K]) => void
  ): () => void {
    return this.eventManager.registerEvent(eventType, callback);
  }

  registerInternalEvents(events: IProviderClientInternalEvents) {
    this.onPlayerStateCallback = events.onPlayerState;
  }
}
