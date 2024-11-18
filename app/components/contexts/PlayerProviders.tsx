import { createContext, useContext, useCallback, useMemo } from "react";
import type { ReactNode } from "@tanstack/react-router";

import providers from "@/providers";
import { IProviderClient } from "@/types/providers/client";
import { useLocalStorage } from "usehooks-ts";

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

  const handleAuth = useCallback((provider: string) => {
    setLastUsed({ id: provider, date: Date.now() });
  }, []);

  const value = useMemo(() => {
    return Object.fromEntries(
      providers.map(([id, provider]) => {
        return [
          id,
          new provider({
            onAuth: () => handleAuth(id),
          }),
        ];
      })
    );
  }, []);

  return (
    <PlayerProvidersContext.Provider value={value}>
      {children}
    </PlayerProvidersContext.Provider>
  );
}

export function usePlayerProviders() {
  const [lastUsed] = useLocalStorage<LastUsedProvider>("lastUsed", null);

  return {
    lastUsedProvider: lastUsed,
    providers: useContext(PlayerProvidersContext),
  };
}
