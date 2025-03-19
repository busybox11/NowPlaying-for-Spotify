import { clientProviders } from "@/providers";

// Initialize provider instances without handlers
const providerInstances = Object.fromEntries(
  clientProviders.map(([id, Provider]) => {
    return [id, new Provider()];
  })
);

export default providerInstances;
