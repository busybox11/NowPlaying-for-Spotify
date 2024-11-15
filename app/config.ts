import z from "zod";

const providerConfigs: z.ZodObject<any>[] = [];

// Import all detected provider config files
const modules: Record<string, z.ZodObject<any>> = import.meta.glob(
  "./providers/**/config.ts",
  {
    eager: true,
    import: "default",
  }
);
for (const path in modules) {
  const module = modules[path];

  providerConfigs.push(module);
}

const envSchema = z.object({}).merge(
  providerConfigs.reduce((acc, config) => {
    return acc.merge(config);
  }, z.object({}))
);

export default envSchema.parse(import.meta.env);
