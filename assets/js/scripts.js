const urlParams = new URLSearchParams(window.location.search);

if (localStorage.getItem('deviceId') == null) {
    function makeId(length) {
        var out = '';
        var numbers = '0123456789';
        for ( let i = 0; i < length; i++ ) {
            out += numbers.charAt(Math.floor(Math.random() * numbers.length));
        }
        return out;
        }

    localStorage.setItem('deviceId', makeId(4))
}

function msToTime(duration) {
    let seconds = parseInt((duration / 1000) % 60),
        minutes = parseInt((duration / (1000 * 60)) % 60)

    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    if (minutes !== NaN && seconds !== NaN) {
        return minutes + ":" + seconds;
    } else {
        return undefined;
    }
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

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

/* WakeLock */
let wakelock = null;

/* Prevent screen from sleeping */
function getWakelock() {
    if ('wakeLock' in navigator) {
        navigator.wakeLock.request('screen').then(function (wakeLock) {
            wakelock = wakeLock;
        }).catch(function (err) {
            console.log(`Failed to request wake lock: ${err}`);
        });
    }
}

/* Release the wake lock */
function releaseWakelock() {
    if (wakelock !== null) {
        wakelock.release();
        wakelock = null;
    }
}

/* Fullscreen */
let elem = document.documentElement;

/* View in fullscreen */
function openFullscreen() {
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { /* Firefox */
        elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE/Edge */
        elem.msRequestFullscreen();
    }
    getWakelock();
}

/* Close fullscreen */
function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) { /* Firefox */
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE/Edge */
        document.msExitFullscreen();
    }
    releaseWakelock();
}

function fullscreen() {
    let isFullscreen = document.fullscreen;
    (isFullscreen) ? closeFullscreen() : openFullscreen()
}

function theme() {
    if (localStorage.getItem('theme') == null || localStorage.getItem('theme') == 'original') {
        localStorage.setItem('theme', 'test');
        $('#playingcss-test').attr('rel', 'stylesheet');
    } else {
        localStorage.setItem('theme', 'original');
        $('#playingcss-test').attr('rel', 'stylesheet alternate');
    }
}
