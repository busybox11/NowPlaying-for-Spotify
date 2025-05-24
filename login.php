<?php
session_start();
require_once 'vendor/autoload.php';
require_once 'lib/spotify_session.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

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

