const $table = document.querySelector("table");
const $tr = document.querySelectorAll("tr");
const $td = document.querySelectorAll("td");
const $result = document.querySelector("#js-result");
const $resetBtn = document.querySelector("#js-resetBtn");

let turn = "X";
let count = 0;

// let table = [];

// let i = 0;
// [...$tr].forEach((item) => {
//   table.push([]);
//   [...item.children].forEach((item) => {
//     table[i].push(item);
//   });
//   i += 1;
// });

// console.log(table);

drawGame = () => {
  $result.innerText = `비겼습니다.`;
  $table.removeEventListener("click", handleClickTable);
  $resetBtn.classList.remove("hiding");
};

resetGame = () => {
  $result.innerText = `승자는 ${turn}입니다.`;
  $table.removeEventListener("click", handleClickTable);
  $resetBtn.classList.remove("hiding");
};

endGame = (e) => {
  count += 1;
  const floor = Number(e.target.parentNode.dataset.floor);
  const num = e.target.cellIndex;
  let downDiagonalArr = [];
  let upDiagonalArr = [];
  if (floor === num || floor + num === 2) {
    downDiagonalArr = [
      [...e.target.parentNode.parentNode.children][0].children[0],
      [...e.target.parentNode.parentNode.children][1].children[1],
      [...e.target.parentNode.parentNode.children][2].children[2],
    ];
    upDiagonalArr = [
      [...e.target.parentNode.parentNode.children][0].children[2],
      [...e.target.parentNode.parentNode.children][1].children[1],
      [...e.target.parentNode.parentNode.children][2].children[0],
    ];
  }
  const verticalArr = [
    [...e.target.parentNode.parentNode.children][0].children[
      e.target.cellIndex
    ],
    [...e.target.parentNode.parentNode.children][1].children[
      e.target.cellIndex
    ],
    [...e.target.parentNode.parentNode.children][2].children[
      e.target.cellIndex
    ],
  ];
  const horizontalArr = [...e.target.parentNode.children];
  if (horizontalArr.every((item) => item.innerText === turn)) {
    // 가로줄 검사
    resetGame();
  } else if (verticalArr.every((item) => item.innerText === turn)) {
    // 세로줄 검사
    resetGame();
  } else if (
    downDiagonalArr.every((item) => item.innerText === turn) ||
    upDiagonalArr.every((item) => item.innerText === turn)
  ) {
    // 대각선 검사
    if (downDiagonalArr.length !== 3 || upDiagonalArr.length !== 3) return;
    resetGame();
  } else if (count === 9) {
    drawGame();
  } else {
    return;
  }
};

handleClickTable = (e) => {
  if (e.target.nodeName !== "TD") return;
  if (e.target.innerText !== "") {
    alert("이미 선택된 곳 입니다.");
  } else {
    e.target.innerText = turn;
    endGame(e);
    if (turn === "X") {
      turn = "O";
    } else {
      turn = "X";
    }
  }
};

handleClickResetBtn = () => {
  [...$td].forEach((item) => (item.innerText = ""));
  $result.innerText = "";
  $resetBtn.classList.add("hiding");
  $table.addEventListener("click", handleClickTable);
  turn = "X";
  count = 0;
};

function init() {
  $table.addEventListener("click", handleClickTable);
  $resetBtn.addEventListener("click", handleClickResetBtn);
}

init();
