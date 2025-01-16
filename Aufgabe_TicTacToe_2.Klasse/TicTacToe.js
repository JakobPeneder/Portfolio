let gameMatrix = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];      
let currentPlayer = 1;
let colorPlayer1 = '';
let count = 0;
let background = false;
let count1 = 0;
let count2 = 0;
let music = 0;
let counter = 0;
let draw = false;
let colorPlayer2 = '';
let body = document.getElementById('body1');
let symbol = '';
let items = document.getElementsByClassName('item');
var audio1 = new Audio('./Audios/backgroundmusic.mp3');


setTimeout(function() {
    document.getElementById('Tac').style = 'top: 3%;';
    document.getElementById('Tic').style = 'left: 16%;';
    document.getElementById('Toe').style = 'right: 16%;';
    setTimeout(function() {
            document.getElementById('pickOne').style = 'margin-top: 25vh;';
    },900);
    pickColor();
},1000)
function pickColor() {
    count1 = 0;
    count2 = 0;
    count = 0;
    document.getElementById('menu').innerHTML = '';
    document.getElementById('erg').innerHTML = '';
    document.getElementById('box').innerHTML = '';
    body.style = 'background-image: url(./Images/animation.jpg);';

    document.getElementById('pickOne').innerHTML = `
    <img src="./Images/Player1.png">
    <select id="input1">
        <option value="red">Red</option>
        <option value="orange">Orange</option>
        <option value="yellow">Yellow</option>
    </select>
    <select id="input2">
        <option value="blue">Blue</option>
        <option value="green">Green</option>
        <option value="purple">Purple</option>
    </select>   
    <img src="./Images/Player2.png">`;
    document.getElementById('start').innerHTML = '<div id="startGame"onclick ="mapCome()">▶</div>'
}    
function turnMusicOn() {
    if(music == 0) {
        audio1.volume = 0.1;
        audio1.play();
    }
    music++;
   
}
function mapCome() {
    audio1.volume = 0.05;
    draw = false;
    background = false;
    document.getElementById('menu').style.display = 'none';

    count++;
    gameMatrix = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ]; 
    
    if(count == 1) {
        colorPlayer1 = document.getElementById('input1').value;
        colorPlayer2 = document.getElementById('input2').value;
    }
   

    document.getElementById('start').innerHTML = '';
    document.getElementById('pickOne').innerHTML = '';


    setTimeout(function() {
        document.getElementById('container').style = 'margin-top: 3.5%;';
    },1000);

    setTimeout(function() {
        document.getElementById('score').style = 'transform: translate(0vw);';
        document.getElementById('score1').style = 'margin-left: 92.5%;'
    },1000);




    document.getElementById('box').innerHTML = `
    <div id="score"class="scoreOn">
    <p id="leftcount">${count1}</p>
    <img class="imgPlay" src="./Images/X${colorPlayer1}.png">
    </div>  
    <div id="score1"class="score1On">
    <p id="rightcount">${count2}</p>
    <img class="imgPlay"src="./Images/O${colorPlayer2}.png">
    </div>`;

  


    document.getElementById('erg').innerHTML = `

    <div id="container">
    <div class="item" onclick="setSetting(this, 0, 0)"></div>
    <div class="item"onclick="setSetting(this, 0, 1)"></div>
    <div class="item"onclick="setSetting(this, 0, 2)"></div>

    <div class="item"onclick="setSetting(this, 1, 0)"></div>
    <div class="item"onclick="setSetting(this, 1, 1)"></div>
    <div class="item"onclick="setSetting(this, 1, 2)"></div>

    <div class="item"onclick="setSetting(this, 2, 0)"></div>
    <div class="item"onclick="setSetting(this, 2, 1)"></div>
    <div class="item"onclick="setSetting(this, 2, 2)"></div>
    </div>`;
    
  

    body.style = `background-image: url("./Images/${colorPlayer1}.jpg");`;
    currentPlayer = 1;
    counter = 0;
    
}
function setSetting(box,row, column) {
    if(gameMatrix[row][column] == 0) {    
        var audio = new Audio('./Audios/click.mp3');
        audio.play();
            if(currentPlayer == 1)  {
            symbol = 'X';
            gameMatrix[row][column] = 1;
            box.innerHTML = `<img id="symbol"src="./Images/${symbol}${colorPlayer1}.png">`;
            }
            else {
            symbol = 'O';
            gameMatrix[row][column] = 2;
            box.innerHTML = `<img id="symbol"src="./Images/${symbol}${colorPlayer2}.png">`;
            }


        
        box.classList.add('clickOn');
        setTimeout(function() {
            box.style = 'box-shadow: 10px 10px 30px white;';
        },700);
        setTimeout(function() {
            box.classList.remove('clickOn');
            box.classList.add('clickOff');
        },1000);
        setTimeout(function() {
            box.style = 'box-shadow: none;';
        },1700);

        counter++;
        checkWinner();

        console.log('enter out');

        if(background == false) {
          if(currentPlayer == 1) currentPlayer = 2;
            else currentPlayer = 1;
        
        if(currentPlayer == 1) {
            body.style = `background-image: url("./Images/${colorPlayer1}.jpg");`;
        }
        else body.style = `background-image: url("./Images/${colorPlayer2}.jpg");`;  
        } 
        
        count++;

    } else {
        setTimeout(function() {
            if(currentPlayer == 1)document.getElementById('info').style = `background-color: ${colorPlayer1}; transform: translate(26vw);`;
            else document.getElementById('info').style = `background-color: ${colorPlayer2}; transform: translate(26vw);`;
            setTimeout(function() {
                if(currentPlayer == 1)document.getElementById('info').style = `background-color: ${colorPlayer1}; animation: outinfo 0.7s;`;
                else document.getElementById('info').style = `background-color: ${colorPlayer2}; animation: outinfo 0.7s;`;
            },1400);
        },700);

        if(currentPlayer == 1)document.getElementById('info').style = `background-color: ${colorPlayer1}; animation: infoanm 0.7s;`;
        else document.getElementById('info').style = `background-color: ${colorPlayer2}; animation: infoanm 0.7s;`;
    }
   
}
function checkWinner() {
    document.getElementById('menu').innerHTML = '';
    if(gameMatrix[0][0] == currentPlayer  && gameMatrix[0][1] == currentPlayer  && gameMatrix[0][2] == currentPlayer  || gameMatrix[0][0] == currentPlayer  && gameMatrix[1][0] == currentPlayer  && gameMatrix[2][0] == currentPlayer 
        || gameMatrix[1][0] == currentPlayer && gameMatrix[1][1] == currentPlayer && gameMatrix[1][2] == currentPlayer || gameMatrix[1][0] == currentPlayer  && gameMatrix[1][1] == currentPlayer  && gameMatrix[1][2] == currentPlayer 
        || gameMatrix[2][0] == currentPlayer && gameMatrix[2][1] == currentPlayer && gameMatrix[2][2] == currentPlayer  
        || gameMatrix [0][2] == currentPlayer && gameMatrix[1][1] == currentPlayer && gameMatrix[2][0] == currentPlayer || gameMatrix[0][0] == currentPlayer && gameMatrix[1][1] == currentPlayer && gameMatrix[2][2] == currentPlayer 
        || gameMatrix[0][2] == currentPlayer && gameMatrix[1][2] == currentPlayer && gameMatrix[2][2] == currentPlayer || gameMatrix[0][1] == currentPlayer && gameMatrix[1][1] == currentPlayer && gameMatrix[2][1] == currentPlayer )
        {         
        background = true;
        audio1.pause();
        var audio = new Audio('./Audios/winRound.mp3');
        audio.play();
        body.style = 'background-image: url(./Images/animation.jpg);';

        reset();
        
        setTimeout(function() {
            document.getElementById('score').style = 'transform: translate(-20vw);';
            document.getElementById('score1').style = 'margin-left: 110vw;';    
        },1000);

        winner()

        setTimeout(function() {
                audio1.volume = 0.1;
                audio1.play();      
                    menuIn();
        },5000)
 
        }
         else if(counter == 9) {
            draw = true;
            background = true;
    
            body.style = 'background-image: url(./Images/animation.jpg);';

            reset();

            setTimeout(function() {
                document.getElementById('score').style = 'transform: translate(-20vw);';
                document.getElementById('score1').style = 'margin-left: 110vw;';    
                audio1.volume = 0.1;
                audio1.play();
                menuIn();
            },1000);
    }
    
}
function reset() {
    document.getElementById('score').classList.remove('scoreOn');
    document.getElementById('score1').classList.remove('score1On');
    document.getElementById('score').classList.add('scoreOff');
    document.getElementById('score1').classList.add('score1Off');
    document.getElementById('erg').innerHTML = '';
}
function winner() {
        document.getElementById('winner').classList.add('slideIn');
        document.getElementById('winner').innerHTML = `<img id="medaille"src="./Images/medaille.png">
                                                    <img id="winnerPlayer"src="./Images/Player${currentPlayer}.png">`
        slideWinner();
    
}
function menuIn() {
    document.getElementById('menu').classList.add('menuOn');
    setTimeout(function() {
        document.getElementById('menu').style = 'top: 30vh; display: block;';
    },400);
    document.getElementById('menu').innerHTML = `
     <div id="playmore"onclick="mapCome()"><img src="./Images/playAgain.png"></div>
     <div id="endGame"onclick="EndGame()"><img src="./Images/endGame.png"></div>
     <div id="colorPick"onclick="pickColor()"><img src="./Images/Home.png"></div>`;
     if(draw == false) {
        if(currentPlayer == 1) count1++;
        else if(currentPlayer == 2) count2++;
     }
}
function EndGame() {
    document.getElementById('menu').classList.remove('menuOn');
    document.getElementById('menu').classList.add('menuOff');
    setTimeout(function() {
        document.getElementById('menu').style = 'top: 100vh;';

        if(count1 > count2) {
            document.getElementById('winner').classList.add('slideIn');
            document.getElementById('winner').innerHTML = `<img id="medaille"src="./Images/pokal.png">
                                                        <img id="winnerPlayer"src="./Images/Player1.png">`;
                                                        
            slideFinalWinner();
            audio1.pause();
            var audio = new Audio('./Audios/winMatch.mp3');
            audio.play();
        }else if(count2 > count1) {
            document.getElementById('winner').classList.add('slideIn');
            document.getElementById('winner').innerHTML = `<img id="medaille"src="./Images/pokal.png">
                                                        <img id="winnerPlayer"src="./Images/Player2.png">`
            slideFinalWinner();
            audio1.pause();
            var audio = new Audio('./Audios/winMatch.mp3');
            audio.play();
        }else {
            document.getElementById('winner').classList.add('slideIn'); 
            document.getElementById('winner').innerHTML = `<img id="medaille" src="./Images/Draw.png">
                                                        <img id="winnerPlayer" src="./Images/DrawText.png">`;

            slideFinalWinner();
            
        }
    },400)
    
        
}
function slideWinner() {
    setTimeout(function() {
        document.getElementById('winner').style = 'margin-top: 10vh;';
    },1000);
 
    setTimeout(function() {
        document.getElementById('winner').classList.remove('slideIn');
        document.getElementById('winner').classList.add('slideDown');
        setTimeout(function() {
            document.getElementById('winner').style = 'margin-top: 100vh;';
            document.getElementById('winner').classList.remove('slideDown');
        },1000);
    },3000);
}
function slideFinalWinner() {
    setTimeout(function() {
        document.getElementById('winner').style = 'margin-top: 10vh;';
    },1000);

    
    setTimeout(function() {
        document.getElementById('winner').classList.remove('slideIn');
        document.getElementById('winner').classList.add('slideDown');
        setTimeout(function() {
            document.getElementById('winner').style = 'margin-top: 100vh;';
            document.getElementById('winner').classList.remove('slideDown');
            setTimeout(function() {
                window.location.reload(); 
            },1000)
        },1000);
    },6000);
 
}
