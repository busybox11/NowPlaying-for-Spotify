import type ProviderClientBase from "@/providers/_abstractions/client";
import providerInstances from "@/providers/clientInstances";
import { PlayerState } from "@/types/player";
import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

type LastUsedProvider = {
  id: string;
  date: number;
} | null;

export const providersAtom =
  atom<Record<string, ProviderClientBase>>(providerInstances);
export const activePlayerAtom = atom<null | string>(null);
export const lastUsedProviderAtom = atomWithStorage<LastUsedProvider>(
  "lastUsedProvider",
  null
);
export const playersStateAtom = atom<Record<string, PlayerState>>({});

export const activeProviderAtom = atom((get) => {
  const activePlayer = get(activePlayerAtom);
  const providers = get(providersAtom);

  if (!activePlayer) return null;
  if (!providers[activePlayer]) return null;

  return providers[activePlayer];
});

export const playerStateAtom = atom((get) => {
  const activePlayer = get(activePlayerAtom);
  const playersState = get(playersStateAtom);

  if (!activePlayer) return null;

  return playersState[activePlayer];
});
