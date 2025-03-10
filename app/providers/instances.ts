import providers from "@/providers";

// Initialize provider instances without handlers
const providerInstances = Object.fromEntries(
  providers.map(([id, Provider]) => {
    return [
      id,
      new Provider({
        onAuth: () => {},
        onUnregister: () => {},
        sendPlayerState: () => {},
        onReady: () => {},
      }),
    ];
  })
);

export default providerInstances;
