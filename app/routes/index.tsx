import { createFileRoute } from "@tanstack/react-router";
import { MiscLinks } from "@/components/MiscLinks";
import ProvidersSelect from "@/components/index/ProvidersSelect";
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

        <div className="flex flex-col gap-3">
          <h1 className="text-4xl font-bold">NowPlaying</h1>

          <MiscLinks />
        </div>
      </section>

      <ProvidersSelect />
    </main>
  );
}
