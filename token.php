<?php
require 'vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

$session = new SpotifyWebAPI\Session(
    $CLIENT_ID = $_ENV['CLIENT_ID'],
    $CLIENT_SECRET = $_ENV['CLIENT_SECRET'],
    $REDIRECT_URI = $_ENV['REDIRECT_URI'],
);

$refreshToken = $_COOKIE['refreshToken'] ?? $_GET['refreshToken'] ?? null;

if (!isset($_GET['action'])) {

    $session->requestAccessToken($_GET['code']);

    $accessToken = $session->getAccessToken();
    setcookie('accessToken', $accessToken, time() + 3600);
    setcookie('refreshTime', time() + 3600, time() + (3600 * 365));
    $refreshToken = $session->getRefreshToken();
    $refreshTime = time() + 3600;
    setcookie('refreshToken', $refreshToken, time() + (3600 * 365));

} elseif ($_GET['action'] == "refresh") {

    $session->refreshAccessToken($refreshToken);

    $accessToken = $session->getAccessToken();
    setcookie('accessToken', $accessToken, time() + 3600);
    setcookie('refreshTime', time() + 3600, time() + (3600 * 365));
    $refreshToken = $session->getRefreshToken();
    $refreshTime = time() + 3600;
    setcookie('refreshToken', $refreshToken, time() + (3600 * 365));
}

if (isset($_GET['response']) && $_GET['response'] == "data") {
    echo json_encode(array(
        'accessToken' => $accessToken,
        'refreshToken' => $refreshToken,
        'refreshTime' => $refreshTime,
    ));
    die();
} else {
    header('Location: playing.php');
    die();
}
?>
