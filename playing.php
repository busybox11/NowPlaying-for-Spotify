<!DOCTYPE html>
<?php

if(!isset($_COOKIE['lang']) OR empty($_COOKIE['lang'])){
    setcookie('lang', 'en', time() + 60*60*24*30);
}

switch($_COOKIE['lang']){
    case 'fr': include_once 'lang/fr.php';
    break;
    case 'en': default: include_once 'lang/en.php';
    break;
}

?>
<head>
    <title>Spotify Connect - Now Playing</title>
    <meta name="viewport" content="width=device-width, user-scalable=no">
    <link rel="icon" type="image/png" href="favicon.png">
    <link href="playing.css?ts=<?=time ()?>" rel="stylesheet">
    <link href="productsans.css?ts=<?=time ()?>" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <script src="spotify-web-api.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script src="scripts.js?ts=<?=time ()?>"></script>
    <script src="cursor.js?ts=<?=time ()?>"></script>
    <script>
    // Check if cookie refreshToken is set
    let cookie = document.cookie;
    if (!cookie.includes("refreshToken")) { window.location.replace('login.php'); }

    // declare all variables
    let response;
    let parsedResult;
    let idSong;
    let currentlyPlayingType;
    let refreshTime;
    const AVAILABLE_DEVICES = ['Computer', 'Tablet', 'Smartphone', 'Speaker', 'TV', 'AVR', 'STB', 'AudioDongle', 'GameConsole', 'CastVideo', 'CastAudio', 'Automobile', 'Unknown']
    const DEVICES_ICON = ['computer', 'tablet_android', 'smartphone', 'speaker', 'tv', 'speaker_group', 'speaker_group', 'cast_connected', 'gamepad', 'cast_connected', 'cast_connected', 'directions_car', 'device_unknown']
    refreshTime = readCookie('refreshTime');
    var spotifyApi = new SpotifyWebApi();
    spotifyApi.setAccessToken(readCookie('accessToken'));
    loopForever();

    // loop function
    function loopForever () {
        setInterval(function() {
            var promise = Promise.resolve(spotifyApi.getMyCurrentPlaybackState(null));
            promise.then(function(value) {
                response = value;
                console.log(response);
            });

            if (Math.floor(Date.now() / 1000) >= refreshTime) {
                window.location.replace('token.php?action=refresh');
            }

            if (response != "") {
                console.log('Response not empty');
                getInformations();
            } else {
                console.log('Response empty');
                noInformations();
            }

            function getInformations () {
                titleSong = response["item"].name;
                artistSong = response["item"]["artists"]["0"].name;
                albumSong = response["item"]["album"].name;
                title = titleSong + " <?=by;?> " + artistSong + " - Spotify Connect - Now Playing";
                albumPicture = response["item"]["album"]["images"]["0"].url;
                lenghtSong = response["item"].duration_ms;
                lenghtSongFormatted = msToTime(response["item"].duration_ms);
                progressSong = response.progress_ms;
                progressSongFormatted = msToTime(response.progress_ms);
                seekbarProgress = Math.round(progressSong * 100 / lenghtSong);
                currentlyPlayingType = response.currently_playing_type;
		deviceName = response["device"].name;
		deviceType = response["device"].type;
                if (response.is_playing == true) {
					$("#playing-div #song-info-div #activestate #activeicon").text(DEVICES_ICON[AVAILABLE_DEVICES.indexOf(deviceType)]);
                } else {
                    $("#playing-div #song-info-div #activestate #activeicon").text("pause");
                }
				$("#playing-div #song-info-div #activestate #device-name").text(deviceName);

            function noInformations () {
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
                $("#playing-div #song-info-div #activestate #activeicon").text("pause");
            }

            if ($("#playing-div #song-info-div #song-title").text() == "<?=defaultTitleSong; ?>" || response["item"].id != idSong) {
                $("#playing-div #song-info-div #song-title").text(titleSong);
                $("#playing-div #song-info-div #song-artist").text(artistSong);
                $("#playing-div #song-info-div #song-album").text(albumSong);
                document.title = title;
                $("#playing-div img").attr("src", albumPicture);
                $("#background-image-div").attr("style", "background: url('" + albumPicture + "');background-size:cover;background-position: center center;");
                idSong = response["item"].id;
            }
            $("#playing-div #song-info-div #time-song").text(progressSongFormatted + " · " + lenghtSongFormatted);
            $("#playing-div #song-info-div #seekbar-now").attr("style", "width : " + seekbarProgress + "%");

        }, 1000);
    }
    </script>
</head>
<body>
	<div class="settings-div fadeInOut">
		<a id="fullscreen-button" href="#" onclick="fullscreen();"><i id="fullscreen-icon" class="material-icons settings-icon">fullscreen</i></a>
    </div>
    <div id="playing-div">
        <img src="no_song.png" id="playing-img">
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
</body>
