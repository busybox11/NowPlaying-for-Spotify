import {
  createContext,
  useContext,
  useCallback,
  useDebugValue,
  useEffect,
} from "react";
import { type ReactNode } from "@tanstack/react-router";

import { useAtom, useAtomValue } from "jotai";
import {
  activePlayerAtom,
  lastUsedProviderAtom,
  playersStateAtom,
  providersAtom,
} from "@/state/player";
import type ProviderClientBase from "@/providers/_abstractions/client";

const PlayerProvidersContext = createContext<{
  [key: string]: ProviderClientBase;
}>({});

export function PlayerProvidersProvider({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const [lastUsed, setLastUsed] = useAtom(lastUsedProviderAtom);
  const [activePlayer, setActivePlayer] = useAtom(activePlayerAtom);
  const [playersState, setPlayersStateAtom] = useAtom(playersStateAtom);

  const providers = useAtomValue(providersAtom);

  useDebugValue({
    activePlayer,
    lastUsed,
    providers,
    playersState,
  });

  const handleAuth = useCallback(
    (provider: string) => {
      setActivePlayer(provider);

      setLastUsed({ id: provider, date: Date.now() });
    },
    [lastUsed]
  );

  useEffect(() => {
    const unregisterEvents: (() => void)[] = [];

    // Attach handlers to all provider instances
    for (const [id, provider] of Object.entries(providers)) {
      const onAuthUnregister = provider.registerEvent("onAuth", () =>
        handleAuth(id)
      );

      unregisterEvents.push(onAuthUnregister);

      // Register internal events
      provider.registerInternalEvents({
        onPlayerState: (playerObj) => {
          // Only set the player state if the provider is the active player
          setPlayersStateAtom((prev) => ({
            ...prev,
            [id]: playerObj,
          }));
        },
      });
    }

    return () => {
      unregisterEvents.forEach((unregister) => unregister());
    };
  }, []);

  return (
    <PlayerProvidersContext.Provider value={providers}>
      {children}
    </PlayerProvidersContext.Provider>
  );
}

export function usePlayerProviders() {
  const lastUsedProvider = useAtomValue(lastUsedProviderAtom);
  const activePlayer = useAtomValue(activePlayerAtom);

  useDebugValue({ lastUsedProvider, activePlayer });

  return {
    lastUsedProvider,
    providers: useContext(PlayerProvidersContext),
    activePlayer,
  };
}
