<?php 
if(!isset($_COOKIE['lang']) || empty($_COOKIE['lang'])) {
    setcookie('lang', 'en', time() + 60*60*24*30);
}

switch(@$_COOKIE['lang']){
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
    case 'cz':
        include_once 'assets/lang/cz.php';
        $lang = 'cz';
    break;
    case 'gr':
        include_once 'assets/lang/gr.php';
        $lang = 'gr';
    break;
    case 'zh_tw':
        include_once 'assets/lang/zh_tw.php';
        $lang = 'zh_tw';
    break;
}
?>
