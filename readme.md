<img src="https://github.com/busybox11/NowPlaying-for-Spotify/blob/master/favicon.png?" alt="Logo" width="100px" height="100px">

# NowPlaying for Spotify

Welcome on my project's GitHub page **NowPlaying for Spotify** !
This is a Spotify Connect visualizer, which has had its codebase made in half a day.

Website : [nowplayingforspotify.ga](http://nowplayingforspotify.ga)

Personal Discord account : `@busybox#2540`

French tech Discord server : [https://techcord.me/invite](https://techcord.me/invite)

Latest release : 1.5.2

## **Changelog**

v1.5.X
- Added playback support (Premium account should be needed)
- Added playback information
- Added pause button (#17)
- CSS improvements added for better responsive (#15 #16)
- SEO improvements (#16)
- Minor CSS improvements

v1.4.X
- Advertisements are recognized
- Multiple artists are recognized
- Experimental theme switcher

v1.3.X
- Now playing device name and type is showing
- Cursor is hidden after a couple of seconds
- Fullscreen button

![Screenshot](https://github.com/busybox11/NowPlaying-for-Spotify/blob/master/Screenshot.png?)

## **Coded in :**

HTML, CSS, JS, PHP

## **Used libraries :**

[Spotify Web API PHP by jwilsson](https://github.com/jwilsson/spotify-web-api-php) pour l'obtention du token,
[Spotify Web API JS by JMPerez](https://github.com/jmperez/spotify-web-api-js) pour l'obtention du titre en cours de lecture

## **Known bugs**

- Podcasts aren't recognized

## **Upcoming features**

- Themes (experimental theme / theme switcher since v1.4.3)

## **How to host ?**

You can use XAMPP (multi-platform) or Wampserver (Windows only) but any webserver with PHP 7.0 or greater is good to use.

## **What modifications are required ?**

You should have a declared app in Spotify's developer dashboard to obtain a `Client ID`.

*How to do it :*
As I said, the first thing is to create a Client ID (`Create a Client ID` button) on [Spotify's developer dashboard](https://developer.spotify.com/dashboard/applications).
Type your app's name in the `App or Hardware name` text field, and its description on the `App or Hardware description` text field. In the `What are you building ?` section, indicate the platform which you are building the app for, then click on the `NEXT` button. Answer to the commercial integration question, and continue. If necessary, fill the form and check all the boxes at the 3rd stage and you're ready to go. Your app is declared in Spotify's developer dashboard !

Now that you have your app, you have some modifications to do in two files : `login.php` and `token.php`.

Edit those values :

- `YOUR_CLIENT_ID` by your Client ID available on your app's panel,
- `YOUR_CLIENT_SECRET` by your `Client Secret` available by clicking on the `Show Client Secret` button situated on the same webpage as your client ID,
- `YOUR_DOMAIN` by your redirect URL, in the case of a local hosting replace it by `http://localhost/token.php` in most cases. Basicaly, it's the accessible URL for the `token.php` page.

Let's go back on our app's panel. You need to declare the URL where the `token.php` page is located, for a local hosting it would be in most cases `http://localhost/token.php`. Click on the green `Edit settings` button situated on the top of the page, then in the `Redirect URIs` text field, indicate yours. ***ATTENTION*** : what you typed should **IMPERATIVELY** be the same as what you wrote in the two precedent files ! Then click on the `SAVE` button on the very bottom of the form. Your app is declared and ready to use !

## **Credits**

Flags by [Freepik](https://www.freepik.com/) of the [www.flaticon.com](https://www.flaticon.com/) website under [Creative Commons BY 3.0](http://creativecommons.org/licenses/by/3.0/) license.

## **Related projects**
[NowPlaying Dashboard for Spotify by peterdconradie](https://github.com/peterdconradie/Now-Playing-Dashboard-for-Spotify)