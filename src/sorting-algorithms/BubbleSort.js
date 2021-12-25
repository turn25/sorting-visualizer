import swap from "../util/swap";

const BubbleSort = (array) => {
  const tmpArr = array.slice();
  const order = [];

  let i, j;

  for (i = 0; i < tmpArr.length; i++) {
    // length decrease by 1 because j is compared to j + 1
    // after each iteration, the greatest value of the array becomes the last index of the array so decrease length by i (i = sorted items)
    for (j = 0; j < tmpArr.length - i - 1; j++) {
      // index1, index2, array, sorted index
      order.push([j, j + 1, null, null]); // compare
      if (tmpArr[j] > tmpArr[j + 1]) {
        swap(tmpArr, j, j + 1);

        order.push([j, j + 1, tmpArr.slice(), null]); //swap
      }
    }
    order.push([null, null, null, j]); // get the j index (sorted index position)
  }

  return order;
};

export default BubbleSort;
