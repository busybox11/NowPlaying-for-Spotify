// Check if cookie refreshToken is set
let cookie = document.cookie;
if (!cookie.includes("refreshToken")) { window.location.replace('login.php'); }

const refreshTime = readCookie('refreshTime');
let spotifyApi;

document.addEventListener('alpine:init', x => {
  Alpine.store('player', {
    init() {
      spotifyApi = new SpotifyWebApi();
      spotifyApi.setAccessToken(readCookie('accessToken'));

      this.poolingLoop();
    },

    playbackObj: {},
    lastPlaybackObj: {},

    targetImg: 'assets/images/no_song.png',

    async poolingLoop() {
      setInterval(async () => {
        if (Math.floor(Date.now() / 1000) >= refreshTime) {
          window.location.replace('token.php?action=refresh');
        }

        const response = await spotifyApi.getMyCurrentPlaybackState();
        if (response) {
          this.lastPlaybackObj = this.playbackObj;
          this.playbackObj = response;

          if (this.playbackObj.item?.name) {
            document.title = `${this.playbackObj.item?.name} - ${this.playbackObj.item?.artists[0].name} - NowPlaying`;
          }

          // Fetch album art
          if (this.playbackObj.item?.album?.images[0]?.url) {
            // Load image in new element and then set it on the target
            const img = new Image();
            img.src = this.playbackObj.item?.album?.images[0]?.url;
            img.onload = () => {
              this.targetImg = this.playbackObj.item?.album?.images[0]?.url;
            }
          }
        }
      }, 1000)
    }
  })
})