// let inp = document.querySelector("#task");
// let btn = document.querySelector("#btn");
// let taskList = document.querySelector("#todoList");

// btn.addEventListener("click",(event) =>{
//     let taskText = inp.value.trim();

//     if (taskText === ""){
//         alert("Task cannot be empty!");
//         return;
//     }

//     let newTask = document.createElement("li");

//     let taskContent = document.createTextNode(taskText);

//     let delBtn = document.createElement("button");
//     delBtn.innerText = "❌";
//     delBtn.classList.add("delete");

//     delBtn.style.marginLeft = "10px";
//     delBtn.style.cursor = "pointer";

//     // delBtn.addEventListener("click", () =>{
//     //     newTask.remove();
//     // })
    
//     newTask.appendChild(taskContent);
//     newTask.appendChild(delBtn);
//     taskList.appendChild(newTask);

//     inp.value="";    
// })

// taskList.addEventListener("click",function(event){
//     if(event.target.nodeName === "BUTTON"){
//         let listItem = event.target.parentElement;
//         listItem.remove();
//     }
// })
// 

let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "green", "purple"];

let started  = false;
let level = 0;

let score = level;
let h2 = document.querySelector("h2");
let highScore = document.querySelector(".highScore");

highScore.innerText = `High Score: ${score}`;

document.addEventListener("keypress",function () {
    
    if(started === false){
        console.log("Game is started");
        started = true;
        levelUp();
    }
})

function btnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;
    
    if (score <= level) {
        score = level;
        highScore.innerText = `High Score: ${score}`;   
    } 


    let randIdx = Math.floor(Math.random() * 3);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);
    btnFlash(randBtn);
}

function checkAns(idx) {
    // console.log(`curr level : ${level}`);

    if (userSeq[idx] === gameSeq[idx]){
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else{
        h2.innerHTML = `Game Over!, Your Score was: <b>${level}</b> <br> Press any key to start.`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "white";
        }, 150)

        reset();
    }
}
function btnPress() {
    // console.log(this);
    let btn = this;
    btnFlash(btn);

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns){
    btn.addEventListener("click", btnPress);
}

function reset(){
    started = false;
    userSeq = [];
    gameSeq = [];
    level = 0;
}