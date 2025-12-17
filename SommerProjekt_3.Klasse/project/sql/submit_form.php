<?php
require '../sql/session.php';
require '../sql/mysql.php';

// Formulardaten
$title = $_POST['title'] ?? '';
$price = $_POST['price'] ?? 0;
$brand = $_POST['brand'] ?? '';
$description = $_POST['description'] ?? '';
$length = $_POST['length'] ?? 0;
$street = $_POST['street'] ?? '';
$postalcode = $_POST['postalcode'] ?? 0;
$city = $_POST['city'] ?? '';
$housenumber = $_POST['housenumber'] ?? 0;


if (isset($_POST['typ']) && $_POST['typ'] == 1) {
    $typ = 'Snowboard';
} else {
    $typ = 'Ski';
}

if(isset($_POST['saveAddress']) && $_POST['saveAddress'] == 1) {
    $saveAddress = true;
} else {
    $saveAddress = false;
}

$state = $_POST['state'] ?? '';






// Benutzer-ID holen
$email = $_SESSION['email'];
$stmtUser = $conn->prepare("SELECT id FROM user WHERE email = ?");
$stmtUser->bind_param("s", $email);
$stmtUser->execute();
$resultUser = $stmtUser->get_result();
$userRow = $resultUser->fetch_assoc();
$user_id = $userRow['id'];
$stmtUser->close();


if($saveAddress) {
    $stmtUpdateUser = $conn->prepare("UPDATE user 
    SET street = ?, house_number = ?, postal_code = ?, town = ?
    WHERE id = ?
    ");
    $stmtUpdateUser->bind_param("siisi", $street, $housenumber, $postalcode, $city, $user_id);
    $stmtUpdateUser->execute();
    $stmtUpdateUser->close();
}

if ($resultUser->num_rows === 0) {
    die("Benutzer nicht gefunden.");
}

// Allgemein gültige Werte
$publishDate = date('Y-m-d');

$listing_id = $_POST['listing_id'] ?? null;
$counter = 0;
if ($listing_id) {
    // Update
    $stmt = $conn->prepare("UPDATE listings SET title=?, description=?, price=?, state=?, brand=?, length=?, typ=?, publishDate=?, street =?, house_number=?, postal_code=?, town=? WHERE id=? AND user_id=?");
    $stmt->bind_param("ssississsiisii", $title, $description, $price, $state, $brand, $length, $typ, $publishDate,$street, $housenumber, $postalcode, $city, $listing_id, $user_id);
    $stmt->execute();
    $stmt->close();
} else {
    // Insert
    $stmt = $conn->prepare("INSERT INTO listings (user_id, title, description, price, state, brand, length, typ, publishDate, street, house_number, postal_code, town, counter) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("issississsiisi", $user_id, $title, $description, $price, $state, $brand, $length, $typ, $publishDate, $street, $housenumber, $postalcode, $city,$counter);
    $stmt->execute();
    $listing_id = $stmt->insert_id;
    $stmt->close();
}

// Upload-Verzeichnis
$uploadDir = "uploads/";
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

// Bild-Upload prüfen
$maxSize = 5 * 1024 * 1024;
$allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
$allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

foreach ($_FILES['bild']['tmp_name'] as $key => $tmpName) {
    $error = $_FILES['bild']['error'][$key];

    if ($error === UPLOAD_ERR_OK) {
        $originalName = $_FILES['bild']['name'][$key];
        $fileSize = $_FILES['bild']['size'][$key];
        $fileTmp = $_FILES['bild']['tmp_name'][$key];

        $fileInfo = pathinfo($originalName);
        $extension = strtolower($fileInfo['extension']);
        $newName = $originalName;
        $uploadPath = $uploadDir . $newName;

        if ($fileSize > $maxSize || !in_array($extension, $allowedExtensions)) {
            echo "Datei {$originalName} ist ungültig oder zu groß.<br>";
            continue;
        }

        $imageInfo = getimagesize($fileTmp);
        if ($imageInfo === false || !in_array($imageInfo['mime'], $allowedMimeTypes)) {
            echo "Datei {$originalName} ist kein gültiges Bild.<br>";
            continue;
        }

        if (move_uploaded_file($fileTmp, $uploadPath)) {
            $stmtImg = $conn->prepare("INSERT INTO images (listing_id, path) VALUES (?, ?)");
            $stmtImg->bind_param("is", $listing_id, $uploadPath);
            $stmtImg->execute();
            $stmtImg->close();
        } else {
            echo "Fehler beim Speichern von {$originalName}.<br>";
        }
    } else {
        $originalName = $_FILES['bild']['name'][$key] ?? 'Unbenannt';
    }
}

$conn->close();

// Weiterleitung
header(header: "Location: ../pages/dashboard.php");
exit();
?>
