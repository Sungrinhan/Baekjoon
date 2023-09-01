const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./1074.txt";

let [input] = fs.readFileSync(filePath).toString().split("\n");

const [N, r, c] = input.split(" ").map(Number);

// r은 세로 index, c 는 가로 인덱스

// 재귀함수로 찾는다. 재귀가 끝나는 조건
// 찾는 조건이 아니면, 다시 바뀐 arguments 로 재귀.

// 좌표별로 나눠야함. 2 ^ n-1 씩 나눠서 생각하므로, 왼쪽위, 오른쪽위, 왼쪽아래, 오른쪽 아래인지 고려해서 하기.

console.log(N, r, c);

function devideAndConquer(row, column, N) {
  // 재귀함수 탈출조건 , N=== 0 이면 , 2^0 이므로 한칸밖에 없음. 즉 시작점인 0밖에 없음.
  // 시작점은 0 임 .
  if (N === 0) {
    return 0;
  }

  const half = Math.pow(2, N - 1);

  // console.log("row:", row, "column:", column, "N: ", N);

  const isUpperLeft = row < half && column < half;
  const isUpperRight = row < half && column >= half;
  const isLowerLeft = row >= half && column < half;
  const isLowerRight = row >= half && column >= half;

  // 왼쪽위인 경우
  if (isUpperLeft) {
    console.log("왼쪽 위");
    return devideAndConquer(row, column, N - 1);
  }
  // 오른쪽 위
  else if (isUpperRight) {
    console.log("오른쪽 위");
    return devideAndConquer(row, column - half, N - 1) + half * half;
  }
  // 왼쪽 아래
  else if (isLowerLeft) {
    console.log("왼쪽아래");
    console.log("상수: ", half * half * 2);

    return devideAndConquer(row - half, column, N - 1) + 2 * half * half;
  }
  // 오른쪽 아래
  else if (isLowerRight) {
    console.log("오른쪽아래");
    console.log("상수:", 3 * half * half);
    return devideAndConquer(row - half, column - half, N - 1) + 3 * half * half;
  }

  // devideAndConquer(1, 1, 1) + 2 * 2 * 2;
  // devideAndConquer(0,0, 0) +3 + 8 ;
}

console.log(devideAndConquer(r, c, N));
