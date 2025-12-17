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
        link.href = '../css/login.css?' + timestamp;
        document.head.appendChild(link);

        link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = '../css/generalSettings.css?' + timestamp;
        document.head.appendChild(link);

        let script = document.createElement('script');
        script.src = '../js/login.js?' + timestamp;
        script.defer = true;
        document.head.appendChild(script);
    </script>
</head>
<body>
    <?php require '../generalPhp/navigation.php'; ?>
    
    <div id="gridLogin">
        <div>
            <div id="imageBlur"></div>
            <i class="fa-solid fa-person-skiing" id="skier"></i>
            <p id="gotAccount" onclick="showLogin()">Du hast bereits einen Account? </p>
        </div>

        <form>
            <h1 id="regLog">Registrieren</h1>

           <!-- Name mit Icon -->
           <label for="name" id="nameLogin">Name</label>
           <div class="input-container" id="nameCon">
                <i class="fa-solid fa-user"></i>
                <input type="text" id="name" name="name" required>
                <i class="fa-solid fa-check" id="checkName"></i>
            </div>

            <!-- E-Mail mit Icon -->
            <label for="email">Email</label>
            <div class="input-container">
                <i class="fa-solid fa-envelope"></i>
                <input type="email" id="email" name="email" required>
                <i class="fa-solid fa-check" id="checkEmail"></i>
            </div>

            <!-- Passwort mit Icon -->
            <label for="password">Passwort</label>
            <div class="input-container">
                <i class="fa-solid fa-lock"></i>
                <input type="password" id="password" name="password" required>
                <i class="fa-solid fa-check" id="checkPassword"></i>
            </div>

            <div id="errorMessages">Peach</div>
            <!-- Registrieren-Button -->
            <div class="button" onclick="tryRegister()">Registrieren</div>
        </form>
    </div>
</body>
</html>