<?php
require '../sql/session.php';
require '../sql/mysql.php';

$answer = [
    'success' => false,
    'message' => 'Fehler beim Löschen des Listings.',
    'result' => null
];

$input = json_decode(file_get_contents("php://input"), true);
$id = $input["id"] ?? null;

if ($id !== null) {
    // 1. Buchungen löschen
    $stmtBookings = $conn->prepare("DELETE FROM bookings WHERE listing_id = ?");
    $stmtBookings->bind_param("i", $id);
    $stmtBookings->execute();
    $stmtBookings->close();

    // 2. Bilder löschen
    $stmtImg = $conn->prepare("DELETE FROM images WHERE listing_id = ?");
    $stmtImg->bind_param("i", $id);
    $stmtImg->execute();
    $stmtImg->close();

    // 3. Listing löschen
    $stmtListing = $conn->prepare("DELETE FROM listings WHERE id = ?");
    $stmtListing->bind_param("i", $id);
    if ($stmtListing->execute()) {
        $answer["success"] = true;
        $answer["message"] = "Listing erfolgreich gelöscht.";
    } else {
        $answer["message"] = "Fehler beim Löschen des Listings.";
    }
    $stmtListing->close();
}

echo json_encode($answer);
?>
