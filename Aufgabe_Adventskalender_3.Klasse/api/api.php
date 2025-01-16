<?php
    require 'debugging.php';
        // DEFAULT ANSWER
    $answer = array(
        "code"=>404,
        "recipes"=>[],
        "error"=>"undefined error"
    );

 

    if( isset($_GET["id"]) && filter_var($_GET["id"], FILTER_VALIDATE_INT) !== false && $_GET["id"] > 0 && $_GET["id"] < 25 ) {
    $id = $_GET["id"];

    // Aktuelles Datum als DateTime-Objekt
    $today = new DateTime();

    // Ziel-Datum (1. Dezember 2024) als DateTime-Objekt
    $targetDate = new DateTime('2024-11-' . $id);

    // Überprüfen, ob das aktuelle Datum mindestens der 1. Dezember 2024 ist
    if ($today >= $targetDate) {
        $data = file_get_contents("../data/data.json");
        $recipes = json_decode($data);

        if($id <= count($recipes)){
            $answer["code"] = 200;
            $answer["error"] = "no error";

            array_push($answer["recipes"], $recipes[$id - 1]);
        }
    } else {
        $answer["error"] = "Make another try tomorrow ;-)!";
    }

    } 

    header("Content-type:application/json");

    echo json_encode($answer);

    ?>