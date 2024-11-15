import z from "zod";

const envSchema = z.object({
  VITE_SPOTIFY_CLIENT_ID: z.string(),
  SPOTIFY_CLIENT_SECRET: z.string().optional(),
  VITE_SPOTIFY_REDIRECT_URI: z.string(),
});
export default envSchema;

export const providerConfig = envSchema.parse(import.meta.env || process.env);
