import {
  defineConfig,
  type TanStackStartInputConfig,
} from "@tanstack/react-start/config";
import viteTsConfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";

type ViteConfig = Exclude<
  TanStackStartInputConfig["vite"],
  undefined | (() => any)
>;
type PluginOption = Exclude<ViteConfig["plugins"], undefined>[number];

export default defineConfig({
  react: {
    babel: {
      presets: ["jotai/babel/preset"],
    },
  },
  vite: {
    plugins: [
      // this is the plugin that enables path aliases
      viteTsConfigPaths({
        projects: ["./tsconfig.json"],
      }) as PluginOption,
      tailwindcss(),
    ],
  },
});
