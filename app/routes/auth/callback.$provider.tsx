import { createFileRoute, useNavigate } from "@tanstack/react-router";

import { useEffect } from "react";
import { usePlayerProviders } from "@/components/contexts/PlayerProviders";

export const Route = createFileRoute("/auth/callback/$provider")({
  component: RouteComponent,
});

function RouteComponent() {
  const { provider } = Route.useParams();
  const navigate = useNavigate();

  const { providers } = usePlayerProviders();

  if (!providers[provider]) {
    return <h1>Provider not found</h1>;
  }

  useEffect(() => {
    providers[provider].callback().then(() => {
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
