const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./2178.txt";

let input = fs.readFileSync(filePath).toString().split("\n");

const dir = [
  [-1, 0],
  [1, 0],
  [0, 1],
  [0, -1],
];

// ㅎㅇㅎㅇ
// ㅎㅇㅎㅇ
// 가로길이 N, 세로길이 M
const [N, M] = input.shift().split(" ").map(Number);

// 방문값을 확인아흔 2차원 배열
const visited = Array(N)
  .fill()
  .map((el) => Array(M).fill(0));

// 입력된 2차원 배열
const graph = input.map((el) => el.split("").map(Number));

// 첫 시작 좌표는 00
const queue = [[0, 0]];

visited[0][0] = 1;

while (queue.length) {
  const [x, y] = queue.shift();

  // cs 파일로 만듬 근데 코드 거의 똑같음 아마 비슷할듯 기본중의 기본 bfs 라.
  // 굳굳 수고수고
  if (graph[x][y] === 0) continue;
  graph[x][y] = 0;

  for (let i = 0; i < 4; i++) {
    const movedX = x + dir[i][0];
    const movedY = y + dir[i][1];

    // 좌표 값 벗어나는지 여부검사
    if (movedX < 0 || movedY < 0 || movedX >= N || movedY >= M) continue;
    // 1이면 이동할 수 있는 좌표기 떄문에 이동하기전값 + 1 해줌.
    if (graph[movedX][movedY] === 1 && visited[movedX][movedY] === 0) {
      queue.push([movedX, movedY]);
      visited[movedX][movedY] = visited[x][y] + 1;
    }
  }
}

console.log(visited[N - 1][M - 1]);
