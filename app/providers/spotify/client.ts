import { SPOTIFY_OAUTH_SCOPES } from "./constants";
import {
  SpotifyApi,
  AuthorizationCodeWithPKCEStrategy,
} from "@spotify/web-api-ts-sdk";

import { providerConfig } from "./config";
import {
  IProviderClient,
  IProviderClientConstructor,
} from "@/types/providers/client";
import spotifyProviderMeta from "@/providers/spotify";

const { VITE_SPOTIFY_CLIENT_ID, VITE_SPOTIFY_REDIRECT_URI } = providerConfig;

export default class SpotifyProvider implements IProviderClient {
  readonly meta = spotifyProviderMeta;
  isAuthenticated = false;

  // API event handlers
  private onAuth: () => void;

  constructor({ onAuth }: IProviderClientConstructor) {
    this.onAuth = onAuth;
  }

  async authenticate() {
    const auth = new AuthorizationCodeWithPKCEStrategy(
      VITE_SPOTIFY_CLIENT_ID,
      VITE_SPOTIFY_REDIRECT_URI,
      [...SPOTIFY_OAUTH_SCOPES]
    );
    const client = new SpotifyApi(auth);

    try {
      const { authenticated } = await client.authenticate();

      if (authenticated) {
        this.isAuthenticated = true;
        this.onAuth();
      }
    } catch (e) {
      console.error(e);
    }
  }

  async callback() {
    await this.authenticate();
  }
}
