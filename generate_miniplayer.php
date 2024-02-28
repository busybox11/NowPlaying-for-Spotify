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
			    <?php include 'assets/links.php'; ?>
        </div>
      </div>
    </div>

    <div style="width: 550px;" class="bg-white/10 p-2 rounded-lg mt-8">
      <iframe
        :src="makeUrl()"
        class="w-full"
        height="130"
        style="border: none;"
      ></iframe>
    </div>

    <div style="width: 550px;" class="flex flex-row items-center mt-3">
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

    <span class="mt-4 text-white/70 hover:text-white transition">550 x 130</span>

    <!-- Config player -->
    <div class="flex flex-row gap-8 flex-wrap mt-4">
      <div class="flex flex-row gap-3 items-center" title="Show the album name">
        <input type="checkbox" id="showAlbum" x-model="playerConfig.showAlbum" class="accent-[#15883D] h-5 w-5">
        <label for="showAlbum">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-8 w-8" fill="currentColor"><path d="M12,11A1,1 0 0,0 11,12A1,1 0 0,0 12,13A1,1 0 0,0 13,12A1,1 0 0,0 12,11M12,16.5C9.5,16.5 7.5,14.5 7.5,12C7.5,9.5 9.5,7.5 12,7.5C14.5,7.5 16.5,9.5 16.5,12C16.5,14.5 14.5,16.5 12,16.5M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" /></svg>
        </label>
      </div>

      <div class="flex flex-row gap-3 items-center" title="Show the album artwork">
        <input type="checkbox" id="showArtwork" x-model="playerConfig.showArtwork" class="accent-[#15883D] h-5 w-5">
        <label for="showArtwork">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-8 w-8" fill="currentColor"><path d="M6,19L9,15.14L11.14,17.72L14.14,13.86L18,19H6M6,4H11V12L8.5,10.5L6,12M18,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V4A2,2 0 0,0 18,2Z" /></svg>
        </label>
      </div>

      <div class="flex flex-row gap-3 items-center" title="Show the progress bar">
        <input type="checkbox" id="showProgress" x-model="playerConfig.showProgress" class="accent-[#15883D] h-5 w-5">
        <label for="showProgress">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-8 w-8" fill="currentColor"><path d="M13,2.03V2.05L13,4.05C17.39,4.59 20.5,8.58 19.96,12.97C19.5,16.61 16.64,19.5 13,19.93V21.93C18.5,21.38 22.5,16.5 21.95,11C21.5,6.25 17.73,2.5 13,2.03M11,2.06C9.05,2.25 7.19,3 5.67,4.26L7.1,5.74C8.22,4.84 9.57,4.26 11,4.06V2.06M4.26,5.67C3,7.19 2.25,9.04 2.05,11H4.05C4.24,9.58 4.8,8.23 5.69,7.1L4.26,5.67M2.06,13C2.26,14.96 3.03,16.81 4.27,18.33L5.69,16.9C4.81,15.77 4.24,14.42 4.06,13H2.06M7.1,18.37L5.67,19.74C7.18,21 9.04,21.79 11,22V20C9.58,19.82 8.23,19.25 7.1,18.37M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z" /></svg>
        </label>
      </div>

      <div class="flex flex-row gap-3 items-center" title="Show the pause icon when the player is paused">
        <input type="checkbox" id="showPause" x-model="playerConfig.showPause" class="accent-[#15883D] h-5 w-5">
        <label for="showPause">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-8 w-8" fill="currentColor"><path d="M13,16V8H15V16H13M9,16V8H11V16H9M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4Z" /></svg>
        </label>
      </div>

      <div class="flex flex-row gap-3 items-center" title="Make the background transparent">
        <input type="checkbox" id="transparentBackground" x-model="playerConfig.transparentBackground" class="accent-[#15883D] h-5 w-5">
        <label for="transparentBackground">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-8 w-8" fill="currentColor"><path d="M16 14V12H17.61C17.85 12.71 18 13.39 18 14H16M15.58 8C15.12 7.29 14.65 6.61 14.2 6H14V8H15.58M16 12V10H14V12H16M16 8.68V10H16.74C16.5 9.56 16.26 9.11 16 8.68M12 16V14H14V12H12V10H14V8H12V6H14V5.73C12.9 4.26 12 3.25 12 3.25S6 10 6 14C6 17.31 8.69 20 12 20V18H14V16H12M14 19.65C14.75 19.39 15.42 19 16 18.46V18H14V19.65M14 16H16V14H14V16M16 18H16.46C17 17.42 17.39 16.75 17.65 16H16V18Z" /></svg>
        </label>
      </div>

      <div class="flex flex-row gap-3 items-center" title="Hide the player when paused or empty">
        <input type="checkbox" id="hideOnPauseOrEmpty" x-model="playerConfig.hideOnPauseOrEmpty" class="accent-[#15883D] h-5 w-5">
        <label for="hideOnPauseOrEmpty">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-8 w-8" fill="currentColor">
          <path d="M16 14V12H17.61C17.85 12.71 18 13.39 18 14H16ZM15.58 8C15.12 7.29 14.65 6.61 14.2 6H14V8H15.58ZM16 12V10H14V12H16ZM16 8.68V10H16.74C16.5 9.56 16.26 9.11 16 8.68ZM12 16V14H14V12H12V10H14V8H12V6H14V5.73C12.9 4.26 12 3.25 12 3.25C12 3.25 6 10 6 14C6 17.31 8.69 20 12 20V18H14V16H12ZM14 19.65C14.75 19.39 15.42 19 16 18.46V18H14V19.65ZM14 16H16V14H14V16ZM16 18H16.46C17 17.42 17.39 16.75 17.65 16H16V18Z" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M19 14C17.9391 14 16.9217 14.4214 16.1716 15.1716C15.4214 15.9217 15 16.9391 15 18C15 19.0609 15.4214 20.0783 16.1716 20.8284C16.9217 21.5786 17.9391 22 19 22C20.0609 22 21.0783 21.5786 21.8284 20.8284C22.5786 20.0783 23 19.0609 23 18C23 16.9391 22.5786 15.9217 21.8284 15.1716C21.0783 14.4214 20.0609 14 19 14ZM19.5 16V20H20.5V16H19.5ZM17.5 16V20H18.5V16H17.5Z" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M19 13C19.6566 13 20.3068 13.1293 20.9134 13.3806C21.52 13.6319 22.0712 14.0002 22.5355 14.4645C22.9998 14.9288 23.3681 15.48 23.6194 16.0866C23.8707 16.6932 24 17.3434 24 18C24 19.3261 23.4732 20.5979 22.5355 21.5355C21.5979 22.4732 20.3261 23 19 23C18.3434 23 17.6932 22.8707 17.0866 22.6194C16.48 22.3681 15.9288 21.9998 15.4645 21.5355C14.5268 20.5979 14 19.3261 14 18C14 16.6739 14.5268 15.4021 15.4645 14.4645C16.4021 13.5268 17.6739 13 19 13ZM19 14C17.9391 14 16.9217 14.4214 16.1716 15.1716C15.4214 15.9217 15 16.9391 15 18C15 19.0609 15.4214 20.0783 16.1716 20.8284C16.9217 21.5786 17.9391 22 19 22C20.0609 22 21.0783 21.5786 21.8284 20.8284C22.5786 20.0783 23 19.0609 23 18C23 16.9391 22.5786 15.9217 21.8284 15.1716C21.0783 14.4214 20.0609 14 19 14Z" />
        </svg>
        </label>
      </div>
    </div>

    <div style="width: 550px;" class="flex flex-row items-center text-left bg-red-800/50 px-4 py-2 rounded-lg gap-4 mt-8">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-8 w-8 flex-shrink-0" fill="currentColor"><path d="M13,13H11V7H13M13,17H11V15H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" /></svg>
      <?=MiniPlayerEmbedCaution;?>
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
          transparentBackground: false,
          hideOnPauseOrEmpty: false,
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
