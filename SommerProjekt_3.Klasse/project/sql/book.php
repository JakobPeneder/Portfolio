<?php
    require '../sql/session.php';   
    require '../sql/mysql.php';

    $answer = [
        'success' => false,
        'message' => ''
    ];

    if(isset($_POST['id']) && isset($_POST['start']) && isset($_POST['end']) && isset($_POST['totalPrice'])) {
        $id = htmlspecialchars($_POST['id']);
        $start = htmlspecialchars($_POST['start']);
        $end = htmlspecialchars($_POST['end']);
        $totalPrice = htmlspecialchars($_POST['totalPrice']);

        // Benutzer-ID holen
        $email = $_SESSION['email'];
        $stmtUser = $conn->prepare("SELECT id FROM user WHERE email = ?");
        $stmtUser->bind_param("s", $email);
        $stmtUser->execute();
        $resultUser = $stmtUser->get_result();
        $userRow = $resultUser->fetch_assoc();
        $user_id = $userRow['id'];
        $stmtUser->close();

        $startdate = DateTime::createFromFormat('d.m.Y', $start);
        $enddate = DateTime::createFromFormat('d.m.Y', $end);
        if (!$startdate || !$enddate) {
            echo "Ungültiges Datumsformat.";
            exit;
        }
        $start = $startdate->format('Y-m-d');
        $end = $enddate->format('Y-m-d');
        
        // Buchung in die Datenbank einfügen
        if ($user_id) {
            $stmtInsertBooking = $conn->prepare("INSERT INTO bookings (rentUser_id, listing_id, start_date, end_date, price) VALUES (?, ?, ?, ?, ?)");
            $stmtInsertBooking->bind_param("iissi", $user_id, $id, $start, $end, $totalPrice);
            if ($stmtInsertBooking->execute()) {
                $answer['success'] = true;
                echo "Buchung erfolgreich!";
            } else {
                $answer['success'] = false;
                echo "Fehler bei der Buchung: " . $conn->error; 
            }
            $stmtInsertBooking->close();
        } else {
            echo "Benutzer nicht gefunden.";
        }
    } else {
        echo "Ungültige Anfrage.";
    }


    echo json_encode($answer);





?>