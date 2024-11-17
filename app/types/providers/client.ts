import { ProviderMeta } from "@/types/providers/meta";

export interface IProviderClientConstructor {
  onAuth: () => void;
}

export interface IProviderClient {
  readonly meta: ProviderMeta;

  isAuthenticated: boolean;

  authenticate(): Promise<void>;
  callback(): Promise<void>;
}
