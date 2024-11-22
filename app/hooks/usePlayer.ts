import { activePlayerAtom, playerStateAtom } from "@/state/player";
import { useAtomValue } from "jotai";

export default function usePlayer() {
  const activePlayer = useAtomValue(activePlayerAtom);
  const playerState = useAtomValue(playerStateAtom);

  return {
    activePlayer,
    playerState,
  };
}
