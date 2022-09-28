let button = document.querySelector("button");
let gameInfo = document.querySelector(".game-info");
let gameLevel = document.querySelector(".game-info .game-level");
let gameTime = document.querySelector(".game-info .game-time");
let currentWord = document.querySelector(".current-word");
let input = document.querySelector("input");
let remainder = document.querySelector(".remainder");
let scoreContainer = document.querySelector(".score-container");
let timeLeft = document.querySelector(".time-left span");
let scoreCounter = document.querySelector(".score .score-counter");
let totalScore = document.querySelector(".score .total-number");
let resultState = document.querySelector(".result");
let instructions = document.querySelector(".instructions");
let selectMenu = document.querySelector(".select-menu");
let selectBtn = document.querySelector(".select-btn");
let optionsDiv = document.querySelector(".options");
let options = document.querySelectorAll(".options li");
let icon = document.querySelector("i");

console.log(options);
//list of words
let words = [
    "dell",
    "programming",
    "code",
    "lenovo",
    "responsibility",
    "object",
    "python",
    "javascript",
    "gnome",
    "linux",
    "ubuntu",
    "debian",
    "gnu",
    "gnome",
    "fedora",
    "redhat",
    "windows",
    "mac",
    "ruby",
    "office",
    "antifungal",
    "trimethoxazone",
    'antifungals',
    'bifunctional',
    'cofunction',
    'cofunctions',
]

//function to add active class to the select button
selectBtn.onclick = function (){
    if(optionsDiv.classList.contains("active")){
        optionsDiv.classList.remove("active");
        icon.className = "fa-solid fa-caret-down";
    }else{
        optionsDiv.classList.add("active");
        icon.className = "fa-solid fa-caret-up";
    }
}

//prevent paste event on input
input.onpaste = function(){
    return false;
}


//setting levels
let level = {
    "normal" : 3,
    "easy" : 5,
    "hard" : 2
};

options.forEach((option) => {
    option.onclick = function (e){
        //show th button
        button.style.display = "block";
        //display the select list as none
        selectMenu.style.display = "none";
        //setting default
        let defaultLevel = e.target.innerHTML;
        let defaultLevelTime = level[defaultLevel];
        //display game info after picking up the option
        gameInfo.style.display = "block";
        //after reloading the page
        gameLevel.innerHTML = `[${defaultLevel}]`;  //default level of the game
        gameTime.innerHTML = `[${defaultLevelTime}]`; // default time of the level
        timeLeft.innerHTML = defaultLevelTime;

        //function to start the app after clicking the button
        button.onclick = function () {
            this.style.display = "none";
            instructions.style.display = "none";
            input.style.display = "block";
            scoreContainer.style.display = "flex";
            input.focus();

            //function to check the level
            checkLevel(defaultLevel , defaultLevelTime);
        }   
    }
} )

//arrays that contain each set of words based on the level
let easyArray = [];
let normalArray = [];
let hardArray = [];

//function to check the level that the user selected
function checkLevel(level , time){
        //list words inside the remainder div
        for(let i=0; i<words.length; i++){
            if(level == "easy"){
                //set total score based on the easy array
                totalScore.innerHTML = easyArray.length;
                if(words[i].length < 5){
                    easyArray.push(words[i]);
                }else{
                    continue;
                }
            }else if(level == "normal"){
                //set total score based on the normal array
                totalScore.innerHTML = normalArray.length;
                if(words[i].length > 5 && words[i].length < 8){
                    normalArray.push(words[i]);
                }else{
                    continue;
                }
            }else{
                //set total score based on the hard array
                totalScore.innerHTML = hardArray.length;
                if(words[i].length > 8){
                    hardArray.push(words[i]);
                }else{
                    continue;
                }
            }
            
        }
        //after checking for the level and pushing to the corresponding array
        //show the remainder div
        remainder.style.display = "block";
        //run the randomword generator function
        randomWord(level , time);
}


//function to generate new word based on the level
function randomWord(level ,time){
        //empty the current and remainder each time the function is called
        currentWord.innerHTML = "";
        remainder.innerHTML = "";
        
        //check for the level and generate random and loop through the array

        //if the level is easy
        if(level == "easy"){
            let randomWord = easyArray[Math.floor(Math.random() * easyArray.length)];
            currentWord.innerHTML = randomWord;
            let randomIndex = easyArray.indexOf(randomWord);
            easyArray.splice(randomIndex,1);
            for(let i=0; i<easyArray.length;i++){
                    let spanElement = document.createElement("span");
                    remainder.appendChild(spanElement);
                    spanElement.appendChild(document.createTextNode(easyArray[i]));
            }

        //if the level is normal
        }else if(level == "normal"){
            let randomWord = normalArray[Math.floor(Math.random() * normalArray.length)];
            currentWord.innerHTML = randomWord;
            let randomIndex = normalArray.indexOf(randomWord);
            normalArray.splice(randomIndex,1);
            for(let i=0; i<normalArray.length;i++){
                let spanElement = document.createElement("span");
                remainder.appendChild(spanElement);
                spanElement.appendChild(document.createTextNode(normalArray[i]));
            }
        
        //if the level is hard
        }else{
            let randomWord = hardArray[Math.floor(Math.random() * hardArray.length)];
            currentWord.innerHTML = randomWord;
            let randomIndex = hardArray.indexOf(randomWord);
            hardArray.splice(randomIndex,1);
            for(let i=0; i<hardArray.length;i++){
                let spanElement = document.createElement("span");
                remainder.appendChild(spanElement);
                spanElement.appendChild(document.createTextNode(hardArray[i]));
            }
        }

        //call the play function
        play(level , time);
}


//function to count down and set the state (passed or failed)
function play(level , time){
    timeLeft.innerHTML = time;
    let counter = setInterval(() => {
        timeLeft.innerHTML--;
        if(timeLeft.innerHTML == 0){
            clearInterval(counter);

            if(input.value.toLowerCase() == currentWord.innerHTML.toLowerCase()){
                input.value = "";
                scoreCounter.innerHTML++;
                if(easyArray.length > 0 || normalArray.length > 0 || hardArray.length > 0){
                    randomWord(level,time);
                }else{
                    remainder.style.display = "none";
                    currentWord.innerHTML = "";
                    resultState.classList.add("congratz");
                    resultState.innerHTML = "congratz";
                    setInterval(() => {resultState.innerHTML += "."} ,1000);
                    setTimeout(() => {location.reload()} ,4000);
                } 
            }else{
                input.value = "";
                remainder.style.display = "none";
                currentWord.innerHTML = "";
                resultState.classList.add("failed");
                resultState.innerHTML = "game over";
                setInterval(() => {resultState.innerHTML += "."} ,1000);
                setTimeout(() => {location.reload()} ,4000);
            }
        }
    },1000)
}
