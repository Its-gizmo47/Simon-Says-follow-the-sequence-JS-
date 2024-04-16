let gameSeq = [];
let userSeq = [];

let started = false;
let level = 0;
let highScore = -1;

let options = ["red", "green", "blue", "orange"];

let msg = document.querySelector(".msg");

document.addEventListener("keydown", function(){
    if(started == false){
        started = true;
        levelUp();
    }
});

function levelUp(){
    userSeq = [];
    level++;
    msg.innerText = `Level ${level}`;

    let idx = Math.floor(Math.random()*3);
    let randomColor = options[idx];
    let randomBox = document.querySelector(`.${randomColor}`);
    gameSeq.push(randomColor);
    boxFlash(randomBox);
    
}

function boxFlash (box){
    box.classList.add("flash");

    setTimeout(() => {
        box.classList.remove("flash");
    }, 200);
}

function boxClicked(){
    let box = this;
    boxFlash(box);

    let userBox = box.getAttribute("id");
    userSeq.push(userBox);

    chkLevel(userSeq.length-1);
}

let boxes = document.querySelectorAll(".box");
for(let box of boxes){
    box.addEventListener("click", boxClicked);
}

function chkLevel(idx){
    if(gameSeq[idx] === userSeq[idx]){
        if(userSeq.length === gameSeq.length){
            setTimeout(() => {
                levelUp();
            }, 1000);
        }
    } else{
        highScorefn(level);
        msg.innerText = `Game Over.\n Your Score = ${level} \n Press any key to start the game.`;
        msg.style.textAlign = "center";
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(() => {
            document.querySelector("body").style.backgroundColor = "white";
        }, 500);
        reset();
    }
}

function reset(){
    userSeq = [];
    gameSeq = [];
    started = false;
    level = 0;
    highScore = -1;
}

function highScorefn(level){
    if(highScore<level){
        highScore = level;
    }
    msg.innerText = document.querySelector(".msg");
    msg.innerText = `High Score = ${highScore}`;
}