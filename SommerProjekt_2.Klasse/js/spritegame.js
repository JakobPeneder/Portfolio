/// <reference path=".././data/solutions.js" />

/***********************************
 * INIT
 * **********************************/
let player = document.getElementById('player');
let spriteImg = document.getElementById('spriteImg');
let room = 'Room 1';
let surface = document.getElementById('surface');
let startButton = document.getElementById('startButton');
let debug_output = document.getElementById('debug_output');
// Scale the surface to 95% of the screen width
let moveAllowed = false;
let tries = 0;
let pictureCount = 0;
if (!sessionStorage.getItem('unlockedRooms')) {
    sessionStorage.setItem('unlockedRooms', JSON.stringify([
        'false',
        'false',
        'false',
        'false',
        'false', 
        'false',
        'false',
        'false',
        'false',
        'false',
        'false',
        'false',
        'false',
        'false',
        'false'
    ]));
}
/***********************************
 * GAME CONFIG
 * **********************************/
let spriteImgNumber = 0; // current animation part of sprite image
sessionStorage.setItem('winCount', 0);
sessionStorage.setItem('tries', 0);
let gameSpeed = 24; // game loop refresh rate (pictures per second)
let characterSpeed = 10; // move offset in PX

let pictures = [
    './img/Picasso.jpg',
    './img/Hundertwasser.jpeg',
    './img/Kahlo.jpg',
    './img/VanGogh.jpg',    
    './img/DaVinci.jpg',  
    './img/Vermeer.jpg',
    './img/birthVenus.jpg',  
    './img/Manet.jpg',
    './img/Munch.jpg',
    './img/Banksy.jpg',
    './img/Miro.jpg',
    './img/Klimt.jpg',
    './img/Whistler.jpg',
    './img/Delacroix.jpg',
    './img/Dahli.jpg'
]


// index.html





/***********************************
 * EVENT LISTENER
 * **********************************/
document.onkeydown = keydown_detected;
document.onkeyup = keyup_detected;

let leftArrow = false;
let rightArrow = false;
let upArrow = false;
let downArrow = false;
let enter = false;
let esp = false;
let enterPressed = false;

function keydown_detected(e){
    console.log(e.keyCode)
    //console.log(e);
    //console.log(e.keyCode);
    if (!e){
        e = window.event; //Internet Explorer
    }   
    if(e.keyCode == 27) {
        esp = true;
    }
    if(enterPressed == false) {
        if(e.keyCode == 13) {
            enter = true;
        }
    }
    
    if (e.keyCode == 37 || e.keyCode == 65){ // leftArrow
        leftArrow = true;
    }
    if (e.keyCode == 38 || e.keyCode == 87){ //upArrow
        upArrow = true;
    }
    if (e.keyCode == 39 || e.keyCode == 68){ // rightArrow
        rightArrow = true;
    }
    if (e.keyCode == 40 || e.keyCode == 83){ // downArrow
        downArrow = true;
    }
}
function keyup_detected(e){
    //console.log(e);
    //console.log(e.keyCode);
    if (!e){
        e = window.event; //Internet Explorer
    }
    if(e.keyCode == 13) {
        enter = false;
    }
    
    if(e.keyCode == 27) {
        esp = false;
    }
    if (e.keyCode == 37 || e.keyCode == 65){ // leftArrow
        leftArrow = false;
    }
    if (e.keyCode == 38 || e.keyCode == 87){ //upArrow
        upArrow = false;
    }
    if (e.keyCode == 39 || e.keyCode == 68){ // rightArrow
        rightArrow = false;
    }
    if (e.keyCode == 40 || e.keyCode == 83){ // downArrow
        downArrow = false;
    }
    
}



/***********************************
 * GAME LOOP
 * **********************************/
function startGame() {
    player.style.left = '470px'; // starting position
    player.style.top = '100px'; // starting position
    player.style.opacity = '1'; // show player
    spriteImg.style.right = '0px'; // starting animation
    gameLoop();
}

function gameLoop() {
    if(!moveAllowed) {
        if(leftArrow) {
            movePlayer((-1)*characterSpeed, 0, -1);
            animatePlayer(0);
        }
        if(rightArrow) {
            movePlayer(characterSpeed, 0, 1)
            animatePlayer(1);
        }
        if(upArrow) {
            movePlayer(0, (-1)*characterSpeed, 0);
            animatePlayer(2);
        }
        if(downArrow) {
            movePlayer(0, characterSpeed, 0);
            animatePlayer(3);
        }
    }
        if(enter == true) {
            movePlayer(0,0,0);     
        }
        if(esp == true) {
            getAway()
        }
        setTimeout(gameLoop, 1000/gameSpeed); // async recursion
    
    
    
}



/***********************************
 * MOVE
 * **********************************/
/**
 * @param {number} dx - player x move offset in pixel
 * @param {number} dy - player y move offset in pixel
 * @param {number} dr - player heading direction (-1: move left || 1: move right || 0: no change)
 */
function movePlayer(dx, dy, dr) {
    // current position
    let x = parseFloat(player.style.left);
    let y = parseFloat(player.style.top);


    if(x < 390 && y >= 0 && y <= 110) x = 395;
    else if(x >= 345 && x <= 445 && y < 260 && y > 255) y = 260;
   else if(x >= 390 && x <= 550 && y <= 0) y = 10;
   else if(x >= 550 && x <= 570 && y < 160 && y >= 0) x = 540;
   else if(x >= 390 && x <= 450 && y >= 110 && y <= 130) y = 100;
   else if(x >= 490 && x <= 550 && y >= 110 && y <= 130) y = 100;
   else if(x > 470 && x <= 490 && y > 120 && y < 240) x = 470;
   else if(x < 450 && x >= 430 && y > 120 && y < 240) x = 455;
   else if(x >= 355 && x <= 445 && y <= 240 && y > 220) y = 250;
   else if(x <= 355 && x > 330 && y >= 240 && y < 310) x = 360;
   else if(x >= 490 && x <= 650 && y < 240 && y > 220) y = 240;
   else if(x >= 395 && x <= 545 && y > 250 && y < 270) y = 245;
   else if(x <= 340 && x >= 290 && y < 325) y = 330;
   else if(x < 300 && y >= 320 && y <= 430) x = 300;
   else if(x >= 300 && x <= 450 && y > 430) y = 425 ;
   else if(x > 440 && x < 460 && y >= 320 && y <= 430) x = 440;
   else if(x <= 450 && x >= 390 && y < 325 && y > 300) y = 325;
   else if(y >= 255 && y <= 315 && x >= 380 && x < 400) x = 380;
   else if(x >= 600 && x <= 750 && y > 240 && y < 260) y = 240;
   else if(y < 240 && y > 120 && x < 660 && x > 640) x = 665;
   else if(x <= 645 && x >= 595 && y > 110 && y < 130) y = 105; 
   else if(y <= 105 && y >= 0 && x <= 600 && x > 580) x = 600;
   else if(x >= 590 && x <= 750 && y < 0) y = 5;
   else if(y <= 105 && y >= 0 && x >= 750) x = 740;
   else if(x >= 690 && x <= 750 && y > 105 && y < 120) y = 105;
   else if(y >= 115 && y <= 230 && x > 685 && x < 700) x = 680;
   else if(y >= 260 && y <= 320 && x <= 555 && x > 530) x = 560;
   else if(y >= 325 && y <= 425 && x < 500 && x > 480) x = 500;
   else if(x <= 550 && x >= 490 && y < 325 && y > 310) y = 325;
   else if(x >= 500 && x <= 650 && y > 425) y = 425;
   else if(y <= 435 && y >= 325 && x >= 650 && x < 670) x = 640;
   else if(x >= 600 && x <= 650 && y < 325 && y > 310) y = 325;
   else if(y >= 260 && y <= 320 && x > 580 && x < 600) x = 580;
   else if(x >= 690 && x <= 780 && y < 240 && y > 220) y = 240;
   else if(y <= 290 && y >= 230 && x > 780) x = 780;
   else if(y == 310 && x > 840) x = 840;
   else if(x <= 850 && x >= 800 && y < 310 && y > 290) y = 310;
   else if(y > 250 && y <= 310 && x < 770 && x > 740) x = 770;  
   else if(x >= 760 && x <= 790 && y > 300 && y < 330) y = 300;
   else if(x <= 850 && x >= 830 && y > 300 && y < 330) y = 300; 
   else if(x <= 780 && x >= 730 && y < 390 && y > 370) y = 395;
   else if(x < 730 && x > 710 && y >= 385 && y <= 475) x = 735; 
   else if(x >= 725 && x <= 885 && y > 475) y = 470;
   else if(x < 730 && x > 710 && y >= 385 && y <= 475) x = 735; 
   else if(y <= 480 && y >= 390 && x > 885) x = 880;
   else if(x <= 890 && x >= 830 && y < 390 && y > 370) y = 395;
   else if(y >= 320 && y <= 380 && x > 820 && x < 840) x = 820;
   else if(y >= 320 && y <= 380 && x < 800 && x > 780) x = 800;


   // Rooms
   if(x >= 390 && x <= 540 && y < 135) room = 'Room 1';
   else if(x >= 600 && x <= 750 && y < 135) room = 'Room 2';
   else if(x >= 300 && x <= 450 && y > 270) room = 'Room 3';
   else if(x >= 500 && x <= 650 && y > 270) room = 'Room 4';
   else if(x >= 735 && x <= 890 && y > 320) room = 'Room 5';
   else room = 'Corridor';

   if(enter == true) {
        // Room 1
        if(x <= 420 && x >= 385 && y >= 10 && y <= 100) {      
            pictureCount = 0;  
            showPicture(0)
        }
        else if(x >= 430 && x <= 520 && y >= 0 && y <= 20) {
            pictureCount = 1;  
            showPicture(1)
        }
        else if(x <= 550 && x >= 520 && y >= 10 && y <= 100) {
            pictureCount = 2;  
            showPicture(2)
        }

        // Room 2
        else if(x <= 620 && x >= 590 && y >= 10 && y <= 105) {
            pictureCount = 3;  
            showPicture(3)
        }
        else if(x <= 720 && x >= 630 && y >= 0 && y <= 20) {
            pictureCount = 4;  
            showPicture(4)
        }
        else if(x <= 750 && x >= 730 && y >= 10 && y <= 105) {
            pictureCount = 5;  
            showPicture(5)
        }

        // Room 3
        else if(x <= 420 && x >= 330 && y >= 415) {
            pictureCount = 6;  
            showPicture(6)
        }
        else if(x <= 310 && x >= 290 && y >= 320 && y <= 410) {
            pictureCount = 7;  
            showPicture(7)
        }
        else if(x <= 450 && x >= 420 &&  y >= 320 && y <= 410) {
            pictureCount = 8;  
            showPicture(8)
        }

        // Room 4
        else if(x <= 620 && x >= 520 && y >= 415) {
            pictureCount = 9;  
            showPicture(9)
        }
        else if(x <= 510 && x >= 490 && y >= 320 && y <= 410) {
            pictureCount = 10;  
            showPicture(10)
        }
        else if(x <= 650 && x >= 630 &&  y >= 320 && y <= 410) {
            pictureCount = 11;  
            showPicture(11)
        }

        // Room 5
        else if(x <= 855 && x >= 755 && y >= 470) {
            pictureCount = 12;  
            showPicture(12)
        }
        else if(x <= 745 && x >= 725 && y >= 385 && y <= 470) {
            pictureCount = 13;  
            showPicture(13)
        }
        else if(x <= 890 && x >= 870 && y >= 385 && y <= 470) {
            pictureCount = 14;  
            showPicture(14)
        }
   }

   	else {
        if(x <= 420 && x >= 385 && y >= 10 && y <= 100) {        
            document.getElementById('press').innerHTML = 'Press enter';
        }
        else if(x >= 430 && x <= 520 && y >= 0 && y <= 20) {
            document.getElementById('press').innerHTML = 'Press enter';
        }
        else if(x <= 550 && x >= 520 && y >= 10 && y <= 100) {
            document.getElementById('press').innerHTML = 'Press enter';
        }

        // Room 2
        else if(x <= 620 && x >= 590 && y >= 10 && y <= 105) {
            document.getElementById('press').innerHTML = 'Press enter';
        }
        else if(x <= 720 && x >= 630 && y >= 0 && y <= 20) {
            document.getElementById('press').innerHTML = 'Press enter';
        }
        else if(x <= 750 && x >= 730 && y >= 10 && y <= 105) {
            document.getElementById('press').innerHTML = 'Press enter';
        }

        // Room 3
        else if(x <= 420 && x >= 330 && y >= 415) {
            document.getElementById('press').innerHTML = 'Press enter';
        }
        else if(x <= 310 && x >= 290 && y >= 320 && y <= 410) {
            document.getElementById('press').innerHTML = 'Press enter';
        }
        else if(x <= 450 && x >= 420 &&  y >= 320 && y <= 410) {
            document.getElementById('press').innerHTML = 'Press enter';
        }

        // Rooom 4
        else if(x <= 620 && x >= 520 && y >= 415) {
            document.getElementById('press').innerHTML = 'Press enter';
        }
        else if(x <= 510 && x >= 490 && y >= 320 && y <= 410) {
            document.getElementById('press').innerHTML = 'Press enter';
        }
        else if(x <= 650 && x >= 630 &&  y >= 320 && y <= 410) {
            document.getElementById('press').innerHTML = 'Press enter';
        }

        // Room 5
        else if(x <= 855 && x >= 755 && y >= 470) {
            document.getElementById('press').innerHTML = 'Press enter';
        }
        else if(x <= 745 && x >= 725 && y >= 385 && y <= 470) {
        document.getElementById('press').innerHTML = 'Press enter';
        }
        else if(x <= 890 && x >= 870 && y >= 385 && y <= 470) {
            document.getElementById('press').innerHTML = 'Press enter';
        }
        else {
            document.getElementById('press').innerHTML = '';
        }

        if(document.getElementById('press').innerHTML == 'Press enter') {
            document.getElementById('press').style = 'dislay: block;'
            document.getElementById('press').style = `top: ${y-15}px; left: ${x-15}px;`
        }else document.getElementById('press').style = 'display: none;'
    }
        
        
    // calc new position
    x += dx;
    y += dy;

    
    // assign new position
    player.style.left = x + 'px';
    player.style.top = y + 'px';

    // handle direction
    if(dr != 0) {
        player.style.transform = `scaleX(${dr})`;
    }  

    document.getElementById('room').innerHTML = room;
    // output in debugger box
}
function newGame() {
    
    tries = sessionStorage.getItem('tries');
    document.getElementById('blurbox').style = 'display: none; z-index: 1000;'    
    document.getElementById('canvas').style = 'display: none; z-index: 1000;'
    document.getElementById('win').innerHTML = '';
    document.getElementById('winFlex').style = 'display: none;'
    sessionStorage.setItem('tries', 0);
    sessionStorage.setItem('winCount', 0);

    for(let i = 0; i < sessionStorage.getItem('unlockedRooms').length; i++) {
        sessionStorage.setItem('unlockedRooms', JSON.stringify([
            'false',
            'false',
            'false',
            'false',
            'false', 
            'false',
            'false',
            'false',
            'false',
            'false',
            'false',
            'false',
            'false',
            'false',
            'false'
        ]));
    }
    location.reload();
}
function saveCountValue() {
    console.log('enter saveCountValue')
    let value = {
        'count': sessionStorage.getItem('tries')
    }

    // Initialisiere Array mit Session Storage oder Default []
    let leaderboard = JSON.parse( localStorage['leaderboard'] ?? '[]' ) ;
    
    // Neuen Eintrag hinzufügen
    leaderboard.push(value);
    
    // Update localStorage
    localStorage['leaderboard'] = JSON.stringify(leaderboard);

    leaderboard = JSON.parse(localStorage['leaderboard']) || [];

    leaderboard.sort((a, b) => a.count - b.count);
    localStorage['leaderboard'] = JSON.stringify(leaderboard);

    loadAll()

}
function loadTop5() {
        document.getElementById('leaderboard').classList.add('fade-in')
        document.getElementById('leaderboard').style = 'display: block;'

        let str = '';
        if(localStorage['leaderboard'] == undefined) {
            str = 'Leaderboard is empty.';

        }
         else {
            let leaderboard = JSON.parse(localStorage['leaderboard']) || [];
            let counter = 0;
            if(leaderboard.length < 5) {
                for (let i = 0; i < leaderboard.length; i++) {
                    if(leaderboard[i].count == sessionStorage.getItem('triesBackup') && counter == 0) {
                        counter++;
                        str += `<p style="color: yellow;">${i + 1}. Place: ${leaderboard[i].count} tries</p>`;
                    }
                    else str += `<p>${i + 1}. Place: ${leaderboard[i].count} tries</p>`;
                }
            }
            else {
                for (let i = 0; i < 5; i++) {
                    if(leaderboard[i].count == sessionStorage.getItem('triesBackup') && counter == 0) {
                        counter++;
                        str += `<p style="color: yellow;">${i + 1}. Place: ${leaderboard[i].count} tries</p>`;
                    }
                    else str += `<p>${i + 1}. Place: ${leaderboard[i].count} tries</p>`;
                }
        }
        }
        document.getElementById('leaderboard').innerHTML = str;

        document.getElementById('pokal').onclick = close;
        setTimeout(() => {
            document.getElementById('leaderboard').classList.remove('fade-in')
        }, 1000);
    }
function close() {
    document.getElementById('leaderboard').classList.add('fade-out')

   

    setTimeout(() => {
        document.getElementById('leaderboard').classList.remove('fade-out')
        document.getElementById('leaderboard').style = 'display: none;'
        document.getElementById('pokal').onclick = loadTop5;    
    }, 1000);
}

function loadAll() {
    let leaderboard = JSON.parse(localStorage['leaderboard']) || [];
    let str = ''
    let counter = 0;
    for(let i = 0; i < leaderboard.length ; i++) {
        if(leaderboard[i].count == sessionStorage.getItem('triesBackup') && counter == 0) {
            counter++;
            str += `<p style="color: yellow;">${i+1}. Place: ${leaderboard[i].count} tries</p>`
        }
        else str += `<p>${i+1}. Place: ${leaderboard[i].count} tries</p>`
    }
    document.getElementById('longLeaderboard').innerHTML = str;
}
function allSolved() {
    let array = JSON.parse(sessionStorage.getItem('unlockedRooms'));
    for(let i = 0; i < array.length; i++) {
        if(array[i] == 'false') {
            return false;
        }
    }
    return true;
}
function generateRandomNames() {
    let selectOptions = [];
    document.getElementById('containerNames').innerHTML = '';
    
    for(let i = 0; i < solutions.length; i++) {
        if(JSON.parse(sessionStorage.getItem('unlockedRooms'))[i] == 'true') {
            selectOptions[i] = `<p class="namesSelect"style="opacity: 0.4;">${solutions[i].shortSolution}</p>`;
        }
        else selectOptions[i] = `<p class="namesSelect"onclick="useInput('${solutions[i].shortSolution}', ${i})">${solutions[i].shortSolution}</p>`;
    }
    selectOptions.sort(() => Math.random() - 0.5);

    for(let i = 0; i < selectOptions.length; i++) {
        document.getElementById('containerNames').innerHTML += selectOptions[i];
    }
} 
function useInput(name, i) { 
    if(JSON.parse(sessionStorage.getItem('unlockedRooms'))[pictureCount] == 'false' && document.getElementById('inputfield'))  {
        document.getElementById('inputfield').value = name;
    }
    console.log('enter useInput')

}
function win() {
    document.getElementById('blurbox').style = 'display: block; z-index: 1000000000;' 
    document.getElementById('gamenew').style = 'z-index: 100000;'
    document.getElementById('pokal').style = 'z-index: 100000;'
    document.getElementById('circleInfo').style = 'z-index: 100000;'
    document.getElementById('selectOptions').style = 'z-index: 100000;'
    document.getElementById('inputText').style = 'z-index: 100000;'
    document.getElementById('lock').style = 'z-index: 100000;'


    loadAll()   
    document.getElementById('canvas').style = 'display: block; z-index: 10000000000;'
    document.getElementById('winFlex').style = 'display: grid;'
    document.getElementById('win').classList.add('winBox');
}
function submit() {
    console.log('submit')
    let userInput = document.getElementById('inputfield').value;
    sessionStorage.setItem('tries', parseInt(sessionStorage.getItem('tries')) + 1);
        if(userInput.toLowerCase().includes(solutions[pictureCount].shortSolution.toLowerCase())) {
            let audio = new Audio('./audio/party.mp3');
            audio.play();
            sessionStorage.setItem('winCount', parseInt(sessionStorage.getItem('winCount')) + 1);

            document.getElementById('lock').innerHTML = '<img src="./img/openLock.png">'
            document.getElementById('inputText').style = 'filter: grayscale(1)'
            
            let array = JSON.parse(sessionStorage.getItem('unlockedRooms'));
            array[pictureCount] = 'true'; 
            sessionStorage.setItem('unlockedRooms', JSON.stringify(array));

            document.getElementById('inputText').innerHTML = `
            <input type="text"placeholder="your answer..."id = "inputfield" readonly="true"value="${userInput}">
            <div id="submit"onclick="submit()">Submit</div>`
            document.getElementById('submit').style = 'transform: none; cursor: default;'
            document.getElementById('canvas').style = 'display: block;'
         
            generateRandomNames();
            if(allSolved()) {
                sessionStorage.setItem('triesBackup', sessionStorage.getItem('tries'));
                saveCountValue()
                win();
            }
        }else if(isFirstNameCorrect(userInput)) {
                let inputField = document.getElementById('inputfield');
                inputField.style.transition = 'color 0.5s ease-in-out';
                inputField.style.color = 'green';

                setTimeout(function() {
                    inputField.style.color = '';
                }, 2000);
            
            document.getElementById('error').innerHTML = 'First name is already correct! Try again!'
        }
        else {
            document.getElementById('inputfield').style.transition = 'color 0.5s ease-in-out';
            document.getElementById('inputfield').style.color = 'red';

            setTimeout(function() {
                document.getElementById('inputfield').style.color = '';
                document.getElementById('inputfield').value = '';
            }, 1000);
            document.getElementById('error').innerHTML = 'You are wrong! Try again!'
        }
}
function isFirstNameCorrect(userInput) {
    let correctName = solutions[pictureCount].solution.toLowerCase();
    let correctNameArray = correctName.split(' ');
    let userInputArray = userInput.split(' ');
    if(userInputArray[0].toLowerCase() == correctNameArray[0]) {
        return true;
    }
    return false;

}
// Functions for interactions in the game
function showPicture(number) {
    document.getElementById('gamenew').style = 'z-index: 100000000;'
    document.getElementById('pokal').style = 'z-index: 100000000;'

    moveAllowed = true;
    document.getElementById('pictureBox').innerHTML = `
    <img src="${pictures[number]}">
    `
    console.log("number: "+number)
    if(JSON.parse(sessionStorage.getItem('unlockedRooms'))[number] == 'true'){
        document.getElementById('lock').innerHTML = '<img src="./img/openLock.png">' 
        document.getElementById('inputText').style = 'filter: grayscale(1)'
        document.getElementById('inputText').innerHTML = `<input type="text"placeholder="your answer..."id = "inputfield" readonly="true"value="${solutions[pictureCount].solution}">
        <div id="submit">Submit</div><div id="error"></div>`
        enterPressed = true;
        document.getElementById('submit').style = 'transform: none; cursor: default;'
    }
    else {
        document.getElementById('lock').innerHTML = '<img src="./img/lock.png">'
        document.getElementById('inputText').style = 'filter: none;'
        document.getElementById('inputText').innerHTML = `<input type="text"placeholder="your answer..."id= "inputfield">
        <div id="submit"onclick="submit()">Submit</div><div id="error"></div>`
        enterPressed = true;
        document.getElementById('inputfield').addEventListener('keyup', function(event) {
            if (event.key == 'Enter') {
                submit();
            }
        });
    }
    
    document.getElementById('infoBox').innerHTML = `
        <img id="backPfeil"src="./img/backPfeil.png"onclick="getAway()">
        <p>Press esc to get back!</p>
    `
    document.getElementById('blurbox').style = 'display: block;'
    document.getElementById('press').innerHTML = ''
    document.getElementById('press').style = 'display: none;'
}
function getAway() {
    moveAllowed = false;
    document.getElementById('pictureBox').innerHTML = ``
    document.getElementById('blurbox').style = 'display: none;'
    document.getElementById('canvas').style = 'display: none;'
    document.getElementById('infoBox').innerHTML = '';
    document.getElementById('inputText').innerHTML = '';
    document.getElementById('lock').innerHTML = '';
    document.getElementById('gamenew').style = 'z-index: 100000000000;'
    document.getElementById('pokal').style = 'z-index: 100000000000;'
    enterPressed = false;
}
// -----------------------------------------------------------------------------
function openInfo() {
    console.log('enter info')
    document.getElementById('circleInfo').classList.add('bigger');
    document.getElementById('cursor').style = 'display: block;';
    document.getElementById('cursor').classList.add('cursorIn');
   
    setTimeout(function() { 
        document.getElementById('circleInfo').style = 'transform: scale(3);  left: 82.6vw; top: 8.8vw;'
        document.getElementById('circleInfo').classList.remove('bigger');
        document.getElementById('cursor').classList.remove('cursorIn');
        document.getElementById('cursor').classList.add('cursorOn');
    },1000)
    setTimeout(function() {
        document.getElementById('text').classList.add('textSlide')
        setTimeout(function() {
            document.getElementById('text').classList.remove('textSlide')
        },1000)
        document.getElementById('text').innerHTML = 'The game is about guessing the artist of the painting. You can move the player with the arrow keys. If you are in front of a painting, you can press enter to guess the artist. If you are wrong, you can try again. The possible names are noted down there (with a click you can fill them in). Have fun!'
    },500)
    document.getElementById('circleInfo').onclick = closeInfo;
}
function closeInfo(){
    document.getElementById('cursor').classList.add('cursorOut');
        setTimeout(function() {
        document.getElementById('cursor').style = 'display: none;';
        document.getElementById('cursor').classList.remove('cursorOut');
        document.getElementById('cursor').classList.remove('cursorOn');
    },1000)
    
    document.getElementById('text').classList.add('textSlideOut');
    setTimeout(() => {
        document.getElementById('text').style = 'margin-top: -0.3vw;'
        document.getElementById('text').innerHTML = ''
        document.getElementById('text').classList.remove('textSlideOut');

        document.getElementById('circleInfo').classList.add('smaller');
        setTimeout(function() {
        document.getElementById('circleInfo').style = 'transform: scale(1);  left: 91.2vw; top: 0;'
                document.getElementById('circleInfo').classList.remove('smaller');
        },700)
      
    }, 700);
            
       
    document.getElementById('circleInfo').onclick = openInfo;
}
function animatePlayer(count) {
    if(count == 0) {
        spriteImg.style.bottom = "137px";
    }
    else if(count == 1) {
        spriteImg.style.bottom = "137px";
    }
    else if(count == 2) {
        spriteImg.style.bottom = "204px";
    } 
    else if(count == 3) {
        spriteImg.style.bottom = "0px";
    } 
    
    if (spriteImgNumber < 3) { // switch to next sprite position
        spriteImgNumber++;
        let x = parseFloat(spriteImg.style.right);
        x += 45.0; // ANPASSEN! 
        spriteImg.style.right = x + "px";
    }
    else { // animation loop finished: back to start animation
        spriteImg.style.right = "0px";
        spriteImgNumber = 0;
    }

}




// Not my code

let W = window.innerWidth;
let H = window.innerHeight;
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const maxConfettis = 150;
const particles = [];

const possibleColors = [
  "DodgerBlue",
  "OliveDrab",
  "Gold",
  "Pink",
  "SlateBlue",
  "LightBlue",
  "Gold",
  "Violet",
  "PaleGreen",
  "SteelBlue",
  "SandyBrown",
  "Chocolate",
  "Crimson"
];

function randomFromTo(from, to) {
  return Math.floor(Math.random() * (to - from + 1) + from);
}

function confettiParticle() {
  this.x = Math.random() * W; // x
  this.y = Math.random() * H - H; // y
  this.r = randomFromTo(11, 33); // radius
  this.d = Math.random() * maxConfettis + 11;
  this.color =
    possibleColors[Math.floor(Math.random() * possibleColors.length)];
  this.tilt = Math.floor(Math.random() * 33) - 11;
  this.tiltAngleIncremental = Math.random() * 0.07 + 0.05;
  this.tiltAngle = 0;

  this.draw = function() {
    context.beginPath();
    context.lineWidth = this.r / 2;
    context.strokeStyle = this.color;
    context.moveTo(this.x + this.tilt + this.r / 3, this.y);
    context.lineTo(this.x + this.tilt, this.y + this.tilt + this.r / 5);
    return context.stroke();
  };
}

function Draw() {
  const results = [];

  // Magical recursive functional love
  requestAnimationFrame(Draw);

  context.clearRect(0, 0, W, window.innerHeight);

  for (var i = 0; i < maxConfettis; i++) {
    results.push(particles[i].draw());
  }

  let particle = {};
  let remainingFlakes = 0;
  for (var i = 0; i < maxConfettis; i++) {
    particle = particles[i];

    particle.tiltAngle += particle.tiltAngleIncremental;
    particle.y += (Math.cos(particle.d) + 3 + particle.r / 2) / 2;
    particle.tilt = Math.sin(particle.tiltAngle - i / 3) * 15;

    if (particle.y <= H) remainingFlakes++;

    // If a confetti has fluttered out of view,
    // bring it back to above the viewport and let if re-fall.
    if (particle.x > W + 30 || particle.x < -30 || particle.y > H) {
      particle.x = Math.random() * W;
      particle.y = -30;
      particle.tilt = Math.floor(Math.random() * 10) - 20;
    }
  }

  return results;
}

window.addEventListener(
  "resize",
  function() {
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  },
  false
);

// Push new confetti objects to `particles[]`
for (var i = 0; i < maxConfettis; i++) {
  particles.push(new confettiParticle());
}

// Initialize
canvas.width = W;
canvas.height = H;
Draw();
