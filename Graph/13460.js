const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./13460.txt";

let input = fs.readFileSync(filePath).toString().split("\n");

const [N, ...arr] = input;

const [row, col] = N.split(" ").map((el) => Number(el));

const board = arr.map((el) => el.split(""));

// 움직일 수 있는 방향은 4방향.

const findLocation = (board) => {
  let Red_loacation, Blue_location;

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (!Red_loacation && board[i][j] === "R") {
        Red_loacation = [i, j];
      } else if (!Blue_location && board[i][j] === "B") {
        Blue_location = [i, j];
      }
    }
  }

  return { Red_loacation, Blue_location };
};

console.log(findLocation(board));
