<?php
    require 'session.php';

    require 'debugging.php';
        // DEFAULT ANSWER
    $answer = array(
        "code"=>404,
        "spells"=>[],
    );

    
    if($_SESSION["loggedIn"] == true) {
    

        $data = file_get_contents("../data/potterapi_spells.json");
        $spells = json_decode($data);

        
        if(isset($_GET["id"])) {
            $id = $_GET["id"];
            for($i= 0;$i<count($spells);$i++) {
                if($spells[$i]->id == $id) {
                    $answer["code"] = 200;
                    array_push($answer["spells"], $spells[$i]);
                }
            }
        }
        else{
            for ($i=0; $i < count($spells); $i++) { 
                $answer["code"] = 200;
                array_push($answer["spells"], $spells[$i]);
            }
        }

    }   

    // SEND JSON
    echo json_encode($answer);
?>