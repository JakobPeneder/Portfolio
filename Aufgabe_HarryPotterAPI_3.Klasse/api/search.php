<?php
    require 'debugging.php';
        // DEFAULT ANSWER
    $answer = array(
        "code"=>404,
        "spells"=>[]
    );

    $data = file_get_contents("../data/potterapi_spells.json");
    $spells = json_decode($data);

    if(isset($_GET["search"])) {
        $incantation = $_GET["search"];
        for ($i=0; $i < count($spells); $i++) { 
            if ($spells[$i]->attributes->incantation != null && str_contains(haystack: strtolower(string: $spells[$i]->attributes->incantation), needle: $incantation) ) {
                array_push($answer["spells"], $spells[$i]);

                            $answer["code"] = 200;

            }     
    }
}
  
    echo json_encode($answer);

?>