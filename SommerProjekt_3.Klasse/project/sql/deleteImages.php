<?php
require '../sql/session.php';
require '../sql/mysql.php';

$answer = [
    'success' => false,
    'message' => 'Fehler beim Löschen der Bilder.',
    'result' => null
];

$input = json_decode(file_get_contents("php://input"), true);
$id = $input["id"] ?? null;


if(isset($id)) {
    
    // Bild aus der Datenbank löschen
    $stmt = $conn->prepare("DELETE FROM images WHERE id = ?");
    $stmt->bind_param("i", $id);

    if ($stmt->execute()) {
        $answer["success"] = true;
        $answer["message"] = "Bild erfolgreich gelöscht.";
    } else {
        $answer["message"] = "Fehler beim Löschen des Bildes.";
    }

    $stmt->close();
}

echo json_encode($answer);


?>