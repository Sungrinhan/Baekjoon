const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./1074.txt";

let [input] = fs.readFileSync(filePath).toString().split("\n");

const [N, r, c] = input.split(" ").map(Number);

// r은 세로 index, c 는 가로 인덱스

// 재귀함수로 찾는다. 재귀가 끝나는 조건
// 찾는 조건이 아니면, 다시 바뀐 arguments 로 재귀.

// 좌표별로 나눠야함. 2 ^ n-1 씩 나눠서 생각하므로, 왼쪽위, 오른쪽위, 왼쪽아래, 오른쪽 아래인지 고려해서 하기.

function devideAndConquer(row, column, N) {
  // 재귀함수 탈출조건
  // 시작점은 0 임 .
  if (N === 0) {
    return 0;
  }

  half = Math.pow(2, N - 1);

  console.log("row:", row, "column:", column, "N: ", N);
  console.log("half 제곱, 2^n", half * half, 2 ** N);

  // 왼쪽위인 경우
  if (row < half && column < half) {
    console.log("왼쪼구이");
    return devideAndConquer(row, column, N - 1);
  }
  // 오른쪽 위
  else if (row < half && column >= half) {
    console.log("오른쪽 위", half * half, 2 ** N);
    return devideAndConquer(row, column - half, N - 1) + half * half;
  }
  // 왼쪽 아래
  else if (row >= half && column < half) {
    console.log("왼쪽아래");
    return devideAndConquer(row - half, column, N - 1) + 2 * half * half;
  }
  // 오른쪽 아래
  else if (row >= half && column >= half) {
    console.log("오른쪽아래");
    return devideAndConquer(row - half, column - half, N - 1) + 3 * half * half;
  }

  // devideAndConquer(1, 1, 1) + 2 * 2 * 2;
  // devideAndConquer(0,0, 0) +3 + 8 ;
}

console.log(devideAndConquer(r, c, N));
