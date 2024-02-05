let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset");
let newgame = document.querySelector("#new_game");
let msg_cont = document.querySelector(".msg_container");
let msg = document.querySelector("#msg");
let main_container = document.querySelector(".container");
let head = document.querySelector(".heading");
let count = 0;
//turn manage.
let turn_o = true;

//manage the wining conditions;in array of array.
let win_cond = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const resetGame = () => {
  turn_o = true;
  count = 0;
  enableBoxes();
  main_container.classList.remove("hide_new");
  head.classList.remove("hide_new");
  resetbtn.classList.remove("hide_new");
  msg_cont.classList.add("hide");
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    //based on turn will set the innertext.AND ONCE clciked then make that button disable.
    if (turn_o) {
      box.innerText = "o";
      turn_o = false;
    } else {
      box.innerText = "x";
      turn_o = true;
    }
    box.disabled = true;
    count++;
    let isWinner = checkWinner();
    if (count === 9 && !isWinner) {
      console.log("I am called");
      msg.innerText = "Game was a Draw!";
      msg_cont.classList.remove("hide");
      main_container.classList.add("hide_new");
      head.classList.add("hide_new");
      resetbtn.classList.add("hide_new");
      disableBoxes();
    }
  });
});

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const showWinner = (winner) => {
  msg.innerText = "Congratulations ! , Winner is " + winner;
  msg_cont.classList.remove("hide");
  main_container.classList.add("hide_new");
  head.classList.add("hide_new");
  resetbtn.classList.add("hide_new");
  disableBoxes();
};
const checkWinner = () => {
  for (let pattern of win_cond) {
    //check each pattern...
    let pos1val = boxes[pattern[0]].innerText;
    // console.log(pattern); //[0,1,2] and all other.
    // console.log(pattern[1]);//1 for the above one.
    // console.log(boxes[pattern[0]]);//boxes's 1's place value will be this.
    let pos2val = boxes[pattern[1]].innerText;
    let pos3val = boxes[pattern[2]].innerText;
    //same but First empty to nhi that check.
    if (pos1val != "" && pos2val != "" && pos3val != "") {
      if (pos1val === pos2val && pos2val === pos3val) {
        // console.log("winner");
        showWinner(pos1val); //pos1val wala hamara winner hoga.
        return true;
      }
    }
  }
  
};

newgame.addEventListener("click", resetGame);
resetbtn.addEventListener("click", resetGame);
