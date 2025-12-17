let allBrands = [
    'Atomic',
    'Salomon',
    'Fischer',
    'Head',
    'Rossignol',
    'Völkl',
    'Blizzard',
    'Nordica',
    'K2',
    'Dynastar'
]


document.getElementById('search').addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        const url = new URL(window.location.href);
        const params = new URLSearchParams(url.search);
        params.set('search', this.value);
        location.href = 'search.php?' + params.toString();
    }
});

document.addEventListener('keyup', function(event) {
    if(event.key === 'Escape') {
        closeInput();
    }
});



function showInputLocation() {
    const optionBox = document.getElementById('optionBox');
    optionBox.innerHTML = '';
    optionBox.style.display = 'block';
    document.getElementById('backgroundBlur').style.display = 'block';
    document.querySelector('body').style.overflow = 'hidden';

    optionBox.innerHTML = `
        <div class="filterOp">Standort</div>
        <input type="text" id="inputLocation" value="${town}"placeholder="Ort" onkeyup="getPLZFromTown(this.value)" />
        <br>
        <input type="number" id="plz" placeholder="PLZ" onkeyup="getTownFromPLZ(this.value)" />
        <div id="errorMessageInput"></div>
        <div id="flexible">
            <div class="interrupt" onclick="closeInput()">Abbrechen</div>
            <div class="submit" onclick="searchLocation()">Fertig</div>
        </div>
    `;
    getPLZFromTown(document.getElementById('inputLocation').value);

    // Add event listener to the input field
    document.getElementById('inputLocation').addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            searchLocation();
        }
    });
    document.getElementById('plz').addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            searchLocation();
        }
    });
   
}
function showInputPrice() {
    const optionBox = document.getElementById('optionBox');
    optionBox.innerHTML = '';
    optionBox.style.display = 'block';
    document.getElementById('backgroundBlur').style.display = 'block';
    document.querySelector('body').style.overflow = 'hidden';
    optionBox.innerHTML = `
        <div class="filterOp">Preis</div>
        <input type="number" id="startPrice" value="${startPrice}"placeholder="von"  />
        <br>
        <input type="number" id="endPrice" value="${endPrice}"placeholder="bis"  />
        <div id="flexible">
            <div class="interrupt" onclick="closeInput()">Abbrechen</div>
            <div class="submit" onclick="searchPrice()">Fertig</div>
        </div>
    `;

    // Add event listener to the input field
    document.getElementById('startPrice').addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            searchPrice();
        }
    });
    document.getElementById('endPrice').addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            searchPrice();
        }
    });
}
function showInputBrand() {
    const optionBox = document.getElementById('optionBox');
    optionBox.innerHTML = '';
    optionBox.style.display = 'block';
    document.getElementById('backgroundBlur').style.display = 'block';
    document.querySelector('body').style.overflow = 'hidden';
    optionBox.innerHTML += `
        <div class="filterOp">Marke</div>
        <input type="text" id="inputBrand" placeholder="Marke" value="${brand}" />
        <select id="brandDropdown" onchange="placeInput(this.value)">
            <option value="">Bitte wählen...</option>
        `

        if (typeof allBrands !== 'undefined' && Array.isArray(allBrands)) {
            console.log('allBrands:', allBrands);
            allBrands.forEach(brand => {
                const option = document.createElement('option');
                option.value = brand;
                option.textContent = brand;
                brandDropdown.appendChild(option);
            });
        }

    optionBox.innerHTML += `
            </select>
        
        <div id="flexible">
            <div class="interrupt" onclick="closeInput()">Abbrechen</div>
            <div class="submit" onclick="searchBrand()">Fertig</div>
        </div>
    `;
    // Add event listener to the input field
    document.getElementById('inputBrand').addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            searchBrand();
        }
    });
}
function shotInputLength() {
    const optionBox = document.getElementById('optionBox');
    optionBox.innerHTML = '';
    optionBox.style.display = 'block';
    document.getElementById('backgroundBlur').style.display = 'block';
    document.querySelector('body').style.overflow = 'hidden';
    optionBox.innerHTML = `
        <div class="filterOp">Länge</div>
        <input type="number" id="startLength" placeholder="von in cm" value="${startLength}"  />
        <br>
        <input type="number" id="endLength" placeholder="bis in cm" value="${endLength}"  />
        <div id="flexible">
            <div class="interrupt" onclick="closeInput()">Abbrechen</div>
            <div class="submit" onclick="searchLength()">Fertig</div>
        </div>
    `;

    document.getElementById('startLength').addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            searchLength();
        }
    });
    document.getElementById('endLength').addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            searchLength();
        }
    });
}
function placeInput(brand) {
    document.getElementById('inputBrand').value = brand;

}
function searchLength() {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);

    // Update or add search and length parameters
    params.set('search', document.getElementById('search').value);
    if(document.getElementById('startLength').value != '') params.set('startLength', document.getElementById('startLength').value);
    if(document.getElementById('endLength').value != '') params.set('endLength', document.getElementById('endLength').value);
    // Redirect with all existing and updated parameters
    window.location.href = '../pages/search.php?' + params.toString();


}
function searchBrand() {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);

    // Update or add search and brand parameters
    params.set('search', document.getElementById('search').value);
    params.set('brand', document.getElementById('inputBrand').value);

    // Redirect with all existing and updated parameters
    window.location.href = '../pages/search.php?' + params.toString();
}
function searchPrice() {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);

    // Update or add search and price parameters
    params.set('search', document.getElementById('search').value);
    if(document.getElementById('startPrice').value != '') params.set('startPrice', document.getElementById('startPrice').value);
    if(document.getElementById('endPrice').value != '') params.set('endPrice', document.getElementById('endPrice').value);
    // Redirect with all existing and updated parameters
    window.location.href = '../pages/search.php?' + params.toString();

}
function searchLocation() {

    const townInput = document.getElementById('inputLocation').value.trim();
    const plzInput = document.getElementById('plz').value.trim();
    const match = plzOrtList.find(entry =>
        entry.ort.toLowerCase() === townInput.toLowerCase() &&
        entry.plz.toString() === plzInput
    );

    if (!match && townInput !== '' && plzInput !== '') {
        document.getElementById('errorMessageInput').innerHTML = 'Bitte PLZ und Ort überprüfen';
        return;
    }
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);

    // Update or add search and plz parameters
    params.set('search', document.getElementById('search').value);
    params.set('town', document.getElementById('inputLocation').value);

    // Redirect with all existing and updated parameters
    window.location.href = '../pages/search.php?' + params.toString();

}
function searchCondition() {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);


    // Update or add search and condition parameters
    params.set('search', document.getElementById('search').value);
    params.set('condition', document.getElementById('filterCondition').value.replace(' ', ''));    

    // Redirect with all existing and updated parameters
    window.location.href = '../pages/search.php?' + params.toString();

}

function searchType() {
    console.log('searchType' +document.getElementById('filterType').value);
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);

    // Update or add search and type parameters
    params.set('search', document.getElementById('search').value);
    params.set('type', document.getElementById('filterType').value);

    // Redirect with all existing and updated parameters
    window.location.href = '../pages/search.php?' + params.toString();

}
function closeInput() {
    document.getElementById('optionBox').style.display = 'none';
    document.getElementById('backgroundBlur').style.display = 'none';
    document.getElementById('optionBox').innerHTML = '';
    document.querySelector('body').style.overflow = 'auto';
}

const plzOrtList = [];
// Example PLZ/Ort list (replace with your actual data or import as needed)
// Fetch the PLZ/Ort list from the JSON file
fetch('.././dataPost/adresses_PLZ.json')
    .then(response => response.json())
    .then(data => {
        data.forEach(entry => {
            plzOrtList.push({
                plz: entry.plz,
                ort: entry.name
            });
        });
        console.log('PLZ/Ort list loaded:', plzOrtList);
    })
    .catch(error => console.error('Error fetching PLZ/Ort list:', error));
// PLZ → Ort

function getTownFromPLZ(plz) {
    
    const inputTown = document.getElementById('inputLocation');

    if(plz == '')  {
        inputTown.value = '';
    }else {
        const result = plzOrtList.find(entry => entry.plz.toString().startsWith(plz.toString()));
        if (result && inputTown) {
            inputTown.value = result.ort;
        }
    }
    
}

function getPLZFromTown(town) {
    const inputPLZ = document.getElementById('plz');

    if(town == '')  {
        inputPLZ.value = '';
    }else {
    const result = plzOrtList.find(entry => entry.ort.toLowerCase().startsWith(town.toLowerCase()));
        if (result && inputPLZ) {
            inputPLZ.value = result.plz;
        }
}
}