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
    case 'en': default: include_once '../lang/en.php';
    break;
    case 'fr': include_once '../lang/fr.php';
    break;
    case 'it': include_once '../lang/it.php';
    break;
    case 'es': include_once '../lang/es.php';
    break;
    case 'ru': include_once '../lang/ru.php';
    break;
    case 'de': include_once '../lang/de.php';
    break;
    case 'id': include_once '../lang/id.php';
    break;
}

if(isset($_GET['lang'])){
    header('Location: '.$_SERVER['PHP_SELF']);
}
?>

<!DOCTYPE html>
<html>
<head>
    <title><?=Error;?> 404 - Now Playing for Spotify</title>
    <link rel="icon" type="image/png" href="favicon.png">
    <meta name="viewport" content="width=device-width, user-scalable=no">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link href="productsans.css?ts=<?=time ()?>" rel="stylesheet">
    <style>
        body {
            background-color: #000020;
            color:white;
            font-family: "Product Sans";
            font-size: 1rem;
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
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
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
            <h1><?=Error;?> 404</h1>
            <h2><?=IndexError404;?></h2>
            <p class="space20"></p>
            <a href="javascript:window.history.back()" class="spotify-btn"><?=IndexGoBack;?></a>
            <p class="space20"></p>
            <h3>Change language:</h3>
               <a href="?lang=en"><img src="../lang/united-kingdom.png" title="English" style="height:32px;width:auto;" /></a>&nbsp;<a href="?lang=fr"><img src="../lang/france.png" title="Français" style="height:32px;width:auto;" /></a>
            <p class="space20"></p>
        </div>
</body>
</html>
