<?php
require_once 'vendor/autoload.php';

$session = new SpotifyWebAPI\Session(
    'YOUR_CLIENT_ID',
    'YOUR_CLIENT_SECRET',
    'YOUR_DOMAIN/token.php'
);

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
