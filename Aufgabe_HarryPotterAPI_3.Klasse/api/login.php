<?php
    
    require 'session.php';

    $answer = array(
        "code" =>404,
        "loggedIn" =>false,
    );



    
    if(isset($_POST['user']) && isset($_POST['password'])) {
        $user = $_POST['user'];
        $pass = $_POST['password'];

        $data = file_get_contents('../data/user.json');
        $users = json_decode($data);


        for ($i = 0; $i < count($users); $i++) {
            if ($users[$i]->username == $user && $users[$i]->password == $pass) {
                $_SESSION['loggedIn'] = true;
                $answer['code'] = 200;
                $answer['loggedIn'] = true;
                break;
            }
        }


    }

    header('Content-Type: application/json');
    echo json_encode($answer);



?>