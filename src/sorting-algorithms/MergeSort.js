let order;
// [idx1, idx2, arr, sortedIdx]

const merge = (array, left, mid, right, isAsc) => {
  let i = left; // first index of left subarray
  let j = mid + 1; // first index of right subarray

  let auxArr = []; // auxiliary array

  order.push([mid, -1, null, null]);

  // if 1 subarray have no element left then break
  // compare 2 subarray then push to aux array
  while (i <= mid && j <= right) {
    //push compare to order
    order.push([i, j, null, null]);
    if (array[isAsc ? i : j] > array[isAsc ? j : i]) {
      auxArr.push(array[j]);
      j++;
    } else {
      auxArr.push(array[i]);
      i++;
    }
  }

  // copy the remaining elements of left subarray to aux array
  while (i <= mid) {
    order.push([i, null, null, null]);
    auxArr.push(array[i]);
    i++;
  }

  // copy the remaining elements of right subarray to aux array
  while (j <= right) {
    order.push([null, j, null, null]);
    auxArr.push(array[j]);
    j++;
  }

  // overwrite from auxiliary array
  // copy all elements inside aux array to array
  // start to left to right
  for (let idx = left; idx <= right; idx++) {
    array[idx] = auxArr[idx - left];
    order.push([idx, null, array.slice(), null]);
  }
};

const mergeSortHelper = (array, left, right, isAsc) => {
  if (left >= right) return; // returns recursively

  const mid = left + Math.floor((right - left) / 2);

  //set change bar color from left to mid
  for (let i = left; i < mid; i++) {
    order.push([-1, null, null, i]);
  }

  // remove bar color
  order.push([null, -1, null, null]);

  mergeSortHelper(array, left, mid, isAsc); // subarray left
  mergeSortHelper(array, mid + 1, right, isAsc); // subarray right

  merge(array, left, mid, right, isAsc);
};

const MergeSort = (array, isAsc) => {
  const tmpArr = array.slice(); // copy array to avoid side effects
  order = [];

  mergeSortHelper(tmpArr, 0, tmpArr.length - 1, isAsc);

  //after the sorting complete, push sorted items to array
  for (let i = tmpArr.length; i >= 0; i--) {
    order.push([null, null, null, i]);
  }

  return order;
};

export default MergeSort;
