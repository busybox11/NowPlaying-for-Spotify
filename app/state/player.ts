import { PlayerState } from "@/types/player";
import { atom } from "jotai";

export const activePlayerAtom = atom<null | string>(null);
export const playerStateAtom = atom<PlayerState>(null);
