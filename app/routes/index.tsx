import * as fs from "node:fs";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/start";
import { MiscLinks } from "@/components/MiscLinks";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <main className="flex flex-col items-center justify-center h-screen">
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
    </main>
  );
}
