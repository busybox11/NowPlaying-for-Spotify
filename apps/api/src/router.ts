import { initTRPC } from "@trpc/server";
import type { Context } from "./context";

import SuperJSON from "superjson";

const t = initTRPC.context<Context>().create({
  transformer: SuperJSON,
  errorFormatter({ shape }) {
    return shape;
  },
});

export const appRouter = t.router({
  hello: t.procedure.query(() => {
    return "world";
  }),
});
export type AppRouter = typeof appRouter;
