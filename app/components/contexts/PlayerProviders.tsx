import { createContext, useContext, useCallback, useMemo } from "react";
import type { ReactNode } from "@tanstack/react-router";

import providers from "@/providers";
import { IProviderClient } from "@/types/providers/client";

const PlayerProvidersContext = createContext<{
  [key: string]: IProviderClient;
}>({});

export function PlayerProvidersProvider({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const handleAuth = useCallback((provider: string) => {
    console.log("auth", provider);
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
  return useContext(PlayerProvidersContext);
}
