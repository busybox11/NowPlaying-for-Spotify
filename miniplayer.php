<?php
include_once ('lang.php');

$currentPlayback = null;

try {
    if (isset($_COOKIE['accessToken'])) {
        require_once 'lib/spotify_api.php';

        $api->setAccessToken($_COOKIE['accessToken']);

        $currentPlayback = $api->getMyCurrentPlaybackInfo();
    }
} catch (Exception $e) {
    echo $e->getMessage();
}
?>
<!DOCTYPE html>
<html lang="<?= $lang; ?>" class="h-screen w-screen bg-transparent overflow-hidden">

<head>
  <title x-text="`${$store.player.playbackObj.item?.name} - ${$store.player.playbackObj.item?.artists[0].name}">
    Spotify Connect - Now Playing</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <meta name="description"
    content="NowPlaying is a smooth Spotify Connect visualizer, updating in real-time and with playback support." />
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
    [x-cloak] {
      display: none !important;
    }
  </style>

  <!-- Font -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@200..900&display=swap" rel="stylesheet">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>

  <script src="assets/js/scripts.js?ts=<?= time() ?>"></script>
  <script>
    window.playerConfig = {
      showAlbum: urlParams.get('showAlbum') !== 'false',
      showProgress: urlParams.get('showProgress') !== 'false',
      showArtwork: urlParams.get('showArtwork') !== 'false',
      showPause: urlParams.get('showPause') !== 'false',
      transparentBackground: urlParams.get('transparentBackground') === 'true',
      hideOnPauseOrEmpty: urlParams.get('hideOnPauseOrEmpty') === 'true',

      useSmallAlbumCover: true,
    }
  </script>

  <script src="assets/js/spotify-web-api.js"></script>
  <script src="assets/js/playing.js?ts=<?= time() ?>"></script>

  <script>
    try {
      window.serverPlaybackState = <?= json_encode($currentPlayback); ?>
    } catch (e) {
      console.log(e)
    }
  </script>

  <?php
  require_once ('assets/analytics.php');
  echo getAnalyticsScript();
  ?>
</head>

<body x-data="{
    translations: {
      defaultTitleSong: '<?= defaultTitleSong; ?>',
      defaultArtistSong: '',
    },

    ...window.playerConfig,
  }" x-cloak class="h-screen w-screen transition opacity-100"
  :class="{ 'opacity-0': (!$store.player.playbackObj?.item || !$store.player.playbackObj?.is_playing) && hideOnPauseOrEmpty }"
  :style="{ 'background-color': transparentBackground || ((!$store.player.playbackObj?.item || !$store.player.playbackObj?.is_playing) && hideOnPauseOrEmpty) ? 'transparent' : '#000000' }">
  <div class="flex flex-row justify-center items-center h-screen">
    <div class="relative h-full w-auto flex-shrink-0">
      <img src="assets/images/no_song.png" :src="$store.player.targetImg ?? 'assets/images/no_song.png'"
        id="album-cover" class="h-full w-auto flex-shrink-0 aspect-square object-cover" x-show="showArtwork" x-cloak>

      <div x-show="showPause && $store.player.playbackObj?.is_playing === false && !hideOnPauseOrEmpty" x-cloak
        x-transition:enter.duration.100ms x-transition:leave.duration.150ms id="pause-icon"
        class="absolute bottom-[10%] right-[10%] z-30 p-3 bg-black/20 border-2 border-white/60 text-white rounded-full backdrop-blur-lg">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-10 w-10" fill="currentColor">
          <path d="M14,19H18V5H14M6,19H10V5H6V19Z" />
        </svg>
      </div>
    </div>

    <div class="relative flex flex-col h-full w-full text-white">
      <div class="flex flex-col my-auto mx-6">
        <h1 x-text="$store.player.playbackObj.item?.name ?? translations.defaultTitleSong" id="song-title"
          class="text-3xl font-bold text-pretty truncate w-full break-all" :class="{
            'line-clamp-1': showAlbum,
            'line-clamp-2': !showAlbum || !$store.player.playbackObj.item?.name,
          }"></h1>

        <div id="artist-or-podcast-container" class="flex gap-2">
          <svg
            x-show="$store.player.playbackObj.item?.type == 'episode'"
            class="lucide lucide-podcast my-auto opacity-75"
            xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
          >
            <path d="M16.85 18.58a9 9 0 1 0-9.7 0"/><path d="M8 14a5 5 0 1 1 8 0"/><circle cx="12" cy="11" r="1"/><path d="M13 17a1 1 0 1 0-2 0l.5 4.5a.5.5 0 1 0 1 0Z"/>
          </svg>
          <h2
            x-text="$store.player.playbackObj.item?.artists?.map(artist => artist.name).join(', ') ?? $store.player.playbackObj.item?.show?.publisher ?? translations.defaultArtistSong"
            id="song-artist" class="text-xl font-semibold line-clamp-1 text-pretty" :class="{ 'opacity-80': !showAlbum }">
          </h2>
        </div>

        <h3 x-show="showAlbum" x-text="$store.player.playbackObj?.item?.album?.name" id="song-album"
          class="text-xl font-semibold opacity-80 line-clamp-1 text-pretty"></h3>
      </div>

      <div x-show="showPause && !showArtwork && $store.player.playbackObj?.is_playing === false && !hideOnPauseOrEmpty"
        x-cloak x-transition:enter.opacity.duration.100ms x-transition:leave.opacity.duration.150ms id="pause-icon"
        class="absolute right-8 top-1/2 -translate-y-1/2 z-30 p-3 bg-black/20 border-2 border-white/60 text-white rounded-full backdrop-blur-lg">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-10 w-10" fill="currentColor">
          <path d="M14,19H18V5H14M6,19H10V5H6V19Z" />
        </svg>
      </div>

      <div id="progressbar_container" class="w-full overflow-hidden bg-white/30" x-show="showProgress">
        <div x-show="$store.player.playbackObj?.progress_ms" x-cloak id="progressbar" class="h-1 bg-white"
          :class="{ 'transition-all duration-1000 ease-linear': Math.abs($store.player.playbackObj?.progress_ms - $store.player.lastPlaybackObj?.progress_ms) < 5000 }"
          :style="{ width: `${($store.player.playbackObj?.progress_ms / $store.player.playbackObj?.item?.duration_ms) * 100}%` }">
        </div>
      </div>
    </div>
  </div>

  <script src="assets/js/alpine.min.js" defer></script>
</body>

</html>