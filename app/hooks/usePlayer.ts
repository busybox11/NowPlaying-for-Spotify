import { usePlayerProviders } from "@/components/contexts/PlayerProviders";
import { activePlayerAtom, playerStateAtom } from "@/state/player";
import { useAtomValue } from "jotai";
import { usePrevious } from "node_modules/@tanstack/react-router/dist/esm/utils";

export default function usePlayer() {
  const { providers } = usePlayerProviders();

  const activePlayer = useAtomValue(activePlayerAtom);
  const activeProvider = activePlayer ? providers[activePlayer] : null;

  const playerState = useAtomValue(playerStateAtom);
  const previousPlayerState = usePrevious(playerState);

  return {
    activePlayer,
    activeProvider,
    playerState,
    previousPlayerState,
  };
}
