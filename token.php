<?php
require 'vendor/autoload.php';

$session = new SpotifyWebAPI\Session(
    'YOUR_CLIENT_ID',
    'YOUR_CLIENT_SECRET',
    'YOUR_DOMAIN/token.php'
);

if (!isset($_GET['action'])) {

    $session->requestAccessToken($_GET['code']);

    $accessToken = $session->getAccessToken();
    setcookie('accessToken', $accessToken, time() + 3600);
    setcookie('refreshTime', time() + 3600, time() + (3600 * 365));
    $refreshToken = $session->getRefreshToken();
    setcookie('refreshToken', $refreshToken, time() + (3600 * 365));

} elseif ($_GET['action'] == "refresh") {

    $session->refreshAccessToken($_COOKIE['refreshToken']);

    $accessToken = $session->getAccessToken();
}

header('Location: playing.php?token='.$accessToken);
die();
?>
