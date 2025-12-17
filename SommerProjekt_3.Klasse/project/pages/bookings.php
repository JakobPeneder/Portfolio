<?php 
    require '../sql/session.php';
    require '../sql/mysql.php';

        if(!isset($_SESSION['loggedIn']) || $_SESSION['loggedIn'] == false) {
        header("Location: ../pages/formular.php");
        exit();
    }

        require '../generalPhp/navigation.php';        


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
        link.href = '../css/bookings.css?' + timestamp;
        document.head.appendChild(link);

        link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = '../css/generalSettings.css?' + timestamp;
        document.head.appendChild(link);

        let script = document.createElement('script');
        script.src = '../generalPhp/generalJs.js?' + timestamp;
        script.defer = true;
        document.head.appendChild(script);

        // Disable hover effect on the headlineTable
        document.addEventListener('DOMContentLoaded', function() {
            var headline = document.getElementById('headlineTable');
            if (headline) {
                headline.style.pointerEvents = 'none';
            }
        });
        function goToDetails(listingId) {
            window.location.href = './product.php?id='+ listingId;
        }
    </script>
</head>
<body>

    <div id="grid">
            <h1>Meine Buchungen</h1>
        <div id="boxForInfos">
            <?php 
                $userEmail = $_SESSION['email'];
                $sql1 = $conn->query("SELECT * FROM user WHERE email = '$userEmail'");
                if ($sql1 && $userRow = $sql1->fetch_assoc()) {
                    $userId = $userRow['id'];
                } else {
                    echo "<p>Benutzer nicht gefunden.</p>";
                    exit();
                }


                $sql = "SELECT * FROM bookings WHERE rentUser_id = '$userId'";
                $result = mysqli_query($conn, $sql);

                if(mysqli_num_rows($result) == 0) {
                    echo "<p>Keine Buchungen gefunden.</p>";
                    exit();
                }
                echo "
                <div class='gridBox' id='headlineTable'>
                <p class='headlineTable'></p>
                <p class='headlineTable'>Verkäufer</p>
                <p class='headlineTable' id='startDate'>Startdatum</p>
                <p class='headlineTable' id='endDate'>Enddatum</p> 
                <p class='headlineTable' id='price'>Preis</p>
                <p class='headlineTable'></p>
                </div>
                ";


                if (mysqli_num_rows($result) > 0) {
                    while ($row = mysqli_fetch_assoc($result)) {
                        // Get the listing_id for this booking
                        $listingId = $row['listing_id'];

                        // Fetch the listing's name or other info if needed
                        $listingSql = $conn->query("SELECT user_id FROM listings WHERE id = '$listingId'");

                        if ($listingSql && $listingRow = $listingSql->fetch_assoc()) {
                            $ownerId = $listingRow['user_id'];
                            // Fetch the owner's name
                            $ownerSql = $conn->query("SELECT name FROM user WHERE id = '$ownerId'");
                            if ($ownerSql && $ownerRow = $ownerSql->fetch_assoc()) {
                                $listingName = $ownerRow['name'];
                            } else {
                                $listingName = "Unbekannter Besitzer";
                            }
                        } else {
                            $listingName = "Unbekanntes Listing";
                        }

                        echo "<div class='gridBox' onclick='goToDetails({$listingId})'>               
                        <a href='./rating.php?id={$ownerId}'class='rating' clickable' title='User bewerten'>⭐</a>
                        <p class='idStyle'>" . $listingName . "</p>";
                        echo "<p class='startStyle'>" . $row['start_date'] . "</p>";
                        echo "<p class='endStyle'>" . $row['end_date'] . "</p>";
                        echo "<p class='priceStyle'>" . $row['price'] . "€</p>";
                        echo "<a href='./product.php?id={$listingId}' id='details'>-></a></div>";
                    }
                } else {
                    echo "<p>Keine Buchungen gefunden.</p>";
                }
            ?>
        </div>
   

</body>
</html>