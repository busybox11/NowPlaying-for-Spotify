import type ProviderServerBase from "@/providers/_abstractions/server";
import { serverProviders } from "@/providers";

type ServerProviderItem = (typeof serverProviders)[number];
type ServerProviderId = ServerProviderItem[0];
type ServerProviderClass = ServerProviderItem[1];

class ServerProvider {
  private _instances: Map<string, ProviderServerBase> = new Map();
  private _provider: ServerProviderClass;

  constructor(provider: ServerProviderClass) {
    this._provider = provider;
  }

  getInstance(instanceId: string) {
    if (!this._instances.has(instanceId)) {
      this._instances.set(instanceId, new this._provider());
    }

    return this._instances.get(instanceId);
  }

  createInstance(instanceId: string, ...args: any[]) {
    const newInstance = new (this._provider as new (
      ...args: any[]
    ) => ProviderServerBase)(...args);
    this._instances.set(instanceId, newInstance);
  }
}

export default class ServerProvidersManager {
  private _providers: Map<ServerProviderId, ServerProvider> = new Map();

  constructor() {
    serverProviders.forEach((provider) => {
      this._providers.set(provider[0], new ServerProvider(provider[1]));
    });
  }

  registerProvider(provider: ServerProviderItem) {
    this._providers.set(provider[0], new ServerProvider(provider[1]));
  }

  getProvider(providerId: ServerProviderId) {
    return this._providers.get(providerId);
  }
}
