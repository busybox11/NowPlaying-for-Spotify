<?php

if(!isset($_COOKIE['lang']) OR empty($_COOKIE['lang'])){
    setcookie('lang', 'en', time() + 60*60*24*30);
}

switch($_COOKIE['lang']){
    case 'fr': include_once 'lang/fr.php';
    $lang = 'fr';
    break;
    case 'en': default: include_once 'lang/en.php';
    $lang = 'en';
    break;
}
?>
<!DOCTYPE html>
<html lang="<?=$lang;?>">
<head>
    <title>Spotify Connect - Now Playing</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content="NowPlaying-For-Spotify is a smooth Spotify Connect visualizer, which display the music playing on Spotify" />
    <link rel="icon" type="image/png" href="favicon.png" />
    <link id="playingcss" href="playing.css?ts=<?=time ()?>" rel="stylesheet" />
    <link id="playingcss-test" href="playingtest.css?ts=<?=time ()?>" rel="stylesheet alternate" />
    <link href="productsans.css?ts=<?=time ()?>" rel="stylesheet" />
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script>
    // Check if cookie refreshToken is set
    let cookie = document.cookie;
    if (!cookie.includes("refreshToken")) { window.location.replace('login.php'); }

	if (readCookie('theme') === "test") {
        $('#playingcss-test').attr('rel', 'stylesheet');
		$('#playingcss').attr('rel', 'stylesheet alternate');
	}
    </script>
</head>
<body>
	<div class="settings-div fadeInOut">
		<a id="fullscreen-button" href="#" onclick="fullscreen();"><i id="fullscreen-icon" class="material-icons settings-icon">fullscreen</i></a>
        <a id="theme-button" href="#" onclick="theme();"><i id="theme-icon" class="material-icons theme-icon">palette</i></a>
    </div>
    <div id="playing-div">
        <div id="img-wrapper"><img src="no_song.png" id="playing-img">
            <div id="command-wrapper" style="display:none;">
                <div id="previous-track"  class="material-icons">skip_previous</div>
                <div id="pause-button" class="material-icons">cached</div>
                <div id="next-track" class="material-icons">skip_next</div>
            </div>
        </div>
        <div id="song-info-div">
            <h1 id="song-title"><?=defaultTitleSong;?></h1>
            <h2 id="song-artist"><?=defaultArtistSong;?></h2><h2 id="song-album"></h2>
            <div id="seekbar-bg">
                <div id="seekbar-now" style="width : 0%"></div>
            </div>
            <h3 class="left" id="activestate"><i id="activeicon" class="material-icons left">pause</i><span id="device-name">Spotify Connect</span><h3 class="right" id="time-song"></h3>
        </div>
    </div>
    <div id="background-image-div" style="background: url('no_song.png'); background-size: cover;background-position: center center;"><div class="darken"></div></div>

    <script src="spotify-web-api.js"></script>
    <script src="scripts.js?ts=<?=time ()?>"></script>
    <script src="cursor.js?ts=<?=time ()?>"></script>
    <script>

    function noInformations() {
        titleSong = "<?=defaultTitleSong;?>";
        artistSong = "<?=defaultArtistSong;?>";
        albumSong = "";
        title = "<?=defaultTitle;?>";
        albumPicture = "no_song.png";
        lenghtSong = " ";
        lenghtSongFormatted = " ";
        progressSong = " ";
        progressSongFormatted = " ";
        seekbarProgress = 0;
        $("#activeicon").text("pause");
    }

    function getInformations(response) {
        currentlyPlayingType = response.currently_playing_type;
        progressSong = response.progress_ms;
        progressSongFormatted = msToTime(response.progress_ms);
        deviceName = response["device"].name;
        deviceType = response["device"].type;
        if (response.is_playing == true) {
            $("#playing-div #song-info-div #activestate #activeicon").text(DEVICES_ICON[AVAILABLE_DEVICES.indexOf(deviceType)]);
        } else {
            $("#playing-div #song-info-div #activestate #activeicon").text("pause");
        }
        $("#playing-div #song-info-div #activestate #device-name").text(deviceName);
        if (currentlyPlayingType !== "ad") {
            lenghtSong = response["item"].duration_ms;
            lenghtSongFormatted = msToTime(response["item"].duration_ms);
            seekbarProgress = Math.round(progressSong * 100 / lenghtSong);
            titleSong = response["item"].name;
            let tempArtist = "";
            for (let i = 0; i < response["item"]["artists"].length; i++) {
                tempArtist = tempArtist + response["item"]["artists"][i].name;
                if (i !== response["item"]["artists"].length - 1) {
                    tempArtist = tempArtist + ", ";
                }
            }
            artistSong = tempArtist;
            albumSong = response["item"]["album"].name;
            title = titleSong + " <?=by;?> " + artistSong + " - " + deviceName + " - Now Playing for Spotify";
            albumPicture = response["item"]["album"]["images"]["0"].url;
            $("#time-song").text(progressSongFormatted + " · " + lenghtSongFormatted);

            if ($("#song-title").text() === "<?=defaultTitleSong; ?>" || response["item"].id !== idSong) {
                $("#song-title").text(titleSong);
                $("#song-artist").text(artistSong);
                $("#song-album").text(albumSong);
                document.title = title;
                $("#playing-div img").attr("src", albumPicture);
                $("#background-image-div").attr("style", "background: url('" + albumPicture + "');background-size:cover;background-position: center center;");
                idSong = response["item"].id;
            }
        } else {
            titleSong = "<?=ad;?>";
            artistSong = "Spotify";
            albumSong = "";
            title = "<?=ad;?> -" + deviceName + "- Now Playing for Spotify";
            albumPicture = "no_song.png";
            lenghtSong = " ";
            lenghtSongFormatted = " ";
            seekbarProgress = 0;
            $("#time-song").text(progressSongFormatted);
        }
        $("#seekbar-now").attr("style", "width : " + seekbarProgress + "%");
    }

    </script>
    <script src="https://sdk.scdn.co/spotify-player.js"></script>
    <script src="spotify-script.js"></script>
</body>
</html>
