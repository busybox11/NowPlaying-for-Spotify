import { createFileRoute } from "@tanstack/react-router";
import { MiscLinks } from "@/components/MiscLinks";

import providers from "@/providers";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
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
        {Object.values(providers).map((provider) => (
          <button
            key={provider.id}
            onClick={() => provider.auth()}
            className="border-b-2 text-white/70 hover:text-white border-white/50 hover:border-white/70 text-lg tracking-wide active:scale-95 transition mx-auto"
          >
            {provider.name}
          </button>
        ))}
      </div>
    </main>
  );
}
