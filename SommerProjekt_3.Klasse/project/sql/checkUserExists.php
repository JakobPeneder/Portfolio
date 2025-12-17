<?php
    require 'mysql.php';
    $answer = [
        "code" => 404,
        "exists" => false,
    ];

    if(isset($_POST["email"])) {
        $email = $_POST["email"];
        $sql = "SELECT name FROM user WHERE email = '$email'";
        $user_sql = $conn->query($sql)->fetch_all(MYSQLI_ASSOC);

        if(count($user_sql) > 0) {
            $answer["code"] = 200;
            $answer["exists"] = true;
        }

    }


    echo json_encode(value: $answer);
