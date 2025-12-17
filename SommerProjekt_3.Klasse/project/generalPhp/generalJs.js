    function checkSession(){
        fetch(`http://localhost:8080/2425-sommerprojekt-3chitm-JakobPeneder/project/sql/checkSession.php`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data) {
                console.log('logged In')
                window.location.href = 'http://localhost:8080/2425-sommerprojekt-3chitm-JakobPeneder/project/pages/profil.php'
            }else {
                window.location.href = 'http://localhost:8080/2425-sommerprojekt-3chitm-JakobPeneder/project/pages/formular.php'
            }
            
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
    }