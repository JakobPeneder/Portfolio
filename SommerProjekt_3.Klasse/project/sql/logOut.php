<?php
    require '../sql/session.php';    
    require '../sql/mysql.php';

    $answer = [
        'success' => false,
        'message' => 'Logout failed'
    ];


    if(isset($_POST['logout'])) {
        session_destroy();
        $answer['success'] = true;
        $answer['message'] = 'Logout successful';
    }else {
        $answer['message'] = 'Logout failed';
    }

    echo json_encode($answer);
?>