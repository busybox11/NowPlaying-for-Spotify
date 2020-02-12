<?php 

if(isset($_GET)){
    if(isset($_GET['lang']) && !empty($_GET['lang'])){
        setcookie('lang', $_GET['lang'], time() + 60*60*24*30);
    }
}

if(!isset($_COOKIE['lang']) OR empty($_COOKIE['lang'])){
    setcookie('lang', 'en', time() + 60*60*24*30);
}

switch(@$_COOKIE['lang']){
    case 'fr': include_once 'lang/fr.php';
    break;
    case 'en': default: include_once 'lang/en.php';
    break;
}

if(isset($_GET['lang'])){
    header('Location: '.$_SERVER['PHP_SELF']);
}

?>


<!DOCTYPE html>
<html>
<head>
    <title>Now Playing for Spotify</title>
    <link rel="icon" type="image/png" href="favicon.png">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="NowPlaying-For-Spotify is a smooth Spotify Connect visualizer, which display the music playing on Spotify" />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:creator" content="@busybox11" />
    <meta name="twitter:image" content="https://<?=$_SERVER['SERVER_NAME'];?>/favicon.png" />
    <meta property="og:title" content="Now Playing For Spotify" />
    <meta property="og:type" content="website" />
    <meta property="og:description" content="NowPlaying-For-Spotify is a smooth Spotify Connect visualizer, which display the music playing on Spotify" />
    <meta name="og:image" content="https://<?=$_SERVER['SERVER_NAME'];?>/favicon.png" />
    <meta name="theme-color" content="#23a92a" />
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link href="productsans.css?ts=<?=time ()?>" rel="stylesheet">
    <style>
        *{
            box-sizing: border-box;
        }

        body {
            background-color: #000020;
            color:white;
            font-family: "Product Sans";
            font-size: 16px;
            font-size: 1rem;
            margin: 0;
        }

        p,
        h1,
        h2,
        h3,
        a {
            color: white;
            text-decoration: none;
        }

        .content {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding-top: 35px;
        }

        .spotify-btn {
            background-color: #1DB954;
            border-radius: 500px;
            padding: 19px 56px 21px;
            color: white;
            font-size: 16px;
        }

        .space20 {
            height: 20px;
        }       
    </style>
</head>

<body>
        <div class="content" style="margin:0 auto;text-align:center;">
            <div>
                <img src="favicon.png" alt="Logo" width="100px" height="100px">
                <h1><?=IndexWelcome;?></h1>
                <h2><?=IndexPleaseConnect;?></h2>
            </div>
            <p class="space20"></p>
            <a href="login.php" class="spotify-btn"><?=IndexConnection;?></a>
            <p class="space20"></p>
            <h3><?=OpenSourceProject;?><a href="https://github.com/busybox11/NowPlaying-for-Spotify"><?=OpenSourceLink;?></h3>
            <div>
                <h3>Change language:</h3>
                <a href="?lang=en"><img src="lang/united-kingdom.png" title="English" style="height:32px;width:auto;" /></a>&nbsp;<a href="?lang=fr"><img src="lang/france.png" title="Français" style="height:32px;width:auto;" /></a>
            </div>
            <p class="space20"></p>
            <h3><?=IndexCookie;?></h3>
        </div>
</body>
</html>
