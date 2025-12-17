<?php require '../sql/session.php'; 
    require '../sql/mysql.php';
    $id = isset($_GET['id']) ? htmlspecialchars($_GET['id']) : ''; 

    if (!empty($id)) {
       

        // Nur einmal pro X Minuten zählen (z.B. 30 Minuten)
        $cookieName = "viewed_listing_" . $id;
        $viewInterval = 30 * 60; // 30 Minuten in Sekunden

        if (!isset($_COOKIE[$cookieName])) {
            $updateCounter = $conn->prepare("UPDATE listings SET counter = counter + 1 WHERE id = ?");
            $updateCounter->bind_param("i", $id);
            $updateCounter->execute();
            $updateCounter->close();

            // Cookie setzen, damit innerhalb des Intervalls kein weiterer Zähler erhöht wird
            setcookie($cookieName, "1", time() + $viewInterval, "/");
        }
    }
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
        <!-- jQuery -->
        <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

        <!-- Bootstrap Datepicker (z. B. Tempus Dominus, Eonasdan, etc.) -->
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.9.0/css/bootstrap-datepicker.min.css">
        <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.9.0/js/bootstrap-datepicker.min.js"></script>
        <!-- SwiperJS -->
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />
        <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>

        <!-- Sprachpaket für Deutsch (optional) -->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.9.0/locales/bootstrap-datepicker.de.min.js"></script>

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
    <script> 
        let timestamp = new Date().getTime();
        let link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = '../css/product.css?' + timestamp;
        document.head.appendChild(link);

        link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = '../css/generalSettings.css?' + timestamp;
        document.head.appendChild(link);

        let script = document.createElement('script');
        script.src = '../generalPhp/generalJs.js?' + timestamp;
        script.defer = true;
        document.head.appendChild(script);

        
        script = document.createElement('script');
        script.src = '../js/product.js?' + timestamp;
        script.defer = true;
        document.head.appendChild(script);
    </script>
</head>
<body>
    <?php require '../generalPhp/navigation.php'; ?>
    <div id="productGrid">
        <?php

        
            $stmt = $conn->prepare("SELECT * FROM listings WHERE id = ?");
            $stmt->bind_param("i", $id);
            $stmt->execute();
            $result = $stmt->get_result();
            $row = $result->fetch_assoc();

            $count = $conn->prepare("SELECT COUNT(*) as count FROM listings WHERE user_id = ?");
            $count->bind_param("i", $row['user_id']);
            $count->execute();
            $countResult = $count->get_result();
            $countRow = $countResult->fetch_assoc();
            $count->close();

            $userStmt = $conn->prepare("SELECT * FROM user WHERE id = ?");
            $userStmt->bind_param("i", $row['user_id']);
            $userStmt->execute();
            $userResult = $userStmt->get_result();
            $rowUser = $userResult->fetch_assoc();
            $userStmt->close();

            // $imageStmt = $conn->prepare("SELECT path FROM images WHERE listing_id = ? LIMIT 1");
            // $imageStmt->bind_param("i", $id);
            // $imageStmt->execute();
            // $imageResult = $imageStmt->get_result();
            // $rowImage = $imageResult->fetch_assoc();
            // $imageStmt->close();

            $imgSrc = isset($rowImage['path']) ? '../sql/' . $rowImage['path'] : '../assets/placeholder.jpg';


            if($row) {
                $description = htmlspecialchars($row['description']);
                $description = str_replace("\r\n", "\n", $description); // Vereinheitlichen
                $description = nl2br($description, false); // Zeilenumbrüche in <br> umwandeln

                echo '<div id="imageTitleGrid">
                
                <div>
                    <h1>' . htmlspecialchars($row['title']) . '</h1>' . 
                    
                    
                    '<div id="imageBox">
                
                    <div class="swiper">
                        <div class="swiper-wrapper">';

                        $imageStmt = $conn->prepare("SELECT path FROM images WHERE listing_id = ?");
                        $imageStmt->bind_param("i", $id);
                        $imageStmt->execute();
                        $imageResult = $imageStmt->get_result();

                        $bookingsStmt = $conn->prepare("SELECT * FROM bookings WHERE listing_id = ?");
                        $bookingsStmt->bind_param("i", $id);
                        $bookingsStmt->execute();
                        $bookingsResult = $bookingsStmt->get_result();
                        $bookings = [];
                        
                        while ($booking = $bookingsResult->fetch_assoc()) {
                            $bookings[] = [
                                'start_date' => $booking['start_date'],
                                'end_date' => $booking['end_date']
                            ];
                        }
                        $bookingsStmt->close();

                        ?>
                        <script>
                            let bookings = <?php echo json_encode($bookings); ?>;
                        </script>
                        <?php


                        if ($imageResult->num_rows > 0) {
                            while ($img = $imageResult->fetch_assoc()) {
                                $imagePath = '../sql/' . $img['path'];
                                echo '<div class="swiper-slide">
                                <div class="sliderImage" style="background-image: url(' . $imagePath . '); background-size: contain; background-position: center; background-repeat: no-repeat;">
                                </div></div>';
                            }
                        } else {
                            echo '<div class="swiper-slide"><div class="sliderImage" style="background-image: url(\'../assets/placeholder.jpg\');"></div></div>';
                        }
                        $imageStmt->close();
                 echo '   
                 
                    </div> 
                    <div class="swiper-pagination"></div>
                    <div class="swiper-button-next"></div>
                    <div class="swiper-button-prev"></div>
                </div> 
            </div> 



                    <div id="categories">
                        <div class="category">
                            <p class="categoryTitle">Typ</p>
                            <p class="categoryText">' . htmlspecialchars($row['typ']) . '</p>
                        </div>
                         <div class="category">
                            <p class="categoryTitle">Marke</p>
                            <p class="categoryText">' . htmlspecialchars($row['brand']) . '</p>
                        </div>
                         <div class="category">
                            <p class="categoryTitle">Länge</p>
                            <p class="categoryText">' . htmlspecialchars($row['length']) . '</p>
                        </div>
                         <div class="category">
                            <p class="categoryTitle">Zustand</p>
                            <p class="categoryText">' . ucfirst(strtolower(htmlspecialchars($row['state']))) . '</p>
                        </div>
                    </div>

                    <div id="description">
                        <p class="categoryTitle">Beschreibung</p>
                        <p class="descriptionText">' . $description . '</p>
                    </div>

             

                <div id="range-calendar" class="datepicker">
                    <input type="hidden" id="startHidden" name="start_date">
                    <input type="hidden" id="endHidden" name="end_date">
                </div>
                <div id="error"></div>
                <div id="infosCalendar">
                    <div class="colorWay" style="background-color: var(--primary-color) "></div>
                    <div class="calendarText" style="color: var(--primary-color) ">Markiert</div>
                    <div class="colorWay" style="background-color: lightgrey"></div>
                    <div class="calendarText" style="color: lightgrey">Vergangen</div>
                    <div class="colorWay" style="background-color: rgba(255, 0, 0, 0.4) "></div>
                    <div class="calendarText" style="color: rgba(255, 0, 0, 0.4) ">Reserviert</div>

                    <button id="hire" onclick="rent('. $row['id'] .')">Mieten</button>
                </div>



                </div> 
                
               <div id="gridHire">

                  <div id="profileCard">
                <div class="userIcon">
                    <i class="fas fa-user-circle fa-4x"></i>
                </div>
                <h2 class="userName">' . $rowUser['name'] .'</h2>
                <p class="userLocation">' . $row['town'] .'</p>
                <div class="userStats">';
                    $rating = isset($rowUser['rating']) ? (int)$rowUser['rating'] : 0;
                    for ($i = 1; $i <= 5; $i++) {
                        if ($i <= $rating) {
                            echo '<span class="star" style="color: gold;">&#9733;</span>';
                        } else {
                            echo '<span class="star" style="color: lightgray;">&#9733;</span>';
                        }
                    }
                    echo '<br>

                    <span>' . $countRow['count'] . ' Anzeigen</span><br>
                </div>
                <a href = "./message.php?id='. $row["id"] .'">
                    <button id="message" >
                    Nachricht
                    </button>
                    </a>
                </div>


                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" id="svgIcon2">
                    <path fill="var(--primary-color)" d="M40.6,-56.2C54.7,-45.7,69.6,-36.6,70.4,-25C71.2,-13.4,58,0.6,52.3,16.6C46.6,32.7,48.3,50.8,40.9,55C33.4,59.3,16.7,49.6,4.6,43.3C-7.5,36.9,-15,33.9,-27.2,31.2C-39.4,28.5,-56.3,26.2,-63.9,17.3C-71.5,8.5,-69.7,-6.8,-67,-23.8C-64.2,-40.7,-60.5,-59.4,-49.1,-70.8C-37.8,-82.2,-18.9,-86.4,-2.8,-82.5C13.3,-78.6,26.5,-66.7,40.6,-56.2Z" transform="translate(100 100)" />
                </svg>
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" id="svgIcon1">
                    <path fill="var(--secondary-color)" d="M52.1,-67.9C66.7,-61,77.3,-44.8,80.1,-27.9C82.9,-11.1,78.1,6.4,66.7,15.5C55.2,24.6,37.2,25.5,25,33.2C12.8,40.9,6.4,55.4,-5.8,63.4C-18,71.4,-36,72.9,-48.5,65.3C-61,57.7,-68,41,-62.9,27.4C-57.7,13.8,-40.4,3.1,-30.2,-4.2C-20.1,-11.5,-17.1,-15.4,-13.2,-25.8C-9.4,-36.1,-4.7,-52.8,7,-62.4C18.7,-72.1,37.4,-74.7,52.1,-67.9Z" transform="translate(100 100)" />
                </svg>

                </div>
                
                
                </div>
                
                '
                ;
                    
                
            } else {
                echo '<div id="noProduct">No product found</div>';
            }

            $conn->close();


        ?>

        


    </div>

            


    <?php require '../generalPhp/footer.php'; ?>

</body>
</html>