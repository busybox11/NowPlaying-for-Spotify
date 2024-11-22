import { createFileRoute } from "@tanstack/react-router";
import { MiscLinks } from "@/components/MiscLinks";
import { usePlayerProviders } from "@/components/contexts/PlayerProviders";
import { useMemo } from "react";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const { providers, lastUsedProvider } = usePlayerProviders();

  const { defaultProvider, otherProviders } = useMemo(() => {
    const defaultProviderId =
      lastUsedProvider ? lastUsedProvider.id : "spotify";

    const defaultProvider = Object.values(providers).find(
      (provider) => provider.meta.id === defaultProviderId
    )!;
    const otherProviders = Object.values(providers).filter(
      (provider) => provider.meta.id !== defaultProviderId
    );

    return {
      defaultProvider,
      otherProviders,
    };
  }, [providers]);

  return (
    <main className="flex flex-col items-center justify-center h-screen gap-12">
      <section className="flex flex-row gap-6 items-center">
        <img
          src="/images/favicon.png"
          alt="NowPlaying for Spotify"
          className="size-24"
        />

        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-bold">NowPlaying</h1>

          <MiscLinks />
        </div>
      </section>

      <div className="flex flex-col gap-4">
        <button
          onClick={() => defaultProvider.authenticate()}
          className="bg-[#15883D] px-12 py-3 rounded-full text-lg tracking-wide active:scale-95 transition mx-auto"
        >
          Login with {defaultProvider.meta.name}
        </button>

        {Object.entries(otherProviders).map(([id, provider]) => {
          return (
            <button
              key={id}
              onClick={() => provider.authenticate()}
              className="border-b-2 text-white/70 hover:text-white border-white/50 hover:border-white/70 text-lg tracking-wide active:scale-95 transition mx-auto"
            >
              {provider.meta.name}
            </button>
          );
        })}
      </div>
    </main>
  );
}
