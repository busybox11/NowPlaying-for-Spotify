import Locales from "@/components/Home/Locales";
import TestTrpc from "@/components/TestTrpc";
import Image from "next/image";

export default function Page() {
  return (
    <main className="flex flex-col h-screen px-4 py-auto gap-8 items-center justify-center text-center">
      <div className="flex flex-col items-center justify-center">
        <Image
          src="/favicon.png"
          width={100}
          height={100}
          alt="NowPlaying logo"
          className="mb-4"
        />

        <h1 className="text-3xl lg:text-4xl font-bold text-pretty">
          Welcome to NowPlaying for Spotify!
        </h1>
        <h2 className="text-xl lg:text-2xl font-light mb-2 text-pretty">
          Please login with your Spotify account.
        </h2>

        <div className="flex flex-row gap-2 mt-2">
          <a href="https://github.com/busybox11/NowPlaying-for-Spotify">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              viewBox="0 0 24 24"
              className="text-white/50 hover:text-white transition h-6 w-6"
              fill="currentColor"
            >
              <path d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z"></path>
            </svg>
          </a>
          <a href="https://discord.gg/DMmk8Sc">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              viewBox="0 0 24 24"
              className="text-white/50 hover:text-white transition h-6 w-6"
              fill="currentColor"
            >
              <path d="M22,24L16.75,19L17.38,21H4.5A2.5,2.5 0 0,1 2,18.5V3.5A2.5,2.5 0 0,1 4.5,1H19.5A2.5,2.5 0 0,1 22,3.5V24M12,6.8C9.32,6.8 7.44,7.95 7.44,7.95C8.47,7.03 10.27,6.5 10.27,6.5L10.1,6.33C8.41,6.36 6.88,7.53 6.88,7.53C5.16,11.12 5.27,14.22 5.27,14.22C6.67,16.03 8.75,15.9 8.75,15.9L9.46,15C8.21,14.73 7.42,13.62 7.42,13.62C7.42,13.62 9.3,14.9 12,14.9C14.7,14.9 16.58,13.62 16.58,13.62C16.58,13.62 15.79,14.73 14.54,15L15.25,15.9C15.25,15.9 17.33,16.03 18.73,14.22C18.73,14.22 18.84,11.12 17.12,7.53C17.12,7.53 15.59,6.36 13.9,6.33L13.73,6.5C13.73,6.5 15.53,7.03 16.56,7.95C16.56,7.95 14.68,6.8 12,6.8M9.93,10.59C10.58,10.59 11.11,11.16 11.1,11.86C11.1,12.55 10.58,13.13 9.93,13.13C9.29,13.13 8.77,12.55 8.77,11.86C8.77,11.16 9.28,10.59 9.93,10.59M14.1,10.59C14.75,10.59 15.27,11.16 15.27,11.86C15.27,12.55 14.75,13.13 14.1,13.13C13.46,13.13 12.94,12.55 12.94,11.86C12.94,11.16 13.45,10.59 14.1,10.59Z"></path>
            </svg>
          </a>
          <a href="https://paypal.me/busybox11">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              viewBox="0 0 24 24"
              className="text-white/50 hover:text-white transition h-6 w-6"
              fill="currentColor"
            >
              <path d="M8.32 21.97a.546.546 0 0 1-.26-.32c-.03-.15-.06.11.6-4.09c.6-3.8.59-3.74.67-3.85c.13-.17.11-.17 1.61-.18c1.32-.03 1.6-.03 2.19-.12c3.25-.45 5.26-2.36 5.96-5.66c.04-.22.08-.41.09-.41c0-.01.07.04.15.1c1.03.78 1.38 2.22.99 4.14c-.46 2.29-1.68 3.81-3.58 4.46c-.81.28-1.49.39-2.69.42c-.8.04-.82.04-1.05.19c-.17.17-.16.14-.55 2.55c-.27 1.7-.37 2.25-.41 2.35c-.07.16-.21.3-.37.38l-.11.07H10c-1.29 0-1.62 0-1.68-.03m-4.5-2.23c-.19-.1-.32-.27-.32-.47C3.5 19 6.11 2.68 6.18 2.5c.09-.18.32-.37.5-.44L6.83 2h3.53c3.91 0 3.76 0 4.64.2c2.62.55 3.82 2.3 3.37 4.93c-.5 2.93-1.98 4.67-4.5 5.3c-.87.21-1.48.27-3.14.27c-1.31 0-1.41.01-1.67.15c-.26.15-.47.42-.56.75c-.04.07-.27 1.47-.53 3.1a241.3 241.3 0 0 0-.47 3.02l-.03.06H5.69c-1.58 0-1.8 0-1.87-.04z"></path>
            </svg>
          </a>
          <a href="https://ko-fi.com/busybox11">
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              className="text-white/50 hover:text-white transition h-6 w-6"
              fill="currentColor"
            >
              <path d="M31.844 11.932c-1.032-5.448-6.48-6.125-6.48-6.125h-24.4c-0.808 0-0.907 1.063-0.907 1.063s-0.109 9.767-0.027 15.767c0.22 3.228 3.448 3.561 3.448 3.561s11.021-0.031 15.953-0.067c3.251-0.568 3.579-3.423 3.541-4.98 5.808 0.323 9.896-3.776 8.871-9.219zM17.093 16.615c-1.661 1.932-5.348 5.297-5.348 5.297s-0.161 0.161-0.417 0.031c-0.099-0.073-0.14-0.12-0.14-0.12-0.595-0.588-4.491-4.063-5.381-5.271-0.943-1.287-1.385-3.599-0.119-4.948 1.265-1.344 4.005-1.448 5.817 0.541 0 0 2.083-2.375 4.625-1.281 2.536 1.095 2.443 4.016 0.963 5.751zM25.323 17.251c-1.24 0.156-2.244 0.036-2.244 0.036v-7.573h2.359c0 0 2.631 0.735 2.631 3.516 0 2.552-1.313 3.557-2.745 4.021z"></path>
            </svg>
          </a>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <a
          href="login.php"
          className="bg-primary px-12 py-3 rounded-full text-lg tracking-wide active:scale-95 transition mx-auto"
        >
          Login to Spotify
        </a>

        <a
          href="login.php?generateMiniPlayer=true"
          className="border-b-2 text-white/70 hover:text-white border-white/50 hover:border-white/70 text-lg tracking-wide active:scale-95 transition mx-auto"
        >
          Generate mini player
        </a>
      </div>

      <Locales />

      <h6 className="text-xs text-white/50 hover:text-white/80 transition text-pretty">
        By clicking on 'LOGIN TO SPOTIFY', you accept the use of cookies
        necessary for the proper functioning of the site.
      </h6>

      <TestTrpc />
    </main>
  );
}
