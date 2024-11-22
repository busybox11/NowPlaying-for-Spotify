import * as React from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import usePlayer from "@/hooks/usePlayer";

export const Route = createFileRoute("/playing")({
  component: PlayingRouteComponent,
});

function PlayingRouteComponent() {
  const navigate = useNavigate();
  const { activePlayer, playerState } = usePlayer();

  if (!activePlayer) {
    navigate({ to: "/" });
  }

  return (
    <main className="flex flex-col h-screen gap-12 px-6 py-4">
      <h1 className="text-4xl font-bold">Playing with {activePlayer}</h1>

      <pre>{JSON.stringify(playerState, null, 2)}</pre>
    </main>
  );
}
