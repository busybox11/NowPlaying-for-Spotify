<?php

if (isset($_GET)) {
	if (isset($_GET['lang']) && !empty($_GET['lang'])) {
		setcookie('lang', $_GET['lang'], time() + 60 * 60 * 24 * 30);
	}
}

include_once ('lang.php');

if (isset($_GET['lang'])) {
	header('Location: ' . $_SERVER['PHP_SELF']);
}

?>

<!DOCTYPE html>
<html lang="<?= $lang; ?>" class="bg-[#000020] text-white">

<head>
	<title><?= Error; ?> 404 - NowPlaying</title>
	<link rel="icon" type="image/png" href="assets/images/favicon.png">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="description"
		content="NowPlaying is a smooth Spotify Connect visualizer, updating in real-time and with playback support." />

	<meta name="twitter:card" content="summary" />
	<meta name="twitter:creator" content="@busybox11" />
	<meta name="twitter:image" content="https://<?= $_SERVER['SERVER_NAME']; ?>/assets/images/favicon.png" />

	<meta property="og:title" content="NowPlaying" />
	<meta property="og:type" content="website" />
	<meta property="og:description"
		content="NowPlaying is a smooth Spotify Connect visualizer, updating in real-time and with playback support." />
	<meta property="og:image" content="https://<?= $_SERVER['SERVER_NAME']; ?>/assets/images/favicon.png" />

	<meta name="theme-color" content="#23a92a" />

	<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
	<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@200..900&display=swap" rel="stylesheet">

  <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
  <style type="text/tailwindcss">
    @theme {
      --font-sans: 'Outfit', sans-serif;
    }
  </style>

	<?php
	require_once ('assets/analytics.php');
	echo getAnalyticsScript();
	?>
</head>

<body class="flex flex-col h-screen px-4 py-auto gap-8 items-center justify-center text-center">
	<div class="flex flex-col items-center justify-center">
		<img src="assets/images/favicon.png" alt="Logo" width="100px" height="100px" class="mb-4">

		<h1 class="text-3xl lg:text-4xl font-bold"><?= Error; ?> 404</h1>
		<h2 class="text-xl lg:text-2xl font-light mb-2"><?= IndexError404; ?></h2>
	</div>

	<a href="javascript:window.history.back()"
		class="bg-[#15883D] px-12 py-3 rounded-full text-lg tracking-wide active:scale-95 transition transform"><?= IndexGoBack; ?></a>
</body>

</html>