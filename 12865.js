const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./12865.txt";
let input = fs.readFileSync(filePath).toString().split("\n");

const [first, ...testCases] = input;

const firstSplited = first.split(" ");

// test case 갯수
const N = Number(firstSplited[0]);

// 들수있는 총 무게
const K = Number(firstSplited[1]);

const mapAndSortTestCases = testCases
  .map((el) => el.split(" ").map((el) => Number(el)))
  .sort((a, b) => a[0] - b[0]);

const answer = [];
let weight = 0;
let value = 0;

console.log(mapAndSortTestCases);

// 하나씩 더해 본다.

function solution(N, K, mapAndSortTestCases) {
  // length = K  + 1
  const dp = Array(K + 1).fill(0);
  console.log(dp);
  for (let i = 0; i < N; i++) {
    for (let j = K; j >= mapAndSortTestCases[i][0]; j--) {
      dp[j] = Math.max(
        dp[j],
        dp[j - mapAndSortTestCases[i][0]] + mapAndSortTestCases[i][1]
      );
      console.log(`i: ${i} , j: ${j} , dp: ${dp}`);
    }
  }

  console.log(dp[K]);
}

solution(N, K, mapAndSortTestCases);
