<?php
include_once('lang.php');
?>
<!DOCTYPE html>
<html lang="<?=$lang;?>" class="h-screen w-screen bg-black">
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
        },
      }
    </script>

    <style>
        .custom-img-shadow {
            box-shadow:
                0 5px 10px rgba(0, 0, 0, 0.12),
                0 10px 20px rgba(0, 0, 0, 0.15),
                0 15px 28px rgba(0, 0, 0, 0.18),
                0 20px 38px rgba(0, 0, 0, 0.20);
        }

        [x-cloak] { display: none !important; }
    </style>

    <!-- Font -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@200..900&display=swap" rel="stylesheet">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>

    <script src="assets/js/scripts.js?ts=<?=time ()?>"></script>
    <script src="assets/js/spotify-web-api.js"></script>
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
    <div
        id="background-image-div"
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 translate-z-0 w-[max(115vh,115vw)] h-[max(115vh,115vw)]"
    >
        <div
            class="bg-cover bg-center transition-[background] duration-[2s] ease-in-out z-[-10] h-full w-full blur-2xl transform-gpu"
            style="background-image: url('assets/images/no_song.png');"
            :style="{
                backgroundImage: `url(${$store.player.targetImg ?? 'assets/images/no_song.png'})`
            }"
        >
            <div class="h-full w-full bg-black/30"></div>
        </div>
    </div>

    <div
        x-show="showOverlay"
        x-transition:enter.duration.100ms
        x-transition:leave.duration.500ms
        class="settings-div fadeInOut z-30 absolute top-6 left-0 right-0 flex items-center justify-center"
    >
        <div class="flex flex-row items-center gap-2 px-4 py-2 bg-white/10 border-2 border-white/40 text-white/80 rounded-full">
            <svg onclick="fullscreen()" class="cursor-pointer" width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.66675 6.66666H13.3334V9.33332H9.33341V13.3333H6.66675V6.66666ZM18.6667 6.66666H25.3334V13.3333H22.6667V9.33332H18.6667V6.66666ZM22.6667 18.6667H25.3334V25.3333H18.6667V22.6667H22.6667V18.6667ZM13.3334 22.6667V25.3333H6.66675V18.6667H9.33341V22.6667H13.3334Z" fill="white"/>
            </svg>
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
                    class="absolute bottom-6 right-6 z-30 p-3 bg-black/20 border-2 border-white/60 text-white rounded-full backdrop-blur-lg"
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
                    class="absolute bottom-6 right-6 z-30 p-3 bg-black/20 border-2 border-white/60 text-white rounded-full backdrop-blur-lg active:scale-95 transition"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-10 w-10" fill="currentColor" x-show="$store.webPlayback?.isPlaying"><path d="M14,19H18V5H14M6,19H10V5H6V19Z" /></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-10 w-10" fill="currentColor" x-show="!$store.webPlayback?.isPlaying"><path d="M8,5.14V19.14L19,12.14L8,5.14Z" /></svg>
                </button>

                <div
                    x-cloak
                    x-show="$store.webPlayback?.isConnected && showOverlay"
                    x-transition:enter.duration.100ms
                    x-transition:leave.duration.150ms
                    class="absolute bottom-6 left-6 z-30 flex flex-row bg-black/20 border-2 border-white/60 text-white rounded-full backdrop-blur-lg"
                >
                    <button class="px-3 py-1 active:scale-95 transition" @click="$store.webPlayback.previousTrack()">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-6 w-6" fill="currentColor"><path d="M6,18V6H8V18H6M9.5,12L18,6V18L9.5,12Z" /></svg>
                    </button>
                    <button class="px-3 py-1 active:scale-95 transition" @click="$store.webPlayback.nextTrack()">
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
        x-show="$store.webPlayback?.isAvailable && showOverlay && deviceName"
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
            isAvailable: false,
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
                player.addListener('initialization_error', ({ message }) => {
                    this.isAvailable = false;
                    console.error(message);
                });
                player.addListener('authentication_error', ({ message }) => {
                    this.isAvailable = false;
                    console.error(message);
                });
                player.addListener('account_error', ({ message }) => {
                    this.isAvailable = false;
                    console.error(message);
                });
                player.addListener('playback_error', ({ message }) => {
                    this.isAvailable = false;
                    console.error(message);
                });

                // Playback status updates
                player.addListener('player_state_changed', () => {
                    player.getCurrentState().then(state => {
                        this.isConnected = (state !== null && (state.playback_id && state.playback_id !== ""));
                        this.isPlaying = state !== null ? state.paused === false : false;
                    });
                });

                // Ready
                player.addListener('ready', ({ device_id }) => {
                    this.isAvailable = true;
                    console.log('Ready with Device ID', device_id);
                });

                // Not Ready
                player.addListener('not_ready', ({ device_id }) => {
                    this.isAvailable = false;
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
