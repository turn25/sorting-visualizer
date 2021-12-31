import React, { useState, useEffect } from "react";

//Components
import Navbar from "./Navbar";
import ArrayList from "./ArrayList";
import Footer from "./Footer";
import ProgressBar from "./ProgressBar";
import CreateArrayButton from "./CreateArrayButton";
import Legend from "./Legend";
import AlertToast from "./AlertToast";
import SortingAlgoInfo from "./SortingAlgoInfo";
import Drawer from "./Drawer";

//Algorithms
import BubbleSort from "../sorting-algorithms/BubbleSort";
import InsertionSort from "../sorting-algorithms/InsertionSort";
import SelectionSort from "../sorting-algorithms/SelectionSort";
import ShellSort from "../sorting-algorithms/ShellSort";
import QuickSort from "../sorting-algorithms/QuickSort";

//Utils
import checkArray from "../utils/checkArray";
import generateRandomNumber from "../utils/generateRandomNumber";
import shuffleArray from "../utils/shuffleArray";

export default function SortingVisualizer() {
  //React State
  const [array, setArray] = useState([]);
  const [arrayLength, setArrayLength] = useState(30);
  const [sortSpeed, setSortSpeed] = useState(250);
  //options
  const [isAsc, setIsAsc] = useState(true);
  const [sortAlgo, setSortAlgo] = useState("BubbleSort");
  const [isChangeSortAlgo, setIsChangeSortAlgo] = useState(false);
  const [sortAlgoIdx, setSortAlgoIdx] = useState(0);
  //change bars color
  const [swap, setSwap] = useState([]);
  const [compare, setCompare] = useState([]);
  const [sortedIndex, setSortedIndex] = useState([]);
  const [sortedArray, setSortedArray] = useState([]);
  //current state
  const [isSorted, setIsSorted] = useState(false);
  const [isSorting, setIsSorting] = useState(true);
  const [isPause, setIsPause] = useState(false);
  const [inputArray, setInputArray] = useState("10,52,13,40,23"); //input form
  const [sortTimeDelay, setSortTimeDelay] = useState(0); //time counter
  const [timeoutIds, setTimeoutIds] = useState([]); //clear timeout
  const [orderStep, setOrderStep] = useState(0);
  const [currentOrders, setCurrentOrders] = useState([]);
  //isShow
  const [isShowAlert, setIsShowAlert] = useState(false);
  const [isShowDrawer, setIsShowDrawer] = useState(false);

  //initial array & handle change array when change value in Array Length slider
  useEffect(() => {
    generateRandomArr(arrayLength);
  }, [arrayLength]);

  const resetSortState = () => {
    setCompare([]);
    setSortedIndex([]);
    setSortedArray([]);

    setSortTimeDelay(0);
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

  //Check if array is already sorted
  const handleSort = (algo) => {
    if (isSorted || checkArray(array, isAsc)) {
      setIsShowAlert(true);
      setIsSorted(true);
      setIsSorting(true);
      setTimeout(() => {
        setIsShowAlert(false);
        setIsSorting(false);
      }, 1500);
      return;
    }

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
        break;
      case "QuickSort":
        orders = QuickSort(array, isAsc);
        break;

      default:
        console.log("Error");
        return;
    }

    //save current orders
    setCurrentOrders([...orders]);

    handleSortOrder(orders);
  };

  const handleSortOrder = (order) => {
    setTimeoutIds([]);
    setIsSorting(true);
    setIsSorted(false);

    //destructuring the data from the i-th order item
    order.forEach(([idx1, idx2, arr, index], orderIdx) => {
      //set Timeout increse for each item
      let timeoutId = setTimeout(() => {
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

        // save sort visualizer time
        setSortTimeDelay((prevTime) => prevTime + sortSpeed);

        // save current step
        setOrderStep((step) => step + 1);

        // cleanup
        if (orderIdx === order.length - 1) {
          handleSortedArray(order);
          handleResetSortState(order);
        }
      }, orderIdx * sortSpeed);
      // add new timeoutid to use clearTimeout in pause function
      setTimeoutIds((timeoutIds) => [...timeoutIds, timeoutId]);
    });
  };

  // handle highlight bar after sorting complete
  const handleSortedArray = (order) => {
    for (let i = 0; i < arrayLength; i++) {
      setTimeout(() => {
        setSortedArray((prevIndex) => [...prevIndex, i]);
      }, i * 15);
    }
  };

  // reset sort state after sorting complete
  const handleResetSortState = (order) => {
    const delayTime = arrayLength * 15;
    setTimeout(() => {
      setIsSorting(false);
      setIsSorted(true);
    }, delayTime);
  };

  // ACTIONS
  // pause sorting visualizer
  const pauseSorting = () => {
    setIsPause(true);
    timeoutIds.forEach((timeoutId) => {
      clearTimeout(timeoutId);
    });
    setTimeoutIds([]);
    setIsSorting(false);
  };

  // resume sorting visualizer
  const continueSorting = () => {
    setIsPause(false);
    const tmpOrders = currentOrders.slice(orderStep);
    handleSortOrder(tmpOrders);
    // handleProgressBar(tmpOrders);
  };

  //handle change slider value
  const handleArrayLength = (e) => {
    setArrayLength(e.target.value);
  };

  //handle change sort speed, set the delay time
  //reverse the slider direction, min=500 max=10 in this case
  const handleSortSpeed = (e) => {
    setSortSpeed(Math.abs(e.target.value - 500) + 10);
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
    <div className="overflow-y-hidden scrollbar-hide noselect">
      <AlertToast isShowAlert={isShowAlert} />
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
        isPause={isPause}
        isAsc={isAsc}
        handleToggleAsc={handleToggleAsc}
        setIsChangeSortAlgo={setIsChangeSortAlgo}
        sortAlgoIdx={sortAlgoIdx}
        setSortAlgoIdx={setSortAlgoIdx}
        setSortTimeDelay={setSortTimeDelay}
        setIsShowDrawer={setIsShowDrawer}
      />
      <Drawer
        arrayLength={arrayLength}
        handleArrayLength={handleArrayLength}
        sortSpeed={sortSpeed}
        handleSortSpeed={handleSortSpeed}
        randomArr={() => {
          generateRandomArr(arrayLength);
        }}
        sortAlgo={sortAlgo}
        setSortAlgo={setSortAlgo}
        handleSort={() => {
          handleSort(sortAlgo);
        }}
        isDisabled={isSorting}
        isAsc={isAsc}
        handleToggleAsc={handleToggleAsc}
        isShowDrawer={isShowDrawer}
        setIsShowDrawer={setIsShowDrawer}
        sortAlgoIdx={sortAlgoIdx}
        setSortAlgoIdx={setSortAlgoIdx}
      />
      <button
        onClick={continueSorting}
        className="pt-[120px] p-4 bg-gray-500 text-white text-5xl font-bold"
      >
        CONTINUE
      </button>
      <button
        onClick={pauseSorting}
        className="pt-[120px] p-4 bg-gray-500 text-white text-5xl font-bold"
        disabled={!isSorting}
      >
        STOP
      </button>

      <ArrayList
        array={array}
        compare={compare}
        swap={swap}
        sortedIndex={sortedIndex}
        sortedArray={sortedArray}
      />
      <ProgressBar orderStep={orderStep} currentOrders={currentOrders} />
      <CreateArrayButton
        value={inputArray}
        setInputArray={setInputArray}
        handleOnchange={handleInputArray}
        setArray={setArray}
        isDisabled={isSorting}
        reset={resetSortState}
      />
      <Legend
        isSorted={isSorted}
        sortAlgo={sortAlgo}
        isChangeSortAlgo={isChangeSortAlgo}
      />
      <SortingAlgoInfo
        sortAlgoIdx={sortAlgoIdx}
        sortTimeDelay={sortTimeDelay}
        isChangeSortAlgo={isChangeSortAlgo}
      />
      <Footer />
    </div>
  );
}
