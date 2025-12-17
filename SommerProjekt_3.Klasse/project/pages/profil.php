<?php require '../sql/session.php'; ?>
<?php require '../generalPhp/navigation.php';        

    if(!isset($_SESSION['loggedIn']) || $_SESSION['loggedIn'] == false) {
        header("Location: ../pages/formular.php");
        exit();
    }
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
    <script> 
        let timestamp = new Date().getTime();
        let link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = '../css/profil.css?' + timestamp;
        document.head.appendChild(link);

        link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = '../css/generalSettings.css?' + timestamp;
        document.head.appendChild(link);

        let script = document.createElement('script');
        script.src = '../js/profil.js?' + timestamp;
        script.defer = true;
        document.head.appendChild(script);
    </script>
</head>
<body>

<div id="background">
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" id="klecks">
        <path fill="#3A7FCA" d="M40.6,-49.6C55.8,-35.6,73.6,-25.9,78.7,-11.7C83.8,2.5,76.3,21.1,64,31.8C51.7,42.5,34.6,45.3,20.4,46C6.3,46.8,-4.9,45.6,-21.8,45.6C-38.7,45.7,-61.2,47,-72.9,37.1C-84.5,27.2,-85.4,6,-76.1,-7.7C-66.9,-21.4,-47.7,-27.6,-33.3,-41.7C-18.9,-55.9,-9.5,-77.9,1.6,-79.8C12.7,-81.7,25.4,-63.6,40.6,-49.6Z" transform="translate(100 100)" />
    </svg>
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" id="klecks2">
        <path fill="#3A7FCA" d="M43.8,-55.8C45.7,-50.7,28.5,-26.3,29.2,-7.4C29.9,11.6,48.6,25.2,49.5,33.2C50.4,41.2,33.6,43.7,16.8,52.5C0,61.4,-16.7,76.7,-31.2,75.7C-45.6,74.8,-57.8,57.6,-62.2,40.5C-66.7,23.4,-63.5,6.4,-61.7,-12.1C-59.9,-30.6,-59.5,-50.6,-49.5,-54.3C-39.5,-58,-19.7,-45.4,0.6,-46.1C21,-46.8,41.9,-60.9,43.8,-55.8Z" transform="translate(100 100)" />
    </svg>  
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" id="klecks3">
         <path fill="#7CB1EA" d="M50.9,-61.9C60.6,-52.5,59.4,-31.4,58.6,-13.6C57.8,4.1,57.4,18.5,52.2,32.7C47.1,46.9,37.2,60.9,24.5,64C11.9,67.1,-3.4,59.3,-11.6,48.9C-19.8,38.5,-20.8,25.6,-24.3,15.8C-27.9,6.1,-33.9,-0.5,-37.3,-11C-40.7,-21.5,-41.5,-35.9,-34.8,-45.8C-28.1,-55.8,-14.1,-61.3,3.3,-65.2C20.6,-69.1,41.2,-71.4,50.9,-61.9Z" transform="translate(100 100)" />
    </svg>
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" id="klecks4">
        <path fill="#7CB1EA" d="M37.5,-40.2C47.9,-36,55.1,-23.5,61.1,-8C67.1,7.5,72,25.9,64.8,36.5C57.6,47,38.3,49.7,20.7,55.5C3.1,61.3,-12.8,70.2,-21,64.3C-29.1,58.4,-29.5,37.8,-37.2,22.4C-44.9,7,-60,-3.1,-61.5,-13.7C-63.1,-24.3,-50.9,-35.3,-38.4,-39.1C-25.9,-42.9,-12.9,-39.6,0.3,-40C13.6,-40.4,27.2,-44.5,37.5,-40.2Z" transform="translate(100 100)" />
    </svg>
</div>


  
<div id="grid">
    <div></div>
    <div id="boxForInfos">

    <i class="fa-solid fa-user" id="userIcon"></i>

    <?php 
    require '../sql/mysql.php';

    $email = $_SESSION["email"];

    $user_sql = $conn->query("SELECT * FROM user WHERE email = '$email'")->fetch_assoc();

    if (!$user_sql) {
        die("Fehler: Keine Daten gefunden");
    }

    $stmt = $conn->prepare("SELECT name, email, rating, bio FROM user WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();
    $user_sql = $result->fetch_assoc();

    echo '
    <p class="attribute">Name</p>

    <div class="starContainer">
        <input id="name" type="text" readonly onclick="makeEditable(this)" value="' . $user_sql['name'] . '">
        <i class="fa-solid fa-pen-to-square edit" onclick="editName()"></i>
    </div>
    

    <p class="attribute">Email</p>

    <div class="starContainer">
        <input id="email" type="text" readonly onclick="makeEditable(this)" value="'.$email.'">
        <i class="fa-solid fa-pen-to-square edit" onclick="editEmail()"></i>
    </div> 

    <p class="attribute">Biografie</p>

    <div class="starContainer">
        <textarea id="bio" readonly onclick="makeEditable(this)" row="3">
            ' . $user_sql['bio'] . ' 
        </textarea>    
        <i class="fa-solid fa-pen-to-square edit" onclick="editBio()"></i>
    </div>

    <p class="attribute">Rating</p>

    ';

    echo '<div class="stars-container">';

    for ($i = 0; $i < $user_sql['rating']; $i++) {
        echo '<i class="fa-solid fa-star stars"></i>';
    }
    for ($i = 0; $i < 5 - $user_sql['rating']; $i++) {
        echo '<i class="fa-regular fa-star stars"></i>';
    }
    echo '</div>';

    ?>

    <p onclick="logOut()" id="logOut">Ausloggen</p>

    </div>
</div>
   

</body>
</html>