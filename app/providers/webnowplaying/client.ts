import {
  IProviderClient,
  IProviderClientConstructor,
} from "@/types/providers/client";
import { PlayerState } from "@/types/player";
import webnowplayingProviderMeta from "@/providers/webnowplaying";

export default class WebNowPlayingProvider implements IProviderClient {
  readonly meta = webnowplayingProviderMeta;
  isAuthenticated = false;

  // API event handlers
  private onAuth: () => void;
  private onUnregister: () => void;
  private sendPlayerState: (playerObj: PlayerState) => void;

  constructor({
    onAuth,
    onUnregister,
    sendPlayerState,
  }: IProviderClientConstructor) {
    this.onAuth = onAuth;
    this.onUnregister = onUnregister;
    this.sendPlayerState = sendPlayerState;
  }

  // Private properties and methods
  private _lastPlaybackState: PlayerState | null = null;

  private _handleMessage = (msg: MessageEvent) => {
    if (msg.data.type != "wnp-info" || !msg.data.player) return;

    this._lastPlaybackState = msg.data.player;
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
  }

  async unregisterPlayer() {
    this._endListening();

    this.onUnregister();
  }
}
