import swap from "./swap";

const shuffleArray = (array) => {
  let currentIdx, randomIdx;
  currentIdx = array.length;
  //while there remain elements to shuffle
  while (currentIdx) {
    //pick a remaining element
    randomIdx = Math.floor(Math.random() * currentIdx);
    currentIdx--;
    //swap position
    swap(array, randomIdx, currentIdx);
  }
  return array;
};

export default shuffleArray;
