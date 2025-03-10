import { HeadContent, Outlet, createRootRoute } from "@tanstack/react-router";
import { Scripts } from "@tanstack/react-start";
import type { ReactNode } from "react";

import "@fontsource-variable/outfit";

import "../styles/app.css";

import { PlayerProvidersProvider } from "@/components/contexts/PlayerProviders";
import { JotaiStoreProvider } from "@/state/store";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "NowPlaying",
      },
    ],
  }),
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <JotaiStoreProvider>
        <PlayerProvidersProvider>
          <Outlet />
        </PlayerProvidersProvider>
      </JotaiStoreProvider>
    </RootDocument>
  );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html>
      <head>
        <title>NowPlaying</title>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}
