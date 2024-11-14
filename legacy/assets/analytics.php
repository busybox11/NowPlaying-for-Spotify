<?php

if (!isset($dotenv)) {
  require_once 'vendor/autoload.php';

  $dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/..');
  $dotenv->load();
}

function getAnalyticsScript()
{
  if (isset($_ENV['ANALYTICS_SCRIPT'])) {
    return $_ENV['ANALYTICS_SCRIPT'];
  }

  return "";
}