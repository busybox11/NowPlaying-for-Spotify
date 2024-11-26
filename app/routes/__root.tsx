import {
  Outlet,
  ScrollRestoration,
  createRootRoute,
} from "@tanstack/react-router";
import { Body, Head, Html, Meta, Scripts } from "@tanstack/start";
import type { ReactNode } from "react";

import "@fontsource-variable/outfit";

import appCss from "../styles/app.css?url";
import { PlayerProvidersProvider } from "@/components/contexts/PlayerProviders";

export const Route = createRootRoute({
  meta: () => [
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
  links: () => [
    {
      rel: "stylesheet",
      href: appCss,
    },
  ],
  component: RootComponent,
  notFoundComponent: () => <h1>404 - Not Found</h1>,
});

function RootComponent() {
  return (
    <RootDocument>
      <PlayerProvidersProvider>
        <Outlet />
      </PlayerProvidersProvider>
    </RootDocument>
  );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <Html>
      <Head>
        <Meta />
      </Head>
      <Body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </Body>
    </Html>
  );
}
