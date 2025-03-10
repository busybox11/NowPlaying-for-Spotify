import {
  IProviderClient,
  IProviderClientConstructor,
} from "@/types/providers/client";
import { PlayerState } from "@/types/player";
import webnowplayingProviderMeta from "@/providers/webnowplaying";
import { WebNowPlayingPlayerState } from "@/providers/webnowplaying/types";
import makePlayerStateObj from "@/providers/webnowplaying/utils/makePlayerStateObj";

export default class WebNowPlayingProvider implements IProviderClient {
  readonly meta = webnowplayingProviderMeta;
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
  private _lastPlaybackState: WebNowPlayingPlayerState | null = null;

  private _handleMessage = (msg: MessageEvent) => {
    if (msg.data.type != "wnp-info" || !msg.data.player) return;

    this._lastPlaybackState = msg.data.player as WebNowPlayingPlayerState;

    this.sendPlayerState(makePlayerStateObj(this._lastPlaybackState));
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

    this.onAuth();
  }

  async callback() {
    await this.authenticate();
  }

  async registerPlayer() {
    this._beginListening();

    this.onReady();
  }

  async unregisterPlayer() {
    this._endListening();

    this.onUnregister();
  }

  updateHandlers(handlers: IProviderClientConstructor) {
    this.onAuth = handlers.onAuth;
    this.onUnregister = handlers.onUnregister;
    this.sendPlayerState = handlers.sendPlayerState;
    this.onReady = handlers.onReady;
  }
}
