import swap from "../utils/swap";

let order;

// To heapify a subtree rooted with node i which is
// an index in arr[]. n is size of heap
const heapify = (array, n, i, isAsc) => {
  let largest = i;
  let left = 2 * i + 1; // left = 2 * i + 1
  let right = 2 * i + 2; // right = 2 * i + 2

  // If left child is larger than root
  order.push([left, largest, null, null]);
  if (
    left < n &&
    array[isAsc ? left : largest] > array[isAsc ? largest : left]
  ) {
    largest = left;
    order.push([left, largest, array.slice(), null]); // hightlight current largest bar color
  }

  // If right child is larger than largest so far
  order.push([largest, right, null, null]);
  if (
    right < n &&
    array[isAsc ? right : largest] > array[isAsc ? largest : right]
  ) {
    largest = right;
    order.push([right, largest, array.slice(), null]); // hightlight current largest bar color
  }

  // If largest is not root
  if (largest !== i) {
    order.push([i, largest, null, null]);
    swap(array, i, largest);
    order.push([i, largest, array.slice(), null]);

    // Recursively heapify the affected sub-tree
    heapify(array, n, largest, isAsc);
  }
};

const heapSortHelper = (array, isAsc) => {
  const length = array.length;
  // Build Heap
  for (let i = Math.floor(length / 2) - 1; i >= 0; i--) {
    heapify(array, length, i, isAsc);
  }

  for (let i = 0; i < length; i++) {
    order.push([-1, null, null, i]);
  }

  order.push([null, -1, null, null]);

  // One by one extract an element from heap
  for (let i = length - 1; i > 0; i--) {
    // Move current root to end
    swap(array, 0, i);
    order.push([0, i, array.slice(), null]);

    heapify(array, i, 0, isAsc);
    order.push([null, null, null, i]); // Sorted Idx
  }
};

const HeapSort = (array, isAsc) => {
  const tmpArr = array.slice();
  order = [];

  heapSortHelper(tmpArr, isAsc);

  return order;
};

export default HeapSort;
