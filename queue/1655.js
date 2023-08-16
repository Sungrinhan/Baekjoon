const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./1655.txt";

let input = fs.readFileSync(filePath).toString().split("\n");

const [N, ...testCases] = input;

const length = Number(N);
const cvtToNumTestcase = testCases.map((el) => Number(el));

function solution(numbers) {
  for (let i = 0; i < numbers.length; i++) {}
}

solution(cvtToNumTestcase);
