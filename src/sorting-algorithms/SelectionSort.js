import swap from "../utils/swap";

const SelectionSort = (array, isAsc) => {
  // if ascending order, find minimum element in unsorted array then swap with the first element
  const tmpArr = array.slice(); //avoid side effects
  const order = [];

  //index1, index2, arr, sortedIndex
  let i, j;

  for (i = 0; i < tmpArr.length; i++) {
    for (j = i + 1; j < tmpArr.length; j++) {
      //add compare elements
      order.push([j, i, null, null]);

      // if ascending order(isAsc), swap the found minimum element with the first element, else swap the maximum element
      if (tmpArr[isAsc ? j : i] < tmpArr[isAsc ? i : j]) {
        swap(tmpArr, j, i);
        order.push([j, i, tmpArr.slice(), null]);
      }
    }
    order.push([null, null, null, i]); //if ascending order, minimum element index (sorted index)
  }

  return order;
};

export default SelectionSort;
