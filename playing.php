<?php
include_once('lang.php');
?>
<!DOCTYPE html>
<html lang="<?=$lang;?>" class="h-screen w-screen">
<head>
    <title x-text="`${$store.player.playbackObj.item?.name} - ${$store.player.playbackObj.item?.artists[0].name}">Spotify Connect - Now Playing</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <meta name="description" content="NowPlaying is a smooth Spotify Connect visualizer, updating in real-time and with playback support." />
    <link rel="icon" type="image/png" href="assets/images/favicon.png">

    <script src="https://cdn.tailwindcss.com/"></script>
    <script>
      tailwind.config = {
        theme: {
          extend: {
            fontFamily: {
              'sans': ['Outfit', 'sans-serif']
            },
          }
        }
      }
    </script>

    <style>
        .custom-img-shadow {
            box-shadow: 0 19px 38px rgba(0, 0, 0, 0.30), 0 15px 12px rgba(0, 0, 0, 0.22);
        }

        [x-cloak] { display: none !important; }
    </style>

    <!-- Font -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@200..900&display=swap" rel="stylesheet">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>

    <script src="assets/js/spotify-web-api.js"></script>
    <script src="assets/js/scripts.js?ts=<?=time ()?>"></script>
    <script src="assets/js/playing.js?ts=<?=time ()?>"></script>
</head>
<body
    x-data="{
        translations: {
            defaultTitleSong: '<?=defaultTitleSong;?>',
            defaultArtistSong: '<?=defaultArtistSong;?>',
        },
        showOverlay: true,
        timeout: null,

        deviceName: window.deviceName,

        handleMouseMove() {
            this.showOverlay = true;

            window.clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                this.showOverlay = false;
            }, 6000);
        },
    }"
    x-init="handleMouseMove"
    @mousemove.throttle="handleMouseMove"
    class="flex h-screen w-screen overflow-hidden"
    :style="{
        cursor: showOverlay ? 'default' : 'none'
    }"
>
    <div id="background-image-div"
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[max(115vh,115vw)] h-[max(115vh,115vw)] aspect-square bg-cover bg-center blur-2xl z-[-10] bg-cover bg-center transition-[background] duration-[2s] ease-in-out"
        style="background-image: url('assets/images/no_song.png')"
        :style="{
            backgroundImage: `url(${$store.player.targetImg ?? 'assets/images/no_song.png'})`
        }"
    >
        <div class="h-full w-full bg-black/30"></div>
    </div>

    <div
        x-show="showOverlay"
        x-transition:enter.duration.100ms
        x-transition:leave.duration.500ms
        class="settings-div fadeInOut z-30 absolute top-6 left-0 right-0 flex items-center justify-center"
    >
        <div class="flex flex-row items-center gap-2 px-4 py-2 bg-white/10 border border-white/40 text-white/80 rounded-full">
            <svg onclick="fullscreen()" class="cursor-pointer" width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.66675 6.66666H13.3334V9.33332H9.33341V13.3333H6.66675V6.66666ZM18.6667 6.66666H25.3334V13.3333H22.6667V9.33332H18.6667V6.66666ZM22.6667 18.6667H25.3334V25.3333H18.6667V22.6667H22.6667V18.6667ZM13.3334 22.6667V25.3333H6.66675V18.6667H9.33341V22.6667H13.3334Z" fill="white"/>
            </svg>
            <!--
                <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23.3333 16C22.8029 16 22.2942 15.7893 21.9191 15.4142C21.544 15.0391 21.3333 14.5304 21.3333 14C21.3333 13.4696 21.544 12.9609 21.9191 12.5858C22.2942 12.2107 22.8029 12 23.3333 12C23.8638 12 24.3725 12.2107 24.7475 12.5858C25.1226 12.9609 25.3333 13.4696 25.3333 14C25.3333 14.5304 25.1226 15.0391 24.7475 15.4142C24.3725 15.7893 23.8638 16 23.3333 16ZM19.3333 10.6667C18.8029 10.6667 18.2942 10.456 17.9191 10.0809C17.544 9.70581 17.3333 9.1971 17.3333 8.66667C17.3333 8.13623 17.544 7.62753 17.9191 7.25245C18.2942 6.87738 18.8029 6.66667 19.3333 6.66667C19.8638 6.66667 20.3725 6.87738 20.7475 7.25245C21.1226 7.62753 21.3333 8.13623 21.3333 8.66667C21.3333 9.1971 21.1226 9.70581 20.7475 10.0809C20.3725 10.456 19.8638 10.6667 19.3333 10.6667ZM12.6667 10.6667C12.1362 10.6667 11.6275 10.456 11.2525 10.0809C10.8774 9.70581 10.6667 9.1971 10.6667 8.66667C10.6667 8.13623 10.8774 7.62753 11.2525 7.25245C11.6275 6.87738 12.1362 6.66667 12.6667 6.66667C13.1971 6.66667 13.7058 6.87738 14.0809 7.25245C14.456 7.62753 14.6667 8.13623 14.6667 8.66667C14.6667 9.1971 14.456 9.70581 14.0809 10.0809C13.7058 10.456 13.1971 10.6667 12.6667 10.6667ZM8.66667 16C8.13623 16 7.62753 15.7893 7.25245 15.4142C6.87738 15.0391 6.66667 14.5304 6.66667 14C6.66667 13.4696 6.87738 12.9609 7.25245 12.5858C7.62753 12.2107 8.13623 12 8.66667 12C9.1971 12 9.70581 12.2107 10.0809 12.5858C10.456 12.9609 10.6667 13.4696 10.6667 14C10.6667 14.5304 10.456 15.0391 10.0809 15.4142C9.70581 15.7893 9.1971 16 8.66667 16ZM16 4C12.8174 4 9.76515 5.26428 7.51472 7.51472C5.26428 9.76515 4 12.8174 4 16C4 19.1826 5.26428 22.2348 7.51472 24.4853C9.76515 26.7357 12.8174 28 16 28C16.5304 28 17.0391 27.7893 17.4142 27.4142C17.7893 27.0391 18 26.5304 18 26C18 25.48 17.8 25.0133 17.48 24.6667C17.1733 24.3067 16.9733 23.84 16.9733 23.3333C16.9733 22.8029 17.184 22.2942 17.5591 21.9191C17.9342 21.544 18.4429 21.3333 18.9733 21.3333H21.3333C23.1014 21.3333 24.7971 20.631 26.0474 19.3807C27.2976 18.1305 28 16.4348 28 14.6667C28 8.77333 22.6267 4 16 4Z" fill="white"/>
                </svg>

                <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" class="ml-4">
                    <path d="M16 20.6667C14.7624 20.6667 13.5754 20.175 12.7002 19.2998C11.825 18.4247 11.3334 17.2377 11.3334 16C11.3334 14.7623 11.825 13.5753 12.7002 12.7002C13.5754 11.825 14.7624 11.3333 16 11.3333C17.2377 11.3333 18.4247 11.825 19.2999 12.7002C20.175 13.5753 20.6667 14.7623 20.6667 16C20.6667 17.2377 20.175 18.4247 19.2999 19.2998C18.4247 20.175 17.2377 20.6667 16 20.6667ZM25.9067 17.2933C25.96 16.8667 26 16.44 26 16C26 15.56 25.96 15.12 25.9067 14.6667L28.72 12.4933C28.9734 12.2933 29.04 11.9333 28.88 11.64L26.2134 7.02666C26.0534 6.73333 25.6934 6.61333 25.4 6.73333L22.08 8.06666C21.3867 7.54666 20.6667 7.09333 19.8267 6.75999L19.3334 3.22666C19.3063 3.06962 19.2245 2.92723 19.1025 2.82473C18.9804 2.72223 18.8261 2.66623 18.6667 2.66666H13.3334C13 2.66666 12.72 2.90666 12.6667 3.22666L12.1734 6.75999C11.3334 7.09333 10.6134 7.54666 9.92003 8.06666L6.60003 6.73333C6.3067 6.61333 5.9467 6.73333 5.7867 7.02666L3.12003 11.64C2.9467 11.9333 3.0267 12.2933 3.28003 12.4933L6.09336 14.6667C6.04003 15.12 6.00003 15.56 6.00003 16C6.00003 16.44 6.04003 16.8667 6.09336 17.2933L3.28003 19.5067C3.0267 19.7067 2.9467 20.0667 3.12003 20.36L5.7867 24.9733C5.9467 25.2667 6.3067 25.3733 6.60003 25.2667L9.92003 23.92C10.6134 24.4533 11.3334 24.9067 12.1734 25.24L12.6667 28.7733C12.72 29.0933 13 29.3333 13.3334 29.3333H18.6667C19 29.3333 19.28 29.0933 19.3334 28.7733L19.8267 25.24C20.6667 24.8933 21.3867 24.4533 22.08 23.92L25.4 25.2667C25.6934 25.3733 26.0534 25.2667 26.2134 24.9733L28.88 20.36C29.04 20.0667 28.9734 19.7067 28.72 19.5067L25.9067 17.2933Z" fill="white"/>
                </svg>
            -->
        </div>
    </div>

    <div class="h-full w-full flex align-center justify-center z-20">
        <div class="flex flex-col lg:flex-row gap-6 lg:gap-12 justify-center items-center px-6 lg:px-12 xl:px-0 w-full xl:w-5/6">
            <div class="relative w-[30rem] flex-shrink-0">
                <img
                    src="assets/images/no_song.png"
                    :src="$store.player.targetImg ?? 'assets/images/no_song.png'"
                    class="rounded-2xl h-auto w-full custom-img-shadow"
                >

                <!-- Normal player -->

                <div
                    x-cloak
                    x-show="$store.webPlayback?.isConnected ? false : ($store.player.playbackObj?.is_playing !== undefined) ? ($store.player.playbackObj?.is_playing === false) : false"
                    x-transition:enter.duration.100ms
                    x-transition:leave.duration.150ms
                    class="absolute bottom-6 right-6 z-30 p-3 bg-black/20 border border-white/60 text-white rounded-full backdrop-blur-lg"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-10 w-10" fill="currentColor"><path d="M14,19H18V5H14M6,19H10V5H6V19Z" /></svg>
                </div>

                <!-- Web playback SDK -->

                <button
                    x-cloak
                    @click="$store.webPlayback.togglePlay()"
                    x-show="$store.webPlayback?.isConnected ? ($store.webPlayback?.isPlaying === false) || showOverlay : false"
                    x-transition:enter.duration.100ms
                    x-transition:leave.duration.150ms
                    class="absolute bottom-6 right-6 z-30 p-3 bg-black/20 border border-white/60 text-white rounded-full backdrop-blur-lg"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-10 w-10" fill="currentColor" x-show="$store.webPlayback?.isPlaying"><path d="M14,19H18V5H14M6,19H10V5H6V19Z" /></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-10 w-10" fill="currentColor" x-show="!$store.webPlayback?.isPlaying"><path d="M8,5.14V19.14L19,12.14L8,5.14Z" /></svg>
                </button>

                <div
                    x-cloak
                    x-show="$store.webPlayback?.isConnected && showOverlay"
                    x-transition:enter.duration.100ms
                    x-transition:leave.duration.150ms
                    class="absolute bottom-6 left-6 z-30 flex flex-row bg-black/20 border border-white/60 text-white rounded-full backdrop-blur-lg"
                >
                    <button class="px-3 py-1" @click="$store.webPlayback.previousTrack()">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-6 w-6" fill="currentColor"><path d="M6,18V6H8V18H6M9.5,12L18,6V18L9.5,12Z" /></svg>
                    </button>
                    <button class="px-3 py-1" @click="$store.webPlayback.nextTrack()">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-6 w-6" fill="currentColor"><path d="M16,18H18V6H16M6,18L14.5,12L6,6V18Z" /></svg>
                    </button>
                </div>
            </div>

            <div class="flex flex-col lg:gap-1 xl:gap-2 w-full text-white">
                <h1 x-text="$store.player.playbackObj.item?.name ?? translations.defaultTitleSong" class="text-4xl lg:text-7xl font-bold" style="text-wrap: balance"></h1>
                <h2 x-text="$store.player.playbackObj.item?.artists?.map(artist => artist.name).join(', ') ?? translations.defaultArtistSong" class="text-2xl lg:text-5xl font-bold" style="text-wrap: balance"></h2>
                <h3 x-text="$store.player.playbackObj?.item?.album?.name" class="text-xl lg:text-4xl font-semibold opacity-80" style="text-wrap: balance"></h3>

                <div class="flex flex-col gap-2 lg:gap-3 mt-4 lg:mt-8 w-full">
                    <div class="text-xl flex flex-row justify-between w-full font-semibold">
                        <span x-text="msToTime($store.player.playbackObj?.progress_ms)" x-show="$store.player.playbackObj?.progress_ms" x-cloak></span>
                        <span x-text="msToTime($store.player.playbackObj?.item?.duration_ms)" x-show="$store.player.playbackObj?.item?.duration_ms" x-cloak></span>
                    </div>

                    <div class="h-3 w-full rounded-full overflow-hidden bg-white/30">
                        <div
                            id="progressbar"
                            class="h-full bg-white"
                            :class="{
                                'transition-all duration-1000 ease-linear': Math.abs($store.player.playbackObj?.progress_ms - $store.player.lastPlaybackObj?.progress_ms) < 5000
                            }"
                            :style="{
                                width: `${($store.player.playbackObj?.progress_ms / $store.player.playbackObj?.item?.duration_ms) * 100}%`
                            }"
                        ></div>
                    </div>

                    <div class="flex flex-row gap-3 items-center">
                        <div>
                            <svg width="42" height="42" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 15H36V30H12M36 33C36.7956 33 37.5587 32.6839 38.1213 32.1213C38.6839 31.5587 39 30.7956 39 30V15C39 14.2044 38.6839 13.4413 38.1213 12.8787C37.5587 12.3161 36.7956 12 36 12H12C10.335 12 9 13.335 9 15V30C9 30.7956 9.31607 31.5587 9.87868 32.1213C10.4413 32.6839 11.2044 33 12 33H6V36H42V33H36Z" fill="white"/></svg>
                        </div>

                        <span class="text-xl font-bold"><span x-text="$store.player.playbackObj?.device?.name ?? 'Spotify Connect'"></span><span class="text-white/80 font-semibold"></span></span>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div
        x-cloak
        x-show="showOverlay && deviceName"
        x-transition:enter.duration.100ms
        x-transition:leave.duration.500ms
        class="absolute bottom-8 left-12 z-30 flex flex-row items-center gap-2 px-4 py-1 bg-white/10 border border-white/40 text-white/80 rounded-full"
    >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-6 w-6" fill="currentColor"><path d="M16.5 3H21.5C22.3 3 23 3.7 23 4.5V7.5C23 8.3 22.3 9 21.5 9H18L15 12V4.5C15 3.7 15.7 3 16.5 3M3 3C1.9 3 1 3.9 1 5V19C1 20.1 1.9 21 3 21H11C12.1 21 13 20.1 13 19V5C13 3.9 12.1 3 11 3H3M7 5C8.1 5 9 5.9 9 7S8.1 9 7 9 5 8.1 5 7 5.9 5 7 5M7 11C9.2 11 11 12.8 11 15S9.2 19 7 19 3 17.2 3 15 4.8 11 7 11M7 13C5.9 13 5 13.9 5 15S5.9 17 7 17 9 16.1 9 15 8.1 13 7 13" /></svg>
        <span x-text="deviceName"></span>
    </div>

    <script src="//unpkg.com/alpinejs" defer></script>
    <script src="https://sdk.scdn.co/spotify-player.js"></script>
    <script>
    window.deviceName = 'NowPlaying #' + localStorage.getItem('deviceId');

    const waitForSpotify = new Promise((resolve, reject) => {
        window.onSpotifyWebPlaybackSDKReady = () => {
            resolve();
        };
    });
    const waitForAlpine = new Promise((resolve, reject) => {
        document.addEventListener('alpine:init', () => {
            resolve();
        });
    });

    Promise.all([waitForSpotify, waitForAlpine]).then(() => {
        const token = readCookie('accessToken');

        let player;
        Alpine.store('webPlayback', {
            isConnected: false,
            isPlaying: false,

            togglePlay() {
                player.togglePlay();
            },

            nextTrack() {
                player.nextTrack().then(() => {
                    Alpine.store('player').fetchState();
                });
            },

            previousTrack() {
                player.getCurrentState().then(state => {
                    if (state) {
                        if(state.position > 5000 || state.track_window.previous_tracks.length === 0)
                            player.seek(0).then(() => {
                                Alpine.store('player').fetchState();
                            });
                        else
                            player.previousTrack().then(() => {
                                Alpine.store('player').fetchState();
                            });
                    }
                });
            },

            init() {
                player = new Spotify.Player({
                    name: window.deviceName,
                    getOAuthToken: cb => { cb(token); }
                });

                // Error handling
                player.addListener('initialization_error', ({ message }) => { console.error(message); });
                player.addListener('authentication_error', ({ message }) => { console.error(message); });
                player.addListener('account_error', ({ message }) => { console.error(message); });
                player.addListener('playback_error', ({ message }) => { console.error(message); });

                // Playback status updates
                player.addListener('player_state_changed', () => {
                    player.getCurrentState().then(state => {
                        this.isConnected = (state !== null && (state.playback_id && state.playback_id !== ""));
                        this.isPlaying = state !== null ? state.paused === false : false;
                    });
                });

                // Ready
                player.addListener('ready', ({ device_id }) => {
                    console.log('Ready with Device ID', device_id);
                });

                // Not Ready
                player.addListener('not_ready', ({ device_id }) => {
                    console.log('Device ID has gone offline', device_id);
                });

                // Connect to the player
                player.connect();
            },
        });
    });
    </script>
</body>
</html>
