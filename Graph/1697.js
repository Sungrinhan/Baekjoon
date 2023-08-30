const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./1697.txt";

let input = fs.readFileSync(filePath).toString().split("\n");

const [N, K] = input[0].split(" ").map(Number);

// 최단거리이기 때문에 방문한 곳은 더이상 방문하지 않음. visited 배열 만들기.
const visited = new Array(100001).fill(-1);

const bfs = (visited, N, K) => {
  // bfs 에서는 queue 로 푼다.
  const queue = [];

  // queue 에 현재 위치 넣기
  queue.push(N);

  // 첫 방문한 위치는 0으로 바꿈.
  visited[N] = 0;

  // queue 가 있고 , K 를 만날때 까지 .
  while (queue.length) {
    // 이동할 수 있는 곳이 세개잖아. 그래서 밑에 이중반복문에서 셋다 방문안하고 범위 안이면 queue 에 3개요소씩 들어감.
    // for (let i = 0; i < queue.length; i++) {
    let target = queue.shift();
    // while 종료 조건
    if (target === K) {
      return visited[K];
    }

    // 이동 가능한 경우
    const nextMove = [target - 1, target + 1, target * 2];

    for (let el of nextMove) {
      if (el <= 100000 && el >= 0 && visited[el] === -1) {
        visited[el] = visited[target] + 1;
        queue.push(el);
      }
    }
    // }
  }
};

console.log(bfs(visited, N, K));
