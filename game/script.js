//A game by @Jimmxyz on github : https://github.com/Jimmxyz
//This project is under MIT license

//Variable
let validInput = true;
let grid = gen_new_grid();

//color
//type this command to test the color :
//grid[0][0] = 2; grid[0][1] = 4; grid[0][2] = 8; grid[0][3] = 16; grid[1][3] = 32; grid[1][2] = 64; grid[1][1] = 128; grid[1][0] = 256; grid[2][0] = 512; grid[2][1] = 1024; grid[2][2] = 2048; grid[2][3] = 4096; grid[3][3] = 8192; grid[3][2] = 16384; grid[3][1] = 32768; grid[3][0] = 65536; print();
let color = {
  2: "#B57C50",
  4: "#B56950",
  8: "#B55850",
  16: "#B55050",
  32: "#B55063",
  64: "#9C447A",
  128: "#863E8C",
  256: "#7A47A1",
  512: "#6347A1",
  1024: "#574DB0",
  2048: "#4D5DB0",
  4096: "#4D7AB0",
  8192: "#5A99CC",
  16384: "#49A5B8",
  32768: "#44AB9D",
  65536: "#44AB82",
};
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
      move("left");
    } else if (lastMove !== 2) {
      move("right");
    } else {
      // sliding vertically
      if (diffY > 0 && lastMove !== 1) {
        move("up");
      } else if (lastMove !== 3) {
        move("down");
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
  print();
});

//Get keyboard input
document.addEventListener(
  "keydown",
  (event) => {
    const keyName = event.key;
    //input "ArrowRight"
    if (keyName === "ArrowRight" && validInput === true) {
      validInput = false;
      move("right");
      return;
    }
    //input "ArrowLeft"
    if (keyName === "ArrowLeft" && validInput === true) {
      validInput = false;
      move("left");
      return;
    }
    //input "ArrowUp"
    if (keyName === "ArrowUp" && validInput === true) {
      validInput = false;
      move("up");
      return;
    }
    //input "ArrowDown"
    if (keyName === "ArrowDown" && validInput === true) {
      validInput = false;
      move("down");
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

function addATwo() {
  //alert("Adding a two");
  let trng = [];
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (grid[i][j] === 0) {
        trng.push([i, j]);
      }
    }
  }
  console.log(trng);
  if (trng.length === 0) {
    gameOver();
  }
  let [x, y] = trng[Math.floor(Math.random() * trng.length)];
  grid[x][y] = 2;
  return;
}

function gameOver() {
  alert("Game Over!");
  //TODO
}

//IMPORTANT
function print() {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (grid[i][j] == 0) {
        document.getElementById("COL" + i + "CELL" + j).innerText = "";
        document.getElementById("COL" + i + "CELL" + j).style.backgroundColor =
          "#3D3D3D";
      } else {
        document.getElementById("COL" + i + "CELL" + j).innerText = grid[i][j];
        document.getElementById("COL" + i + "CELL" + j).style.backgroundColor =
          color[grid[i][j]];
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
        } else {
          document.getElementById("COL" + i + "CELL" + j).style.fontSize =
            1 + "em";
        }
      }
    }
  }
}

function move(dir) {
  //grid [i][j] i : col j : row
  if (dir == "left" || dir == "right") {
    for (let b = 0; b < 4; b++) {
      for (let j = 0; j < 4; j++) {
        if (dir == "right") {
          for (let i = 2; i >= 0; i--) {
            if (grid[i + 1][j] == 0) {
              grid[i + 1][j] = grid[i][j];
              grid[i][j] = 0;
            } else if (grid[i + 1][j] == grid[i][j]) {
              grid[i + 1][j] *= 2;
              grid[i][j] = 0;
            }
          }
        } else if (dir == "left") {
          for (let i = 1; i < 4; i++) {
            if (grid[i - 1][j] == 0) {
              grid[i - 1][j] = grid[i][j];
              grid[i][j] = 0;
            } else if (grid[i - 1][j] == grid[i][j]) {
              grid[i - 1][j] *= 2;
              grid[i][j] = 0;
            }
          }
        }
      }
    }
  } else if (dir == "up" || dir == "down") {
    for (let b = 0; b < 4; b++) {
      for (let i = 0; i < 4; i++) {
        if (dir == "down") {
          for (let j = 2; j >= 0; j--) {
            if (grid[i][j + 1] == 0) {
              grid[i][j + 1] = grid[i][j];
              grid[i][j] = 0;
            } else if (grid[i][j + 1] == grid[i][j]) {
              grid[i][j + 1] *= 2;
              grid[i][j] = 0;
            }
          }
        } else if (dir == "up") {
          for (let j = 1; j < 4; j++) {
            if (grid[i][j - 1] == 0) {
              grid[i][j - 1] = grid[i][j];
              grid[i][j] = 0;
            } else if (grid[i][j - 1] == grid[i][j]) {
              grid[i][j - 1] *= 2;
              grid[i][j] = 0;
            }
          }
        }
      }
    }
  }
  addATwo();
  print();
}
