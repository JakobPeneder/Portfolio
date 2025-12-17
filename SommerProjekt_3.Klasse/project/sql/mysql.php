<?php
// mysql.php: Stellt die Verbindung zur MySQL-Datenbank her
$servername = 'db_server';
$port = 3306;
$username = 'RentMyRide';
$password = 'rWk*)pWUIv.](Ja@';
$dbname = 'RentMyRide';

$conn = new mysqli($servername, $username, $password, $dbname, $port);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}


?>