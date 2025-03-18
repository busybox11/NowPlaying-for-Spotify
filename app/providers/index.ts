import type ProviderClientBase from "@/providers/_abstractions/client";
import type ProviderServerBase from "@/providers/_abstractions/server";

type NewClientProvider = new () => ProviderClientBase;
type NewServerProvider = new () => ProviderServerBase;

const providersClientGlob = import.meta.glob<NewClientProvider>(
  // Ignore all directories and files that start with an underscore
  ["./*/client.ts", "!./_*/**"],
  {
    eager: true,
    import: "default",
  }
);

const providersServerGlob = import.meta.glob<NewServerProvider>(
  ["./*/server.ts", "!./_*/**"],
  {
    eager: true,
    import: "default",
  }
);

export const clientProviders: [string, NewClientProvider][] = Object.entries(
  providersClientGlob
).map(([importPath, client]) => {
  const [, id] = importPath.split("/");

  return [id, client];
});

export const serverProviders: [string, NewServerProvider][] = Object.entries(
  providersServerGlob
).map(([importPath, server]) => {
  const [, id] = importPath.split("/");

  return [id, server];
});
