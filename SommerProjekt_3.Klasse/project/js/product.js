let startDate = null;
let endDate = null;
new Swiper('.swiper', {
    loop: true,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    pagination: {
        el: '.swiper-pagination',
        type: 'fraction', // zeigt "1 / 5" an
    },
    slidesPerView: 1,
    spaceBetween: 20,
    keyboard: {
        enabled: true,
        onlyInViewport: true,
    },
});


// Hilfsfunktion: Array mit gesperrten Daten generieren
let blockedDates = [];
bookings.forEach(function (booking) {
  let current = new Date(booking.start_date);
  const end = new Date(booking.end_date);
  while (current <= end) {
    blockedDates.push(current.toDateString()); // in string umwandeln für einfachen Vergleich
    current.setDate(current.getDate() + 1);
  }
});

$(document).ready(function () {
  $('#range-calendar').datepicker({
    format: 'dd.mm.yyyy',
    language: 'de',
    startDate: new Date(),
    todayHighlight: true,
    autoclose: false,
    calendarWeeks: false,
    inline: true,

  beforeShowDay: function (date) {
  const dateStr = date.toDateString();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Gebuchte Tage
  if (blockedDates.includes(dateStr)) {
    return {
      enabled: false,
      classes: 'booked disabled'  // Wichtig: beide Klassen setzen
    };
  }

  // Vergangene Tage
  if (date < today) {
    return {
      enabled: false,
      classes: 'past disabled' // beide Klassen, damit du visuell unterscheiden kannst
    };
  }

  // Bereichsauswahl visualisieren
  if (!startDate) return;

  const time = date.getTime();
  const start = startDate.getTime();
  const end = endDate ? endDate.getTime() : null;

  if (time === start) return { classes: 'range-start' };
  if (end && time === end) return { classes: 'range-end' };
  if (end && time > start && time < end) return { classes: 'range-between' };

  return;
}


  }).on('changeDate', function (e) {
    const selected = e.date;

    if (!startDate || (startDate && endDate)) {
      startDate = selected;
      endDate = null;
    } else if (selected < startDate) {
      endDate = startDate;
      startDate = selected;
    } else {
      endDate = selected;
    }

    $('#range-calendar').datepicker('update');

    $('#startHidden').val(formatDate(startDate));
    $('#endHidden').val(formatDate(endDate));
  });

});

 function formatDate(date) {
    if (!date) return '';
    const d = String(date.getDate()).padStart(2, '0');
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const y = date.getFullYear();
    return `${d}.${m}.${y}`;
  }


function rent(id) {
  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    if (blockedDates.includes(d.toDateString())) {
      document.getElementById('error').innerHTML = 'Dieser Zeitraum ist nicht verfügbar.';
      document.getElementById('error').style.display = 'block';
      return;
    }
  }
  console.log('Start:', startDate);
  console.log('End:', endDate);
  console.log('ID:', id);

  if(!startDate || !endDate) {
        document.getElementById('error').innerHTML = 'Bitte wähle einen Zeitraum aus.';
      document.getElementById('error').style.display = 'block';
    return;
  }

  // Überprüfe, ob der Benutzer eingeloggt ist
   fetch('../sql/checkSession.php')
    .then(response => response.json())
    .then(data => {
      if (!data) {
        document.getElementById('error').innerHTML = 'Bitte melde dich an, um eine Buchung vorzunehmen.';
        document.getElementById('error').style.display = 'block';
        throw new Error('Nicht eingeloggt');
      }else {
        // Create a form dynamically and submit via POST
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = '../pages/booking.php';

        const idInput = document.createElement('input');
        idInput.type = 'hidden';
        idInput.name = 'id';
        idInput.value = id;

        const startInput = document.createElement('input');
        startInput.type = 'hidden';
        startInput.name = 'start';
        startInput.value = formatDate(startDate);

        const endInput = document.createElement('input');
        endInput.type = 'hidden';
        endInput.name = 'end';
        endInput.value = formatDate(endDate);

        form.appendChild(idInput);
        form.appendChild(startInput);
        form.appendChild(endInput);

        document.body.appendChild(form);
        form.submit();
      }
    })
    .catch(error => {
      // Fehlerbehandlung, falls nicht eingeloggt oder Serverfehler
      return;
    });

}
