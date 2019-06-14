function $_GET(param) {
    var vars = {};
    window.location.href.replace(location.hash, '').replace(
        /[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
        function(m, key, value) { // callback
            vars[key] = value !== undefined ? value : '';
        }
    );

    if (param) {
        return vars[param] ? vars[param] : null;
    }
    return vars;
}

function wait(ms) {
    var start = new Date().getTime();
    var end = start;
    while (end < start + ms) {
        end = new Date().getTime();
    }
}

function getPlayingTitle(token) {
    $.ajax({
        url: 'https://api.spotify.com/v1/me/player/currently-playing',
        type: 'GET',
        contentType: 'application/json',
        headers: {
            'Authorization': 'Bearer' + token
        },
        success: function(result) {
            var playingData = result;
        },
        error: function(error) {
            console.log('Error while grabbing now playing title')
        }
    });
}

function msToTime(duration) {
    var milliseconds = parseInt((duration % 1000) / 100),
        seconds = parseInt((duration / 1000) % 60),
        minutes = parseInt((duration / (1000 * 60)) % 60)
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return minutes + ":" + seconds;
}

function httpPost(urlApi, key) {
    $.ajax({
        url: urlApi,
        headers: {
            'Authorization': 'Basic ' + key,
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': true,
        },
        method: 'POST',
        dataType: 'json',
        success: function(data) {
            console.log('success: ' + data);
        }
    });
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}