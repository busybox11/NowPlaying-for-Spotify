import { SPOTIFY_OAUTH_SCOPES } from "./constants";
import {
  AccessToken,
  SpotifyApi,
  AuthorizationCodeWithPKCEStrategy,
} from "@spotify/web-api-ts-sdk";

import { providerConfig } from "./config";

const { VITE_SPOTIFY_CLIENT_ID, VITE_SPOTIFY_REDIRECT_URI } = providerConfig;

export async function authenticate(callback: (token: AccessToken) => void) {
  const auth = new AuthorizationCodeWithPKCEStrategy(
    VITE_SPOTIFY_CLIENT_ID,
    VITE_SPOTIFY_REDIRECT_URI,
    [...SPOTIFY_OAUTH_SCOPES]
  );
  const client = new SpotifyApi(auth);

  try {
    const { authenticated } = await client.authenticate();

    if (authenticated) {
      console.log("Authenticated");
    }
  } catch (e) {
    console.error(e);
  }
}
