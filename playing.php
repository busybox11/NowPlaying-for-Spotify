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

if (!isset($_COOKIE["deviceId"])) {
    function randomString($length = 4) {
        $characters = '0123456789';
        $charactersLength = strlen($characters);
        $randomString = '';
        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[rand(0, $charactersLength - 1)];
        }
        return $randomString;
    }
    setcookie('deviceId', randomString(4), time() + (3600 * 365));
}
?>
<!DOCTYPE html>
<html lang="<?=$lang;?>">
<head>
    <title>Spotify Connect - Now Playing</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="NowPlaying-For-Spotify is a smooth Spotify Connect visualizer, which display the music playing on Spotify" />
    <link rel="icon" type="image/png" href="favicon.png">
    <link id="playingcss" href="playing.css?ts=<?=time ()?>" rel="stylesheet">
    <link id="playingcss-test" href="playingtest.css?ts=<?=time ()?>" rel="stylesheet alternate">
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

	if (readCookie('theme') == "test") {
        $('#playingcss-test').attr('rel', 'stylesheet');
		$('#playingcss').attr('rel', 'stylesheet alternate');
	}

    // declare all variables
    let response;
    let parsedResult;
    let idSong;
    let currentlyPlayingType;
    let refreshTime;
    let iCast = 0;
    const AVAILABLE_DEVICES = ['Computer', 'Tablet', 'Smartphone', 'Speaker', 'TV', 'AVR', 'STB', 'AudioDongle', 'GameConsole', 'CastVideo', 'CastAudio', 'Automobile', 'Unknown']
    const DEVICES_ICON = ['computer', 'tablet_android', 'smartphone', 'speaker', 'tv', 'speaker_group', 'speaker_group', 'cast_connected', 'gamepad', 'cast_connected', 'cast_connected', 'directions_car', 'device_unknown']
    refreshTime = readCookie('refreshTime');
    var spotifyApi = new SpotifyWebApi();
    spotifyApi.setAccessToken(readCookie('accessToken'));
    loopForever();

    // loop function
    function loopForever () {
        setInterval(function() {
            let promise = Promise.resolve(spotifyApi.getMyCurrentPlaybackState(null));
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
                currentlyPlayingType = response.currently_playing_type;
                progressSong = response.progress_ms;
                progressSongFormatted = msToTime(response.progress_ms);
                deviceName = response["device"].name;
                deviceType = response["device"].type;
                if (response.is_playing == true) {
	                $("#playing-div #song-info-div #activestate #activeicon").text(DEVICES_ICON[AVAILABLE_DEVICES.indexOf(deviceType)]);
	                $("#pause-button").text("pause");
	            	$("#playing-div #song-info-div #activestate #device-name").text(deviceName);
	            	if (iCast < 11) {
	            		iCast = 0;
	            	}
                } else {
                    $("#playing-div #song-info-div #activestate #activeicon").text("pause");
                    $("#pause-button").text("play_arrow");
                	if (iCast <= 4) {
                    	$("#playing-div #song-info-div #activestate #device-name").text('Ready to cast on NowPlaying for Spotify #' + readCookie('deviceId'));
                	} else {
                		$("#playing-div #song-info-div #activestate #device-name").text(deviceName);
                		if (iCast == 9) {
                			iCast = -1;
                		}
                    }
                  	iCast++;
                }
                if (currentlyPlayingType != "ad") {
                    lenghtSong = response["item"].duration_ms;
                    lenghtSongFormatted = msToTime(response["item"].duration_ms);
                    seekbarProgress = Math.round(progressSong * 100 / lenghtSong);
                    titleSong = response["item"].name;
                    let tempArtist = "";
                    for (let i = 0; i < response["item"]["artists"].length; i++) {
                        tempArtist = tempArtist + response["item"]["artists"][i].name;
                        if (i != response["item"]["artists"].length - 1) {
                            tempArtist = tempArtist + ", ";
                        }
                    }
                    artistSong = tempArtist;
                    albumSong = response["item"]["album"].name;
                    title = titleSong + " <?=by;?> " + artistSong + " - " + deviceName + " - Now Playing for Spotify";
                    albumPicture = response["item"]["album"]["images"]["0"].url;
                    $("#playing-div #song-info-div #time-song").text(progressSongFormatted + " · " + lenghtSongFormatted);
                } else {
                    titleSong = "<?=ad;?>";
                    artistSong = "Spotify";
                    albumSong = "";
                    title = "<?=ad;?> -" + deviceName + "- Now Playing for Spotify";
                    albumPicture = "no_song.png";
                    lenghtSong = " ";
                    lenghtSongFormatted = " ";
                    seekbarProgress = 0;
                    $("#playing-div #song-info-div #time-song").text(progressSongFormatted);
                }
                $("#playing-div #song-info-div #seekbar-now").attr("style", "width : " + seekbarProgress + "%");
            }

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
                $("#activeicon").text("pause");
                $("#pause-button").text("");
            }

            if ($("#song-title").text() == "<?=defaultTitleSong; ?>" || response["item"].id != idSong) {
                $("#song-title").text(titleSong);
                $("#song-artist").text(artistSong);
                $("#song-album").text(albumSong);
                document.title = title;
                $("#playing-div img").attr("src", albumPicture);
                $("#background-image-div").attr("style", "background: url('" + albumPicture + "');background-size:cover;background-position: center center;");
                idSong = response["item"].id;
            }

        }, 1000);
    }

   
    </script>
</head>
<body>
	<div class="settings-div fadeInOut">
		<a id="fullscreen-button" href="#" onclick="fullscreen();"><i id="fullscreen-icon" class="material-icons settings-icon">fullscreen</i></a>
        <a id="theme-button" href="#" onclick="theme();"><i id="theme-icon" class="material-icons theme-icon">palette</i></a>
        <a id="PIP-button" href="#" onclick="PIP();"><i id="PIP-icon" class="material-icons">picture_in_picture_alt</i></a>
    </div>
    <div id="playing-div">
        <div id="img-wrapper"><img src="no_song.png" id="playing-img"><div id="pause-button" style="display:none;" class="material-icons"></div></div>
        <div id="song-info-div">
            <h1 id="song-title"><?=defaultTitleSong;?></h1>
            <h2 id="song-artist"><?=defaultArtistSong;?></h2><h2 id="song-album"></h2>
            <div id="seekbar-bg">
                <div id="seekbar-now" style="width : 0%"></div>
            </div>
            <h3 class="left fadeInOut" id="activestate"><i id="activeicon" class="material-icons left">pause</i><span id="device-name">Spotify Connect</span><h3 class="right" id="time-song"></h3>
        </div>
    </div>
    <div id="background-image-div" style="background: url('no_song.png'); background-size: cover;background-position: center center;"><div class="darken"></div></div>
    <script src="https://sdk.scdn.co/spotify-player.js"></script>
    <script>
    window.onSpotifyWebPlaybackSDKReady = () => {
    const token = readCookie('accessToken');
    const player = new Spotify.Player({
    name: 'NowPlaying for Spotify #' + readCookie('deviceId'),
    getOAuthToken: cb => { cb(token); }
    });

    // Error handling
    player.addListener('initialization_error', ({ message }) => { console.error(message); });
    player.addListener('authentication_error', ({ message }) => { console.error(message); });
    player.addListener('account_error', ({ message }) => { console.error(message); });
    player.addListener('playback_error', ({ message }) => { console.error(message); });
    // Playback status updates
    player.addListener('player_state_changed', ({position, duration, track_window: { current_track }}) => { 
        player.getCurrentState().then(state => {
                if(!state) {
                    // currently not playing through web playback
                    $("#pause-button").css("display","none");
                    $("#playing-img").css("margin-top","0px");
                }else{
                    $("#pause-button").css("display", "inline-block");
                    $("#playing-img").css("margin-top","34px");
                }
        });
     });
    // Ready
    player.addListener('ready', ({ device_id }) => {
    console.log('Ready with Device ID', device_id);

    $("#playing-div #song-info-div #activestate #device-name").text('Ready to cast on NowPlaying for Spotify #' + readCookie('deviceId'));
    });
    // Not Ready
    player.addListener('not_ready', ({ device_id }) => {
    console.log('Device ID has gone offline', device_id);
    });
    // Connect to the player!
    player.connect();

    $("#pause-button").bind("click", () => {
        player.togglePlay();
        // toggle pause/resume playback
    });
    };

    //define canvas and video
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d', { alpha: false });
    const img = document.getElementById("playing-img")
    const video = document.createElement('video');

    canvas.width = canvas.height = 200;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
    video.srcObject = canvas.captureStream();
    img.crossOrigin = 'anonymous'

    function PIP(){
        video.play();
        if (document.pictureInPictureEnabled) {
                video.requestPictureInPicture();
            } else {
                video.webkitSetPresentationMode('picture-in-picture');
            }
    }
    function drawCanvas() {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        requestAnimationFrame(_ => { drawCanvas(); });
    }
    video.addEventListener('enterpictureinpicture', event => {
        updateCanvasSize(event.pictureInPictureWindow);
        event.pictureInPictureWindow.onresize = event => updateCanvasSize(event.target);
        drawCanvas();
    })

    function updateCanvasSize(pictureInPictureWindow) {
        // Update canvas based on Picture-in-Picture window size.
        canvas.width = pictureInPictureWindow.width * devicePixelRatio;
        canvas.height = pictureInPictureWindow.height * devicePixelRatio;
    }
    </script>
</body>
</html>