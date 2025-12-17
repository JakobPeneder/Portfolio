<nav id="navigation">
            <div class="navContainer">
                <a href="http://localhost:8080/2425-sommerprojekt-3chitm-JakobPeneder/project/pages/message.php">
                    <i class="fa-solid fa-envelope iconsNav"></i>
                    Nachrichten
                </a>
            </div>

            <?php
                if(isset($_SESSION['loggedIn']) && $_SESSION['loggedIn'] == true) {
                    echo '   
                    <div class="navContainer">
                        <a href="http://localhost:8080/2425-sommerprojekt-3chitm-JakobPeneder/project/pages/dashboard.php">
                            <i class="fa-solid fa-table-columns iconsNav"></i>
                            Dashboard
                        </a>
                    </div>';
                } else {
                     echo '   
                    <div class="navContainer">
                        <a href="http://localhost:8080/2425-sommerprojekt-3chitm-JakobPeneder/project/pages/dashboard.php" class="notClickable">
                            <i class="fa-solid fa-table-columns iconsNav"></i>
                            Dashboard
                        </a>
                    </div>';
                }

            ?>
         

            <div class="navContainer">
                <a href="http://localhost:8080/2425-sommerprojekt-3chitm-JakobPeneder/project/index.php">
                    <i class="fa-solid fa-house iconsNav"></i>
                    <?php
                        $isHome = basename($_SERVER['PHP_SELF']) === 'index.php';
                        if ($isHome) {
                            echo '<img src="./images/logo.png" alt="Logo" id="logo">';
                        } else {
                            echo '<img src="../images/logo.png" alt="Logo" id="logo">';
                        }
                    ?>
                                    </a>
            </div>

            <div class="navContainer highlight">
                <a id="bookingStyle" href="http://localhost:8080/2425-sommerprojekt-3chitm-JakobPeneder/project/pages/bookings.php" style="font-size: 1.1em;">
                    <i class="fa fa-calendar-alt" id="calendar"></i>
                    Buchungen
                </a>
            </div>
            
            <div class="navContainer toomuchWidth">
                <a onclick="checkSession()" id="profilStyle">
                    <i class="fa-solid fa-user iconsNav"></i>
                    Profil
                </a>
            </div>
    </nav>