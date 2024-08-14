import type { AppRouter } from "@nowplaying/api/src/types";

import { httpBatchLink, loggerLink } from "@trpc/client";
import { createTRPCNext } from "@trpc/next";
import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import type _fastify from "fastify";
import superjson from "superjson";

function getBaseUrl() {
  return process.env.NODE_ENV === "development"
    ? "http://localhost:4000"
    : "https://trpc.nowplayi.ng";
}

function getHeaders() {
  const baseHeaders = {
    "Access-Control-Allow-Origin": "*",
  } as Record<string, string>;

  return baseHeaders;
}

export const trpc = createTRPCNext<AppRouter>({
  config({ ctx: _ctx }) {
    return {
      queryClientConfig: {
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
      },
      links: [
        loggerLink({
          enabled: (opts) =>
            process.env.NODE_ENV === "development" ||
            (opts.direction === "down" && opts.result instanceof Error),
        }),
        httpBatchLink({
          transformer: superjson,
          url: `${getBaseUrl()}/trpc`,
          fetch: (url, options) => {
            const headers = getHeaders();
            return fetch(url, {
              ...options,
              headers: {
                ...options?.headers,
                ...headers,
              },
            });
          },
        }),
      ],
    };
  },
  transformer: superjson,
  ssr: false,
});

export type RouterInputs = inferRouterInputs<AppRouter>;
export type RouterOutputs = inferRouterOutputs<AppRouter>;
