import MiniPlayer, { type MiniPlayerProps } from "@/components/miniplayer";
import PlayingLoad from "@/components/playing/PlayingLoad";
import usePlayer from "@/hooks/usePlayer";
import { createFileRoute } from "@tanstack/react-router";

import miniplayerCss from "@/styles/miniplayer.css?url";

export const Route = createFileRoute("/miniplayer/")({
  head: () => ({
    links: [{ rel: "stylesheet", href: miniplayerCss }],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  const params = Route.useSearch();
  const { activePlayer } = usePlayer();

  if (!activePlayer) {
    // DEBUG ONLY
    return <PlayingLoad />;
  }

  return (
    <main className="h-screen w-screen bg-transparent">
      <MiniPlayer {...params} />
    </main>
  );
}
