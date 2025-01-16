/// <reference path=".././data/artists.js" />

function generateArtists() {
    let str = '';
    console.log(artist)
    
    for (let i = 0; i < artist.length; i++) {
      if(i != 0) {
        if(i %2 == 0) {
                    str += `
                    <div class="flex-container"style="margin-left: 2vw;" id="box${i}">        
                    <div class="pictures" alt="artist image"style="background-image: url(${artist[i].img}); left: 4.2vw;"></div>
                    <div class="box" style="padding-left: 20%;">
                      <h1 class="artistNames">${artist[i].name}</h1>
                      <p id="${i}artist">${artist[i].shortInfo}</p>
                      <div class="more"onclick="showMore(${i})">read More</div>
                  </div>
                    `
                  }else {
                    str += `
                    <div class="flex-container"style="margin-left: -7vw;"id="box${i}">        
                    <div class="box" style="padding-right: 20%; padding-left: 5%;">
                      <h1 class="artistNames">${artist[i].name}</h1>
                      <p id="${i}artist">${artist[i].shortInfo}</p>
                      <div class="more"onclick="showMore(${i})">read More</div>
                    </div>
                    <div class="pictures" alt="artist image"style="background-image: url(${artist[i].img}); left: 72vw;"></div>
                    `
                  }             
                str += `</div>`
      }else {
        if(i %2 == 0) {
          str += `
          <div class="flex-container"style="margin-left: 2vw;" id="box${i}">        
          <div class="pictures" alt="artist image"style="background-image: url(${artist[i].img});"></div>
          <div class="box" style="padding-left: 20%;">
            <h1 class="artistNames">${artist[i].name}</h1>
            <p id="${i}artist">${artist[i].shortInfo}</p>
            <div class="more"onclick="showMore(${i})">read More</div>
        </div>
          `
        }else {
          str += `
          <div class="flex-container"style="margin-left: -7vw;"id="box${i}">        
          <div class="box" style="padding-right: 20%; padding-left: 5%;">
            <h1 class="artistNames">${artist[i].name}</h1>
            <p id="${i}artist">${artist[i].shortInfo}</p>
            <div class="more"onclick="showMore(${i})">read More</div>
          </div>
          <div class="pictures" alt="artist image"style="background-image: url(${artist[i].img}); left: 68vw;"></div>
          `
        }   
      str += `</div>`
      }
          
    }
    document.getElementById('erg').innerHTML = str;
    getgsap();
  }
  function showMore(number) {
  document.getElementById(number+'artist').innerHTML = artist[number].info;
  document.getElementsByClassName('artistNames')[number].style = 'margin-top: 0;'
  document.getElementsByClassName('more')[number].innerHTML = 'read less';

  document.getElementsByClassName('more')[number].onclick = function() {
    showLess(number);
  };
}
function showLess(number) {
  document.getElementById(number+'artist').innerHTML = artist[number].shortInfo;
  document.getElementsByClassName('artistNames')[number].style = 'margin-top: 10%;'
  document.getElementsByClassName('more')[number].innerHTML = 'read more';
  document.getElementsByClassName('more')[number].onclick = function() {
    showMore(number);
  };
}
function getgsap() {
  gsap.registerPlugin(ScrollTrigger);

  const icons = gsap.utils.toArray('.flex-container');

  icons.forEach((icon, i) => {
    ScrollTrigger.create({
      animation: i === 0 ? null : gsap.from(icon, {autoAlpha: 0,y:50}),
      trigger: icon,
      start: "top 70%",
      end: "bottom 60%",
    })
  })
}
