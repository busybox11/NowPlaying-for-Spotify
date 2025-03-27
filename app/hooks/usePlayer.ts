import { usePlayerProviders } from "@/components/contexts/PlayerProviders";
import useProviderHandler from "@/hooks/Providers/useProviderHandler";
import { activePlayerAtom, playerStateAtom } from "@/state/player";
import { useAtomValue } from "jotai";
import { usePrevious } from "node_modules/@tanstack/react-router/dist/esm/utils";
import { useDebugValue } from "react";

export default function usePlayer() {
  const { providers } = usePlayerProviders();

  const activePlayer = useAtomValue(activePlayerAtom);
  const activeProvider = activePlayer ? providers[activePlayer] : null;
  useProviderHandler(activeProvider ?? undefined);

  const playerState = useAtomValue(playerStateAtom);
  const previousPlayerState = usePrevious(playerState);

  useDebugValue({
    activePlayer,
    activeProvider,
    playerState,
    previousPlayerState,
  });

  return {
    activePlayer,
    activeProvider,
    playerState,
    previousPlayerState,
  };
}
