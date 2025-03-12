import { twMerge } from "tailwind-merge";
import { LuLogOut, LuMaximize2, LuMinimize2, LuMusic } from "react-icons/lu";
import { useNavigate } from "@tanstack/react-router";
import { memo } from "react";
import useMouseJiggleOverlay from "@/hooks/useMouseJiggleOverlay";
import useFullScreenElement from "@/hooks/useFullScreenElement";
import usePlayer from "@/hooks/usePlayer";
import { useProviderAuthenticationInfo } from "@/hooks/Providers/providerHooks";

interface PlayerOverlayProps {
  onUnregisterPlayer: () => Promise<void>;
}

function PlayerSettingsOverlay({ show }: { show: boolean }) {
  const { isFullScreen, toggleFullScreen } = useFullScreenElement();

  return (
    <div
      id="settings-overlay-div"
      className={twMerge(
        "settings-div transition duration-500 ease-out z-30 absolute top-6 left-0 right-0 flex items-center justify-center",
        show ? "opacity-100 duration-150" : "opacity-0"
      )}
    >
      <div className="flex flex-row items-center gap-3 px-4 py-2 bg-black/20 text-white/80 border-2 border-white/40 ring-1 ring-black/40 rounded-full shadow-lg">
        <button className="cursor-pointer" onClick={toggleFullScreen}>
          {!isFullScreen ? (
            <LuMaximize2 className="size-5" />
          ) : (
            <LuMinimize2 className="size-5" />
          )}
        </button>
      </div>
    </div>
  );
}

function ProviderOverlay({
  show,
  onUnregisterPlayer,
}: {
  show: boolean;
  onUnregisterPlayer: () => Promise<void>;
}) {
  const navigate = useNavigate();
  const { activeProvider } = usePlayer();

  const auth = useProviderAuthenticationInfo(activeProvider ?? undefined);

  return (
    <div
      id="provider-overlay-div"
      className={twMerge(
        "settings-div transition duration-500 ease-out z-30 absolute bottom-12 left-12 flex items-start justify-center",
        show ? "opacity-100 duration-150" : "opacity-0"
      )}
    >
      <div className="flex flex-row items-center gap-3 pl-3 pr-4 py-3 bg-black/20 border-2 border-white/40 ring-1 ring-black/40 rounded-full shadow-lg overflow-hidden backdrop-blur-xl">
        <div className="relative bg-black/25 ring-1 ring-white/50 border-1 border-black/50 rounded-full p-3 aspect-square shrink-0">
          {activeProvider?.meta.icon ? (
            <img
              src={activeProvider.meta.icon}
              alt={activeProvider.meta.name}
              className="size-6"
            />
          ) : (
            <LuMusic className="size-6" />
          )}

          {auth?.data?.avatar && (
            <img
              src={auth.data.avatar}
              alt={auth.data.name}
              className="absolute bottom-0 right-0 size-5 rounded-full ring-4 ring-black/80"
            />
          )}
        </div>

        <div className="flex flex-col text-start w-full min-w-0 leading-5">
          <span className="text-md">{activeProvider?.meta.name}</span>

          {auth?.data?.name && (
            <span className="text-white/50">{auth.data.name}</span>
          )}
        </div>

        <button
          className="cursor-pointer ml-3 p-3 transition hover:bg-white/10 hover:ring-1 hover:ring-inset hover:ring-white/20 rounded-full"
          onClick={async () => {
            await navigate({ to: "/" });
            await onUnregisterPlayer();
          }}
        >
          <LuLogOut className="size-5" />
        </button>
      </div>
    </div>
  );
}

const PlayerOverlay = ({ onUnregisterPlayer }: PlayerOverlayProps) => {
  const showOverlay = useMouseJiggleOverlay();

  return (
    <>
      <PlayerSettingsOverlay show={showOverlay} />

      <ProviderOverlay
        show={showOverlay}
        onUnregisterPlayer={onUnregisterPlayer}
      />
    </>
  );
};

export default memo(PlayerOverlay);
