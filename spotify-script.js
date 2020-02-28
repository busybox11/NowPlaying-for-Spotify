// declare all variables
let response;
let parsedResult;
let idSong;
let currentlyPlayingType;
let refreshTime;
const AVAILABLE_DEVICES = ['Computer', 'Tablet', 'Smartphone', 'Speaker', 'TV', 'AVR', 'STB', 'AudioDongle', 'GameConsole', 'CastVideo', 'CastAudio', 'Automobile', 'Unknown']
const DEVICES_ICON = ['computer', 'tablet_android', 'smartphone', 'speaker', 'tv', 'speaker_group', 'speaker_group', 'cast_connected', 'gamepad', 'cast_connected', 'cast_connected', 'directions_car', 'device_unknown']
refreshTime = readCookie('refreshTime');
let spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken(readCookie('accessToken'));

// loop function
function loopForever() {
    setInterval(function () {
        let promise = Promise.resolve(spotifyApi.getMyCurrentPlaybackState(null));
        promise.then(function (response) {
            // console.log(response);
            if (Math.floor(Date.now() / 1000) >= refreshTime) {
                window.location.replace('token.php?action=refresh');
            }

            if (response !== "") {
                // console.log('Response not empty');
                getInformations(response);
            } else {
                //console.log('Response empty');
                noInformations();
            }
        });

    }, 1000);
}

loopForever();

window.onSpotifyWebPlaybackSDKReady = () => {
    const token = readCookie('accessToken');
    const player = new Spotify.Player({
        name: 'NowPlaying for Spotify',
        getOAuthToken: cb => {
            cb(token);
        }
    });
    // Error handling
    player.addListener('initialization_error', ({
        message
    }) => {
        console.error(message);
    });
    player.addListener('authentication_error', ({
        message
    }) => {
        console.error(message);
    });
    player.addListener('account_error', ({
        message
    }) => {
        console.error(message);
    });
    player.addListener('playback_error', ({
        message
    }) => {
        console.error(message);
    });
    // Playback status updates
    player.addListener('player_state_changed', ({position, duration, track_window: {current_track}}) => {
        player.getCurrentState().then(state => {
            if (!state) {
                // currently not playing through web playback
                $("#command-wrapper").css("display", "none");
                $("#pause-button").text("");
            } else {
                $("#command-wrapper").css("display", "inline-block");
                if (state.paused)
                    $("#pause-button").text("play_arrow");
                else
                    $("#pause-button").text("pause");
                // console.log(state);
            }
        });
    });
    // Ready
    player.addListener('ready', ({device_id}) => {
        console.log('Ready with Device ID', device_id);
    });
    // Not Ready
    player.addListener('not_ready', ({device_id}) => {
        console.log('Device ID has gone offline', device_id);
    });
    // Connect to the player!
    player.connect();

    $("#pause-button").bind("click", () => {
        player.togglePlay();
        // toggle pause/resume playback
    });

    $("#previous-track").bind("click", () => {
        player.previousTrack();
    });

    $("#next-track").bind("click", () => {
        player.nextTrack();
    });

};
