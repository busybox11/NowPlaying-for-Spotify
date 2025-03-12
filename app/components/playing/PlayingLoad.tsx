import { usePlayerProviders } from "@/components/contexts/PlayerProviders";
import usePlayer from "@/hooks/usePlayer";
import { memo } from "react";
import { useNavigate } from "@tanstack/react-router";

const PlayingLoad = () => {
  const { activePlayer } = usePlayer();
  const { lastUsedProvider, providers } = usePlayerProviders();
  const navigate = useNavigate();

  if (activePlayer === null) {
    if (lastUsedProvider?.id) {
      const provider = providers[lastUsedProvider.id];
      if (provider) {
        console.log("registering player");
        provider.authenticate();
      }
    } else {
      navigate({ to: "/" });
    }
  }

  return (
    <div className="absolute inset-0 z-50 flex flex-col items-center justify-center h-screen backdrop-blur-3xl">
      <div className="flex flex-col gap-4 items-center justify-center">
        <img
          src="/images/favicon.png"
          alt="NowPlaying for Spotify"
          className="size-24"
        />

        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-bold">Signing in...</h1>
          <small className="text-sm text-gray-500">
            {lastUsedProvider?.id}
          </small>
        </div>
      </div>
    </div>
  );
};

export default memo(PlayingLoad);
