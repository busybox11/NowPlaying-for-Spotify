import { ProviderMeta } from "@/types/providers/meta";

const providersGlob = import.meta.glob<ProviderMeta>("./*/index.ts", {
  eager: true,
  import: "default",
});

const providers = Object.fromEntries(
  Object.values(providersGlob).map((value) => [value.id, value])
);

export default providers;
