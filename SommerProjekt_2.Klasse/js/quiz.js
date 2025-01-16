/// <reference path=".././data/quizData.js" />

let count = 0;
if (!sessionStorage.getItem('tries')) {
  sessionStorage.setItem('tries', 0);
}


document.addEventListener('keyup', function(event) {
  if(event.key == 'ArrowRight') next();
  if(event.key == 'ArrowLeft') previous();
})

function generateQuiz() {
    document.getElementById('tries').innerHTML = sessionStorage.getItem('tries');
    let str = '';
    console.log(JSON.parse(sessionStorage.getItem('solved'))[count])
    if(JSON.parse(sessionStorage.getItem('solved'))[count] == 'true') count = questionsSolved1(count);

    if(allSolved()) {
      str += `<h1 style="font-size: 2.5rem; "id="congrats">Congratulations!</h1>`
      document.getElementById('quiz').innerHTML = str;
      document.getElementById('quiz').innerHTML += '<div onclick="newQuiz()"id="newGameButton">New Quiz</div>'
      document.getElementById('quiz').innerHTML += '<div onclick="addNewQuestions()"id="newGameButton">Add Question</div>'
      document.getElementById('quiz').innerHTML += '<img src="./img/pokal.png"id="pokal">'
      document.getElementById('tries').innerHTML = ''
      document.getElementById('canvas').style = "display: block;"
    }else {
      str += `
      <div class="quiz-container"><h1 style="margin-top: 2vw;">${questions[count].question}</h1>
        <div class="answers">
        <img src="./img/arrows.png"style="transform: scale(-1);"onclick="previous()">
          <div class="possiblities">
            <div class="question slide-in-left"style="background-color: #935c10;"onclick="checkAnswer(${1})">${questions[count].answers[0]}</div>
            <div class="question slide-in-right "style="background-color: rgba(56,36,25,255);"onclick="checkAnswer(${2})">${questions[count].answers[1]}</div>
            <div class="question slide-in-bottom"style="background-color: #CEA067;"onclick="checkAnswer(${3})">${questions[count].answers[2]}</div>
            <div class="question slide-in-bottom "style="background-color: #69420B;"onclick="checkAnswer(${4})">${questions[count].answers[3]}</div>
          </div>
          <img src="./img/arrows.png"onclick="next()"style="margin-left: 4vw;">

        </div>
      </div>
      `;
      document.getElementById('tries').innerHTML = sessionStorage.getItem('tries');

      
    document.getElementById('quiz').innerHTML = str;
    }
        
}
function addNewQuestions() {
  document.getElementById('canvas').style = "display: none;"

  let newQuestion;
  document.getElementById('add').innerHTML = `
  <div onclick="markCorrect()"class="addButtons"style="margin-top: 0.5vw;">Mark Correct One</div>'
  <div onclick="Add()"class="addButtons">Add</div>'
  `
  newQuestion  = `
  <div class="quiz-container"><h1><input id="headquestion"type="text" placeholder="Question"style="font-size: 2rem; color: black;width: 50vw;"></h1>
  <div class="answers">
  <img src="./img/arrows.png"style="transform: scale(-1);">
    <div class="possiblities">
      <div class="question slide-in-left"style="background-color: #935c10;"><input type="text" placeholder="Answer1"></div>
      <div class="question slide-in-right "style="background-color: rgba(56,36,25,255);"><input type="text" placeholder="Answer2"></div>
      <div class="question slide-in-bottom"style="background-color: #CEA067;"><input type="text" placeholder="Answer3"></div>
      <div class="question slide-in-bottom "style="background-color: #69420B;"><input type="text" placeholder="Answer4"></div>
    </div>
    <img src="./img/arrows.png"style="margin-left: 4vw;">

  </div>
</div>
  `
  document.getElementById('quiz').innerHTML = newQuestion;

}
function loadQuestions() {
  let questions1 = JSON.parse( localStorage['questions'] ?? '[]' ) ;
  for(let i = 0; i < questions1.length; i++) {
    questions.push(questions1[i])
  }
  console.log(questions)
  let solved = JSON.parse(sessionStorage.getItem('solved'));

  if (!solved) {
    let solved = [10];
    for(let i = 0; i < questions.length; i++) {
      console.log(i)
      solved[i] = 'false'
    }
    sessionStorage.setItem('solved', JSON.stringify(solved));
  };
  
  generateQuiz()
}
function Add() {
  let correct1 = '';
  for (let i = 0; i < 4; i++) {
    if(document.getElementsByClassName('question')[i].style.backgroundColor == 'green') {
        correct1 = document.getElementsByClassName('question')[i];
    }
  }
  if(correct1 == '') {
    document.getElementsByClassName('addButtons')[1].classList.add('shake')

    if(document.getElementsByClassName('question')[0].children[0].value == '' || document.getElementsByClassName('question')[1].children[0].value == '' || document.getElementsByClassName('question')[2].children[0].value == '' || document.getElementsByClassName('question')[3].children[0].value == '' || document.getElementById('headquestion').value == ''){  
      document.getElementById('error').innerHTML = 'Please fill out all fields!'
    }else {
      document.getElementById('error').innerHTML = 'Please mark one as correct!'
    }
    setTimeout(function() {
      document.getElementsByClassName('addButtons')[1].classList.remove('shake')
    }, 1000);

    document.getElementById('error').style = 'display: block;'
    document.getElementById('error').classList.add('fade-in')
    setTimeout(function() { 
      document.getElementById('error').classList.remove('fade-in')
      document.getElementById('error').classList.add('fade-out')
      setTimeout(function() {
        document.getElementById('error').style = 'display: none;'
        document.getElementById('error').classList.remove('fade-out')
      }, 1000);
    }, 3000);
  }else {
    document.getElementById('error').style = 'display: none;'
     let newQuestion = {
    'question': document.getElementById('headquestion').value,
    'answers': [
      document.getElementsByClassName('question')[0].children[0].value,
      document.getElementsByClassName('question')[1].children[0].value,
      document.getElementsByClassName('question')[2].children[0].value,
      document.getElementsByClassName('question')[3].children[0].value
    ],
    'correct': correct1.children[0].value
  }

  // Initialisiere Array mit Session Storage oder Default []
  let questions1 = JSON.parse( localStorage['questions'] ?? '[]' ) ;

  // Neuen Eintrag hinzufügen
  questions1.push(newQuestion);

  // Update localStorage
  localStorage['questions'] = JSON.stringify(questions1);

  console.log(questions1)

  location.reload()
  }
 
}
function markAsCorrect(number) {
  console.log('clicked')
  document.getElementsByClassName('question')[number].style = 'background-color: green;'
  resetColors(number)
}
function markCorrect() {
  if(document.getElementsByClassName('question')[0].children[0].value == '' || document.getElementsByClassName('question')[1].children[0].value == '' || document.getElementsByClassName('question')[2].children[0].value == '' || document.getElementsByClassName('question')[3].children[0].value == '' || document.getElementById('headquestion').value == ''){  
    document.getElementsByClassName('addButtons')[0].classList.add('shake')

    setTimeout(function() {
      document.getElementsByClassName('addButtons')[0].classList.remove('shake')
    }, 1000);

    document.getElementById('error').style = 'display: block;'
    document.getElementById('error').innerHTML = 'Please fill out all fields!'
    document.getElementById('error').classList.add('fade-in')
    setTimeout(function() { 
      document.getElementById('error').classList.remove('fade-in')
      document.getElementById('error').classList.add('fade-out')
      setTimeout(function() {
        document.getElementById('error').style = 'display: none;'
        document.getElementById('error').classList.remove('fade-out')
      }, 1000);
    }, 3000);
  }else {
    document.getElementById('error').style = 'display: none;'
    document.getElementsByClassName('addButtons')[0].style = 'transform: translateX(10px); margin-top: 0.5vw;'
    document.getElementsByClassName('question')[0].onclick = function() { markAsCorrect(0) };
    document.getElementsByClassName('question')[1].onclick = function() { markAsCorrect(1) };
    document.getElementsByClassName('question')[2].onclick = function() { markAsCorrect(2) };
    document.getElementsByClassName('question')[3].onclick = function() { markAsCorrect(3) };
  }
  
}
function resetColors(number) {
  for(let i = 0; i < 4; i++) {
    if(i != number) {
        if(i == 0) {
          document.getElementsByClassName('question')[i].style = 'background-color: #935c10;'
        }else if(i == 1) {
          document.getElementsByClassName('question')[i].style = 'background-color: rgba(56,36,25,255);'
        }else if(i == 2) {
          document.getElementsByClassName('question')[i].style = 'background-color: #CEA067;'
        }else if(i == 3) {
        document.getElementsByClassName('question')[i].style = 'background-color: #69420B;'
      }
    }
}
}
function allSolved() {
  let array = JSON.parse(sessionStorage.getItem('solved'));
  for(let i = 0; i < array.length; i++) {
    if(array[i] == 'false') return false;
  }
  return true;

}
function checkAnswer(number) {
  sessionStorage.setItem('tries', parseInt(sessionStorage.getItem('tries'))+1);
  document.getElementById('tries').innerHTML = sessionStorage.getItem('tries');

  console.log('clicked')
  
  if(questions[count].answers[number-1] == questions[count].correct) {
    document.getElementsByClassName('question')[number-1].style = 'background-color: green;'
    setTimeout(next, 500);
    let array = JSON.parse(sessionStorage.getItem('solved'));
    array[count] = 'true'; 
    sessionStorage.setItem('solved', JSON.stringify(array));    
    console.log(JSON.parse(sessionStorage.getItem('solved')))
  }else {
    document.getElementsByClassName('question')[number-1].style = 'background-color: red;'
    setTimeout(next, 500);
  }
}
function next() {
  count++;
  if(count == questions.length) count = 0;
  count = questionsSolved1(count)
  generateQuiz();
}
function previous() {
  count--;
  if(count == -1) count = questions.length-1;
  count = questionsSolved2(count)
   generateQuiz();
}
function questionsSolved1(count) {
  let counter = 0;
  let array = JSON.parse(sessionStorage.getItem('solved'));
  while(array[count] == 'true') {
    counter++;
    count++;
    if(count == questions.length) count = 0;
    if(array[count] == 'false') return count;
    if(counter == questions.length) return 100;
  }
  return count;
}
function questionsSolved2(count) {
  let counter = 0;
  let array = JSON.parse(sessionStorage.getItem('solved'));
  while(array[count] == 'true') {
    counter++;
    count--;
    if(count == -1) count = questions.length-1;
    if(array[count] == 'false') return count;
    if(counter == questions.length) return 100;
  }
  return count;
}
function newQuiz() {
  document.getElementById('canvas').style = "display: none;"
  count = 0;
  let solved = JSON.parse(sessionStorage.getItem('solved'));

  for(let i = 0; i < questions.length; i++) {
    solved[i] = 'false'
  }
  sessionStorage.setItem('solved', JSON.stringify(solved));
  sessionStorage.setItem('tries', 0);
  generateQuiz()
}







// Not my code

let W = window.innerWidth;
let H = window.innerHeight;
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const maxConfettis = 150;
const particles = [];

const possibleColors = [
  "#69420B",
  "rgba(56,36,25,255)",
  "#CEA067",
  "#935c10",
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
