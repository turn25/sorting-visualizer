import React, { useState, useEffect } from "react";

//Components
import Navbar from "./Navbar";
import ArrayList from "./ArrayList";
import Footer from "./Footer";
import ProgressBar from "./ProgressBar";
import CreateArrayButton from "./CreateArrayButton";
import Legend from "./Legend";

//Algorithms
import BubbleSort from "../sorting-algorithms/BubbleSort";
import InsertionSort from "../sorting-algorithms/InsertionSort";
import SelectionSort from "../sorting-algorithms/SelectionSort";
import ShellSort from "../sorting-algorithms/ShellSort";

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
  const [sortAlgo, setSortAlgo] = useState("BubbleSort");
  const [swap, setSwap] = useState([]);
  const [compare, setCompare] = useState([]);
  const [sortedIndex, setSortedIndex] = useState([]);
  const [sortedArray, setSortedArray] = useState([]);
  const [progressBarPercent, setProgressBarPercent] = useState(0);
  const [isSorted, setIsSorted] = useState(false);
  const [isSorting, setIsSorting] = useState(true);
  const [inputArray, setInputArray] = useState("10,52,13,40,23");
  const [isAsc, setIsAsc] = useState(true);

  const resetSortState = () => {
    setSortedIndex([]);
    setSortedArray([]);
    setProgressBarPercent(0);
    setIsSorted(false);
    setIsSorting(false);
  };

  //Generate Random Array From 1 To Array Length
  const generateRandomArr = (arrayLength) => {
    resetSortState();

    const tempArr = [];
    for (let i = 0; i < arrayLength; i++) {
      tempArr.push(generateRandomNumber(10, 100));
    }
    shuffleArray(tempArr);
    setArray(tempArr);
  };

  const handleSort = (algo) => {
    if (isSorted || checkArray(array, isAsc)) return;

    resetSortState();

    let orders;
    switch (algo) {
      case "BubbleSort":
        orders = BubbleSort(array, isAsc);
        break;
      case "InsertionSort":
        orders = InsertionSort(array, isAsc);
        break;
      case "SelectionSort":
        orders = SelectionSort(array, isAsc);
        break;
      case "ShellSort":
        orders = ShellSort(array, isAsc);
        handleShellSortOrder(orders);
        handleProgressBar(orders);
        handleSortedArray(orders);
        handleResetSortState(orders);
        return;

      default:
        console.log("Error");
        return;
    }

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
        if (index !== null)
          setSortedIndex((prevIndex) => [...prevIndex, index]);

        // if order[i] return an arr
        if (arr) {
          setArray(arr);
          // if have index1 or index2 => setSwap to change bar color (swap color)
          if (idx1 !== null || idx2 !== null) setSwap([idx1, idx2]);
        }
      }, orderIdx * sortSpeed);
    });
  };

  const handleShellSortOrder = (order) => {
    setIsSorting(true);
    setIsSorted(false);

    //destructuring the data from the i-th order item
    order.forEach(([idx1, idx2, arr, index], orderIdx) => {
      //set Timeout increse for each item
      setTimeout(() => {
        if (idx1 !== null && idx2 !== 1) setCompare([idx1, idx2]); //set compared bars color (compare color)
        setSwap([]); // no swap

        //for shellsort, clear bar color change
        if (idx1) setSortedIndex([]);

        // add all sorted index to sortedIndex array to change bar color (sorted color)
        if (index !== null)
          setSortedIndex((prevIndex) => [...prevIndex, index]);

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

  //initial array & handle change array when change value in Array Length slider
  useEffect(() => {
    generateRandomArr(arrayLength);
  }, [arrayLength]);

  //handle change slider value
  const handleArrayLength = (e) => {
    setArrayLength(e.target.value);
  };

  //handle change sort speed, set the delay time
  //reverse the slider direction, min=500 max=20 in this case
  const handleSortSpeed = (e) => {
    setSortSpeed(Math.ceil(500 / Number(e.target.value)));
  };

  //handle change input array value
  const handleInputArray = (e) => {
    setInputArray(e.target.value);
  };

  //handle toggle order switch
  const handleToggleAsc = () => {
    setIsAsc(!isAsc);
    setIsSorted(false);
    setIsSorting(false);
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
        setSortAlgo={setSortAlgo}
        handleSort={() => {
          handleSort(sortAlgo);
        }}
        isDisabled={isSorting}
        isAsc={isAsc}
        handleToggleAsc={handleToggleAsc}
      />
      <ArrayList
        array={array}
        compare={compare}
        swap={swap}
        sortedIndex={sortedIndex}
        sortedArray={sortedArray}
      />
      <ProgressBar
        progressBarPercent={progressBarPercent}
        arrayLength={array.length}
      />
      <CreateArrayButton
        value={inputArray}
        setInputArray={setInputArray}
        handleOnchange={handleInputArray}
        setArray={setArray}
        isDisabled={isSorting}
        reset={resetSortState}
      />
      <Legend isSorted={isSorted} sortAlgo={sortAlgo} />
      <Footer />
    </div>
  );
}
