# NowPlaying for Spotify

Vous voici sur la page GitHub de mon projet **NowPlaying for Spotify** !
Cet visualiseur a été programmé en une après-midi, ne jugez pas la propreté du code...
Par contre, je ne suis pas contre un peu d'aide ^^

Discord : @busybox#2540
Serveur : https://discord.io/techcordfr

Site : [nowplayingforspotify.ga](http://nowplayingforspotify.ga)

Version actuelle : 1.0

![Screenshot](https://github.com/busybox11/NowPlaying-for-Spotify/blob/master/Screenshot.png?raw=true)

## **Langages utilisés :**

HTML , CSS ("langages")
JS (jugez pas mon niveau, j'en fais depuis une demi-journée)
PHP (ouais là non plus jugez pas sivouplé)

## **Librairies utilisées :**

[Spotify Web API PHP par jwilsson](https://github.com/jwilsson/spotify-web-api-php) pour l'obtention du token,
[Spotify Web API JS par JMPerez](https://github.com/jmperez/spotify-web-api-js) pour l'obtention du titre en cours de lecture

## **Bugs connus**
 - Non responsive
 - Token dans l'URL du visualiseur (peut être fixé rapidement)
 - Ne reconnaît pas les pubs

## **Fonctionnalités à venir**
 - Support des pubs
 - Affichage de l'appareil en cours de lecture (si possible)
 - Thèmes
 - Transitions (merci @quentin3157 pour ta suggestion !)

## **Comment l'héberger ?**

Vous pouvez utiliser XAMPP (si vous êtes sous Linux) ou Wamp (si vous êtes sous Windows) mais n'importe quel serveur PHP fera l'affaire.

## **Quels modifications sont nécéssaires ?**

Vous devrez tout d'abord avoir une application déclarée chez Spotify pour avoir un `Client ID`.

*La marche à suivre :*
Pour faire les modifications, vous devrez tout d'abord créer un ID client (bouton `Create a Client ID`) sur le [dashboard développeurs de Spotify](https://developer.spotify.com/dashboard/applications).
Mettez le nom de votre appli dans `App or Hardware name`, puis sa description dans `App or Hardware description`. Indiquez pour quelle plateforme vous créez cette appli dans `What are you building ?` puis cliquez sur le bouton `NEXT`. Répondez oui ou non à la question vous demandant si vous créez une intégration commerciale suivant votre cas puis continuez. Remplissez si nécessaire le formulaire puis cochez toutes les cases lors de la troisième étape, puis continuez. Votre application est crée !

Maintenant que vous avez votre application, vous pouvez faire les modifications nécessaires dans les fichiers `login.php` et `token.php`. 

Remplacez :
 - `YOUR_CLIENT_ID` par votre ID Client disponible sur le panel de votre application,
 - `YOUR_CLIENT_SECRET` par votre `Client Secret` disponible en cliquant sur `Show Client Secret` sur la même page,
 - `YOUR_DOMAIN` par votre domaine, dans le cas d'un hébergement local remplacez par `http://localhost` . Remplacez selon votre cas.

Retournons dans le panel de l'application. Il faut déclarer l'URL où se trouve la page traitant le `token`, ici `http://localhost/token.php`. Cliquez sur le bouton `Edit settings` se trouvant en haut de la page, puis dans le champ `Redirect URIs` ajoutez le vôtre, ici `http://localhost/token.php`. ***ATTENTION*** : ce champ doit correspondre **PARFAITEMENT** avec ce qui est indiqué dans les pages modifiées précédemment ! Pour finir, sauvegardez en cliant sur le bouton `SAVE` tout en bas de la page.
