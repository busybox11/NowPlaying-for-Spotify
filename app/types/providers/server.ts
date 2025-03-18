import type { PlayerState } from "@/types/player";
import type { IProviderClient } from "@/types/providers/client";

export interface ProviderServerEventDataMap {
  onAuth: void;
  onUnregister: void;
  onReady: void;
  onError: { message: string };
  onPlayerState: PlayerState;
}

export type ProviderServerEventTypes = keyof ProviderServerEventDataMap;

export interface IProviderServer
  extends Omit<
    IProviderClient,
    | "authenticate"
    | "callback"
    | "registerPlayer"
    | "unregisterPlayer"
    | "registerInternalEvents"
  > {
  authenticateFromToken(token: string): Promise<void>;

  registerEvent<K extends ProviderServerEventTypes>(
    eventType: K,
    callback: (data: ProviderServerEventDataMap[K]) => void
  ): () => void;
}
