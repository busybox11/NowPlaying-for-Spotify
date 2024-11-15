import type { ProviderMeta } from "@/types/providers/meta";

export default {
  name: "Spotify",
  id: "spotify",
  auth: (await import("./client")).authenticate,
  callback: (await import("./client")).authenticate,
} as ProviderMeta;
