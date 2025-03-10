import {
  HeadContent,
  Outlet,
  createRootRoute,
  Scripts,
} from "@tanstack/react-router";

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
  errorComponent: () => (
    <div>
      <p>Error</p>
    </div>
  ),
  notFoundComponent: () => (
    <div>
      <p>Not found</p>
    </div>
  ),
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
        <HeadContent />
        <script
          crossOrigin="anonymous"
          src="//unpkg.com/react-scan/dist/auto.global.js"
        />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}
