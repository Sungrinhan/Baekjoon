const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./9655.txt";

let input = fs.readFileSync(filePath).toString().split("\n");

const N = Number(input[0]);

// 상근이와 창영이는 턴을 번갈아가면서 돌을 가져가며, 돌은 1개 또는 3개 가져갈 수 있다. 마지막 돌을 가져가는 사람이 게임을 이기게 된다.

// 상근이가 이기면 sk , 창영이가 이기면 cy 을 출력

// 1이면 -> 상근
// 2이면 -> 상근1, 창영1  창영 승
// 3이면 -> 상근 3 , 상근 승
// 4이면 -> 상근 1 , 창영 3 창영승
// 5이면 -> 1,3,1 / 1,1,3 /
// 6이면 -> 5에서 1더한것 + 3에서 3더한것 . 즉 상근 +1, 창영 + 3 이므로, 무조건 창영 승.

const arr = Array(N + 1).fill(0);

arr[1] = true;
arr[2] = false;
arr[3] = true;
arr[4] = false;

for (let i = 5; i < N + 1; i++) {
  arr[i] = !arr[i - 3] || !arr[i - 1];
}

console.log(arr[N] === true ? "SK" : "CY");
