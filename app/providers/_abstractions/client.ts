import type { PlayerState } from "@/types/player";
import type {
  IProviderClient,
  IProviderClientAuthenticationInfo,
  IProviderClientInternalEvents,
  ProviderClientEventDataMap,
  ProviderClientEventTypes,
  ProviderPlayerHandler,
} from "@/types/providers/client";
import type { ProviderMeta } from "@/types/providers/meta";

export default abstract class ProviderClientBase implements IProviderClient {
  abstract meta: ProviderMeta;
  abstract isAuthenticated: boolean;
  private _playerHandlers: ProviderPlayerHandler[] = [];

  registerHandler() {
    const handler: ProviderPlayerHandler = {
      unregister: () => {
        this._playerHandlers = this._playerHandlers.filter(
          (h) => h !== handler,
        );

        // Wait to account for async events and component changes
        setTimeout(() => {
          if (!this._playerHandlers.length) {
            this.unregisterPlayer();
          }
        }, 1000);
      },
    };

    if (this._playerHandlers.length < 1 && this.isAuthenticated) {
      this.registerPlayer();
    }

    this._playerHandlers.push(handler);

    return handler;
  }

  abstract registerEvent<K extends ProviderClientEventTypes>(
    eventType: K,
    callback: (data: ProviderClientEventDataMap[K]) => void,
  ): () => void;
  abstract getPlayerState(): Promise<PlayerState>;
  abstract getAuthenticationInfo(): Promise<IProviderClientAuthenticationInfo>;

  abstract authenticate(): Promise<void>;
  abstract callback(): Promise<void>;
  abstract registerPlayer(): Promise<void>;
  abstract unregisterPlayer(): Promise<void>;
  abstract registerInternalEvents(events: IProviderClientInternalEvents): void;

  static makeInstance<T extends ProviderClientBase>(
    this: new (...args: any[]) => T,
    ...args: ConstructorParameters<typeof this>
  ): ProviderClientBase {
    return new this(...args);
  }
}
