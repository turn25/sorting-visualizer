import swap from "../utils/swap";

const InsertionSort = (array, isAsc) => {
  const tmpArr = array.slice(); //copy array, avoid side effects
  const order = [];

  let i, j;
  //start from 1
  for (i = 1; i < tmpArr.length; i++) {
    //swap until condition reach break point
    //index1, index2, arr, sorted index
    for (j = i - 1; j >= 0; j--) {
      //if isAsc then compare j > j + 1 (ascending) else j < j + 1 (descending)
      if (tmpArr[isAsc ? j : j + 1] > tmpArr[isAsc ? j + 1 : j]) {
        swap(tmpArr, j, j + 1);
        order.push([j, j + 1, null, null]);
        order.push([j, j + 1, tmpArr.slice(), null]);
      } else break; //break point
    }
  }

  //after the sorting complete, push sorted items to array
  for (i = tmpArr.length; i >= 0; i--) {
    order.push([null, null, null, i]);
  }

  return order;
};

export default InsertionSort;
