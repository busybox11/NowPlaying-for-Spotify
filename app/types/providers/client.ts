import { PlayerState } from "@/types/player";
import { ProviderMeta } from "@/types/providers/meta";

export interface IProviderClientConstructor {
  onAuth: () => void;
  onUnregister: () => void;
  sendPlayerState: (playerObj: PlayerState) => void;
  onReady: () => void;
}

export interface IProviderClient {
  readonly meta: ProviderMeta;

  isAuthenticated: boolean;

  authenticate(): Promise<void>;
  callback(): Promise<void>;

  registerPlayer(): Promise<void>;
  unregisterPlayer(): Promise<void>;

  getPlayerState(): Promise<PlayerState>;

  updateHandlers(handlers: IProviderClientConstructor): void;
}
