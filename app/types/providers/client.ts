import { PlayerState } from "@/types/player";
import { ProviderMeta } from "@/types/providers/meta";

export interface IProviderClientConstructor {
  onAuth: () => void;
  onUnregister: () => void;
  sendPlayerState: (playerObj: PlayerState) => void;
  onReady: () => void;
}

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

export interface IProviderClient {
  readonly meta: ProviderMeta;

  isAuthenticated: boolean;

  authenticate(): Promise<void>;
  callback(): Promise<void>;

  registerPlayer(): Promise<void>;
  unregisterPlayer(): Promise<void>;

  getPlayerState(): Promise<PlayerState>;
  getAuthenticationInfo(): Promise<IProviderClientAuthenticationInfo>;

  updateHandlers(handlers: IProviderClientConstructor): void;
}
