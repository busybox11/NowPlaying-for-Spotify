<?php

if(!isset($_COOKIE['lang']) OR empty($_COOKIE['lang'])){
    setcookie('lang', 'en', time() + 60*60*24*30);
}

switch($_COOKIE['lang']){
    case 'en': default: include_once 'lang/en.php';
    $lang = 'en';
    break;
    case 'fr': include_once 'lang/fr.php';
    $lang = 'fr';
    break;
    case 'it': include_once 'lang/it.php';
    $lang = 'it';
    break;
    case 'es': include_once 'lang/es.php';
    $lang = 'es';
    break;
    case 'ru': include_once 'lang/ru.php';
    $lang = 'ru';
    break;
    case 'de': include_once 'lang/de.php';
    $lang = 'de';
    break;
    case 'id': include_once 'lang/id.php';
    $lang = 'id';
    break;
}
?>
<!DOCTYPE html>
<html lang="<?=$lang;?>">
<head>
    <title>Spotify Connect - Now Playing</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
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

    if (localStorage.getItem('theme') == "test") {
        $('#playingcss-test').attr('rel', 'stylesheet');
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
            });

            if (Math.floor(Date.now() / 1000) >= refreshTime) {
                window.location.replace('token.php?action=refresh');
            }

            if (response != "") {
                getInformations(response);
            } else {
                noInformations();
            }

            function getInformations (response) {
                currentlyPlayingType = response.currently_playing_type;
                progressSong = response.progress_ms;
                progressSongFormatted = msToTime(response.progress_ms);
                deviceName = response["device"].name;
                deviceType = response["device"].type;
                if (response.is_playing == true) {
                    $("#playing-div #song-info-div #activestate #activeicon").text(DEVICES_ICON[AVAILABLE_DEVICES.indexOf(deviceType)]);
                    // $("#pause-button").text("pause");
                    $("#playing-div #song-info-div #activestate #device-name").text(deviceName);
                    if (iCast < 11) {
                        iCast = 0;
                    }
                } else {
                    $("#playing-div #song-info-div #activestate #activeicon").text("pause");
                    // $("#pause-button").text("play_arrow");
                    if (iCast <= 4) {
                        $("#playing-div #song-info-div #activestate #device-name").text('Ready to cast on NowPlaying for Spotify #' + localStorage.getItem('deviceId'));
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

                if ($("#song-title").text() == "<?=defaultTitleSong; ?>" || response["item"].id != idSong) {
                $("#song-title").text(titleSong);
                $("#song-artist").text(artistSong);
                $("#song-album").text(albumSong);
                document.title = title;
                $("#playing-div img").attr("src", albumPicture);
                $("#background-image-div").attr("style", "background: url('" + albumPicture + "');background-size:cover;background-position: center center;");
                idSong = response["item"].id;
            }
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
                // $("#pause-button").text("");
            }

        }, 1000);
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
            <div id="playback-container" style="display:none;">
                <div id="previous-button" class="material-icons">skip_previous</div>
                <div id="pause-button" class="material-icons"></div>
                <div id="next-button" class="material-icons">skip_next</div>
            </div>
        </div>
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
        name: 'NowPlaying for Spotify #' + localStorage.getItem('deviceId'),
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
                if(!state) {
                    // currently not playing through web playback
                    $("#playback-container").css("display","none");
                    // $("#playing-img").css("margin-top","0px");
                }else{
                    $("#playback-container").css("display", "inline-block");
                    $("#pause-button").text(state.paused ? "play_arrow" : "pause");
                    let {
                        previous_tracks: [previous_track],
                        next_tracks: [next_track]
                    } = state.track_window;
                    $("#previous-button").css("visibility", "visible");
                    $("#next-button").text(next_track != undefined > 0 ? "skip_next" : "");
                    // $("#playing-img").css("margin-top","34px");
                }
        });
     });
    // Ready
    player.addListener('ready', ({ device_id }) => {
    console.log('Ready with Device ID', device_id);

    $("#device-name").text('Ready to cast on NowPlaying for Spotify #' + localStorage.getItem('deviceId'));
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
    $("#next-button").bind("click", () => {
        player.nextTrack();
    });
    $("#previous-button").bind("click", () => {
        player.getCurrentState().then(state => {
            if(state) {
                console.log(state);
                if(state.position > 5000 || state.track_window.previous_tracks.length === 0)
                    player.seek(0);
                else
                    player.previousTrack();
            }
        });
    });
    };
    </script>
</body>
</html>
