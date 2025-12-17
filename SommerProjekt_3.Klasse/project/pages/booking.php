<?php require '../sql/session.php'; 
    require '../sql/mysql.php';

    if($_SESSION["loggedIn"] != true) {
        header('Location: ../index.php');
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
        link.href = '../css/booking.css?' + timestamp;
        document.head.appendChild(link);
        

        let script = document.createElement('script');
        script.src = '../generalPhp/generalJs.js?' + timestamp;
        script.defer = true;
        document.head.appendChild(script);

        // script = document.createElement('script');
        // script.src = '../js/booking.js?' + timestamp;
        // script.defer = true;
        // document.head.appendChild(script);



    </script>
    <script>
        function pay() {
            let start = "<?php echo isset($_POST['start']) ? htmlspecialchars($_POST['start']) : ''; ?>";
            let end = "<?php echo isset($_POST['end']) ? htmlspecialchars($_POST['end']) : ''; ?>";
            let id = "<?php echo isset($_POST['id']) ? htmlspecialchars($_POST['id']) : ''; ?>";

            let price = document.getElementById('price').innerText.replace('€', '').trim();

            fetch('../sql/book.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: `id=${encodeURIComponent(id)}&start=${encodeURIComponent(start)}&end=${encodeURIComponent(end)}&totalPrice=${encodeURIComponent(price)}`
            })
            .then(response => response.text())
            .then(data => {
                // Handle response, e.g., show confirmation or error

                console.log(data);
                    window.location.href = './bookings.php';
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Fehler bei der Buchung.');
            });
        }   
    </script>
</head>
<body>
    <?php require '../generalPhp/navigation.php' ?>

    <div id="container">
        <h1 id="booking">Buchung</h1>

        <div id="dateBox">



    <?php
        if(isset($_POST["id"]) && isset($_POST["start"]) && isset($_POST["end"])) {
            $id = htmlspecialchars($_POST["id"]);
            $start = htmlspecialchars($_POST["start"]);
            $end = htmlspecialchars($_POST["end"]);

            $stmt = $conn->prepare("SELECT * FROM listings WHERE id = ?");
            $stmt->bind_param("i", $id);
            $stmt->execute();
            $result = $stmt->get_result();
            $row = $result->fetch_assoc();
            $price = $row["price"];
            $stmt->close();
            $daysBetween = (strtotime($end) - strtotime(datetime: $start)) / (60 * 60 * 24);

            echo '
            <p class="attribute">von</p>
            <p class="date">' . $start . 
            '</p>
            <p class="attribute">bis</p>
            <p class="date">' . $end .
            '</p>

            <p class="attribute">Preis für Zeitraum:</p>
            <p class="date" id="price">' . $price *  $daysBetween.
            '€</p>
            ';
        }



    ?>
        <div id="pay" onclick="pay()">Bezahlen</div>
    </div>

</div>
    <?php require '../generalPhp/footer.php'; ?>
</body>
</html>