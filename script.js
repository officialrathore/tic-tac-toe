let boxes = document.querySelectorAll(".box");
let turnp = document.querySelector(".turn3");
let result = document.getElementById('result');
let reset = document.getElementById('reset');

let turn = "X";
let isGameOver = false;

boxes.forEach(e => {
    e.innerHTML = "";
     e.addEventListener("click", () => {
        if (!isGameOver && e.innerHTML === "") {
            e.innerHTML = turn;
            if (!checkWin()) {
                checkDraw();
            }
            checkTurn();
        }
    });
});

function checkTurn() {
    if (turn === "X") {
        turn = "O";
        turnp.style.left = "75px";
    } else {
        turn = "X";
        turnp.style.left = "0px";
    }
}

function checkWin() {
    let winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    for (let i = 0; i < winConditions.length ; i++) {
        let v0 = boxes[winConditions[i][0]].innerHTML;
        let v1 = boxes[winConditions[i][1]].innerHTML;
        let v2 = boxes[winConditions[i][2]].innerHTML;

        if (v0 !== "" && v0 === v1 && v0 === v2) {
            isGameOver = true;
            result.innerHTML = turn +" "+ "Wins";
            reset.style.display = "inline";

            for (let j = 0; j < 3; j++) {
                    boxes[winConditions[i][j]].style.backgroundColor = "#08d9d6";
                    boxes[winConditions[i][j]].style.color = "black";
            }
            return true;
        }
    }
    return false;
}

function checkDraw() {
    let isDraw = true;
    boxes.forEach(e => {
        if (e.innerHTML === "") {
            isDraw = false;
        }
    });
    if (isDraw) {
        isGameOver = true;
        result.innerHTML = "Draw";
        reset.style.display = "inline";
    }
}

reset.addEventListener("click", () => {
    isGameOver = false;
    turn = "X";
    turnp.style.left = "0";
    result.innerHTML = "";
    reset.style.display = "none";

    boxes.forEach(e => {
        e.innerHTML = "";
        e.style.removeProperty("background-color");
        e.style.color = "white";
    });
});