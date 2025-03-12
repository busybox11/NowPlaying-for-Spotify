import { useEffect, useState } from "react";

import type {
  IProviderClient,
  IProviderClientAuthenticationInfo,
} from "@/types/providers/client";
import type { PlayerState } from "@/types/player";

export function useProviderPlayingState(
  provider: IProviderClient | undefined,
  enabled: boolean
) {
  const [playingState, setPlayingState] = useState<PlayerState | null>(null);

  useEffect(() => {
    const fetchState = async () => {
      if (!enabled || !provider) return;

      const state = await provider.getPlayerState();

      setPlayingState(state);
    };

    const interval = setInterval(fetchState, 1000);
    fetchState();

    return () => clearInterval(interval);
  }, [provider, enabled]);

  return playingState;
}

export function useProviderAuthenticationInfo(
  provider: IProviderClient | undefined
) {
  const [authenticationInfo, setAuthenticationInfo] =
    useState<IProviderClientAuthenticationInfo | null>(null);

  useEffect(() => {
    const fetchAuthenticationInfo = async () => {
      if (!provider) return;

      const info = await provider.getAuthenticationInfo();
      setAuthenticationInfo(info);
    };

    fetchAuthenticationInfo();
  }, [provider]);

  return authenticationInfo;
}
