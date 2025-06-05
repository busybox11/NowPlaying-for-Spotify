import {
  HeadContent,
  Outlet,
  createRootRoute,
  Scripts,
} from "@tanstack/react-router";

import type { ReactNode } from "react";

import fontCss from "@fontsource-variable/outfit?url";
import appCss from "@/styles/app.css?url";

import { PlayerProvidersProvider } from "@/components/contexts/PlayerProviders";
import { JotaiStoreProvider } from "@/state/store";

import "@/i18n";
import { I18nextProvider } from "react-i18next";
import i18n from "@/i18n";

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
    links: [
      {
        rel: "icon",
        href: "/images/favicon.png",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
      {
        rel: "stylesheet",
        href: fontCss,
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
      <I18nextProvider i18n={i18n}>
        <JotaiStoreProvider>
          <PlayerProvidersProvider>
            <Outlet />
          </PlayerProvidersProvider>
        </JotaiStoreProvider>
      </I18nextProvider>
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
