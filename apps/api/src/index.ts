import express from "express";
import * as trpcExpress from "@trpc/server/adapters/express";
import { appRouter } from "./router";
import { createContext } from "./context";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

app.set("trust proxy", true);
app.listen(4000, () => {
  console.log(`NowPlaying API listening on port 4000`);
});
