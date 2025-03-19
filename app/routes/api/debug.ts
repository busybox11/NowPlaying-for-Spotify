import { json } from "@tanstack/react-start";
import { createAPIFileRoute } from "@tanstack/react-start/api";

import serverProviderManager from "@/providers/serverInstances";

export const APIRoute = createAPIFileRoute("/api/debug")({
  GET: async ({ request, params }) => {
    const provider = serverProviderManager.getProvider("spotify");
    console.log(provider);

    return json({ message: 'Hello "/api/debug"!' });
  },
});
