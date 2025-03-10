import {
  defineConfig,
  type TanStackStartInputConfig,
} from "@tanstack/react-start/config";
import viteTsConfigPaths from "vite-tsconfig-paths";

type ViteConfig = Exclude<
  TanStackStartInputConfig["vite"],
  undefined | (() => any)
>;
type PluginOption = Exclude<ViteConfig["plugins"], undefined>[number];

export default defineConfig({
  vite: {
    plugins: [
      // this is the plugin that enables path aliases
      viteTsConfigPaths({
        projects: ["./tsconfig.json"],
      }) as PluginOption,
    ],
  },
});
