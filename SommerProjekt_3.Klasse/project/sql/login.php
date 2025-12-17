<?php
require 'session.php';
require 'mysql.php';

$answer = [
    "code" => 404,
    "loggedIn" => false,
    "message" => "Login failed",
    "errorSignals" => "Nothing"
];

// Prüfen, ob alle benötigten POST-Daten gesendet wurden
if (isset($_POST["password"]) && isset($_POST["email"])) {
    $pw = $_POST["password"];
    $email = trim($_POST["email"]);
   
    try {
        // 💡 Nutze prepared statements gegen SQL-Injection
        $stmt = $conn->prepare("SELECT passwort FROM user WHERE email = ?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();
        $user_sql = $result->fetch_assoc();

        // Prüfen, ob der Benutzer existiert
        if ($user_sql) { 
            $pwhash = $user_sql["passwort"];

            if (password_verify($pw, $pwhash)) {
                $answer["code"] = 200;
                $_SESSION["loggedIn"] = true;
                $_SESSION["email"] = $email;
                $answer["loggedIn"] = true;
                $answer["message"] = "Login successful";
            } else {
                $answer["errorSignals"] = "Passwort";
                $answer["message"] = "Das Passwort ist leider falsch!";
            }
        } else {
            $answer["message"] = "Die E-Mail konnte nicht gefunden werden!";
            $answer["errorSignals"] = "Both";
        }


    } catch (mysqli_sql_exception $e) {
        $answer["code"] = 500; // Interner Serverfehler
        $answer["message"] = "Datenbankfehler: " . $e->getMessage();
    }


}else {
    $answer["message"] = "Du musst alle Felder ausfüllen!";
    $answer["errorSignals"] = "Both";
}
echo json_encode($answer);

    

?>