import { createContext, useContext, useCallback, useMemo, useRef } from "react";
import type { ReactNode } from "@tanstack/react-router";

import providers from "@/providers";
import { IProviderClient } from "@/types/providers/client";
import { useLocalStorage } from "usehooks-ts";
import { PlayerState } from "@/types/player";
import { useAtomValue, useSetAtom } from "jotai";
import { activePlayerAtom, playerStateAtom } from "@/state/player";

const PlayerProvidersContext = createContext<{
  [key: string]: IProviderClient;
}>({});

type LastUsedProvider = {
  id: string;
  date: number;
} | null;

export function PlayerProvidersProvider({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const [_lastUsed, setLastUsed, _removeLastUsed] =
    useLocalStorage<LastUsedProvider>("lastUsedProvider", null);
  const setActivePlayer = useSetAtom(activePlayerAtom);
  const setPlayerState = useSetAtom(playerStateAtom);

  const providerInstancesRef = useRef<{ [key: string]: IProviderClient }>({});

  const handleAuth = useCallback((provider: string) => {
    setActivePlayer(provider);
    setLastUsed({ id: provider, date: Date.now() });

    // Get the specific provider instance
    const providerInstance = providerInstancesRef.current[provider];
    if (providerInstance) {
      providerInstance.registerPlayer();
    }
  }, []);

  const value = useMemo(() => {
    const instances = Object.fromEntries(
      providers.map(([id, provider]) => {
        return [
          id,
          new provider({
            onAuth: () => handleAuth(id),
            sendPlayerState: (playerObj: PlayerState) => {
              setPlayerState(playerObj);
              console.log(playerObj);
            },
          }),
        ];
      }),
    );

    // Store references to provider instances
    providerInstancesRef.current = instances;
    return instances;
  }, []);

  return (
    <PlayerProvidersContext.Provider value={value}>
      {children}
    </PlayerProvidersContext.Provider>
  );
}

export function usePlayerProviders() {
  const [lastUsed] = useLocalStorage<LastUsedProvider>("lastUsed", null);
  const activePlayer = useAtomValue(activePlayerAtom);

  return {
    lastUsedProvider: lastUsed,
    providers: useContext(PlayerProvidersContext),
    activePlayer,
  };
}
