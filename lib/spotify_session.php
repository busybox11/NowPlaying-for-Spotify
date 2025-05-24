<?php
require_once __DIR__ . '/../vendor/autoload.php';

if (!isset($dotenv)) {
    $dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/..');
    $dotenv->load();
}

$session = new SpotifyWebAPI\Session(
    $_ENV['CLIENT_ID'],
    $_ENV['CLIENT_SECRET'],
    $_ENV['REDIRECT_URI']
);