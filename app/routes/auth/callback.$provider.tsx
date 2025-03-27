import { createFileRoute, useNavigate } from "@tanstack/react-router";

import { useEffect } from "react";
import { usePlayerProviders } from "@/components/contexts/PlayerProviders";
import useProviderHandler from "@/hooks/Providers/useProviderHandler";

export const Route = createFileRoute("/auth/callback/$provider")({
  component: RouteComponent,
});

function RouteComponent() {
  const { provider } = Route.useParams();
  const navigate = useNavigate();

  const { providers } = usePlayerProviders();

  const targetProvider = providers[provider];
  useProviderHandler(
    targetProvider.isAuthenticated ? targetProvider : undefined
  );

  if (!targetProvider) {
    return <h1>Provider not found</h1>;
  }

  useEffect(() => {
    providers[provider].callback().then(() => {
      providers[provider].registerPlayer();

      navigate({
        to: "/playing",
        replace: true,
      });
    });
  }, []);

  return (
    <main className="flex items-center justify-center h-screen">
      <h1>Authenticating...</h1>
    </main>
  );
}
