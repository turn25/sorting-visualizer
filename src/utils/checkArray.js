const checkArray = (arr, isAsc) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i + 1]) {
      // check sort -> ascending order if true, sort descending order if false
      if (arr[isAsc ? i : i + 1] > arr[isAsc ? i + 1 : i]) {
        return false;
      }
    }
  }
  return true;
};

export default checkArray;
