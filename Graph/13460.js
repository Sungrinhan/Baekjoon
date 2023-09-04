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

// R 위치에서 상하좌우를 탐색해서 , . 끝까지 이동한다.  #을 만나거나 B 를 만날때 까지 이동한다.
// R이 먼저 움직일지 , B가 먼저 움직일지를 정한다.  어느 방향을 정하고, 공의 좌표가 해당방향에 가까운 순으로 움직인다,
// 먼저 움직이는 공을 이동시킨 후, 그다음에 다음 공을 이동시킨다.
// 둘다 이동중에 0 을 만나면 상황은 종료된다.
