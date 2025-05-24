<?php
session_start();
require 'vendor/autoload.php';
require_once 'lib/spotify_session.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

// Use the passed GET refreshToken parameter first
// in case this is used as a not logged in miniplayer
$refreshToken = $_GET['refreshToken'] ?? $_COOKIE['refreshToken'] ?? null;

if (!isset($_GET['action'])) {
    $session->requestAccessToken($_GET['code']);

    $accessToken = $session->getAccessToken();
    $refreshToken = $session->getRefreshToken();
    $refreshTime = time() + 3600;

    setcookie('accessToken', $accessToken, time() + 3600);
    setcookie('refreshTime', time() + 3600, time() + (3600 * 365));
    setcookie('refreshToken', $refreshToken, time() + (3600 * 365));
} elseif ($_GET['action'] == "refresh") {
    $session->refreshAccessToken($refreshToken);

    $accessToken = $session->getAccessToken();
    $refreshToken = $session->getRefreshToken();
    $refreshTime = time() + 3600;

    if (!$_GET['refreshToken']) {
        // No need to set cookies if a refresh token is passed via a GET parameter
        // We only want to get the necessary tokens and data from a fetch() call
        setcookie('accessToken', $accessToken, time() + 3600);
        setcookie('refreshTime', time() + 3600, time() + (3600 * 365));
        setcookie('refreshToken', $refreshToken, time() + (3600 * 365));
    }
}

if (isset($_GET['response']) && $_GET['response'] == "data") {
    echo json_encode(array(
        'accessToken' => $accessToken,
        'refreshToken' => $refreshToken,
        'refreshTime' => $refreshTime,
    ));
    die();
} else {
    if ($_SESSION['generateMiniPlayer'] == true) {
        header('Location: generate_miniplayer.php');
        die();
    }

    header('Location: playing.php');
    die();
}
?>
