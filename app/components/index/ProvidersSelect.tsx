import { usePlayerProviders } from "@/components/contexts/PlayerProviders";
import { useState } from "react";
import { Suspense } from "react";
import {
  LuMusic,
  LuArrowRight,
  LuPause,
  LuRefreshCw,
  LuPictureInPicture,
} from "react-icons/lu";
import { twMerge } from "tailwind-merge";

import {
  useProviderAuthenticationInfo,
  useProviderPlayingState,
} from "@/hooks/Providers/providerHooks";
import { useNavigate } from "@tanstack/react-router";
import type ProviderClientBase from "@/providers/_abstractions/client";

function ProviderBtn({ provider }: { provider: ProviderClientBase }) {
  // TODO: VERY INITIAL BAD WIP that doesnt even work in the first place without logging in manually first
  // A more desired implementation would be to:
  // - Trigger auth on known logged in providers
  // - Subscribe to player state changes, similar to updateHandlers approach (but ephemeral)
  // - Don't trigger onAuth for this subscription
  const playingState = useProviderPlayingState(provider, true);
  const authenticationInfo = useProviderAuthenticationInfo(provider);

  const navigate = useNavigate();

  const [authenticatingProvider, setAuthenticatingProvider] = useState(false);

  const handleAuthProvider = async (
    provider: ProviderClientBase,
    target: "playing" | "miniplayer/generate" = "playing"
  ) => {
    setAuthenticatingProvider(true);
    const unregister = provider.registerEvent("onReady", () => {
      setAuthenticatingProvider(false);

      navigate({ to: `/${target}` });

      unregister();
    });

    try {
      await provider.authenticate();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <button
      onClick={() => {
        handleAuthProvider(provider, "playing");
      }}
      className="cursor-pointer flex flex-row gap-1 items-center hover:bg-white/5 border-1 border-transparent hover:border-black/50 hover:ring-1 hover:ring-white/30 transition-colors duration-200 ease-out rounded-full p-2 group"
    >
      <div
        className={twMerge(
          "bg-black/20 ring-1 ring-white/20 border-1 border-black/50 rounded-full p-3 aspect-square shrink-0",
          playingState?.meta.is_playing && "bg-[#1ab85210] ring-[#1ab85280]"
        )}
      >
        {provider.meta.icon ? (
          <img
            src={provider.meta.icon}
            alt={provider.meta.name}
            className="size-6"
          />
        ) : (
          <LuMusic className="size-6" />
        )}
      </div>

      <div className="ml-2 flex flex-col text-start w-full min-w-0">
        <span>
          {provider.meta.name}
          {!!authenticationInfo && authenticationInfo?.data !== null && (
            <>
              <span className="mx-1 text-white/50"> • </span>
              {authenticationInfo.data.avatar && (
                <img
                  src={authenticationInfo.data.avatar}
                  alt={authenticationInfo.data.name}
                  className="inline-flex -mt-1 mr-1.5 size-3 rounded-full"
                />
              )}
              <span className="text-white/50">
                {authenticationInfo?.data.name}
              </span>
            </>
          )}
        </span>
        <span
          className={twMerge(
            "block items-center truncate text-sm text-white/50",
            playingState && "text-[#1ab852]"
          )}
        >
          <Suspense fallback={"Loading..."}>
            {playingState ? (
              <>
                {playingState.meta.is_playing !== null &&
                playingState.meta.is_playing ? (
                  <img
                    src="data:image/gif;base64,R0lGODlhGAAYAPABAB25VP///yH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDYuMC1jMDAyIDc5LjE2NDM1MiwgMjAyMC8wMS8zMC0xNTo1MDozOCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIxLjEgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjNDRDUyN0E0OTUwRDExRUE4NDY1QkYwRjJDNTZBRkY4IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjNDRDUyN0E1OTUwRDExRUE4NDY1QkYwRjJDNTZBRkY4Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6M0NENTI3QTI5NTBEMTFFQTg0NjVCRjBGMkM1NkFGRjgiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6M0NENTI3QTM5NTBEMTFFQTg0NjVCRjBGMkM1NkFGRjgiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4B//79/Pv6+fj39vX08/Lx8O/u7ezr6uno5+bl5OPi4eDf3t3c29rZ2NfW1dTT0tHQz87NzMvKycjHxsXEw8LBwL++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"
                    className="inline-block -mt-0.5 size-3 mr-2"
                  />
                ) : (
                  <LuPause
                    className="inline-block -mt-0.5 size-4 mr-1.5 -ml-0.5"
                    fill="currentColor"
                    stroke="transparent"
                  />
                )}

                {playingState?.item?.title}
                <span className="mx-0.5"> • </span>

                {"artists" in playingState?.item &&
                  playingState?.item?.artists
                    .map((artist) => artist.name)
                    .join(", ")}
              </>
            ) : (
              "Not playing"
            )}
          </Suspense>
        </span>
      </div>

      <a
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();

          handleAuthProvider(provider, "miniplayer/generate");
        }}
        className={twMerge(
          "flex-row gap-2 items-center ml-auto mr-3 hidden group-hover:block hover:bg-white/5 hover:ring-1 hover:ring-white/30 cursor-pointer transition-colors duration-200 ease-out rounded-full p-3",
          authenticatingProvider && "opacity-100"
        )}
        href={"#"}
      >
        <LuPictureInPicture className="size-4" />
      </a>

      <div
        className={twMerge(
          "flex-row gap-2 items-center ml-auto mr-4 hidden group-hover:block",
          authenticatingProvider && "flex opacity-100"
        )}
      >
        {authenticatingProvider ? (
          <LuRefreshCw className="size-4 animate-spin" />
        ) : (
          <LuArrowRight className="size-4" />
        )}
      </div>
    </button>
  );
}

export default function ProvidersSelect() {
  const { providers } = usePlayerProviders();

  return (
    <div className="flex flex-col gap-1 w-96 bg-white/5 backdrop-blur-sm rounded-2xl p-2 border-2 border-black/50 ring-1 ring-white/15 shadow-lg">
      {Object.values(providers).map((provider) => {
        return <ProviderBtn key={provider.meta.id} provider={provider} />;
      })}
    </div>
  );
}
