import express from "express";
import * as trpcExpress from "@trpc/server/adapters/express";
import { appRouter } from "./router";
import { createContext } from "./context";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/", (_req, res) => {
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
