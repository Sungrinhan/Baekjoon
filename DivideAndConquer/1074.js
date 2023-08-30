const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./1074.txt";

let [input] = fs.readFileSync(filePath).toString().split("\n");

const [N, r, c] = input.split(" ").map(Number);

console.log(N, r, c);

// r은 세로 index, c 는 가로 인덱스

// 재귀함수로 찾는다. 재귀가 끝나는 조건
// 찾는 조건이 아니면, 다시 바뀐 arguments 로 재귀.

// 좌표별로 나눠야함. 2 ^ n-1 씩 나눠서 생각하므로, 왼쪽위, 오른쪽위, 왼쪽아래, 오른쪽 아래인지 고려해서 하기.

// 안풀었네?? ㅇㅇ 안풀었음 ... 히히..

// 조금은 푼줄ㅋㅋ 어제 스카에있었는데
// 갑자기 상욱이한테 전화와서 양꼬치먹으러감 .
// 와 개꿀 ㅋㅋㅋㅋ 이거랑 아까 그거 풀고 운동끝나고 함 보쟈 아니면 내일봐도 되고 . 코드리뷰~ ㅇㅇ 걍 지금  볼까 너꺼 ? ㅇㅋㅇㅋ
//익이거
// 나 왜 안부름 너 여친만나러 일찍갔짜낭
// ㅋㅋ ㅇㅋ
// 뭘봐? 이 문제? ㅇㅇ 지금 보자
// 힌트줄테니까 너가 지금 풀어봐\math pow 가 제곱이던가  맞네 .

function devideAndConquer(row, column, N) {
  half = Math.pow(2, N - 1);

  // 재귀함수 탈출조건
  if (N == 0) {
    return 1;
  }

  // 하프랑 row,column 비교해서 왼쪽 위, 오른쪽 위, 왼쪽 아래, 오른쪽 아래 구분

  // 왼쪽위면 그냥 재귀, 오른쪽 위면 재귀 + 2^n-1

  // 이런식으로 하면 댐 오 나 접근법은 맞았는듯 담배 한대피고서 하겠음! ㅇㅋㅇㅋ 너 담배 끊음 ?  아직 이번주말에 끊음ㅋㅋ  내가 초대할게 리저베이션 프론트 좀 보자 지금 ?  ㅇㅇㅇㅋ 담피하고옴
  ㅇ;
  //ㅇㅋ
}
