<?php require '../sql/session.php'; 

    if(!isset($_SESSION['email']) || $_SESSION['email'] == '') {
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
        link.href = '../css/generalSettings.css?' + timestamp;
        document.head.appendChild(link);

        link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = '../css/dashboard.css?' + timestamp;
        document.head.appendChild(link);
        

        let script = document.createElement('script');
        script.src = '../generalPhp/generalJs.js?' + timestamp;
        script.defer = true;
        document.head.appendChild(script);

        script = document.createElement('script');
        script.src = '../js/dashboard.js?' + timestamp;
        script.defer = true;
        document.head.appendChild(script);



    </script>
</head>
<body>
    <div id="backgroundBlur" onclick="closeInput()"></div>
    <?php require '../generalPhp/navigation.php' ?>

    <div id="headline">
        <h2 id="deine">Deine</h2>
        <h2 id="anzeigen">Anzeigen</h2>
    </div>

     <div id="optionBox"></div>


    <div id="containerCards">
        <a href="./addSave.php" >
            <div id="addButton">+</div> 
        </a>


        <?php
        require '../sql/mysql.php';

        $email = $_SESSION['email'];
        $stmtUser = $conn->prepare("SELECT id FROM user WHERE email = ?");
        $stmtUser->bind_param("s", $email);
        $stmtUser->execute();
        $resultUser = $stmtUser->get_result();

        if ($resultUser->num_rows === 0) {
            die("Benutzer nicht gefunden.");
        }
        $userRow = $resultUser->fetch_assoc();
        $user_id = $userRow['id'];
        $stmtUser->close();

        // Alle Listings mit optionalem Bild holen
        $sql = "SELECT l.id AS listing_id, l.title, l.publishDate, counter,  
                (SELECT path FROM images WHERE listing_id = l.id LIMIT 1) AS image_path
                FROM listings l
                WHERE l.user_id = ?
                ORDER BY l.publishDate DESC";

        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $user_id); 
        $stmt->execute();
        $listings = $stmt->get_result();



        ?>

        <div id="gridListing">
            <?php while ($row = $listings->fetch_assoc()): 
                $img = $row['image_path'] ? $row['image_path'] : 'fallback.jpg'; // Fallback, falls kein Bild vorhanden
                $countStmt = $conn->prepare(query: "SELECT COUNT(*) AS count FROM bookings WHERE listing_id = ?");
                $countStmt->bind_param("i", $row['listing_id']);
                $countStmt->execute();
                $countResult = $countStmt->get_result();
                $countRow = $countResult->fetch_assoc();

            ?>
            <div id="con-<?= $row['listing_id'] ?>" class="wholeBox">
            <div id="buttons">
                <i class="fa-solid fa-circle-xmark" onclick="deleteListing(<?= $row['listing_id'] ?>)"></i>
                <i class="fa-solid fa-square-poll-vertical" onclick="showStatistics(<?= $countRow['count'] ?>, '<?= date('d.m.Y', strtotime($row['publishDate'])) ?>', <?= $row['counter'] ?>, '<?= $row['title'] ?>')"></i>
            </div>
            <div class="conti" >
           
                <a href="addSave.php?id=<?= $row['listing_id'] ?>">
                <div class="box">
                    <div class="imageBox" style="background-image: url('.././sql/<?= htmlspecialchars($img) ?>'); ">
                    </div>
                        <div class="textBox">
                           
                            <?php
                                $title = htmlspecialchars($row['title']);
                                if (mb_strlen($title) > 20) {
                                    $title = mb_substr($title, 0, 20) . '...';
                                }
                            ?>
                            <h3 class="title"><?= $title ?></h3>
                            <div id="informationBox">
                                <p class="publishDate">
                                    <?= date('d.m.Y', strtotime($row['publishDate'])) ?>
                                </p>
                                <p class="bookings">
                                    <?= $countRow['count'] > 0 ? "Buchungen: " . $countRow['count'] : "Keine Buchungen"; ?>
                                </p>
                            </div> 
                            
                        </div>
                    </div>
                </a>
            </div>
            </div>
            <?php endwhile; ?>
        </div>
    </div>

        <?php require '../generalPhp/footer.php'; ?>
</body>
</html>