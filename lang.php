<?php
$lang = 'en';

if(!isset($_COOKIE['lang']) || empty($_COOKIE['lang'])) {
    setcookie('lang', 'en', time() + 60*60*24*30);
}

if (isset($_GET['lang'])) {
    setcookie('lang', $_GET['lang'], time() + 60*60*24*30);
    $lang = $_GET['lang'];
} else if (isset($_COOKIE['lang'])) {
    $lang = $_COOKIE['lang'];
}

// TODO: Use single function instead of switch
switch(@$lang){
    case 'ar':
        include_once 'assets/lang/ar.php';
        $lang = 'ar';
    break;
    case 'fr':
        include_once 'assets/lang/fr.php';
        $lang = 'fr';
    break;
    case 'it':
        include_once 'assets/lang/it.php';
        $lang = 'it';
    break;
    case 'es':
        include_once 'assets/lang/es.php';
        $lang = 'es';
    break;
    case 'ru':
        include_once 'assets/lang/ru.php';
        $lang = 'ru';
    break;
    case 'de':
        include_once 'assets/lang/de.php';
        $lang = 'de';
    break;
    case 'id':
        include_once 'assets/lang/id.php';
        $lang = 'id';
    break;
    case 'en': default:
        include_once 'assets/lang/en.php';
        $lang = 'en';
    break;
    case 'eo':
        include_once 'assets/lang/eo.php';
        $lang = 'eo';
    break;
    case 'cz':
        include_once 'assets/lang/cz.php';
        $lang = 'cz';
    break;
    case 'tr':
        include_once 'assets/lang/tr.php';
        $lang = 'tr';
    break;
    case 'gr':
        include_once 'assets/lang/gr.php';
        $lang = 'gr';
    break;
    case 'zh_tw':
        include_once 'assets/lang/zh_tw.php';
        $lang = 'zh_tw';
    break;
         case 'nl':
        include_once 'assets/lang/nl.php';
        $lang = 'nl';
    break;
         case 'az':
        include_once 'assets/lang/az.php';
        $lang = 'az';
    break;
}
?>
