import type { PlayerState } from "@/types/player";
import type {
  IProviderClient,
  IProviderClientAuthenticationInfo,
  IProviderClientInternalEvents,
  ProviderClientEventDataMap,
  ProviderClientEventTypes,
} from "@/types/providers/client";
import type { ProviderMeta } from "@/types/providers/meta";

export default abstract class ProviderClientBase implements IProviderClient {
  abstract meta: ProviderMeta;
  abstract isAuthenticated: boolean;

  abstract registerEvent<K extends ProviderClientEventTypes>(
    eventType: K,
    callback: (data: ProviderClientEventDataMap[K]) => void
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
