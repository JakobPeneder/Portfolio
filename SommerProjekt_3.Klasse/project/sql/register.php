<?php
require 'session.php';
require 'mysql.php';

$answer = [
    "code" => 404,
    "registered" => false,
    "message" => "Registration failed"
];

// Prüfen, ob alle benötigten POST-Daten gesendet wurden
if (isset($_POST["user"]) && isset($_POST["password"]) && isset($_POST["email"])) {
    $user = trim($_POST["user"]);
    $pw = $_POST["password"];
    $email = trim($_POST["email"]);
    $rating = 0; // Standardwert für rating
    $bio = "Keine Biografie vorhanden"; // Standardwert für bio
    $street = ""; // Standardwert für street
    $postalcode = ""; // Standardwert für postalcode
    $city = ""; // Standardwert für city
    $housenumber = ""; // Standardwert für house number
    // Passwort hashen (bcrypt)
    $pwhash = password_hash($pw, PASSWORD_BCRYPT);

    try {
        // SQL mit Prepared Statement (Schutz vor SQL-Injection)
        $stmt = $conn->prepare("INSERT INTO user (name, email, passwort, rating, bio, street, house_number, postal_code, town) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("sssissiis", $user, $email, $pwhash, $rating, $bio, $street, $housenumber, $postalcode, $city);

        if ($stmt->execute()) {
            $answer["code"] = 200;
            $_SESSION["loggedIn"] = true;
            $answer["registered"] = true;
            $answer["message"] = "Registration successful";
        } else {
            $answer["message"] = "Database error";
        }

        $stmt->close();
    } catch (mysqli_sql_exception $e) {
        $answer["code"] = $e->getCode();
        $answer["message"] = "Error: " . $e->getMessage();
    }
} else {
    $answer["message"] = "Missing parameters";
}

echo json_encode($answer);
?>