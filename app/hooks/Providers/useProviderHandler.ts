import { usePlayerProviders } from "@/components/contexts/PlayerProviders";
import type ProviderClientBase from "@/providers/_abstractions/client";
import { useEffect } from "react";

export default function useProviderHandler(provider?: ProviderClientBase) {
  const { providers, activePlayer } = usePlayerProviders();

  const activeProvider = activePlayer ? providers[activePlayer] : null;

  const targetProvider = provider ?? activeProvider;

  useEffect(() => {
    const handler = targetProvider?.registerHandler();

    return () => {
      handler?.unregister();
    };
  }, [targetProvider]);

  return targetProvider;
}
