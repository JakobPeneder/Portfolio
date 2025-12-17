document.addEventListener('keyup', function(event) {
    if(event.key === 'Escape') {
        closeInput();
    }
});

function showStatistics(hirings, date, views, title) {
    const optionBox = document.getElementById('optionBox');
    optionBox.innerHTML = '';
    optionBox.style.display = 'block';
    document.getElementById('backgroundBlur').style.display = 'block';
    document.querySelector('body').style.overflow = 'hidden';
    optionBox.innerHTML = `
        <div class="filterOp">Statistiken</div>
        <div class="filterOpDesc">Hier siehst du die Statistiken zu deiner Anzeige "${title}".</div>
        <div class="statistic">
            <span class="statisticTitle">Aufrufe</span> <p>${views}</p>
        </div>
        <div class="statistic">
            <span class="statisticTitle">Buchungen</span> <p>${hirings}</p>
        </div>
        <div class="statistic">
            <span class="statisticTitle">Datum</span> <p>${date}</p>
        </div>
        <div id="flexible">
            <div class="interrupt" onclick="closeInput()">Schließen</div>
        </div>
    `;
}
 
function deleteListing(listingId) {
   const optionBox = document.getElementById('optionBox');
    optionBox.innerHTML = '';
    optionBox.style.display = 'block';
    document.getElementById('backgroundBlur').style.display = 'block';
    document.querySelector('body').style.overflow = 'hidden';
    optionBox.innerHTML = `
        <div class="filterOp">Anzeige löschen</div>
        <div class="filterOpDesc">Bist du sicher, dass du diese Anzeige löschen möchtest?</div>
        <div id="flexible">
            <div class="interrupt" onclick="closeInput()">Abbrechen</div>
            <div class="submit" onclick="deleteIt(${listingId})">Löschen</div>
        </div>
    `;


    console.log("Lösche Listing:", listingId);
    
}
function deleteIt(listingId) {
    fetch("../sql/deleteListing.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: listingId })
    })
    .then(async res => {
        const text = await res.text();
        try {
            const data = JSON.parse(text);
            if (data.success) {
                console.log("Listing gelöscht:", listingId);
                document.getElementById('con-'+ listingId)?.remove();
            } else {
                console.error("Fehler beim Löschen:", data.message);
            }
        } catch (e) {
            console.error("Ungültige JSON-Antwort:", text); // <- das zeigt dir, ob HTML kam
        }
    });
                closeInput()


}
function closeInput() {
    document.getElementById('optionBox').style.display = 'none';
    document.getElementById('backgroundBlur').style.display = 'none';
    document.getElementById('optionBox').innerHTML = '';
    document.querySelector('body').style.overflow = 'auto';
}
