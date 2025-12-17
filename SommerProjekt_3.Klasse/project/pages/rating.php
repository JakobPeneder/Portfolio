<?php require '../sql/session.php'; ?>
<?php require '../generalPhp/navigation.php';        
    require '../sql/mysql.php';
    if(!isset($_SESSION['loggedIn']) || $_SESSION['loggedIn'] == false) {
        header("Location: ../pages/formular.php");
        exit();
    }
    $stmt = $conn->prepare("SELECT id FROM user WHERE email = ?");
    $stmt->bind_param("s", $_SESSION['email']);
    $stmt->execute();
    $result = $stmt->get_result();
    if($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $rated_id = $row['id'];
    } else {
        echo "<p>Benutzer nicht gefunden.</p>";
        exit();
    }


    if(isset($_GET["id"])) {
        $user_id = $_GET["id"];

        $stmt = $conn->prepare("SELECT * FROM user WHERE id = ?");
        $stmt->bind_param("i", $user_id);    
        $stmt->execute();
        $result = $stmt->get_result();
        if($result->num_rows > 0) {
            $user = $result->fetch_assoc();
        } else {
            echo "<p>Benutzer nicht gefunden.</p>";
            exit();
        }
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
        link.href = '../css/rating.css?' + timestamp;
        document.head.appendChild(link);

        link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = '../css/generalSettings.css?' + timestamp;
        document.head.appendChild(link);

        // let script = document.createElement('script');
        // script.src = '../js/profil.js?' + timestamp;
        // script.defer = true;
        // document.head.appendChild(script);
    </script>
</head>
<body>

    <div id="ratingContainer">
        <div id="ratingBox">
            <h1>Bewerten Sie</h1>
            <p id="userName"><?php echo htmlspecialchars($user['name']) ?></p>
            <form action="../sql/submit_rating.php" method="post" id="ratingForm">
                <input type="hidden" name="user_id" value="<?php echo htmlspecialchars($user_id); ?>">
                <input type="hidden" name="rated_id" value="<?php echo htmlspecialchars($rated_id); ?>">
                <input type="hidden" name="rating" id="ratingInput" value="0">
                <div class="star-rating" id="starRating">
                    <?php for ($i = 1; $i <= 5; $i++): ?>
                        <i class="fa fa-star" data-value="<?php echo $i; ?>"></i>
                    <?php endfor; ?>
                </div>
                <button type="submit" id="submitButton">Bewerten</button>
            </form>
        </div>




        <script>
            const stars = document.querySelectorAll('#starRating .fa-star');
            const ratingInput = document.getElementById('ratingInput');
            let currentRating = 0;

            stars.forEach(star => {
                star.addEventListener('mouseenter', function() {
                    const val = parseInt(this.getAttribute('data-value'));
                    highlightStars(val);
                });
                star.addEventListener('mouseleave', function() {
                    highlightStars(currentRating);
                });
                star.addEventListener('click', function() {
                    currentRating = parseInt(this.getAttribute('data-value'));
                    ratingInput.value = currentRating;
                    highlightStars(currentRating);
                });
            });

            function highlightStars(rating) {
                stars.forEach(star => {
                    if (parseInt(star.getAttribute('data-value')) <= rating) {
                        star.classList.add('checked');
                    } else {
                        star.classList.remove('checked');
                    }
                });
            }
        </script>
        <style>
            .star-rating .fa-star {
                font-size: 2em;
                color: #ccc;
                cursor: pointer;
                transition: color 0.2s;
            }
            .star-rating .fa-star.checked {
                color: var(--primary-color);
            }
        </style>


    </div>
   

    <?php require '../generalPhp/footer.php'; ?>

</body>
</html>