function msToTime(duration) {
    var milliseconds = parseInt((duration % 1000) / 100),
        seconds = parseInt((duration / 1000) % 60),
        minutes = parseInt((duration / (1000 * 60)) % 60)
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return minutes + ":" + seconds;
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

// sleep.js
// https://github.com/ivanmaeder/computer-sleep

var sleep = {
    prevent: function() {
        if (!this._video) {
            this._init();
        }

        this._video.setAttribute('loop', 'loop');
        this._video.play();
    },
    allow: function() {
        if (!this._video) {
            return;
        }

        this._video.removeAttribute('loop');
        this._video.pause();
    },
    _init: function() {
        this._video = document.createElement('video');
        this._video.setAttribute('width', '10');
        this._video.setAttribute('height', '10');
        this._video.style.position = 'absolute';
        this._video.style.top = '-10px';
        this._video.style.left = '-10px';

        var source_mp4 = document.createElement('source');
        source_mp4.setAttribute('src', 'https://github.com/ivanmaeder/computer-sleep/raw/master/resources/muted-blank.mp4');
        source_mp4.setAttribute('type', 'video/mp4');
        this._video.appendChild(source_mp4);

        var source_ogg = document.createElement('source');
        source_ogg.setAttribute('src', 'https://github.com/ivanmaeder/computer-sleep/raw/master/resources/muted-blank.ogv');
        source_ogg.setAttribute('type', 'video/ogg');
        this._video.appendChild(source_ogg);

        document.body.appendChild(this._video);
    },
    _video: null
}
