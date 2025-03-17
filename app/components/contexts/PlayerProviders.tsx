import {
  createContext,
  useContext,
  useCallback,
  useDebugValue,
  useEffect,
} from "react";
import { useNavigate, type ReactNode } from "@tanstack/react-router";

import { IProviderClient } from "@/types/providers/client";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  activePlayerAtom,
  lastUsedProviderAtom,
  playerStateAtom,
  providersAtom,
} from "@/state/player";

const PlayerProvidersContext = createContext<{
  [key: string]: IProviderClient;
}>({});

export function PlayerProvidersProvider({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const navigate = useNavigate();

  const [lastUsed, setLastUsed] = useAtom(lastUsedProviderAtom);

  const providers = useAtomValue(providersAtom);

  const setActivePlayer = useSetAtom(activePlayerAtom);
  const setPlayerState = useSetAtom(playerStateAtom);

  useDebugValue({
    lastUsed,
    providers,
  });

  const handleAuth = useCallback(
    (provider: string) => {
      setActivePlayer(provider);

      if (lastUsed && lastUsed.id !== provider) {
        setPlayerState(null);
      }
      setLastUsed({ id: provider, date: Date.now() });

      // Get the specific provider instance
      const providerInstance = providers[provider];
      if (providerInstance) {
        providerInstance.registerPlayer();
      }
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
      const onUnregisterEventUnregister = provider.registerEvent(
        "onUnregister",
        () => {
          setActivePlayer(null);
          navigate({ to: "/" });
        }
      );

      unregisterEvents.push(onAuthUnregister, onUnregisterEventUnregister);

      provider.registerInternalEvents({
        onPlayerState: (playerObj) => {
          setPlayerState(playerObj);
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
