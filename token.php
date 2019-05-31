<?php
require 'vendor/autoload.php';

$session = new SpotifyWebAPI\Session(
    'YOUR_CLIENT_ID',
    'YOUR_CLIENT_SECRET',
    'YOUR_DOMAIN/token.php'
);

$session->requestAccessToken($_GET['code']);

$accessToken = $session->getAccessToken();

header('Location: playing.php?token='.$accessToken);
die();
?>