
<?php
require 'vendor/autoload.php';


$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();



$session = new SpotifyWebAPI\Session(
$CLIENT_ID = getenv("CLIENT_ID"),
$CLIENT_SECRET = getenv("CLIENT_SECRET"),
$REDIRECT_URI = getenv("REDIRECT_URI")

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
    setcookie('accessToken', $accessToken, time() + 3600);
    setcookie('refreshTime', time() + 3600, time() + (3600 * 365));
    $refreshToken = $session->getRefreshToken();
    setcookie('refreshToken', $refreshToken, time() + (3600 * 365));
}

header('Location: playing.php');
die();
?>

