/// <reference path=".././data/data.js" />

function generateSlideshow() {
    let str = '';
    console.log(artist)
    
    for (let i = 0; i < artist.length; i++) {
        str += `
        <div class="swiper-slide"id="${artist[i].id}">
            <div class="names">${artist[i].name}</div>
            <div class="artistsName">${artist[i].artist}</div>
        </div>
        `
        document.getElementsByClassName('swiper-wrapper')[0].innerHTML = str;

    }
}   
function createSwiper() {
  const swiper = new Swiper('.swiper', {
    // Optional parameters
    centeredSlides: true,
    effect: 'slide',
    longSwipesMs: 400,
    keyboard: {
       enabled: true,
       onlyInViewport: false,
    },

    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: true,
      dynamicMainBullets: 2,
    },
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  
    // And if we need scrollbar
    scrollbar: {
      el: '.swiper-scrollbar',
      draggable: true,
      snapOnRelease: true,
      hide: true,
      },
  });
}
    

 

