<?php
session_start();
require_once 'vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

$session = new SpotifyWebAPI\Session(
    $CLIENT_ID = $_ENV['CLIENT_ID'],
    $CLIENT_SECRET = $_ENV['CLIENT_SECRET'],
    $REDIRECT_URI = $_ENV['REDIRECT_URI'],
);

if ($_GET['generateMiniPlayer'] == 'true') {
    $_SESSION['generateMiniPlayer'] = true;
} else {
    $_SESSION['generateMiniPlayer'] = false;
}

$options = [
    'scope' => [
        'user-read-currently-playing',
        'user-read-playback-state',
        'streaming'
    ],
];

header('Location: ' . $session->getAuthorizeUrl($options));
die();
?>

