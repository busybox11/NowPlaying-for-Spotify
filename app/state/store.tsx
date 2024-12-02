import { createStore, Provider } from "jotai";
import { ReactNode } from "react";

export const store = createStore();

export function JotaiStoreProvider({
  children,
}: Readonly<{ children: ReactNode }>) {
  return <Provider store={store}>{children}</Provider>;
}
