<?php
    require '../sql/session.php';
    require '../sql/mysql.php';

    function getStateIndex($state) {
        $states = ['neu', 'sehr gut', 'gut', 'gebraucht', 'schlecht'];
        return array_search(strtolower($state), $states) !== false ? array_search(strtolower($state), $states) : 0;
    }

    

    $listingData = null;
    $isEditMode = false;
    $addressData = null;


    if (isset($_GET['id']) && is_numeric($_GET['id'])) {
        $listing_id = (int) $_GET['id'];

        // Sicherheitscheck: Gehört das Listing dem aktuellen User?
        $stmt = $conn->prepare("SELECT * FROM listings WHERE id = ? AND user_id = (SELECT id FROM user WHERE email = ?)");
        $stmt->bind_param("is", $listing_id, $_SESSION['email']);
        $stmt->execute();
        $result = $stmt->get_result();
        $listingData = $result->fetch_assoc();
        $stmt->close();

            
        if ($listingData) {
            $isEditMode = true;
        }
    }
    else {
        $stmt = $conn->prepare("SELECT * FROM user WHERE email = ?");
        $stmt->bind_param("s", $_SESSION['email']); 
        $stmt->execute();
        $result = $stmt->get_result();
        $userData = $result->fetch_assoc();
        $stmt->close();
        $listingData = $userData;
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
        link.href = '../css/addSave.css?' + timestamp;
        document.head.appendChild(link);
        

        let script = document.createElement('script');
        script.src = '../generalPhp/generalJs.js?' + timestamp;
        script.defer = true;
        document.head.appendChild(script);

        script = document.createElement('script');
        script.src = '../js/addSave.js?' + timestamp;
        script.defer = true;
        document.head.appendChild(script);

    </script>
</head>
<body>


    <div id="background">
        <svg id="klecks1"viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="#7CB1EA" d="M35.3,-63C43.2,-56.5,45.3,-42,45.2,-30.1C45,-18.3,42.6,-9.1,42.3,-0.2C42,8.8,43.8,17.6,44.9,31.1C46,44.6,46.4,62.7,38.8,61.3C31.1,59.9,15.6,39,-0.4,39.6C-16.3,40.2,-32.6,62.4,-44.6,66.4C-56.7,70.4,-64.5,56.1,-61.7,42C-58.9,27.9,-45.5,13.9,-47.5,-1.2C-49.6,-16.3,-67.1,-32.6,-67.7,-42.9C-68.3,-53.2,-52.1,-57.6,-38,-60.5C-23.9,-63.4,-11.9,-64.8,0.9,-66.3C13.7,-67.8,27.4,-69.5,35.3,-63Z" transform="translate(100 100)" />
        </svg>

        <svg id="klecks2"viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="#4698F1" d="M38.9,-51.2C53.6,-42.9,70.7,-35.7,77.1,-23.4C83.4,-11,78.8,6.6,73.2,23.8C67.6,41,61,57.9,48.6,65C36.2,72.2,18.1,69.8,0.6,68.9C-16.8,68,-33.7,68.8,-41.7,60.2C-49.8,51.6,-49.1,33.6,-56.1,17C-63.2,0.4,-78,-14.9,-76.6,-26.6C-75.1,-38.2,-57.3,-46.3,-41.8,-54.3C-26.3,-62.2,-13.2,-70.2,-0.5,-69.5C12.1,-68.8,24.3,-59.4,38.9,-51.2Z" transform="translate(100 100)" />
        </svg>

        <svg id="klecks3"viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="#3A7FCA" d="M20.8,-32.5C22.9,-18.7,17.7,-9.4,18.5,0.8C19.3,10.9,26.1,21.9,24,34.8C21.9,47.6,10.9,62.4,-5.6,68.1C-22.2,73.7,-44.5,70.2,-46.8,57.3C-49.2,44.5,-31.7,22.2,-28.3,3.4C-24.9,-15.5,-35.7,-31,-33.3,-44.8C-31,-58.6,-15.5,-70.6,-3.1,-67.6C9.4,-64.5,18.7,-46.3,20.8,-32.5Z" transform="translate(100 100)" />
        </svg>  

        <svg id="klecks4"viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="#3A7FCA" d="M34.8,-30.6C46.8,-22.7,59.5,-11.4,65.1,5.6C70.7,22.6,69.2,45.1,57.1,52.9C45.1,60.7,22.6,53.7,-0.1,53.9C-22.8,54,-45.6,61.2,-52.6,53.4C-59.5,45.6,-50.6,22.8,-48.4,2.2C-46.2,-18.4,-50.8,-36.9,-43.8,-44.7C-36.9,-52.6,-18.4,-49.9,-3.5,-46.4C11.4,-42.8,22.7,-38.5,34.8,-30.6Z" transform="translate(100 100)" />
        </svg>
    </div>
    <?php require '../generalPhp/navigation.php' ?>
    
    

    <div id="headline">
        <div id="vermiete">Vermiete</div>
        <div id="gefahrt">Gef&auml;hrt</div>
    </div>

    <form class="gridVertical" id="uploadForm"action=".././sql/submit_form.php" method="post" enctype="multipart/form-data">
        <?php if ($isEditMode): ?>
            <input type="hidden" name="listing_id" value="<?= $listingData['id'] ?>">
        <?php endif; ?>

        <!-- Titel -->
        <div class="box">
            <p class="inputLabel">Titel</p>
            <input type="text" id="title" name="title" required value="<?= htmlspecialchars($listingData['title'] ?? '') ?>">
        </div>

        <!-- Preis -->
        <div class="box">
            <p class="inputLabel">Preis</p>
            <input type="number" id="price" name="price" required value="<?= htmlspecialchars($listingData['price'] ?? '') ?>">
        </div>

        
        <!-- Typ -->
        <div class="box">
            <p class="inputLabel">Typ</p>
            <div id="typGrid">
                <i class="fa-solid fa-person-skiing" id="ski"></i>
                <label class="toggle-switch">
                    <input type="checkbox" id="myToggle" name="typ" value="1" <?= strtolower($listingData['typ'] ?? '') != 'ski' ? 'checked' : '' ?>>
                    <span class="slider"></span>
                </label>
                <i class="fa-solid fa-person-snowboarding" id="snowboard"></i>
            </div>
        </div>

        <!-- Marke -->
        <div class="box">
            <p class="inputLabel">Marke</p>
            <input type="text" id="brand" name="brand" required placeholder="z.B. Fischer, Atomic, Head" value="<?= htmlspecialchars($listingData['brand'] ?? '') ?>">
        </div>

        <!-- Beschreibung -->
        <div class="box">
            <p class="inputLabel">Beschreibung</p>
            <textarea id="description" name="description" rows="5" required><?= htmlspecialchars($listingData['description'] ?? '') ?></textarea>
        </div>

        <!-- Adresse -->
        <div class="box">
            <p class="inputLabel">Adresse</p>

            <div id="gridAddress">
                <div id="gridStreet">

                    <div id="streetLabel"><p>Straße</p>
                        <input type="text" id="street" name="street" required placeholder="z.B. Musterstraße" value="<?= htmlspecialchars($listingData['street'] ?? '') ?>">
                    </div>
                    <div id="housenumberLabel"><p>Hausnummer</p>
                        <input type="number" id="housenumber" name="housenumber" required placeholder="z.B. 1a" value="<?= htmlspecialchars($listingData['house_number'] ?? '') ?>">
                    </div>
                </div>
                <div id="gridCity">
                    <div id="plzLabel"><p>PLZ</p>
                        <input type="number" id="postalcode" name="postalcode" required placeholder="z.B. 12345" value="<?= htmlspecialchars($listingData['postal_code'] ?? '') ?>" onkeyup="getTownFromPLZ(this.value)">
                    </div>
                    <div id="cityLabel"><p>Stadt</p>
                        <input type="text" id="city" name="city" required placeholder="z.B. Musterstadt" value="<?= htmlspecialchars($listingData['town'] ?? '') ?>" onkeyup="getPLZFromTown(this.value)">
                    </div>
                </div>
                <div id="errorMessageAddress"></div>
            </div>
        </div>

        <div class="box">
            <div></div>
            <div id="gridSaveAddress">
                    <input type="checkbox" id="saveAddress" name="saveAddress" value="1">
                    <div id="saveAddressLabel">Adresse speichern</div>
                </div>        
        </div>
       
    
        <!-- Länge -->
        <div class="box">
            <p class="inputLabel">Länge</p>
            <input type="number" id="length" name="length" required placeholder="in cm" value="<?= htmlspecialchars($listingData['length'] ?? '') ?>">
        </div>


        <div class="box">
            <p class="inputLabel">Zustand<span id="stateLabel"></span></p>

            <div>
            <input 
                type="range" 
                id="stateRange" 
                min="0" 
                max="4" 
                step="1" 
                value="<?= getStateIndex($listingData['state'] ?? 'neu') ?>"
            >

            <div class="stateLabels">
                <span id="neu">Neu</span>
                <span id="sehrgut">Sehr gut</span>
                <span id="gut">Gut</span>
                <span id="gebraucht">Gebraucht</span>
                <span id="schlecht">Schlecht</span>
            </div>
            </div>

            <!-- Dieses Hidden-Input enthält später den richtigen Text für das Formular -->
            <input type="hidden" id="state" name="state" value="<?= htmlspecialchars($listingData['state'] ?? 'neu') ?>">
        </div>

        <!-- Bild-Upload -->
        <div class="box" id="loadImage">
            <p class="inputLabel">Bilder hinzufügen</p>
            <div id="dropzone">
                <label for="fileInput" class="clickable">Dateien auswählen</label>
                <input type="file" name="bild[]" id="fileInput" accept="image/*" multiple hidden>
            </div>
            <input type="file" name="bild[]" id="hiddenFileInput" style="display: none;" multiple>
        </div>
        <div class="box">
            <div></div>
            <div id="errorMessage"></div>
        </div>


        <div class="box">
            <div></div>
            <div id="preview">


        <?php if ($isEditMode): ?>
            <?php
                // Hole Bilder aus DB und speichere sie für JS
                $stmt = $conn->prepare("SELECT id, path FROM images WHERE listing_id = ?");
                $stmt->bind_param("i", $listingData['id']);
                $stmt->execute();
                $res = $stmt->get_result();
                $savedImages = [];
                while ($img = $res->fetch_assoc()) {
                    $savedImages[] = [
                        'id' => $img['id'],
                        'src' => "../sql/" . $img['path']
                    ];
                }
            ?>
            <script>
                let savedImages = <?= json_encode(value: $savedImages) ?>;
            </script>

        <?php endif; ?>


        </div>
        </div>

        <div class="box">
            <div></div>
            <button type="submit" id="submitButton"><?= $isEditMode ? 'Speichern' : 'Erstellen' ?></button>
        </div>
    </form>


      
</body>
</html>