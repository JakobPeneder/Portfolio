<?php require './sql/session.php'; ?>

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
        link.href = './css/index.css?' + timestamp;
        document.head.appendChild(link);

        link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = './css/generalSettings.css?' + timestamp;
        document.head.appendChild(link);

        let script = document.createElement('script');
        script.src = './generalPhp/generalJs.js?' + timestamp;
        script.defer = true;
        document.head.appendChild(script);

        script = document.createElement('script');
        script.src = './js/index.js?' + timestamp;
        script.defer = true;
        document.head.appendChild(script);
    </script>
    </head>
<body>
    <div id="imageOnIndex"></div>

    <div id="headlineRent">
        <h2 id="rent">RENT</h2>
        <h2 id="my">MY</h2>
        <h2 id="ride">RIDE</h2>
    </div>
 

    <!-- navigation -->
    <?php require './generalPhp/navigation.php'; ?>


    <!-- search -->
    <input type="text" id="search" ></input>
    <div id="searchText">
        <h3 id="vermiete">Vermieten und Mieten</h3>
        <h3 id="skisnow">Ski / Snowboards</h3>
    </div>

    <!-- examples -->
    <div id="examples">
        <?php   
        require './sql/mysql.php';
        // Create connection
        $sql = "SELECT * FROM listings";
        if (isset($_SESSION['email']) && $_SESSION['email'] != '') {
            $sql .= " WHERE user_id != (SELECT id FROM user WHERE email = '" . $_SESSION['email'] . "')";
        }

        $sql .= " ORDER BY RAND() LIMIT 3";

        $result = $conn->query($sql);
        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {

                $image = "SELECT * FROM images WHERE listing_id = " . $row['id'] . " LIMIT 1";
                $imageResult = $conn->query($image);
                $imageRow = $imageResult->fetch_assoc();
                if ($imageRow) {
                    $row['image'] = './sql/' . $imageRow['path'];
                } else {
                    $row['image'] = 'default_image.jpg'; // Fallback image if no image is found
                }

                echo '<div class="pictureExample" style="background-image: url(' . $row['image'] . ');" onclick="getToProductPage(' . $row['id'] . ')"></div>';
            }
        } else {
            echo "0 results";
        }
        $conn->close();
        ?>
    </div>

    
    <div id="iconSki">
        <div style="margin-left: 15vw;">
            <div id="ski"></div>
            <div id="ski1"></div>
            <p id="textSki">SKI</p>
        </div>
        <div>
            <div id="snowboard"></div>
            <p id="textSnowboard">SNOWBOARD</p>
        </div>
    </div>

    <?php require './generalPhp/footer.php'; ?>

</body>
</html>