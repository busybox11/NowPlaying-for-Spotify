import { twMerge } from "tailwind-merge";
import { LuLogOut, LuMaximize2, LuMinimize2 } from "react-icons/lu";
import { useNavigate } from "@tanstack/react-router";
import { memo } from "react";
import useMouseJiggleOverlay from "@/hooks/useMouseJiggleOverlay";
import useFullScreenElement from "@/hooks/useFullScreenElement";

interface SettingsOverlayProps {
  onUnregisterPlayer: () => Promise<void>;
}

const SettingsOverlay = ({ onUnregisterPlayer }: SettingsOverlayProps) => {
  const navigate = useNavigate();

  const showOverlay = useMouseJiggleOverlay();
  const { isFullScreen, toggleFullScreen } = useFullScreenElement();

  return (
    <div
      id="settings-div"
      className={twMerge(
        "settings-div transition duration-500 ease-out z-30 absolute top-6 left-0 right-0 flex items-center justify-center",
        showOverlay ? "opacity-100 duration-150" : "opacity-0"
      )}
    >
      <div className="flex flex-row items-center gap-3 px-4 py-2 bg-black/20 border-2 border-white/40 text-white/80 ring-1 ring-black/40 rounded-full shadow-lg">
        <button className="cursor-pointer" onClick={toggleFullScreen}>
          {!isFullScreen ? (
            <LuMaximize2 className="size-5" />
          ) : (
            <LuMinimize2 className="size-5" />
          )}
        </button>

        <button
          className="cursor-pointer"
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
};

export default memo(SettingsOverlay);
