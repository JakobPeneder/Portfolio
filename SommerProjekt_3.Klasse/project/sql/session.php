<?php
session_start();  // This must be the very first line of the script

if (!isset($_SESSION['loggedIn'])) {
    $_SESSION['loggedIn'] = false;
}

if (!isset($_SESSION['email'])) {
    $_SESSION['email'] = "";
}

?>
