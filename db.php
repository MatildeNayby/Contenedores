<?php
$host = 'localhost';
$db = 'smartbin_system';
$user = 'sd';
$pass = 'maroczybind';

// Create a connection using mysqli
$mysqli = new mysqli($host, $user, $pass, $db);

// Check connection
if ($mysqli->connect_error) {
    die("Database connection failed: " . $mysqli->connect_error);
}
?>
