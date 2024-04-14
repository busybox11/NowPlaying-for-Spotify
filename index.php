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
	<title>NowPlaying</title>
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

	<?php
	require_once ('assets/analytics.php');
	echo getAnalyticsScript();
	?>
</head>

<body class="flex flex-col h-screen px-4 py-auto gap-8 items-center justify-center text-center">
	<div class="flex flex-col items-center justify-center">
		<img src="assets/images/favicon.png" alt="Logo" width="100px" height="100px" class="mb-4">

		<h1 class="text-3xl lg:text-4xl font-bold text-pretty"><?= IndexTitle; ?></h1>
		<h2 class="text-xl lg:text-2xl font-light mb-2 text-pretty"><?= IndexDescription; ?></h2>

		<div class="flex flex-row gap-2 mt-2">
			<?php include 'assets/links.php'; ?>
		</div>
	</div>

	<div class="flex flex-col gap-4">
		<a href="login.php"
			class="bg-[#15883D] px-12 py-3 rounded-full text-lg tracking-wide active:scale-95 transition mx-auto"><?= IndexConnection; ?></a>

		<a href="login.php?generateMiniPlayer=true"
			class="border-b-2 text-white/70 hover:text-white border-white/50 hover:border-white/70 text-lg tracking-wide active:scale-95 transition mx-auto"><?= GenerateMiniPlayer; ?></a>
	</div>

	<div class="flex flex-row justify-center gap-3 lg:gap-4 flex-wrap">
		<a href="?lang=en">
			<img src="assets/images/flags/uk.svg" title="English"
				class="h-8 w-8 opacity-50 hover:opacity-100 hover:scale-105 transition">
		</a>
		<a href="?lang=fr">
			<img src="assets/images/flags/fr.svg" title="Français"
				class="h-8 w-8 opacity-50 hover:opacity-100 hover:scale-105 transition">
		</a>
		<a href="?lang=it">
			<img src="assets/images/flags/it.svg" title="Italiano"
				class="h-8 w-8 opacity-50 hover:opacity-100 hover:scale-105 transition">
		</a>
		<a href="?lang=es">
			<img src="assets/images/flags/es.svg" title="Español"
				class="h-8 w-8 opacity-50 hover:opacity-100 hover:scale-105 transition">
		</a>
		<a href="?lang=ru">
			<img src="assets/images/flags/ru.svg" title="Pусский"
				class="h-8 w-8 opacity-50 hover:opacity-100 hover:scale-105 transition">
		</a>
		<a href="?lang=de">
			<img src="assets/images/flags/de.svg" title="Deutsch"
				class="h-8 w-8 opacity-50 hover:opacity-100 hover:scale-105 transition">
		</a>
		<a href="?lang=id">
			<img src="assets/images/flags/id.svg" title="Indonesia"
				class="h-8 w-8 opacity-50 hover:opacity-100 hover:scale-105 transition">
		</a>
		<a href="?lang=cz">
			<img src="assets/images/flags/cz.svg" title="Czech"
				class="h-8 w-8 opacity-50 hover:opacity-100 hover:scale-105 transition">
		</a>
		<a href="?lang=tr">
			<img src="assets/images/flags/tr.svg" title="Turkish"
				class="h-8 w-8 opacity-50 hover:opacity-100 hover:scale-105 transition">
		</a>
		<a href="?lang=gr">
			<img src="assets/images/flags/gr.svg" title="Greece"
				class="h-8 w-8 opacity-50 hover:opacity-100 hover:scale-105 transition">
		</a>
		<a href="?lang=zh_tw">
			<img src="assets/images/flags/zh_tw.svg" title="Traditionnal Chinese"
				class="h-8 w-8 opacity-50 hover:opacity-100 hover:scale-105 transition">
		</a>
		<a href="?lang=ar">
			<img src="assets/images/flags/ar.svg" title="Arabic"
				class="h-8 w-8 opacity-50 hover:opacity-100 hover:scale-105 transition">
		</a>
		<a href="?lang=eo">
			<img src="assets/images/flags/eo.svg" title="Esperanto"
				class="h-8 w-8 opacity-50 hover:opacity-100 hover:scale-105 transition">
		</a>
		<a href="?lang=nl">
			<img src="assets/images/flags/nl.svg" title="Dutch"
				class="h-8 w-8 opacity-50 hover:opacity-100 hover:scale-105 transition">
		</a>
		<a href="?lang=az">
			<img src="assets/images/flags/az.png" title="Azərbaycan"
				class="h-8 w-8 opacity-50 hover:opacity-100 hover:scale-105 transition">
		</a>
	</div>

	<h6 class="text-xs text-white/50 hover:text-white/80 transition text-pretty"><?= IndexCookie; ?></h6>
</body>

</html>