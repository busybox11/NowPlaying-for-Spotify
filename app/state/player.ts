import { PlayerState } from "@/types/player";
import { IProviderClient } from "@/types/providers/client";
import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

type LastUsedProvider = {
  id: string;
  date: number;
} | null;

export const providersAtom = atom<Record<string, IProviderClient>>({});
export const activePlayerAtom = atom<null | string>(null);
export const lastUsedProviderAtom = atomWithStorage<LastUsedProvider>(
  "lastUsedProvider",
  null
);

export const activeProviderAtom = atom((get) => {
  const activePlayer = get(activePlayerAtom);
  const providers = get(providersAtom);

  if (!activePlayer) return null;
  if (!providers[activePlayer]) return null;

  return providers[activePlayer];
});

export const playerStateAtom = atom<PlayerState>(null);
