<?php
    require 'debugging.php';
        // DEFAULT ANSWER
    $answer = array(
        "code"=>404,
        "spells"=>[]
    );

    $data = file_get_contents("../data/potterapi_spells.json");
    $spells = json_decode($data);

    if(isset($_GET["category"])) {
        $category = $_GET["category"];
        for ($i=0; $i < count($spells); $i++) { 
            $answer["code"] = 200;
            if ($spells[$i]->attributes->category === $category) {
                array_push($answer["spells"], $spells[$i]);
            }     
    }
}
  
    echo json_encode($answer);

?>