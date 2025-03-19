import { json } from "@tanstack/react-start";
import { createAPIFileRoute } from "@tanstack/react-start/api";

import serverProviderManager from "@/providers/serverInstances";

export const APIRoute = createAPIFileRoute("/api/register/$token")({
  GET: async ({ request, params }) => {
    const provider = serverProviderManager.getProvider("spotify");
    provider?.createInstance("debug", {
      accessToken: params.token,
      refreshToken: params.token,
    });

    return json({ message: 'Hello "/api/register"!', token: params.token });
  },
});
