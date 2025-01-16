
let famousArray = [
    'fe2787fd-d719-4ba9-a440-17ffc465d218',
    '9f9ecde5-9f68-46c4-8af2-54488cdab8df',
    'f7042b68-ee14-47f5-9e55-f34073bb4edb',
    '3723aba7-4172-4853-ba2b-f5ec526a0741',
    'ae8f6701-75a8-446a-b663-bb0a3bd375eb',
    'ba5e3976-8986-49b4-8e7e-e702e0799727',
    '305ca865-469a-4bda-bea5-ac84e043dc08',
    'f7d1d40e-d8b6-45d5-b53b-49f768e88ea5',
    '982da290-7426-4d47-ae9f-7c663f688371'
];

document.getElementById('password').addEventListener('keyup', function(event){
    if(event.key == 'Enter') {
        login();
    }
})

checkSession();


document.getElementById('search').addEventListener('keyup', function(event){
    if(event.key == 'Enter' ) {
        loadSpellsBySearch();
    }
})
function loadSpells(){
    document.getElementById('login').style = 'display: none';
    document.getElementById('everything').style = 'display: block';

    fetch(`./api/spells.php`)
        .then((response) => response.json())
        .then((spells) =>{
            console.log(spells)
            printSpells(spells)          
        })
        .catch((error)=>{
            console.log(error);
        })
}
function checkSession(){
    fetch(`./api/checkSession.php`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        console.log('checiing session')
        if (data) {
            loadSpells();
        }
        else{
            loadLogin();
        }
    })
    .catch(error => {
        console.error('Fetch error:', error);
    });
}
function loadSpellsByCategory() {
    if(document.querySelector('#category').value == 'None') {
        loadSpells();
        return
    }
    fetch(`./api/category.php?category=${document.querySelector('#category').value}`)
    .then((response) => response.json())
        .then((spells) =>{

            console.log(spells)
            if(spells.code == 200) {
                printSpells(spells, false)
           
        }else document.querySelector('#container').innerHTML = "<h2>Error</h2>";

        })
        .catch((error)=>{
            console.log(error);
        })
}
function loadSpellsBySearch() {
    if(document.querySelector('#search').value == '') {
        loadSpells();
        return
    }
    fetch(`./api/search.php?search=${document.querySelector('#search').value}`)
    .then((response) => response.json())
        .then((spells) =>{

            console.log(spells)
            if(spells.code == 200) {
                for(let i = 0; i < spells.spells.length; i++) {
                    console.log(spells.spells[i].id)
                }
                printSpells(spells, false)
            }
            else document.querySelector('#container').innerHTML = "<h2>No results</h2>";

        })
        .catch((error)=>{
            console.log(error);
        })
}
function loadFamousSpells() {
    document.querySelector('#container').innerHTML = '';
    for(let i = 0; i < famousArray.length; i++) {
        loadSpellsById(famousArray[i]);
    }
}
function loadSpellsById(id) {
    let html = '';
    let favourites = JSON.parse(localStorage.getItem('favourites')) || [];

    fetch(`./api/spells.php?id=${id}`)
    .then((response) => response.json())
        .then((spells) =>{
            
            if(spells.code == 200) {
                html += `<div class='box'>`
    
                if(favourites.includes(spells.spells.id)) {
                    html += `<img class="heart"src="./img/herz2.png"onclick="saveFavourites(this, '${spells.spells.id}')">`;
                }else html += `<img class="heart"src="./img/herz.png" onclick="saveFavourites(this, '${spells.spells.id}')">`;
                
                html += `
                <h3>${spells.spells.attributes.name}</h3>`;

                if (spells.spells.attributes.category) {
                    html += `<p>${spells.spells.attributes.category}</p>`;
                } else html += `<p>Unknown category</p>`;      
                if (spells.spells.attributes.effect) {
                    html += `<p>${spells.spells.attributes.effect}</p>`;
                } else html += `<p>Unknown effect</p>`;      
                if (spells.spells.attributes.incantation) {
                    html += `<p>${spells.spells.attributes.incantation}</p>`;
                } else html += `<p>Unknown incantation</p>`;      
                if (spells.spells.attributes.image) {
                    html += `<p><img src="${spells.spells.attributes.image}"></p>`;
                }
                html += `</div>`;

        }else document.querySelector('#container').innerHTML = "<h2>No results</h2>";

        document.querySelector('#container').innerHTML += html;

        })
        .catch((error)=>{
            console.log(error);
        })
}
function printSpells(spells, isFavourite) {
    let html = ''
    let favourites = JSON.parse(localStorage.getItem('favourites')) || [];
    for(let i=0; i < spells.spells.length; i++){
 
        if(isFavourite && !favourites.includes(spells.spells[i].id)) {
            continue;
        }
        
        html += `<div class='box'>`
    
        if(favourites.includes(spells.spells[i].id)) {
            html += `<img class="heart"src="./img/herz2.png"onclick="saveFavourites(this, '${spells.spells[i].id}')">`;
        }else html += `<img class="heart"src="./img/herz.png" onclick="saveFavourites(this, '${spells.spells[i].id}')">`;
        html += `
        <h3>${spells.spells[i].attributes.name}</h3>`;

        if (spells.spells[i].attributes.category) {
            html += `<p>${spells.spells[i].attributes.category}</p>`;
        }else html += `<p>Unknown category</p>`;      
        if (spells.spells[i].attributes.effect) {
            html += `<p>${spells.spells[i].attributes.effect}</p>`;
        }else html += `<p>Unknown effect</p>`;      
        if (spells.spells[i].attributes.incantation) {
            html += `<p>${spells.spells[i].attributes.incantation}</p>`;
        }else html += `<p>Unknown incantation</p>`;      
        if(spells.spells[i].attributes.image) {
            html += `<p><img src="${spells.spells[i].attributes.image}"></p>`;
        }
        html += `</div>`;
    
    
        }
        document.querySelector('#container').innerHTML = html;
     } 

     function saveFavourites(img, spell) {
        console.log(spell)
        let favourites = JSON.parse(localStorage.getItem('favourites')) || [];
    
        if (!favourites.includes(spell)) {
            img.src = './img/herz2.png';
            favourites.push(spell);
            localStorage.setItem('favourites', JSON.stringify(favourites));
        }
        else if (favourites.includes(spell)) {
            favourites = favourites.filter(fav => fav !== spell);
            localStorage.setItem('favourites', JSON.stringify(favourites));
            img.src = './img/herz.png';
        }
    } 
    function printFavourites() {
        fetch(`./api/spells.php`)
        .then((response) => response.json())
        .then((spells) =>{

            if(spells.code == 200) {
               printSpells(spells, true)         
        }else document.getElementById('#container').innerHTML = "<h2>Error</h2>";

})
        .catch((error)=>{
            console.log(error);
        })
    }      
function loadLogin() {
    document.getElementById('login').style = 'display: block';
    document.getElementById('everything').style = 'display: none';
}
function login() {
    let user = document.getElementById('user').value;
    let password = document.getElementById('password').value;


    let formData = new FormData();
    formData.append('user', user);
    formData.append('password', password
    );

    let fetchUrl = "./api/login.php";
    let fetch_config = {
        method: "POST",
        body: formData
    };
    console.log('lol')
    fetch(fetchUrl, fetch_config)
    .then((response) => response.text())
    .then((text) => {
        console.log(text); // Überprüfen Sie die Serverantwort
        let data = JSON.parse(text);
        if (data.code == 200 && data.loggedIn == true) {
            loadSpells();
        } else {
            alert('Login failed. Please check your username and password.');
        }
    })
    .catch((error) => {
        console.log(error);
    });

}
