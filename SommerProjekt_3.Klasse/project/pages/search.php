<?php require '../sql/session.php'; 
    require '../sql/mysql.php';
    $search = isset($_GET['search']) ? htmlspecialchars($_GET['search']) : ''; 

    $startPrice = isset($_GET['startPrice']) ? htmlspecialchars($_GET['startPrice']) : '';
    $endPrice = isset($_GET['endPrice']) ? htmlspecialchars($_GET['endPrice']) : '';
    $town = isset($_GET['town']) ? htmlspecialchars($_GET['town']) : '';
    $brand = isset($_GET['brand']) ? htmlspecialchars($_GET['brand']) : '';
    $startLength = isset($_GET['startLength']) ? htmlspecialchars($_GET['startLength']) : '';
    $endLength = isset($_GET['endLength']) ? htmlspecialchars($_GET['endLength']) : '';
    $condition = isset($_GET['condition']) ? htmlspecialchars($_GET['condition']) : '';
    $type = isset($_GET['type']) ? htmlspecialchars($_GET['type']) : '';

    echo "<script>
        let search = " . json_encode($search) . ";
        let startPrice = " . json_encode($startPrice) . ";
        let endPrice = " . json_encode($endPrice) . ";
        let town = " . json_encode($town) . ";
        let brand = " . json_encode($brand) . ";
        let startLength = " . json_encode($startLength) . ";
        let endLength = " . json_encode($endLength) . ";
        let condition = " . json_encode($condition) . ";
        let type = " . json_encode($type) . ";
    </script>";

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
        link.href = '../css/search.css?' + timestamp;
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
        script.src = '../js/search.js?' + timestamp;
        script.defer = true;
        document.head.appendChild(script);
    </script>
</head>
<body>

    <div id="backgroundBlur" onclick="closeInput()"></div>
    <?php require '../generalPhp/navigation.php'; ?>

  

      <!-- search -->
    
      <input type="text" id="search" value="<?php echo $search; ?>">
      <div id="searchText">
        <h3 id="vermiete">Vermieten und Mieten</h3>
        <h3 id="skisnow">Ski / Snowboards</h3>
    </div>

    <!-- filter -->
    <div id="filterGrid">
        <select name="type" id="filterType" onchange="searchType()">
            <option value="" <?php if ($type == '') echo 'selected'; ?>>Typ</option>
            <option value="ski" <?php if ($type == 'ski') echo 'selected'; ?>>Ski</option>
            <option value="snowboard" <?php if ($type == 'snowboard') echo 'selected'; ?>>Snowboard</option>
        </select>
        
        <div onclick="showInputLocation()" id="location">Standort</div>

        <div onclick="showInputPrice()" id="price">Preis</div>
       
        <select name="condition" id="filterCondition" onchange="searchCondition()">
            <option value="" <?php if ($condition == '') echo 'selected'; ?>>Zustand</option>
            <option value="neu" <?php if ($condition == 'neu') echo 'selected'; ?>>Neu</option>
            <option value="sehr gut" <?php if ($condition == 'sehrgut') echo 'selected'; ?>>Sehr gut</option>
            <option value="gut" <?php if ($condition == 'gut') echo 'selected'; ?>>Gut</option>
            <option value="gebraucht" <?php if ($condition == 'gebraucht') echo 'selected'; ?>>Gebraucht</option>
        </select>

        <div onclick="showInputBrand()" id="brand">Marke</div>

        <div onclick="shotInputLength()" id="length">Länge</div>
        
    </div>
    <div id="optionBox">

    </div>


    <!-- search results -->
    <div id="searchResults">
        <?php
        $sqlState1 = $conn->prepare("SELECT distinct brand FROM listings");
        $sqlState1->execute();
        $result1 = $sqlState1->get_result();
        
        ?>
       
        <?php
        $sqlState = "SELECT * FROM listings";
        $params = [];
        $types = "";

        if (isset($_SESSION['email']) && $_SESSION['email'] != '') {
            $sqlState .= " WHERE user_id != (SELECT id FROM user WHERE email = ?) AND (title LIKE ? OR description LIKE ? OR brand LIKE ? OR town LIKE ? OR typ LIKE ?)";
            $params[] = $_SESSION['email'];
            $types .= "ssssss";
            $params[] = "%" . $search . "%";
            $params[] = "%" . $search . "%";
            $params[] = "%" . $search . "%";
            $params[] = "%" . $search . "%";
            $params[] = "%" . strtolower($search) . "%";

        } else {
            $sqlState .= " WHERE title LIKE ?";
            $types .= "s";
            $params[] = "%" . $search . "%";
        }


        // Add filters
        if($startPrice != '') {
            $sqlState .= " AND price >= ?";
            $types .= "d";
            $params[] = $startPrice;
        }
        if($endPrice != '') {
            $sqlState .= " AND price <= ?";
            $types .= "d";
            $params[] = $endPrice;
        }
        if($town != '') {
            $sqlState .= " AND town = ?";
            $types .= "s";
            $params[] = $town;
        }
        if($brand != '') {
            $sqlState .= " AND brand = ?";
            $types .= "s";
            $params[] = $brand;
        }
        if($startLength != '') {
            $sqlState .= " AND length >= ?";
            $types .= "s";
            $params[] = $startLength;
        }
        if($endLength != '') {
            $sqlState .= " AND length <= ?";
            $types .= "s";
            $params[] = $endLength;
        }
        if($condition != '') {
            $sqlState .= " AND state = ?";
            $types .= "s";
            $params[] = $condition;
        }
        if($type != '') {
            $sqlState .= " AND LOWER(typ) = ?";
            $types .= "s";
            $params[] = strtolower($type);
        }

        // echo $sqlState;
        $stmt = $conn->prepare($sqlState);
        if (!empty($params)) {
            $stmt->bind_param($types, ...$params);
        }
        $stmt->execute();
        $result = $stmt->get_result();
        $listings = [];

        if($result->num_rows > 0) {
            // Output data of each row
            $stmt->close();
        } else {
            echo '<p id="noResults">Keine Ergebnisse gefunden</p>';
        }
        while ($row = $result->fetch_assoc()) {
            $imageStmt = $conn->prepare("SELECT path FROM images WHERE listing_id = ? LIMIT 1");
            $imageStmt->bind_param("i", $row['id']);
            $imageStmt->execute();
            $imageResult = $imageStmt->get_result();
            $rowImage = $imageResult->fetch_assoc();
            $imageStmt->close();

            $imgSrc = isset($rowImage['path']) ? '../sql/' . $rowImage['path'] : '../assets/placeholder.jpg';

            $listings[] = [
                'id' => $row['id'],
                'title' => $row['title'],
                'price' => $row['price'],
                'brand' => $row['brand'],
                'description' => $row['description'],
                'street' => $row['street'],
                'house_number' => $row['house_number'],
                'postal_code' => $row['postal_code'],
                'town' => $row['town'],
                'imgSrc' => $imgSrc
            ];

            
          $imgSrc = isset($rowImage['path']) ? '../sql/' . $rowImage['path'] : '../assets/placeholder.jpg';
  
          echo '<div class="searchResult" onclick="window.location.href=\'product.php?id=' . $row['id'] . '\'">';
            echo '<div class="searchResultImage" style="background-image: url(' . $imgSrc . ');"></div>';
            echo '<div class="searchResultText">';
                echo '<h3 class="title">' . htmlspecialchars($row['title']) . '</h3>';
                echo '
                <div class="gridPriceBrand">' . 
                '<p class="price">' . htmlspecialchars($row['price']) . "€" . '</p>' .
                '<p class="brand">' . htmlspecialchars($row['brand']) . '</p>' .
                
                '</div>';

                $description = htmlspecialchars($row['description']);
                $length = strlen($description);
                $result2 = '';
                $maxLength = 110; // Maximum length of the description to display
                if($length < $maxLength) {
                    $maxLength = $length;
                }
                for ($i = 0; $i < $maxLength; $i++) {
                    $result2 .= $description[$i];
                }

                if($length > $maxLength) {
                    $result2 .= '...';
                }
                echo '<p class="description">' . $result2 . '</p>';

                echo '<p class="location">' . htmlspecialchars($row['street']) . " " . htmlspecialchars($row['house_number']) . ", " . htmlspecialchars($row['postal_code']) . " " . htmlspecialchars($row['town']) . '</p>';
            echo '</div>';
          echo '</div>';
        }

        // Output the listings array as a JS variable
        echo '<script>let searchResults = ' . json_encode($listings, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP) . ';</script>';
 
  
            $conn->close();

        ?>
     </div>


    <?php require '../generalPhp/footer.php'; ?>

</body>
</html>