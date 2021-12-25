const checkArray = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i + 1]) {
      if (arr[i] > arr[i + 1]) {
        return false;
      }
    }
  }
  return true;
};

export default checkArray;
