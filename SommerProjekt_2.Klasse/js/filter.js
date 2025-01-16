/// <reference path=".././data/data.js" />
/// <reference path="./slider.js" />

document.getElementsByClassName('swiper-wrapper')[0].addEventListener('click', reset);


function generateSlideshow1() {
    let str = '';
    console.log(artist)
    for (let i = 0; i < artist.length; i++) {
        str += `
        <div class="swiper-slide"id="${artist[i].id}">
        <div class="name">${artist[i].nameFilter}</div></div>    `
    }
    document.getElementsByClassName('swiper-wrapper')[0].innerHTML = str;
    
}


let count = 0;
function BlackAndWhite() {
    count = swiper.activeIndex;
    document.getElementsByClassName('swiper-wrapper')[0].style = '-webkit-filter: grayscale(1); filter: grayscale(1);'
    if(swiper.activeIndex == 10) {
        swiper.slideTo(count-1)
        swiper.slideTo(count)
    }
    else {
        swiper.slideTo(count+1)
        swiper.slideTo(count)
    }
    resetAllFilters()
    document.getElementById('blackwhite').style = 'opacity: 1; box-shadow: 5px 5px 10px black;'
    document.getElementById('blackwhite').onclick = reset;
    
}
function Brightness() {
    count = swiper.activeIndex;
    document.getElementsByClassName('swiper-wrapper')[0].style = '-webkit-filter: brightness(1.5);filter: brightness(1.5);'
    if(swiper.activeIndex == 10) {
        swiper.slideTo(count-1)
        swiper.slideTo(count)
    }
    else {
        swiper.slideTo(count+1)
        swiper.slideTo(count)
    }
    resetAllFilters()
    document.getElementById('brightness').style = 'opacity: 1;box-shadow: 5px 5px 10px black;'
    document.getElementById('brightness').onclick = reset;
}
function Contrast() {
    count = swiper.activeIndex;
    document.getElementsByClassName('swiper-wrapper')[0].style = '-webkit-filter: contrast(2); filter: contrast(2);'
    if(swiper.activeIndex == 10) {
        swiper.slideTo(count-1)
        swiper.slideTo(count)
    }
    else {
        swiper.slideTo(count+1)
        swiper.slideTo(count)
    }
    resetAllFilters()
    document.getElementById('contrast').style = 'opacity: 1;box-shadow: 5px 5px 10px black;'
    document.getElementById('contrast').onclick = reset;
}
function Sepia() {
    count = swiper.activeIndex;
    document.getElementsByClassName('swiper-wrapper')[0].style = '-webkit-filter: sepia(1);filter: sepia(1);'
    if(swiper.activeIndex == 10) {
        swiper.slideTo(count-1)
        swiper.slideTo(count)
    }
    else {
        swiper.slideTo(count+1)
        swiper.slideTo(count)
    }
    resetAllFilters()
    document.getElementById('sepia').style = 'opacity: 1;box-shadow: 5px 5px 10px black;'
    document.getElementById('sepia').onclick = reset;
}
function Saturate() {
    count = swiper.activeIndex;
    document.getElementsByClassName('swiper-wrapper')[0].style = '-webkit-filter: saturate(2); filter: saturate(2);'
    if(swiper.activeIndex == 10) {
        swiper.slideTo(count-1)
        swiper.slideTo(count)
    }
    else {
        swiper.slideTo(count+1)
        swiper.slideTo(count)
    }
    resetAllFilters()
    document.getElementById('saturate').style = 'opacity: 1;box-shadow: 5px 5px 10px black;'
    document.getElementById('saturate').onclick = reset;
}
function Invert() {
    count = swiper.activeIndex;
    document.getElementsByClassName('swiper-wrapper')[0].style = ' -webkit-filter: invert(1); filter: invert(1);'
    if(swiper.activeIndex == 10) {
        swiper.slideTo(count-1)
        swiper.slideTo(count)
    }
    else {
        swiper.slideTo(count+1)
        swiper.slideTo(count)
    }
    resetAllFilters()
    document.getElementById('invert').style = 'opacity: 1;box-shadow: 5px 5px 10px black;'
    document.getElementById('invert').onclick = reset;
}
function Huerotate()  {
    count = swiper.activeIndex;
    document.getElementsByClassName('swiper-wrapper')[0].style = ' -webkit-filter: hue-rotate(45deg); filter: hue-rotate(45deg);' 
    if(swiper.activeIndex == 10) {
        swiper.slideTo(count-1)
        swiper.slideTo(count)
    }
    else {
        swiper.slideTo(count+1)
        swiper.slideTo(count)
    }
    resetAllFilters()
    document.getElementById('hue-rotate').style = 'opacity: 1;box-shadow: 5px 5px 10px black;'
    document.getElementById('hue-rotate').onclick = reset;
}
function reset() {
    if(document.getElementsByClassName('swiper-wrapper')[0].style.filter != 'none') {
        count = swiper.activeIndex;
        document.getElementsByClassName('swiper-wrapper')[0].style = ' -webkit-filter: none; filter:none;' 
        if(swiper.activeIndex == 10 ) {
            swiper.slideTo(count-1)
            swiper.slideTo(count)
        }
        else if(swiper.activeIndex == 9) {
            swiper.slideTo(count-1)
            swiper.slideTo(count)
        }
        else {
            swiper.slideTo(count+1)
            swiper.slideTo(count)
        }
    }
    gotResetted()
    
}
function resetAllFilters() {
    document.getElementById('blackwhite').style = 'filter: blur(1.5px); box-shadow: none;'
    document.getElementById('invert').style = 'filter: blur(1.5px); box-shadow: none;'
    document.getElementById('brightness').style = 'filter: blur(1.5px); box-shadow: none;'
    document.getElementById('contrast').style = 'filter: blur(1.5px); box-shadow: none;'
    document.getElementById('sepia').style = 'filter: blur(1.5px); box-shadow: none;'
    document.getElementById('saturate').style = 'filter: blur(1.5px);box-shadow: none;'
    document.getElementById('hue-rotate').style = 'filter: blur(1.5px);box-shadow: none;'

    document.getElementById('blackwhite').onclick = BlackAndWhite;
    document.getElementById('invert').onclick = Invert;
    document.getElementById('brightness').onclick = Brightness;
    document.getElementById('contrast').onclick = Contrast;
    document.getElementById('sepia').onclick = Sepia;
    document.getElementById('saturate').onclick = Saturate;
    document.getElementById('hue-rotate').onclick = Huerotate;


}

function gotResetted() {
    document.getElementById('blackwhite').style = 'filter: none;'
    document.getElementById('invert').style = 'filter: none;' 
    document.getElementById('brightness').style = 'filter: none;'
    document.getElementById('contrast').style = 'filter: none;'
    document.getElementById('sepia').style = 'filter: none;'
    document.getElementById('saturate').style = 'filter: none;'
    document.getElementById('hue-rotate').style = 'filter: none;'

}

let count1 = 0;
function infoIn() {
    document.getElementById('infobox').classList.add('infoIn');
    document.getElementById('showFilter').classList.add('filterIn');

    setTimeout(function() {
        document.getElementById('infobox').style = 'margin-top: 0%;'
        document.getElementById('showFilter').style = 'margin-top: 34vw;'
        document.getElementById('circle').onclick = infoOut;
        document.getElementById('pfeil').onclick = infoOut;

        document.getElementById('infobox').innerHTML = `
        Here you can test and use seven different filters on the most famous paintings ever. To remove a filter, you just
        have to click on the picture you are editing at the moment. The filters are marked at the end of the site. 
        `
        arrowOff()
        count1++;
    })
    
}
function infoOut() {
    document.getElementById('infobox').classList.remove('infoIn');
    document.getElementById('showFilter').classList.remove('filterIn');
    document.getElementById('showFilter').classList.add('filterOut');
    document.getElementById('infobox').classList.add('infoOut');

    setTimeout(function() {
        document.getElementById('infobox').style = 'margin-top: -30%'
        document.getElementById('showFilter').style = 'margin-top: 50vw;'
        document.getElementById('circle').onclick = infoIn;
        document.getElementById('pfeil').onclick = infoIn;
        document.getElementById('infobox').classList.remove('infoOut');
        document.getElementById('showFilter').classList.remove('filterOut');
    },900)
    arrowOn()

}
function arrowOn() {
    if(count1 > 0) {
        document.getElementById('pfeil').classList.remove('arrowOff');
    }
    document.getElementById('pfeil').classList.add('arrowOn');
}
function arrowOff() {
    document.getElementById('pfeil').classList.remove('arrowOn');
    document.getElementById('pfeil').classList.add('arrowOff');
}
function switchTo() {
    console.log(sessionStorage.getItem('Index'))
    swiper.slideTo(sessionStorage.getItem('Index'));
}



const swiper = new Swiper('.swiper', {
    // Optional parameters
    keyboard: {
        enabled: true,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true,
        dynamicMainBullets: 3,
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
    },
});




