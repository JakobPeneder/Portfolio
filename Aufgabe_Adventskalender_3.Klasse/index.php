<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Adventkalender</title>
    <script> 
        let timestamp = new Date().getTime();
        let link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'style.css?' + timestamp;
        document.head.appendChild(link);
        let script = document.createElement('script');
        script.src = 'fetch.js?' + timestamp;
        script.defer = true;
        document.head.appendChild(script);
    </script>
</head>


<body>
   
<div id="flexContainer">
    <img src="./img/arrows2.png"class="darts" style="margin-left: 11vw; transform: scale(-1);" onclick="previousRecipe()">
    <div id="quizInput"></div>
    <img src="./img/arrows2.png"class="darts" style="margin-right: 11vw;" onclick="nextRecipe()">
</div>

<div class="snowflakes"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>

<img src="./img/recipes.png" id="recipeSymbol" onclick="printRecipes()">
<div id="christmasDiv"></div>

<div class="parent">


<?php 
    $colorArray = [
        "#344e58",
        "#010d20",
        "#4b545f",
        "#415056",
        "#1b2a39"
    ];
      
        $numbers = range(1, 23);
        shuffle($numbers);

        for($i = 1; $i <= 24; $i++){
            if($i == 17) {
                echo "<div class='div$i' onclick='loadQuiz(24, 17)' style='background-color: $colorArray[3]' data-value='24'>24</div>";            
            }
            else {
                $e = $i - 1;
                if($i > 17) {
                    $e = $i - 2;
                }
                $color = $i %5;
                echo "<div class='div$i' onclick='loadQuiz($numbers[$e], $i)' style='background-color: $colorArray[$color]' data-value='$numbers[$e]'>$numbers[$e]</div>";
            } 
        }
   ?>

</div>
<div id="container"></div>

       
</body>
</html>
