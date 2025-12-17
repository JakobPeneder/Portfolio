document.getElementById('bio').value = document.getElementById('bio').value.replace(/^\s+/mg, "").replace(/<br\s*\/?>/mg, "\n");

function makeEditable(input) {
    input.removeAttribute("readonly");
    input.focus();
    console.log(input.id);

    // When losing focus, make it readonly again
    input.onblur = function() {
        input.setAttribute("readonly", "true");

        // Update the data in the database
        let formData = new FormData();
        formData.append('id', input.id);
        formData.append('value', input.value);
        
        let fetchUrl = ".././sql/changeData.php";
        let fetch_config = {
            method: "POST",
            body: formData
        };
        fetch(fetchUrl, fetch_config)
        .then(response => response.json())
        .then(data => {
            console.log(data.success);

        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
    };
}

function logOut() {
    let formData = new FormData();
    formData.append('logout', 'true');
    
    let fetchUrl = ".././sql/logout.php";
    let fetch_config = {
        method: "POST",
        body: formData
    };
    fetch(fetchUrl, fetch_config)
    .then(response => response.json())
    .then(data => {
        console.log(data.success);
        if (data.success) {
            window.location.href = ".././index.php";
        }
    })
    .catch(error => {
        console.error('Fetch error:', error);
    });
}
function editName() {
     const input = document.getElementById('name');
    input.removeAttribute('readonly');
    input.focus();
    // Optional: Move cursor to end
    input.setSelectionRange(input.value.length, input.value.length);
    input.onblur = function() {
        input.setAttribute('readonly', 'true');

        // Update the data in the database
        let formData = new FormData();
        formData.append('id', input.id);
        formData.append('value', input.value);
        let fetchUrl = ".././sql/changeData.php";

        let fetch_config = {
            method: "POST",
            body: formData
        };
        fetch(fetchUrl, fetch_config)
        .then(response => response.json())
        .then(data => {
            console.log(data.success);
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
        
    }
}
function editEmail() {
    const input = document.getElementById('email');
    input.removeAttribute('readonly');
    input.focus();
    // Optional: Move cursor to end
    input.setSelectionRange(input.value.length, input.value.length);
    input.onblur = function() {
        input.setAttribute('readonly', 'true');

        // Update the data in the database
        let formData = new FormData();
        formData.append('id', input.id);
        formData.append('value', input.value);
        let fetchUrl = ".././sql/changeData.php";

        let fetch_config = {
            method: "POST",
            body: formData
        };
        fetch(fetchUrl, fetch_config)
        .then(response => response.json())
        .then(data => {
            console.log(data.success);
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
        
    }
}
function editBio() {
    const input = document.getElementById('bio');
    input.removeAttribute('readonly');
    input.focus();
    // Optional: Move cursor to end
    input.setSelectionRange(input.value.length, input.value.length);
    input.onblur = function() {
        input.setAttribute('readonly', 'true');

        // Update the data in the database
        let formData = new FormData();
        formData.append('id', input.id);
        formData.append('value', input.value);
        let fetchUrl = ".././sql/changeData.php";

        let fetch_config = {
            method: "POST",
            body: formData
        };
        fetch(fetchUrl, fetch_config)
        .then(response => response.json())
        .then(data => {
            console.log(data.success);
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
    }
}