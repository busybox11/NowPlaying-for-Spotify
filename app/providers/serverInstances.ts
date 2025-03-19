import { serverProviders } from "@/providers";
import ServerProvidersManager from "@/lib/serverProvidersManager";

const serverProviderManager = new ServerProvidersManager();

for (const provider of serverProviders) {
  serverProviderManager.registerProvider(provider);
}

export default serverProviderManager;
