const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./11286.txt";

let input = fs.readFileSync(filePath).toString().split("\n");

const [n, ...testCases] = input;

const N = Number(n);

const convertedTestCases = testCases.map((el) => Number(el));

// console.log(N, convertedTestCases);
// 질문 : 왜 양수최소힙이랑 음수최대힙에 0 요소가 들가있음? 인덱스 1부터 시작할라고? ㅇㅇ ㅇㅋㅋ
// 0번 인덱스 초기화한거 인덱스 편하게 쓰려고

// 양수최소힙에 요소 추가하는 함수
// 맨끝에 새로운거 넣고 1/2 인덱스랑 크기 비교해서 더작으면 스왑  질문 : currentIndex 가 홀수면 어떻게 됨?
// 상관없음 5 /2 = 2 나오니까 자동으로 Math.floor 쓰나?

//  아
// 자바스크립트는 소수점까지 나오나? ㅇㅇ
// 그럼 Math.floor  써야댐ㅋㅋ 아하 그럼 이해됨 ㅋㅋ
// 오홍 이런식으로 하는구나 밑에는 내가써봐도 되나? ㅇㅇ

function addPosMinHeap(posMinHeap, input) {
  posMinHeap.push(input);
  let currentIndex = posMinHeap.length - 1;

  while (currentIndex > 1) {
    if (posMinHeap[currentIndex] < posMinHeap[Math.floor(currentIndex / 2)]) {
      let temp = posMinHeap[currentIndex];
      posMinHeap[currentIndex] = posMinHeap[Math.floor(currentIndex / 2)];
      posMinHeap[Math.floor(currentIndex / 2)] = temp;
      currentIndex = Math.floor(currentIndex / 2);
    } else {
      break;
    }
    // input 이 부모노드보다 작으면 위치를 바꿔주자나. currentIndex 를 if 문 안에 넣어야 ㅎ라는거 아닌가?
    // 안그러면은 순서가 완성되었는데도 불구하고 currentIndex 가 1이 될때까지 순회할 거 같은데.  아 맞네 굿
  }
}

const addNegMaxHeap = (negMaxHeap, input) => {
  negMaxHeap.push(input);
  let currentIndex = negMaxHeap.length - 1;

  // 아 여기서 이진트리기 때문에 idx 를 1부터 하는게 편한건가?
  // 그치 그리고 currentIndex가 1이면 루트기 떄문에 더이상 비교할 필요가 없고 맞지 루트면 이미 최대일테니 ㄱㅅㄱㅅ
  while (currentIndex > 1) {
    if (negMaxHeap[currentIndex] > negMaxHeap[Math.floor(currentIndex / 2)]) {
      [negMaxHeap[Math.floor(currentIndex / 2)], negMaxHeap[currentIndex]] = [
        negMaxHeap[currentIndex],
        negMaxHeap[Math.floor(currentIndex / 2)],
      ];
      currentIndex = Math.floor(currentIndex / 2);
    } else {
      break;
    }
  }
};

// 삭제하는거 구현해봐
// 순서가 어떻게 되냐면
// 루트를 삭제할거니까
// 1. 루트에 맨 마지막 인덱스값 대입
// 2. 맨 마지막 인덱스 삭제
// 3. 루트랑 자식이랑 비교하면서 루트가 더 크면 스왑
// (양쪽 자식 둘보다 다 작다면 더 작은쪽이랑 스왑)

// 자식 오른쪽 노드가 undefined 인 경우

// 자식 오른쪽 노드가 있는 경우
// 아래와 같이 하면 됨.

const deletePosMinHeap = (posMinHeap) => {
  [posMinHeap[1], posMinHeap[posMinHeap.length - 1]] = [
    posMinHeap[posMinHeap.length - 1],
    posMinHeap[1],
  ];
  const poppedItem = posMinHeap.pop();
  let currentIndex = 1;

  // 이렇게 쓰는게 더 보기 좋을듯 굿뜨듯

  // 여기서 왼쪽 자식까지만 검사해서 오른쪽 자식은 undefined 일수 있음 홀리 쉣..

  while (currentIndex * 2 < posMinHeap.length) {
    // 두개 자식노드보다 작은경우 break;

    const parent = posMinHeap[currentIndex];
    const leftChild = posMinHeap[2 * currentIndex];
    const rightChild = posMinHeap[2 * currentIndex + 1];

    // 오른쪽 자식노드가 undefined 이면, 왼쪽 자식노드만 비교하면 됨.
    if (rightChild === undefined) {
      if (parent > leftChild) {
        [posMinHeap[currentIndex], posMinHeap[currentIndex * 2]] = [
          posMinHeap[currentIndex * 2],
          posMinHeap[currentIndex],
        ];
        // 질문 : 이거는 완전 이진트리 맞나?  ㅇㅇ 그거는 어떻게 판단해? 그냥 힙 구조가 완전이진트리를 생각해서 그런가?
        // 우리가 완전 이진트리로 구현을 햇자나 ㅇㅋ 맞지 차근차근 채워나갔지

        // 여기서 스왑하고 else break;
        // 인덱스 업데이트도 해야댐
        // right child 가 undefined 이면 더이상의 자식노드가 업을텐데  whie 문 종료해야되는거 아닌가?
        // 오 맞네 , 그래서 밑에 break 도 그냉 놔둬야함 else 아니고 굳굳
      }
      break;
    }
    // 오른쪽 자식 노드가 undefined 가 아닌 경우
    else {
      if (parent < leftChild && parent < rightChild) {
        break;
      }
      // 둘 다 보다 크면, 자식노드 비교해서 작은쪽으로.
      else if (parent > leftChild && parent > rightChild) {
        // 루트가 자식 두개보다 모두 크고, left 가 right 보다 작은경우
        if (leftChild < rightChild) {
          [posMinHeap[currentIndex], posMinHeap[2 * currentIndex]] = [
            posMinHeap[2 * currentIndex],
            posMinHeap[currentIndex],
          ];
          currentIndex *= 2;
        }
        // 루트가 자식 두개보다 모두 크고, right 가 left 보다 작은경우
        else {
          [posMinHeap[currentIndex], posMinHeap[2 * currentIndex + 1]] = [
            posMinHeap[2 * currentIndex + 1],
            posMinHeap[currentIndex],
          ];
          currentIndex = currentIndex * 2 + 1;
        }
      }
      // 왼쪽보다 크지만 오른쪽보다 작은경우
      else if (parent > leftChild && parent < rightChild) {
        [posMinHeap[currentIndex], posMinHeap[2 * currentIndex]] = [
          posMinHeap[2 * currentIndex],
          posMinHeap[currentIndex],
        ];
        currentIndex *= 2;
      }
      // 오른쪽보다 크지만 왼쪽보다 작은경우
      else {
        [posMinHeap[currentIndex], posMinHeap[2 * currentIndex + 1]] = [
          posMinHeap[2 * currentIndex + 1],
          posMinHeap[currentIndex],
        ];
        currentIndex = currentIndex * 2 + 1;
      }
    }
  }

  return poppedItem;
};
// 0이 계속 들어가네
const deleteNegMaxHeap = (negMaxHeap) => {
  [negMaxHeap[1], negMaxHeap[negMaxHeap.length - 1]] = [
    negMaxHeap[negMaxHeap.length - 1],
    negMaxHeap[1],
  ];

  const poppedItem = negMaxHeap.pop();

  let currentIndex = 1;

  while (currentIndex * 2 < negMaxHeap.length) {
    const parent = negMaxHeap[currentIndex];
    const leftChild = negMaxHeap[currentIndex * 2];
    const rightChild = negMaxHeap[currentIndex * 2 + 1];

    // 오른쪽 자식노드가 undefined 인 경우
    if (rightChild === undefined) {
      if (leftChild > parent) {
        [negMaxHeap[currentIndex], negMaxHeap[currentIndex * 2]] = [
          negMaxHeap[currentIndex * 2],
          negMaxHeap[currentIndex],
        ];
      }
      break;
    }
    // 왼쪽, 오른쪽 자식 노드가 있는 경우
    // parent 가 더 크면 바꿀필요 없음
    else {
      if (parent > leftChild && parent > rightChild) {
        break;
      }
      // parent 가 양쪽 자식노드보다 작을경우
      else if (parent < leftChild && parent < rightChild) {
        // left child 가 right 보다 큰경우
        // parent 랑 left childe 랑 바꾸기
        if (leftChild > rightChild) {
          [negMaxHeap[currentIndex], negMaxHeap[currentIndex * 2]] = [
            negMaxHeap[currentIndex * 2],
            negMaxHeap[currentIndex],
          ];
          currentIndex *= 2;
        }
        // right child 가  left 보다 큰경우
        else {
          [negMaxHeap[currentIndex], negMaxHeap[currentIndex * 2 + 1]] = [
            negMaxHeap[currentIndex * 2 + 1],
            negMaxHeap[currentIndex],
          ];
          currentIndex = currentIndex * 2 + 1;
        }
      }
      // left 보다 작지만 right 보다 큰경우
      // left 랑 parent 랑 바꾸기
      else if (parent < leftChild && parent > rightChild) {
        [negMaxHeap[currentIndex], negMaxHeap[currentIndex * 2]] = [
          negMaxHeap[currentIndex * 2],
          negMaxHeap[currentIndex],
        ];
        currentIndex *= 2;
      } else {
        [negMaxHeap[currentIndex], negMaxHeap[currentIndex * 2 + 1]] = [
          negMaxHeap[currentIndex * 2 + 1],
          negMaxHeap[currentIndex],
        ];
        currentIndex = currentIndex * 2 + 1;
      }
    }
  }
  return poppedItem;

  // 굳!

  // 마지막 엘리먼트를 루트랑 바꾸고 , 마지막 요소(기존 루트요소) 삭제
  // 자식 노드랑 비교해서 루트가 작으면 스왑
  //
};

// 이제 negMaxHeap 도 삭제하는거 구현하면 되나?
function main(N, convertedTestCases) {
  // 양수를 저장하는 최소힙
  const posMinHeap = [0];

  // 음수를 저장하는 최대힙
  const negMaxHeap = [0];

  // 테스트케이스 순회하기
  for (let i = 0; i < N; i++) {
    const target = convertedTestCases[i];

    // 타겟이 0보다 큰 경우
    // MinHeap 에 추가
    if (target > 0) {
      addPosMinHeap(posMinHeap, target);
      // console.log(`posMinHeap: ${posMinHeap}`);
    }

    // 타겟이 0 인경우
    // 어느 한쪽이 length 가 1이면 , 다른쪽을 출력하고 삭제
    else if (target === 0) {
      // 둘다 length가 1이면 , 0을 출력

      if (negMaxHeap.length === 1 && posMinHeap.length === 1) {
        console.log(0);
      }
      // 음수maxheap 과 양수minheap 의 첫번째 요소가 있다면(둘다 length가 2 이상) 절대값을 비교, 작은것을(음수maxheap) 첫번째 요소를 출력하고 삭제
      // 둘이 같다면 음수maxheap 요소를 출력하고 삭제
      else if (posMinHeap.length > 1 && negMaxHeap.length > 1) {
        if (Math.abs(posMinHeap[1]) >= Math.abs(negMaxHeap[1])) {
          console.log(deleteNegMaxHeap(negMaxHeap));
        } else {
          console.log(deletePosMinHeap(posMinHeap));
        }
      }
      // 어느 한쪽만 length 가 1이면 , 다른쪽을 출력하고 삭제
      else if (negMaxHeap.length === 1 || posMinHeap.length === 1) {
        if (negMaxHeap.length === 1) {
          console.log(deletePosMinHeap(posMinHeap));
        } else {
          console.log(deleteNegMaxHeap(negMaxHeap));
        }
      }
    }

    // 타겟이 0보다 작은경우
    // 음수 maxheap 에 추가
    else if (target < 0) {
      addNegMaxHeap(negMaxHeap, target);
    }
  }
}

main(N, convertedTestCases);

// 절대값이 가장 작은 값을 찾는 함수
// 그 값을 제거하고 콘솔에 출력
// 입력에서 0이 주어진 횟수만큼 답을 출력함.
// 배열이 비어있는 경우인데 절대값이 가장 작은값을 출력하라고 한 경우에는 0을 출력.
// 접근 방식: 0보다 작은 배열 left, 0 보다 큰 배열 right 를 비교.
// 맨 앞의 요소의 절대값을 비교해서 작은 것을 선택.
// 둘 다 같다면 left 에 있는 요소를 출력하고 제거.
