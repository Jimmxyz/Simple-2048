//A game by @Jimmxyz on github : https://github.com/Jimmxyz
//This project is under MIT license

//Variable
let validInput = true;
let grid = gen_new_grid();

//Touch function
let initialX = null;
let initialY = null;

function backToHome() {
  window.location.replace("../");
}

function init() {
  document.getElementById("game_area").innerHTML = "";
  for (let i = 0; i < 4; i++) {
    const div = document.createElement("div");
    div.className = "col";
    div.id = "COL" + i;
    document.getElementById("game_area").appendChild(div);
    for (let j = 0; j < 4; j++) {
      const div = document.createElement("div");
      div.className = "cell";
      div.id = "COL" + i + "CELL" + j;
      document.getElementById("COL" + i).appendChild(div);
    }
  }
  console.log("Game grid displayed");
  if (localStorage.getItem("HIGH_SCORE") === null) {
    localStorage.setItem("HIGH_SCORE", 0);
  }
  document.getElementById("hig").innerText =
    String(localStorage.getItem("HIGH_SCORE")) + " apple";
  document.getElementById("hig_mob").innerText =
    String(localStorage.getItem("HIGH_SCORE")) + " apple";
}

function startTouch(e) {
  initialX = e.touches[0].clientX;
  initialY = e.touches[0].clientY;
}

function moveTouch(e) {
  e.preventDefault();
  if (initialX === null || initialY === null) {
    return;
  }

  let currentX = e.touches[0].clientX;
  let currentY = e.touches[0].clientY;

  let diffX = initialX - currentX;
  let diffY = initialY - currentY;

  if (Math.abs(diffX) > Math.abs(diffY)) {
    // sliding horizontally
    if (diffX > 0 && lastMove !== 4) {
      //left
    } else if (lastMove !== 2) {
      //ArrowRight
    } else {
      // sliding vertically
      if (diffY > 0 && lastMove !== 1) {
        //up
      } else if (lastMove !== 3) {
        // swiped down
      }
    }

    initialX = null;
    initialY = null;
  }
}

document.addEventListener("touchstart", startTouch, false);
document.addEventListener("touchmove", moveTouch, { passive: false });

document.addEventListener("DOMContentLoaded", () => {
  init();
});

//Get keyboard input
document.addEventListener(
  "keydown",
  (event) => {
    const keyName = event.key;
    //input "ArrowRight"
    if (keyName === "ArrowRight" && validInput === true) {
      validInput = false;
      //right
      return;
    }
    //input "ArrowLeft"
    if (keyName === "ArrowLeft" && validInput === true) {
      validInput = false;
      //left
      return;
    }
    //input "ArrowUp"
    if (keyName === "ArrowUp" && validInput === true) {
      validInput = false;
      //up
      return;
    }
    //input "ArrowDown"
    if (keyName === "ArrowDown" && validInput === true) {
      validInput = false;
      //down
      return;
    }
  },
  false,
);

// console.log(validInput);
document.addEventListener(
  "keyup",
  (event) => {
    const keyName = event.key;
    //waiting
    if (
      keyName === "ArrowDown" ||
      keyName === "ArrowUp" ||
      keyName === "ArrowLeft" ||
      keyName === "ArrowRight"
    ) {
      validInput = true;
      // console.log(validInput);
    }
  },
  false,
);

function gen_new_grid() {
  let new_grid = [];
  for (let i = 0; i < 4; i++) {
    let row = [];
    for (let j = 0; j < 4; j++) {
      row.push(0);
    }
    new_grid.push(row);
  }
  new_grid[Math.floor(Math.random() * new_grid.length)][
    Math.floor(Math.random() * new_grid.length)
  ] = 2;
  return new_grid;
}
function print() {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (grid[i][j] == 0) {
        document.getElementById("COL" + i + "CELL" + j).innerText = "";
        document.getElementById("COL" + i + "CELL" + j).style.backgroundColor =
          "#3D3D3D";
      } else {
        document.getElementById("COL" + i + "CELL" + j).innerText = grid[i][j];
        if (grid[i][j] <= 10) {
          document.getElementById("COL" + i + "CELL" + j).style.fontSize =
            5 + "em";
        } else if (grid[i][j] >= 10) {
          document.getElementById("COL" + i + "CELL" + j).style.fontSize =
            4 + "em";
        } else if (grid[i][j] >= 100) {
          document.getElementById("COL" + i + "CELL" + j).style.fontSize =
            3 + "em";
        } else if (grid[i][j] >= 1000) {
          document.getElementById("COL" + i + "CELL" + j).style.fontSize =
            2 + "em";
        } else if (grid[i][j] >= 10000) {
          document.getElementById("COL" + i + "CELL" + j).style.fontSize =
            1 + "em";
        }
      }
    }
  }
}
