<?php
if (!isset($_COOKIE['refreshToken']) || $_COOKIE['refreshTime'] < time()) {
    header('Location: login.php?generateMiniPlayer=true');
    die();
}

if(isset($_GET)){
    if(isset($_GET['lang']) && !empty($_GET['lang'])){
        setcookie('lang', $_GET['lang'], time() + 60*60*24*30);
    }
}

include_once('lang.php');

if(isset($_GET['lang'])){
    header('Location: '.$_SERVER['PHP_SELF']);
}

?>

<!DOCTYPE html>
<html lang="<?=$lang;?>" class="bg-[#000020] text-white">
<head>
	<title>Generate mini player - NowPlaying</title>
	<link rel="icon" type="image/png" href="assets/images/favicon.png">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="description" content="NowPlaying is a smooth Spotify Connect visualizer, updating in real-time and with playback support." />

	<meta name="twitter:card" content="summary" />
	<meta name="twitter:creator" content="@busybox11" />
	<meta name="twitter:image" content="https://<?=$_SERVER['SERVER_NAME'];?>/assets/images/favicon.png" />

	<meta property="og:title" content="NowPlaying" />
	<meta property="og:type" content="website" />
	<meta property="og:description" content="NowPlaying is a smooth Spotify Connect visualizer, updating in real-time and with playback support." />
	<meta property="og:image" content="https://<?=$_SERVER['SERVER_NAME'];?>/assets/images/favicon.png" />

	<meta name="theme-color" content="#23a92a" />

	<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
	<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@200..900&display=swap" rel="stylesheet">

	<script src="https://cdn.tailwindcss.com"></script>
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

  <script>
    const refreshToken = '<?=$_COOKIE['refreshToken'];?>';
    const currentUrl = window.location.origin + window.location.pathname.slice(0, window.location.pathname.lastIndexOf('/'));
  </script>
</head>

<body x-data="generatePlayerData" class="flex flex-col h-screen px-4 py-auto gap-8 items-center justify-center text-center">
	<div class="flex flex-col items-center justify-center w-full">
    <div class="flex flex-row gap-6 items-center justify-center">
      <a href="/">
        <img src="assets/images/favicon.png" alt="Logo" width="100px" height="100px">
      </a>

      <div>
		    <h1 class="text-3xl lg:text-4xl font-bold"><?=GenerateMiniPlayer;?></h1>

        <div class="flex flex-row gap-2 mt-2">
          <a href="https://github.com/busybox11/NowPlaying-for-Spotify">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              version="1.1"
              viewBox="0 0 24 24"
              class="text-white/50 hover:text-white transition h-6 w-6"
              fill="currentColor"
            >
              <path d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z" />
            </svg>
          </a>
          <a href="https://discord.gg/DMmk8Sc">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              version="1.1"
              viewBox="0 0 24 24"
              class="text-white/50 hover:text-white transition h-6 w-6"
              fill="currentColor"
            >
              <path d="M22,24L16.75,19L17.38,21H4.5A2.5,2.5 0 0,1 2,18.5V3.5A2.5,2.5 0 0,1 4.5,1H19.5A2.5,2.5 0 0,1 22,3.5V24M12,6.8C9.32,6.8 7.44,7.95 7.44,7.95C8.47,7.03 10.27,6.5 10.27,6.5L10.1,6.33C8.41,6.36 6.88,7.53 6.88,7.53C5.16,11.12 5.27,14.22 5.27,14.22C6.67,16.03 8.75,15.9 8.75,15.9L9.46,15C8.21,14.73 7.42,13.62 7.42,13.62C7.42,13.62 9.3,14.9 12,14.9C14.7,14.9 16.58,13.62 16.58,13.62C16.58,13.62 15.79,14.73 14.54,15L15.25,15.9C15.25,15.9 17.33,16.03 18.73,14.22C18.73,14.22 18.84,11.12 17.12,7.53C17.12,7.53 15.59,6.36 13.9,6.33L13.73,6.5C13.73,6.5 15.53,7.03 16.56,7.95C16.56,7.95 14.68,6.8 12,6.8M9.93,10.59C10.58,10.59 11.11,11.16 11.1,11.86C11.1,12.55 10.58,13.13 9.93,13.13C9.29,13.13 8.77,12.55 8.77,11.86C8.77,11.16 9.28,10.59 9.93,10.59M14.1,10.59C14.75,10.59 15.27,11.16 15.27,11.86C15.27,12.55 14.75,13.13 14.1,13.13C13.46,13.13 12.94,12.55 12.94,11.86C12.94,11.16 13.45,10.59 14.1,10.59Z" />
            </svg>
          </a>
          <a href="https://paypal.me/busybox11">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              version="1.1"
              viewBox="0 0 24 24"
              class="text-white/50 hover:text-white transition h-6 w-6"
              fill="currentColor"
            >
              <path d="M8.32 21.97a.546.546 0 0 1-.26-.32c-.03-.15-.06.11.6-4.09c.6-3.8.59-3.74.67-3.85c.13-.17.11-.17 1.61-.18c1.32-.03 1.6-.03 2.19-.12c3.25-.45 5.26-2.36 5.96-5.66c.04-.22.08-.41.09-.41c0-.01.07.04.15.1c1.03.78 1.38 2.22.99 4.14c-.46 2.29-1.68 3.81-3.58 4.46c-.81.28-1.49.39-2.69.42c-.8.04-.82.04-1.05.19c-.17.17-.16.14-.55 2.55c-.27 1.7-.37 2.25-.41 2.35c-.07.16-.21.3-.37.38l-.11.07H10c-1.29 0-1.62 0-1.68-.03m-4.5-2.23c-.19-.1-.32-.27-.32-.47C3.5 19 6.11 2.68 6.18 2.5c.09-.18.32-.37.5-.44L6.83 2h3.53c3.91 0 3.76 0 4.64.2c2.62.55 3.82 2.3 3.37 4.93c-.5 2.93-1.98 4.67-4.5 5.3c-.87.21-1.48.27-3.14.27c-1.31 0-1.41.01-1.67.15c-.26.15-.47.42-.56.75c-.04.07-.27 1.47-.53 3.1a241.3 241.3 0 0 0-.47 3.02l-.03.06H5.69c-1.58 0-1.8 0-1.87-.04z"></path>
            </svg>
          </a>
        </div>
      </div>
    </div>

    <div style="width: 600px;" class="bg-white/10 p-2 rounded-lg mt-8">
      <iframe
        :src="makeUrl()"
        class="w-full"
        height="130"
        style="border: none;"
      ></iframe>
    </div>

    <div style="width: 600px;" class="flex flex-row items-center mt-3">
      <div class="bg-white/10 rounded-l-lg w-full">
        <input type="text" class="w-full border-0 focus:ring-[#15883D] focus:ring-2 focus:ring-inset rounded-l-lg py-2 px-3 bg-transparent outline-none" :value="makeUrl()" readonly>
      </div>
      <button
        class="bg-[#15883D] py-2 px-3 rounded-r-lg"
        @click="navigator.clipboard.writeText(makeUrl())"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-6 w-6"><path d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z" /></svg>
      </button>
    </div>

    <!-- Config player -->
    <div class="flex flex-row gap-4 flex-wrap mt-4">
      <div class="flex flex-row gap-3 items-center">
        <input type="checkbox" id="showAlbum" x-model="playerConfig.showAlbum" class="accent-[#15883D] h-5 w-5">
        <label for="showAlbum">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-8 w-8" fill="currentColor"><path d="M12,11A1,1 0 0,0 11,12A1,1 0 0,0 12,13A1,1 0 0,0 13,12A1,1 0 0,0 12,11M12,16.5C9.5,16.5 7.5,14.5 7.5,12C7.5,9.5 9.5,7.5 12,7.5C14.5,7.5 16.5,9.5 16.5,12C16.5,14.5 14.5,16.5 12,16.5M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" /></svg>
        </label>
      </div>

      <div class="flex flex-row gap-3 items-center">
        <input type="checkbox" id="showArtwork" x-model="playerConfig.showArtwork" class="accent-[#15883D] h-5 w-5">
        <label for="showArtwork">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-8 w-8" fill="currentColor"><path d="M6,19L9,15.14L11.14,17.72L14.14,13.86L18,19H6M6,4H11V12L8.5,10.5L6,12M18,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V4A2,2 0 0,0 18,2Z" /></svg>
        </label>
      </div>

      <div class="flex flex-row gap-3 items-center">
        <input type="checkbox" id="showProgress" x-model="playerConfig.showProgress" class="accent-[#15883D] h-5 w-5">
        <label for="showProgress">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-8 w-8" fill="currentColor"><path d="M13,2.03V2.05L13,4.05C17.39,4.59 20.5,8.58 19.96,12.97C19.5,16.61 16.64,19.5 13,19.93V21.93C18.5,21.38 22.5,16.5 21.95,11C21.5,6.25 17.73,2.5 13,2.03M11,2.06C9.05,2.25 7.19,3 5.67,4.26L7.1,5.74C8.22,4.84 9.57,4.26 11,4.06V2.06M4.26,5.67C3,7.19 2.25,9.04 2.05,11H4.05C4.24,9.58 4.8,8.23 5.69,7.1L4.26,5.67M2.06,13C2.26,14.96 3.03,16.81 4.27,18.33L5.69,16.9C4.81,15.77 4.24,14.42 4.06,13H2.06M7.1,18.37L5.67,19.74C7.18,21 9.04,21.79 11,22V20C9.58,19.82 8.23,19.25 7.1,18.37M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z" /></svg>
        </label>
      </div>

      <div class="flex flex-row gap-3 items-center">
        <input type="checkbox" id="showPause" x-model="playerConfig.showPause" class="accent-[#15883D] h-5 w-5">
        <label for="showPause">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-8 w-8" fill="currentColor"><path d="M13,16V8H15V16H13M9,16V8H11V16H9M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4Z" /></svg>
        </label>
      </div>
    </div>
	</div>

  <script src="//unpkg.com/alpinejs" defer></script>
  <script>
    document.addEventListener('alpine:init', () => {
      Alpine.data('generatePlayerData', () => ({
        playerConfig: {
          showAlbum: true,
          showArtwork: true,
          showProgress: true,
          showPause: true,
        },

        makeUrl() {
          let baseUrl = 'miniplayer.php?';
          baseUrl += 'refreshToken=' + refreshToken;

          baseUrl += Object.keys(this.playerConfig).map(key => {
            return '&' + key + '=' + this.playerConfig[key];
          }).join('');

          return currentUrl + '/' + baseUrl;
        },
      }));
    })
  </script>
</body>
</html>
