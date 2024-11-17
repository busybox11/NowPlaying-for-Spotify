import type {
  IProviderClient,
  IProviderClientConstructor,
} from "@/types/providers/client";

type NewProviderClient = new (
  args: IProviderClientConstructor
) => IProviderClient;

const providersClientGlob = import.meta.glob<NewProviderClient>(
  "./*/client.ts",
  {
    eager: true,
    import: "default",
  }
);

const providers: [string, NewProviderClient][] = Object.entries(
  providersClientGlob
).map(([importPath, client]) => {
  const [, id] = importPath.split("/");

  return [id, client];
});

export default providers;
