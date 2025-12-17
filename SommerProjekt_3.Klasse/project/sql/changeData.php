<?php
require 'session.php';
require 'mysql.php';

$answer = [
    "code" => 400,
    "success" => false,
    "message" => "Invalid request"
];

// Prüfen, ob alle benötigten POST-Daten gesendet wurden
if (isset($_POST["id"]) && isset($_POST["value"])) {
    $allowedColumns = ["name", "email", "bio"]; // Erlaubte Spaltennamen
    $column = $_POST["id"];
    
    if (!in_array($column, $allowedColumns)) {
        $answer["message"] = "Ungültiges Feld";
        echo json_encode($answer);
        exit;
    }

    $value = $_POST["value"];
    $email = $_SESSION["email"];

    $sql = "UPDATE user SET $column = ? WHERE email = ?";
    $stmt = $conn->prepare($sql);
    
    if ($stmt) {
        $stmt->bind_param("ss", $value, $email);
        if ($stmt->execute()) {
            $answer["code"] = 200;
            $answer["success"] = true;
            $answer["message"] = "Update erfolgreich";
        } else {
            $answer["message"] = "Datenbank-Fehler: " . $stmt->error;
        }
        $stmt->close();
    } else {
        $answer["message"] = "Statement-Fehler";
    }
}

echo json_encode($answer);
?>
