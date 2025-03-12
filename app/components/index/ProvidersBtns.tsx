import ClientOnly from "@/components/ClientOnly";
import { usePlayerProviders } from "@/components/contexts/PlayerProviders";
import type { IProviderClient } from "@/types/providers/client";
import { useTranslation } from "react-i18next";
import { useMemo, useState } from "react";

import { LuRefreshCcw } from "react-icons/lu";

const defaultProviderSymbol = Symbol("default");

export default function ProvidersBtns() {
  const { t } = useTranslation();

  const [isProviderAuth, setIsProviderAuth] = useState<
    typeof defaultProviderSymbol | string | null
  >(null);

  const { providers, lastUsedProvider } = usePlayerProviders();

  const { defaultProvider, otherProviders } = useMemo(() => {
    const defaultProviderId = lastUsedProvider
      ? lastUsedProvider.id
      : "spotify";

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
  }, [providers, lastUsedProvider]);

  const handleAuthProvider = async (
    provider: IProviderClient,
    isDefault: boolean
  ) => {
    if (isDefault) {
      setIsProviderAuth(defaultProviderSymbol);
    } else {
      setIsProviderAuth(provider.meta.id);
    }

    try {
      await provider.authenticate();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <ClientOnly>
      <div className="flex flex-col gap-4">
        <button
          onClick={() => handleAuthProvider(defaultProvider, true)}
          className="relative cursor-pointer bg-[#15883D] px-12 py-3 rounded-full text-lg tracking-wide active:scale-95 transition mx-auto"
        >
          {isProviderAuth === defaultProviderSymbol && (
            <div className="absolute -right-2 -top-2 flex items-center justify-center bg-[#15883D] ring-4 ring-[#000020] p-1.5 rounded-full">
              <LuRefreshCcw className="size-5 animate-spin" />
            </div>
          )}
          {t("index.connection", { provider: defaultProvider.meta.name })}
        </button>

        {Object.entries(otherProviders).map(([key, provider]) => {
          return (
            <button
              key={key}
              onClick={() => handleAuthProvider(provider, false)}
              className="relative cursor-pointer border-b-2 text-white/70 hover:text-white border-white/50 hover:border-white/70 text-lg tracking-wide active:scale-95 transition mx-auto"
            >
              {provider.meta.name}

              {isProviderAuth === provider.meta.id && (
                <div className="absolute -right-8 h-full top-0 bottom-0 flex items-center justify-center">
                  <LuRefreshCcw className="size-4 animate-spin" />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </ClientOnly>
  );
}
