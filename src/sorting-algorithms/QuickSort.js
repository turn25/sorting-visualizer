import swap from "../utils/swap";
import generateRandomNumber from "../utils/generateRandomNumber";

let order;

const partition = (array, left, right) => {
  const pivot = left;
  let j = left;

  for (let i = left + 1; i <= right; i++) {
    order.push([i, pivot, null, null]);
    if (array[i] < array[pivot]) {
      j = j + 1;
      swap(array, i, j);
      order.push([i, j, array.slice(), null]);
    }
  }

  swap(array, pivot, j);
  order.push([pivot, j, array.slice(), null]);
  order.push([null, null, null, j]);
  return j;
};

const quickSortHelper = (array, left, right) => {
  if (left >= right) {
    if (left === right) order.push([null, null, null, left]);
    return;
  }

  //random pivot to avoid worst case O(n2)
  const pivot = generateRandomNumber(left, right);
  order.push([pivot, null, null, null]);

  swap(array, left, pivot);
  order.push([left, pivot, array.slice(), null]);

  const mid = partition(array, left, right); //find middle index

  quickSortHelper(array, left, mid - 1);
  quickSortHelper(array, mid + 1, right);

  return;
};

const QuickSort = (array, isAsc) => {
  let tmpArr = array.slice(); //copy array, avoid side effects
  order = [];

  quickSortHelper(tmpArr, 0, tmpArr.length - 1);

  console.log("arr: " + array);
  console.log("sorted: " + tmpArr);
  return order;
};

export default QuickSort;
