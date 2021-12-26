import swap from "../utils/swap";

const SelectionSort = (array, isAsc) => {
  // if ascending order, find minimum element in unsorted array then swap with the first element
  const tmpArr = array.slice(); //avoid side effects
  const order = [];

  //index1, index2, arr, sortedIndex
  let i, j, minIdx;

  for (i = 0; i < tmpArr.length; i++) {
    minIdx = i;

    for (j = i + 1; j < tmpArr.length; j++) {
      //add compare elements
      order.push([j, i, null, null]);

      // if ascending order, swap the found minimum element with the first element, else swap the maximum element
      if (tmpArr[isAsc ? j : minIdx] < tmpArr[isAsc ? minIdx : j]) {
        swap(tmpArr, j, minIdx);
        order.push([j, minIdx, tmpArr.slice(), null]);
      }
    }
    order.push([null, null, null, i]); //if ascending order, minimum element index (sorted index)
  }

  return order;
};

export default SelectionSort;
