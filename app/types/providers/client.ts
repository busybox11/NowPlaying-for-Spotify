import { PlayerState } from "@/types/player";
import { ProviderMeta } from "@/types/providers/meta";

export interface ProviderClientEventDataMap {
  onAuth: void;
  onUnregister: void;
  onReady: void;
  onError: { message: string };
}

export interface ProviderPlayerHandler {
  unregister: () => void;
}

export type ProviderClientEventTypes = keyof ProviderClientEventDataMap;

export interface IProviderClientAuthenticationInfo {
  authenticated: boolean;
  isLoading: boolean;
  data: {
    name: string;
    id?: string;
    username?: string;
    profile_url?: string;
    avatar?: string;
    email?: string;
  } | null;
}

export interface IProviderClientInternalEvents {
  onPlayerState: (playerState: PlayerState) => void;
}

export interface IProviderClient {
  readonly meta: ProviderMeta;

  isAuthenticated: boolean;

  authenticate(): Promise<void>;
  callback(): Promise<void>;

  registerPlayer(): Promise<void>;
  unregisterPlayer(): Promise<void>;

  getPlayerState(): Promise<PlayerState>;
  getAuthenticationInfo(): Promise<IProviderClientAuthenticationInfo>;

  registerEvent<K extends ProviderClientEventTypes>(
    eventType: K,
    callback: (data: ProviderClientEventDataMap[K]) => void
  ): () => void;
  registerInternalEvents(events: IProviderClientInternalEvents): void;
}
