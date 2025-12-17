makeSymbolsVisible()
let mistakes = '';


document.getElementById('password').addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        if (document.getElementById('regLog').innerHTML == 'Registrieren') {
            tryRegister();
        } else {
            tryLogin();
        }
    }
});

function makeSymbolsVisible() {
    document.getElementById('checkPassword').style = 'display: none;'
    document.getElementById('checkEmail').style = 'display: none;'
    document.getElementById('checkName').style = 'display: none;'

}
function validateEmailAndPassword() {
    document.getElementById('checkPassword').style = 'display: block;'
    document.getElementById('checkEmail').style = 'display: block;'
    document.getElementById('checkName').style = 'display: block;'

    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    let checkEmail = document.getElementById('checkEmail');
    let checkPassword = document.getElementById('checkPassword');

    if(email == '' || mistakes == 'Email' || mistakes == 'Both') {
        checkEmail.classList.remove('fa-solid');
        checkEmail.classList.remove('fa-check');
        checkEmail.classList.add('fa-solid');
        checkEmail.classList.add('fa-x');
        checkEmail.style = 'color: red;';
        } else {
        checkEmail.classList.remove('fa-solid');
        checkEmail.classList.remove('fa-x');
        checkEmail.classList.add('fa-solid');
        checkEmail.classList.add('fa-check');
        checkEmail.style = 'color: #3A7FCA;';
    }

    if (password == ''  || mistakes == 'Passwort' || mistakes == 'Both') {
        checkPassword.classList.remove('fa-solid');
        checkPassword.classList.remove('fa-check');
        checkPassword.classList.add('fa-solid');
        checkPassword.classList.add('fa-x');
        checkPassword.style = 'color: red;';
        }else {
        checkPassword.classList.remove('fa-solid');
        checkPassword.classList.remove('fa-x');
        checkPassword.classList.add('fa-solid');
        checkPassword.classList.add('fa-check');
        checkPassword.style = 'color: #3A7FCA;';
    }

}
// Registrierungsfunktion mit `await`
async function tryRegister() {

    let user = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    let checkUser = document.getElementById('checkName');

    if(email == '' || password == '' || user == ''){
        document.getElementById('errorMessages').innerHTML = 'Bitte fülle alle Felder aus!';
        document.getElementById('errorMessages').style = 'display: block;'
        
        if(user == '') {
            checkUser.classList.remove('fa-solid');
            checkUser.classList.remove('fa-check');
            checkUser.classList.add('fa-solid');
            checkUser.classList.add('fa-x');
            checkUser.style = 'color: red;';
        }else {
            checkUser.classList.remove('fa-solid');
            checkUser.classList.remove('fa-x');
            checkUser.classList.add('fa-solid');
            checkUser.classList.add('fa-check');
            checkUser.style = 'color: #3A7FCA;';
        }

        validateEmailAndPassword();
        return;
    }


    let userExists = await checkIfUserExists();  

    if (userExists) {
        alert('User existiert bereits!');
        return; 
    }


    let formData = new FormData();
    formData.append('user', user);
    formData.append('email', email);
    formData.append('password', password);

    let fetchUrl = ".././sql/register.php";
    let fetch_config = {
        method: "POST",
        body: formData
    };

    try {
        let response = await fetch(fetchUrl, fetch_config);
        let data = await response.json();  // JSON parsen
        console.log("Register response:", data);

        if (data.registered) {
            tryLogin();  // Nach erfolgreicher Registrierung einloggen
        } else {
            document.getElementById('errorMessages').style = 'display: block;'
            document.getElementById('errorMessages').innerHTML = data.message;
        }
    } catch (error) {
        console.error("Fehler bei tryRegister:", error);
    }
}

// Login-Funktion verbessert
async function tryLogin() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    if(email == '' || password == ''){
        document.getElementById('errorMessages').innerHTML = 'Bitte fülle alle Felder aus!';
        document.getElementById('errorMessages').style = 'display: block;'
        validateEmailAndPassword()
        return;
    }

    let formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    let fetchUrl = ".././sql/login.php";
    let fetch_config = {
        method: "POST",
        body: formData
    };

    try {
        let response = await fetch(fetchUrl, fetch_config);
        let data = await response.json();  // JSON parsen
        console.log("Login response:", data); // Debugging

        if (data.loggedIn) {  // Erfolgreich eingeloggt?
            window.location.href = "../index.php";  // Nach Login weiterleiten
        } else {
            document.getElementById('errorMessages').style = 'display: block;'
            document.getElementById('errorMessages').innerHTML = data.message;
            mistakes = data.errorSignals;
            validateEmailAndPassword()
            
        }
    } catch (error) {
        console.error("Fehler bei tryLogin:", error);
    }
}

async function checkIfUserExists() {
    var email = document.getElementById('email').value;
    let formData = new FormData();
    formData.append('email', email);

    let fetchUrl = ".././sql/checkUserExists.php";
    let fetch_config = {
        method: "POST",
        body: formData
    };

    try {
        let response = await fetch(fetchUrl, fetch_config);
        let data = await response.json();  // JSON parsen
        console.log("User exists response:", data);
        return data.exists === true;  // Richtige Rückgabe
    } catch (error) {
        console.error("Fehler bei checkIfUserExists:", error);
        return false;
    }
}

function showLogin() {
    document.getElementById('regLog').innerHTML = 'Einloggen';
    document.getElementById('nameLogin').style.display = 'none';
    document.getElementById('nameCon').style.display = 'none';
    document.getElementsByClassName('button')[0].innerHTML = 'Einloggen';
    document.getElementById('gotAccount').innerHTML = 'Du hast noch keinen Account?';
    document.getElementById('gotAccount').onclick = showRegister;
    document.getElementsByClassName('button')[0].onclick = tryLogin;
    // document.getElementById('errorMessages').style = 'display: none;'
}

function showRegister() {
    document.getElementById('regLog').innerHTML = 'Registrieren';
    document.getElementById('nameLogin').style.display = 'block';
    document.getElementById('nameCon').style.display = 'block';
    document.getElementsByClassName('button')[0].innerHTML = 'Registrieren';
    document.getElementById('gotAccount').innerHTML = 'Du hast bereits einen Account?';
    document.getElementById('gotAccount').onclick = showLogin;
    document.getElementsByClassName('button')[0].onclick = tryRegister;
    // document.getElementById('errorMessages').style = 'display: none;'
}
