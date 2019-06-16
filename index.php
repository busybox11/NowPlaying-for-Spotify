<!DOCTYPE html>

<head>
    <title>Now Playing for Spotify</title>
    <link rel="icon" type="image/png" href="favicon.png">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link href="productsans.css?ts=<?=time ()?>" rel="stylesheet">
    <style>
        body {
        background-color: #000020;
        }

        p,
        h1,
        h2,
        h3,
        a {
            color: white;
            font-family: "Product Sans";
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
    <center>
        <div class="content">
            <h1>Bienvenue sur NowPlaying for Spotify !</h1>
            <h2>Veuillez vous connecter avec votre compte Spotify.</h2>
            <p class="space20"></p>
            <a href="login.php" class="spotify-btn">CONNEXION</a>
            <p class="space20"></p>
            <h3>En cliquant sur 'CONNEXION', vous acceptez l'utilisation des cookies nécessaires au bon fonctionnement du site.</h3>
        </div>
    </center>
</body>
