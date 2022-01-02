import swap from "../utils/swap";

const ShellSort = (array, isAsc) => {
  const tmpArr = array.slice();
  let order = [];
  //index1, index2, tmpArray, sortedIndex
  let n = tmpArr.length;

  //Start with a really large gap, and then reduce the gap until there isn't any
  //With this, the gap starts as half of the tmpArray length, and then half of that every time
  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    //Do a insertion sort for each of the section the gap ends up dividing

    for (let i = 0; i < gap; i++) {
      order.push([-1, null, null, i]);
    }

    //Only push gap
    order.push([gap, -1, null, null]);
    for (let i = gap; i < n; i++) {
      //This is the insertion sort to sort the section into order
      let j;

      for (j = i; j >= gap; j = j - gap) {
        if (tmpArr[isAsc ? j - gap : j] > tmpArr[isAsc ? j : j - gap]) {
          order.push([j, j - gap, null, null]);
          swap(tmpArr, j, j - gap);
          order.push([j, j - gap, tmpArr.slice(), null]);
        } else break;
      }
    }
  }

  //after the sorting complete, push sorted items to array
  for (let i = tmpArr.length; i >= 0; i--) {
    order.push([null, null, null, i]);
  }

  return order;
};

export default ShellSort;
