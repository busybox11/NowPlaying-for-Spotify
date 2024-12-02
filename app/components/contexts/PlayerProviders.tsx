import { createContext, useContext, useCallback, useMemo, useRef } from "react";
import { useNavigate, type ReactNode } from "@tanstack/react-router";

import providers from "@/providers";
import { IProviderClient } from "@/types/providers/client";
import { useLocalStorage } from "usehooks-ts";
import { PlayerState } from "@/types/player";
import { useAtomValue, useSetAtom } from "jotai";
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

  const setLastUsed = useSetAtom(lastUsedProviderAtom);
  const setActivePlayer = useSetAtom(activePlayerAtom);
  const setPlayerState = useSetAtom(playerStateAtom);
  const setProviders = useSetAtom(providersAtom);

  const providerInstancesRef = useRef<{ [key: string]: IProviderClient }>({});

  const handleAuth = useCallback((provider: string) => {
    setActivePlayer(provider);
    setLastUsed({ id: provider, date: Date.now() });

    navigate({ to: "/playing" });

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
            onUnregister: () => {
              setActivePlayer(null);
              navigate({ to: "/" });
            },
            sendPlayerState: (playerObj: PlayerState) => {
              setPlayerState(playerObj);
              console.log(playerObj);
            },
          }),
        ];
      })
    );

    // Store references to provider instances
    providerInstancesRef.current = instances;
    setProviders(instances);
    return instances;
  }, []);

  return (
    <PlayerProvidersContext.Provider value={value}>
      {children}
    </PlayerProvidersContext.Provider>
  );
}

export function usePlayerProviders() {
  const lastUsedProvider = useAtomValue(lastUsedProviderAtom);
  const activePlayer = useAtomValue(activePlayerAtom);

  return {
    lastUsedProvider,
    providers: useContext(PlayerProvidersContext),
    activePlayer,
  };
}
