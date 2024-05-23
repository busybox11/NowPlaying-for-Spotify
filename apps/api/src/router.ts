import { initTRPC } from "@trpc/server";
import type { Context } from "./context";

const t = initTRPC.context<Context>().create();

export const appRouter = t.router({
  hello: t.procedure.query(({ ctx }) => {
    return ctx.server.info;
  }),
});
export type AppRouter = typeof appRouter;
