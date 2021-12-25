import React, { useState, useEffect } from "react";

//Components
import Navbar from "./Navbar";
import ArrayList from "./ArrayList";
import Footer from "./Footer";
import ProgressBar from "./ProgressBar";

//Algorithms
import BubbleSort from "../sorting-algorithms/BubbleSort";

//Util
import swap from "../utils/swap";
import checkArray from "../utils/checkArray";

//Generate Random Number & Shuffle Array
const generateRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

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

export default function SortingVisualizer() {
  //React State
  const [array, setArray] = useState([]);
  const [arrayLength, setArrayLength] = useState(30);
  const [sortSpeed, setSortSpeed] = useState(50);
  const [swap, setSwap] = useState([]);
  const [compare, setCompare] = useState([]);
  const [sortedIndex, setSortedIndex] = useState([]);
  const [sortedArray, setSortedArray] = useState([]);
  const [progressBarPercent, setProgressBarPercent] = useState(0);
  const [isSorted, setIsSorted] = useState(false);
  const [isSorting, setIsSorting] = useState(true);

  //Generate Random Array From 1 To Array Length
  const generateRandomArr = (arrayLength) => {
    setSortedIndex([]);
    setSortedArray([]);
    setProgressBarPercent(0);
    setIsSorted(false);
    setIsSorting(false);

    const tempArr = [];
    for (let i = 0; i < arrayLength; i++) {
      tempArr.push(generateRandomNumber(10, 100));
    }
    shuffleArray(tempArr);
    setArray(tempArr);
  };

  const handleSort = () => {
    if (isSorted || checkArray(array)) return;
    const orders = BubbleSort(array);
    handleSortOrder(orders);
    handleProgressBar(orders);
    handleSortedArray(orders);
    handleResetSortState(orders);
  };

  const handleSortOrder = (order) => {
    setIsSorting(true);
    setIsSorted(false);

    //destructuring the data from the i-th order item
    order.forEach(([idx1, idx2, arr, index], orderIdx) => {
      //set Timeout increse for each item
      setTimeout(() => {
        setCompare([idx1, idx2]); //set compared bars color (compare color)
        setSwap([]); // no swap

        // add all sorted index to sortedIndex array to change bar color (sorted color)
        if (index !== null) {
          setSortedIndex((prevIndex) => [...prevIndex, index]);
        }

        // if order[i] return an arr
        if (arr) {
          setArray(arr);
          // if have index1 or index2 => setSwap to change bar color (swap color)
          if (idx1 !== null || idx2 !== null) setSwap([idx1, idx2]);
        }
      }, orderIdx * sortSpeed);
    });
  };

  // handle highlight bar after sorting complete
  const handleSortedArray = (order) => {
    setTimeout(() => {
      for (let i = 0; i < array.length; i++) {
        setTimeout(() => {
          setSortedArray((prevIndex) => [...prevIndex, i]);
        }, i * 15);
      }
    }, order.length * sortSpeed);
  };

  // reset sort state after sorting complete
  const handleResetSortState = (order) => {
    //after "handleSortOrder() + handleSortedArray()" animations complete
    const delayTime = order.length * sortSpeed + arrayLength * 15;
    setTimeout(() => {
      setIsSorting(false);
      setIsSorted(true);
    }, delayTime);
  };

  // handle sorting progress bar
  const handleProgressBar = (order) => {
    const step = order.length / 100;
    //update progress bar
    for (let i = 0; i <= order.length; i = i + step) {
      setTimeout(() => {
        setProgressBarPercent(Math.ceil((i / order.length) * 100));
      }, i * sortSpeed);
    }
  };

  const handleSortedProgressBar = (order) => {
    for (let i = 0; i < 200; i++) {
      setTimeout(() => {
        setProgressBarPercent(i);
      }, i * 100);
    }
  };

  //initial array & handle change array when change value in Array Length slider
  useEffect(() => {
    generateRandomArr(arrayLength);
  }, [arrayLength]);

  //handle change slider value
  const handleArrayLength = (e) => {
    setArrayLength(e.target.value);
  };

  //hande change sort speed, set the delay time
  //reverse the slider direction, min=500 max=20 in this case
  const handleSortSpeed = (e) => {
    setSortSpeed(Math.ceil(500 / Number(e.target.value)));
  };

  return (
    <div className="h-full w-full">
      <Navbar
        arrayLength={arrayLength}
        handleArrayLength={handleArrayLength}
        sortSpeed={sortSpeed}
        handleSortSpeed={handleSortSpeed}
        randomArr={() => {
          generateRandomArr(arrayLength);
        }}
        handleSort={handleSort}
        isDisabled={isSorting}
      />
      <button className="p-4 bg-gray-400">{sortSpeed}</button>
      <ArrayList
        array={array}
        compare={compare}
        swap={swap}
        sortedIndex={sortedIndex}
        sortedArray={sortedArray}
      />
      <ProgressBar
        progressBarPercent={progressBarPercent}
        arrayLength={arrayLength}
      />
      <Footer />
    </div>
  );
}
