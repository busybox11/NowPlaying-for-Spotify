// Check if cookie refreshToken is set
let cookie = document.cookie;
const cookieHasRefreshToken = cookie.includes("refreshToken");

const refreshTokenParam = urlParams.get('refreshToken');

if (!cookieHasRefreshToken && !refreshTokenParam) { window.location.replace('login.php'); }

let refreshTime = readCookie('refreshTime');
let spotifyApi;

async function fetchAccessToken() {
  if (!cookieHasRefreshToken && !refreshTokenParam) {
    // Redirect to login page
    window.location.replace('login.php');
    return;
  }

  let targetUrl = 'token.php?action=refresh&response=data';
  if (refreshTokenParam) {
    targetUrl += `&refreshToken=${refreshTokenParam}`;
  }

  const response = await fetch(targetUrl);
  const data = await response.json();

  return data;
}

const useSmallAlbumCover = window.playerConfig?.useSmallAlbumCover ?? false;

document.addEventListener('alpine:init', x => {
  Alpine.store('player', {
    init() {
      spotifyApi = new SpotifyWebApi();

      // Don't reuse access token if refreshToken param is passed
      // so that we force refreshing with a new token on load
      if (cookieHasRefreshToken && !refreshTokenParam) {
        spotifyApi.setAccessToken(readCookie('accessToken'));

        this.poolingLoop();
      } else if (refreshTokenParam) {
        this.refreshToken().then(() => {
          this.poolingLoop();
        });
      }
    },

    playbackObj: {},
    lastPlaybackObj: {},

    targetImg: 'assets/images/no_song.png',

    async poolingLoop() {
      setInterval(async () => {
        await this.fetchState();
      }, 1000)
    },

    async refreshToken() {
      console.log('Refreshing token...');

      const data = await fetchAccessToken();

      if (data.accessToken) {
        spotifyApi.setAccessToken(data.accessToken);
        refreshTime = data.refreshTime;
        console.log('Refreshed token');
      } else {
        console.log('Failed to refresh token');

        // Redirect to login page
        window.location.replace('login.php');
      }
    },

    async fetchState() {
      if (Math.floor(Date.now() / 1000) >= refreshTime) {
        await this.refreshToken();
      }

      const response = await spotifyApi.getMyCurrentPlaybackState({
        additional_types: "episode"
      });
      if (response) {
        this.handleChange(response);
      }
    },

    handleChange(obj) {
      this.lastPlaybackObj = this.playbackObj;
      this.playbackObj = obj;

      const artists = this.playbackObj.item?.artists || [{ name: this.playbackObj.item?.show?.publisher }]

      if (this.playbackObj.item?.name) {
        document.title = `${this.playbackObj.item?.name} - ${artists[0].name} - NowPlaying`;
      }

      // Fetch album art
      const imgsArr = this.playbackObj.item?.album?.images || this.playbackObj.item?.images;
      const targetImg = (useSmallAlbumCover) ? imgsArr[imgsArr.length - 2]?.url : imgsArr[0]?.url;

      const lastImgsArr = this.lastPlaybackObj.item?.album?.images || this.lastPlaybackObj.item?.images;
      if (lastImgsArr === undefined) {
        this.targetImg = targetImg;
        return;
      }
      const lastTargetImg = (useSmallAlbumCover) ? lastImgsArr[lastImgsArr.length - 2]?.url : lastImgsArr[0]?.url;

      if (targetImg !== lastTargetImg) {
        // Load image in new element and then set it on the target
        const img = new Image();
        img.src = (targetImg !== undefined) ? targetImg : 'assets/images/no_song.png'
        img.onload = () => {
          this.targetImg = img.src;
        }
      }

      // Set DOM classes
      document.querySelector('body').classList.toggle('np_music_playing', this.playbackObj.is_playing);
      document.querySelector('body').classList.toggle('np_music_paused', !this.playbackObj.is_playing);
    }
  })
})