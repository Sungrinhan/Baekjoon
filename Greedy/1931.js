const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./1931.txt";

let input = fs.readFileSync(filePath).toString().split("\n");

const [N, ...testCases] = input;

console.log(N);

// const MapTestCases = [
//   ...new Set(testCases.map((el) => el.split(" ").map(Number))),
// ].sort((a, b) => {
//   if (a[0] === b[0]) return a[1] - b[1];
//   else return a[0] - b[0];
// });

console.log(testCases);

// 테케를 정리했음. 중복되는거 다 제거하고, end time 기준이고, endtime 같으면 걸리는 시간이 적은순으로 정렬
// 중복을 제거하는게 시간 더 걸리지 않을까렬
// 그럴거같긴함. set 안써볼게 . 30 줄어듬. 굿

const MapTestCases = [
  ...new Set(testCases.map((el) => el.split(" ").map(Number))),
].sort((a, b) => {
  // 끝나는시간으로 정렬, 끝나는시간이 같으면 시작시간으로 정렬? ㅇㅇ
  // 나도 이렇게 풀었음
  // 첨에는 시작시간 정렬로 풀려고 했는데 되나? 시작시간 정렬로 풀려면 정렬 끝에서 부터 탐색해야하나
  // 문제 자체가 끝나는 시간기준으로 잡아야됨 끝나야 다음걸 시작하는거니까
  // ㅇㅋㅇㅋ 너꺼 코드 보쟝까
  if (b[1] === a[1]) return a[0] - b[0];
  else return a[1] - b[1];
});

console.log(MapTestCases);

let count = 0;
let endTime = 0;

for (let i = 0; i < MapTestCases.length; i++) {
  if (endTime <= MapTestCases[i][0]) {
    count++;
    endTime = MapTestCases[i][1];
  }
}

console.log(count);
