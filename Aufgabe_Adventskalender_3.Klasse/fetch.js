let count = 0;
let audio;
let countMusic = 0;
document.addEventListener('keyup', function(e) {
    if(e.key === 'Escape') {
        boxDisapper();
    }
})
checkIfSolved()
boxDisapper()

function checkIfSolved() {
    let colorArray = [
        "#344e58",
        "#010d20",
        "#4b545f",
        "#415056",
        "#1b2a39"
    ];

    for(let i = 1; i <= 24; i++) {
        let number = document.getElementsByClassName(`div${i}`)[0].getAttribute('data-value');

        if(number == JSON.parse(localStorage.getItem('countOfDays')) + 1) {
            document.getElementsByClassName(`div${i}`)[0].style = `
            background: ${colorArray[i % colorArray.length]};
            box-shadow: 0 0 10px 5px rgba(255, 165, 0, 0.8);
            `
        }
        if(checkAlreadyIn(number)) {
            document.getElementsByClassName(`div${i}`)[0].style = `
            background: transparent;
            `
            document.getElementsByClassName(`div${i}`)[0].style.pointerEvents = 'auto';
            document.getElementsByClassName(`div${i}`)[0].style.cursor = 'pointer';
        }
    }
}
function startMusic(id) {
    let musicArray = [
        './audio/leiserieseltderschnee.mp3',
        './audio/silentnight.mp3',
        './audio/wewishyouamerrychristmas.mp3',
        './audio/jinglebells.mp3',
    ]

    audio = new Audio(musicArray[id%4]);
    audio.play();
}
function loadQuiz (id, boxNr) {
    let countOfDays = JSON.parse(localStorage.getItem('countOfDays')) || 0;
    document.getElementById('flexContainer').style = 'z-index: 20;'

    document.getElementById('quizInput').innerHTML = ''
    fetch(`./api/api.php?id=${id}`) 
    .then(res => res.json())
    .then(data => {
        console.log(data);

        if(data.code == 200) {

            if(countOfDays +1 != id && countOfDays < id) {
                document.getElementsByClassName(`div${boxNr}`)[0].classList.add('shake')
                setTimeout(() => {
                    document.getElementsByClassName(`div${boxNr}`)[0].classList.remove('shake')
                }, 1000)
                return;
            }
            document.getElementsByClassName('parent')[0].style = 'pointer-events: none; opacity: 0.6;'
            startMusic(id)
            countMusic++;
            if(checkAlreadyIn(data.recipes[0].id)) {
               printAlreadyIn(data);
            }
            else {
                 document.getElementById('quizInput').innerHTML = `
            
            <div id="flagContainer">
                <img src="./img/X.png"class="x" style="cursor: normal;visibility: hidden;" onclick="boxDisapper()">
                <img id="flag"src="./img/${data.recipes[0].country}.png" >
                <img src="./img/X.png"class="x" onclick="boxDisapper()">
            </div>
    
    
            <input type="text" id="answer" placeholder="Guess the country" autocomplete="off">
            <p id="error"></p>
            
            `
            document.getElementById('quizInput').style = 'height: 62vh;'
    
            document.getElementById('answer').addEventListener('keyup', function(e) {
                if(e.key === 'Enter') {
                    checkAnswer(id, data);
                }
            })

            document.getElementsByClassName('snowflakes')[0].style = 'display: block;'
            document.getElementById('quizInput').style = 'display: block';
        } 
        
        } else {
            document.getElementsByClassName(`div${boxNr}`)[0].classList.add('shake')
                setTimeout(() => {
                    document.getElementsByClassName(`div${boxNr}`)[0].classList.remove('shake')
                }, 1000)
        }
       


    })  
    .catch((error)=>{
        console.log(error);
    })
}

function checkAlreadyIn(id) {
    let correctAnswers = JSON.parse(localStorage.getItem('correctAnswers')) || [];
    let alreadyIn = false;
    correctAnswers.forEach(element => {
        if(element.recipes[0].id == id) {
            alreadyIn = true;
        }
    });
    return alreadyIn;
}
function boxDisapper() {
    document.getElementsByClassName('parent')[0].style = 'pointer-events: normal; opacity: 1;'
    document.getElementById('quizInput').style = 'display: none';
    document.getElementsByClassName('darts')[0].style = 'display: none;'
    document.getElementsByClassName('darts')[1].style = 'display: none;'
    document.getElementsByClassName('snowflakes')[0].style = 'display: none;'
    document.getElementById('flexContainer').style = 'z-index: 2;'
    document.getElementById('christmasDiv').style = 'opacity: 1; pointer-events: normal;'

    if(JSON.parse(localStorage.getItem('countOfDays')) == 24) {
        

        merryChristmas()
    }
    if(countMusic > 0 )    audio.pause();


}
function merryChristmas() {
    if (!localStorage.getItem('fadedOut')) {
        for (let i = 1; i <= 24; i++) {
            document.getElementsByClassName(`div${i}`)[0].classList.add('fadeOut');
        }
        setTimeout(function() {
            for(let i = 1; i <= 24; i++) {
                document.getElementsByClassName(`div${i}`)[0].style = 'opacity: 0; pointer-events: none;'
            }
            localStorage.setItem('fadedOut', 'true');
        }, 1000)
    } else {
        for(let i = 1; i <= 24; i++) {
            document.getElementsByClassName(`div${i}`)[0].style = 'opacity: 0; pointer-events: none;'
        }
    }
   

    document.getElementById('christmasDiv').innerHTML = `Merry Christmas`
}
function checkAnswer(id, data) {
    let answer = document.getElementById('answer').value;
    let correctAnswer = data.recipes[0].country;

    if(answer.toLowerCase() == correctAnswer.toLowerCase()){

        let correctAnswers = JSON.parse(localStorage.getItem('correctAnswers')) || [];
        correctAnswers.push(data);
        localStorage.setItem('correctAnswers', JSON.stringify(correctAnswers));
        
        let countOfDays = JSON.parse(localStorage.getItem('countOfDays')) || 0;
        countOfDays++;
        localStorage.setItem('countOfDays', JSON.stringify(countOfDays));

        console.log(JSON.parse(localStorage.getItem('correctAnswers')))
        checkIfSolved()
        printAlreadyIn(data);



    }else {
        document.getElementById('error').style = 'display: block;'
        document.getElementById('error').innerHTML = 'Wrong answer, try again!'
        setTimeout(() => {

            document.getElementById('error').innerHTML = ''
            document.getElementById('error').style = 'display: none;'
        }, 3000)
    }
}
function printAlreadyIn(data) {

    let html = ''
    html += `
    <div id="flex">
        <img src="./img/X.png"class="x1" style="cursor: normal;visibility: hidden;" onclick="boxDisapper()">
        <h2 id="headlineRecipe">${data.recipes[0].recipe}</h2>
        <img src="./img/X.png"class="x1" onclick="boxDisapper()" style="margin-left: -1.5vw;">
    </div>

    <img src="./img/${data.recipes[0].country}.png" id="recipeImg">
    <div id="ingridients"><p>
    `
    for (let i = 0; i < data.recipes[0].ingredients.length; i++) {
        if(i == data.recipes[0].ingredients.length - 1) {
            html += `
            ${data.recipes[0].ingredients[i]}
            `
        }
        else {
            html += `
        ${data.recipes[0].ingredients[i]},
        `
        }
    }
    html += '</p></div></p><div id="instructions">'
    for(let i = 0; i < data.recipes[0].instructions.length; i++) {
        html += `
        <p>${data.recipes[0].instructions[i]}</p>
        `
    }
    html += '</div>'
    document.getElementById('quizInput').style = 'display: block; height: auto;'
    document.getElementById('quizInput').innerHTML = html;
}
function printRecipes() {
    let storage = JSON.parse(localStorage.getItem('correctAnswers'))
    let countOfDays = JSON.parse(localStorage.getItem('countOfDays')) || 0;

    

    document.getElementById('flexContainer').style = 'z-index: 20;'
    document.getElementById('quizInput').style = 'height: auto;'
    document.getElementsByClassName('snowflakes')[0].style = 'display: block;'
    document.getElementsByClassName('parent')[0].style = 'pointer-events: none; opacity: 0.4;'
  document.getElementsByClassName('darts')[0].style = 'display: block; margin-left: 11vw; transform: scale(-1);'
    document.getElementsByClassName('darts')[1].style = 'display: block; margin-right: 11vw; '
    document.getElementById('christmasDiv').style = 'opacity: 0.4; pointer-events: none;'

    if(countOfDays > 0) {
        printAlreadyIn(storage[count])
    }else {
        console.log('no recipes')
        quizInput.innerHTML = `
        <p id="noRecipes">No recipes available yet. Please solve some quizzes to unlock recipes!</p>
        `

        document.getElementsByClassName('darts')[0].style = 'display: none;'
    document.getElementsByClassName('darts')[1].style = 'display: none;'


    }
   


}
function previousRecipe() {
    count--;
    if(count < 0) {
        count = JSON.parse(localStorage.getItem('correctAnswers')).length - 1;
    }
    printRecipes()
}
function nextRecipe() {
    count++;
    if(count == JSON.parse(localStorage.getItem('correctAnswers')).length) {
        count = 0;
    }
    printRecipes()
}
