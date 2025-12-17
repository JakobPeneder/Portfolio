const fileInput = document.getElementById("fileInput");
const hiddenFileInput = document.getElementById("hiddenFileInput");
const preview = document.getElementById("preview");
const dropzone = document.getElementById("dropzone");
const toggle = document.getElementById("myToggle");
let deletedImageIds = [];
let allFiles = [];


    const slider = document.getElementById("stateRange");
    const hiddenState = document.getElementById("state");
    const stateLabel = document.getElementById("stateLabel");

    let states = ["neu", "sehrgut", "gut", "gebraucht", "schlecht"];

    // Funktion zur Aktualisierung von Label + HiddenInput
    function updateState() {
        let selectedState = states[parseInt(slider.value)];
        console.log(selectedState);

        for (let i = 0; i < states.length; i++) {
            let el = document.getElementById(states[i].toLowerCase());
            if (el) {
                el.style.fontWeight = "normal";
                el.style.color = "#000";
            }
        }

        document.getElementById(selectedState.toLowerCase()).style = 'font-weight: bold; color: #000;';
        hiddenState.value = selectedState;
    }

    // ❗ Direkt initialisieren bei Seitenstart
    updateState();
    toggleVisibility();
    dontshowPreview();  
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
    const inputTown = document.getElementById('city');
    const result = plzOrtList.find(entry => entry.plz.toString().startsWith(plz.toString()));
    if (result && inputTown) {
        inputTown.value = result.ort;
    }
}

function getPLZFromTown(town) {
    const inputPLZ = document.getElementById('postalcode');
    const result = plzOrtList.find(entry => entry.ort.toLowerCase().startsWith(town.toLowerCase()));
    if (result && inputPLZ) {
        inputPLZ.value = result.plz;
    }
}

    // Beim Sliden aktualisieren
    slider.addEventListener("input", updateState);

    toggle.addEventListener("change", () => {
      toggleVisibility();
    });
   
    function toggleVisibility() {
        if (toggle.checked) {
            document.getElementById('snowboard').classList.add('transSymbolBig');
            document.getElementById('ski').classList.add('transSymbolSmall');

            setTimeout(() => {
                document.getElementById('snowboard').classList.remove('transSymbolBig');
                document.getElementById('ski').classList.remove('transSymbolSmall');
                document.getElementById('snowboard').style = 'font-size: 3rem; opacity: 1;';
                document.getElementById('ski').style = 'font-size: 2.5rem; opacity: 0.5';
            }, 450);
       
        } else {
            document.getElementById('ski').classList.add('transSymbolBig');
            document.getElementById('snowboard').classList.add('transSymbolSmall');
            setTimeout(() => {
                document.getElementById('ski').classList.remove('transSymbolBig');
                document.getElementById('snowboard').classList.remove('transSymbolSmall');
                document.getElementById('ski').style = 'font-size: 3rem; opacity: 1;';
            document.getElementById('snowboard').style = 'font-size: 2.5rem; opacity: 0.5;';
            }, 450);
            

        }
    }

if (typeof savedImages !== "undefined") {
    savedImages.forEach(image => {
        const wrapper = document.createElement("div");
        wrapper.className = "image-wrapper";

        const img = document.createElement("img");
        img.src = image.src;
        showPreview(); // Zeige die Vorschau an, wenn ein Bild hinzugefügt wird
        const icon = document.createElement("i");
        icon.className = "fa-solid fa-circle-xmark deleteIcon";
        icon.style.display = "none"; // Initially hidden
        document.getElementById('errorMessage').style.display = "block";


        // Klick auf Icon → löschen
        icon.addEventListener("click", () => {
            wrapper.remove();
            deletedImageIds.push(image.id);
            savedImages = savedImages.filter(savedImage => savedImage.id !== image.id);

            if(allFiles.length == 0 && savedImages.length == 0) {
                dontshowPreview();
            }
        });

        // Hover-Effekt für das Icon
        wrapper.addEventListener("mouseover", () => {
            icon.style.display = "block";
        });
        wrapper.addEventListener("mouseout", () => {
            icon.style.display = "none";
        });
        // Klick auf Bild → löschen
        wrapper.appendChild(icon);
        wrapper.appendChild(img);
        preview.appendChild(wrapper);
    });
}else {
    savedImages = []; // Initialisiere savedImages, wenn es nicht definiert ist
}


function dontshowPreview() {
    preview.style.display = "none";   
}
function showPreview() {
    preview.style.display = "grid";
    
}


function deleteImageIdFromDB(img) {
    console.log('delete process');

    fetch("../sql/deleteImages.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: img })
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            console.log("Bild gelöscht:", img);
        } else {
            console.error("Fehler beim Löschen:", data.message);
        }
    });
    
    
}
function handleFiles(files) {
    Array.from(files).forEach(file => {
        if (!file.type.startsWith("image/")) return;

        console.log(savedImages)
        
        if (
            !allFiles.some(f => f.name === file.name && f.lastModified === file.lastModified) &&
            !savedImages.some(image => {
                const parts = image.src.split("/"); // Teile am /
                const filename = parts[parts.length - 1]; // Letzter Teil = Dateiname
                return filename === file.name;
            })
        ) {
            allFiles.push(file);
            showPreview(); // Zeige die Vorschau an, wenn ein Bild hinzugefügt wird
            document.getElementById('errorMessage').style.display = "none";



            const reader = new FileReader();
            reader.onload = e => {
                const wrapper = document.createElement("div");
                wrapper.className = "image-wrapper";
        
                const img = document.createElement("img");
                img.src = e.target.result;
        
                const icon = document.createElement("i");
                icon.className = "fa-solid fa-circle-xmark deleteIcon";
                icon.style.display = "none"; // Initially hidden
        
                // Klick auf Icon → löschen
                icon.addEventListener("click", () => {
                    wrapper.remove();
                    allFiles = allFiles.filter(f => f.name !== file.name || f.lastModified !== file.lastModified);

                    
                    if(allFiles.length == 0 && savedImages.length == 0) {
                        dontshowPreview();
                    }
                });
        
                // Hover-Effekt für das Icon
                wrapper.addEventListener("mouseover", () => {
                    icon.style.display = "block";
                });
                wrapper.addEventListener("mouseout", () => {
                    icon.style.display = "none";
                });
                // Klick auf Bild → löschen
                wrapper.appendChild(icon);
                wrapper.appendChild(img);
                preview.appendChild(wrapper);
            };
            reader.readAsDataURL(file);
        }
    });
}

// ✨ Drag & Drop
["dragenter", "dragover"].forEach(evt =>
    dropzone.addEventListener(evt, e => {
        e.preventDefault();
        dropzone.classList.add("dragover");
    })
);

["dragleave", "drop"].forEach(evt =>
    dropzone.addEventListener(evt, e => {
        e.preventDefault();
        dropzone.classList.remove("dragover");
    })
);

dropzone.addEventListener("drop", e => {
    handleFiles(e.dataTransfer.files);
});

dropzone.addEventListener("click", () => {
    fileInput.click();
});

fileInput.addEventListener("change", () => {
    handleFiles(fileInput.files);
    fileInput.value = "";
});

document.getElementById("uploadForm").addEventListener("submit", (e) => {
    const dt = new DataTransfer();

    // Überprüfe, ob PLZ und Ort zusammenpassen
    const inputPLZ = document.getElementById('postalcode').value.trim();
    const inputTown = document.getElementById('city').value.trim();
    const plzOrtMatch = plzOrtList.some(entry =>
        entry.plz.toString() === inputPLZ && entry.ort.toLowerCase() === inputTown.toLowerCase()
    );
    console.log(plzOrtMatch);

    if (!plzOrtMatch) {
        e.preventDefault();
        document.getElementById('errorMessageAddress').style.display = "block";
        document.getElementById("errorMessageAddress").innerHTML = "PLZ und Stadt stimmen nicht überein!";
        document.getElementById("errorMessageAddress").scrollIntoView({ behavior: "smooth", block: "center" });
        return;
    }

    if (allFiles.length == 0 && savedImages.length == 0) {
        e.preventDefault();
        document.getElementById('errorMessage').style.display = "block";
        document.getElementById("errorMessage").innerHTML = "Bitte mindestens ein Bild auswählen!";
    } else {
        for (let i = 0; i < deletedImageIds.length; i++) {
            const idToDelete = deletedImageIds[i];
            deleteImageIdFromDB(idToDelete);
        }

        allFiles.forEach(file => dt.items.add(file));
        hiddenFileInput.files = dt.files;
    }
    }
   
    );
