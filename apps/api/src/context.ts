import { CreateExpressContextOptions } from "@trpc/server/adapters/express";

export async function createContextInner() {
  return {};
}

export async function createContext({ req, res }: CreateExpressContextOptions) {
  const server = {};

  return {
    server,
    req,
    res,
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
