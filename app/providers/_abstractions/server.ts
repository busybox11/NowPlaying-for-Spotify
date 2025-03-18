import type { PlayerState } from "@/types/player";
import type { IProviderClientAuthenticationInfo } from "@/types/providers/client";
import type { ProviderMeta } from "@/types/providers/meta";
import type {
  IProviderServer,
  ProviderServerEventDataMap,
  ProviderServerEventTypes,
} from "@/types/providers/server";

export default abstract class ProviderServerBase implements IProviderServer {
  abstract meta: ProviderMeta;
  abstract isAuthenticated: boolean;

  abstract authenticateFromToken(token: string): Promise<void>;
  abstract registerEvent<K extends ProviderServerEventTypes>(
    eventType: K,
    callback: (data: ProviderServerEventDataMap[K]) => void
  ): () => void;
  abstract getPlayerState(): Promise<PlayerState>;
  abstract getAuthenticationInfo(): Promise<IProviderClientAuthenticationInfo>;

  static makeInstance<T extends ProviderServerBase>(
    this: new (...args: any[]) => T,
    ...args: ConstructorParameters<typeof this>
  ): ProviderServerBase {
    return new this(...args);
  }
}
