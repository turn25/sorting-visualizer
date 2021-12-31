import React, { useState } from "react";
import Slider from "./Slider";
import Button from "./Button";
import ToggleSwitch from "./ToggleSwitch";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import "../Transition.css";

// Sort Algos Info Data
import SortAlgos from "../SortAlgo";

export default function Navbar({
  arrayLength,
  handleArrayLength,
  sortSpeed,
  handleSortSpeed,
  randomArr,
  setSortAlgo,
  handleSort,
  isDisabled,
  isPause,
  isAsc,
  handleToggleAsc,
  setIsChangeSortAlgo,
  sortAlgoIdx,
  setSortAlgoIdx,
  setSortTimeDelay,
  setIsShowDrawer,
  pauseSorting,
  continueSorting,
  isSorted,
}) {
  const [animationDirection, setAnimationDirection] = useState("");

  return (
    <nav className="flex justify-center items-center min-h-[100px] p-4 bg-gray-700/90 rounded-b-sm backdrop-blur-md text-white flex-col md:flex-row md:justify-between gap-y-1 shadow-navbar fixed top-0 w-full z-10">
      <div className="flex-1 flex items-center cursor-default">
        <button
          onClick={() => setIsShowDrawer((isShowDrawer) => !isShowDrawer)}
          className="block md:hidden absolute left-4 top-0 translate-y-[50%]"
        >
          <span className="material-icons text-4xl rounded-full py-1 px-1.5 hover:bg-gray-900 focus:bg-gray-900 transition ease-in">
            menu
          </span>
        </button>
        <span className="material-icons hidden md:block text-lg lg:text-2xl font-bold px-1">
          sort
        </span>
        <h1 className="font-bold text-3xl">Sorting Visualizer</h1>
      </div>

      <div className="flex-1 hidden md:flex items-center justify-center justify gap-x-4">
        <Button placeHolder="Random Array" handleOnClick={randomArr} />

        {/* handle change sort algo */}
        <button
          onClick={() => {
            const currentSortAlgoIdx =
              sortAlgoIdx === 0 ? SortAlgos.length - 1 : sortAlgoIdx - 1; // if algoIdx === 0 length then set algo = algosLength
            // set sort algo idx
            setSortAlgoIdx(currentSortAlgoIdx);

            // set sort algo
            const [index] = SortAlgos[currentSortAlgoIdx];
            setSortAlgo(index.value);

            setSortTimeDelay(0);
            setIsChangeSortAlgo((isChangeSortAlgo) => !isChangeSortAlgo);

            isPause && randomArr();

            //set animation direction
            setAnimationDirection("left");
          }}
          className="flex items-center animate-customWiggleLeft"
          disabled={isDisabled}
        >
          <span className="material-icons">chevron_left</span>
        </button>
        {SortAlgos[sortAlgoIdx].map(({ id, name }) => (
          <Button
            key={id}
            placeHolder={name}
            handleOnClick={() => handleSort()}
            disabled={isDisabled || isPause}
            animationDirection={animationDirection}
          />
        ))}
        <button
          onClick={() => {
            const currentSortAlgoIdx =
              sortAlgoIdx === SortAlgos.length - 1 ? 0 : sortAlgoIdx + 1;
            // set sort algo idx
            setSortAlgoIdx(currentSortAlgoIdx);

            // set sort algo
            const [index] = SortAlgos[currentSortAlgoIdx];
            setSortAlgo(index.value);

            setSortTimeDelay(0);
            setIsChangeSortAlgo((isChangeSortAlgo) => !isChangeSortAlgo);

            isPause && randomArr();

            //set animation direction
            setAnimationDirection("right");
          }}
          className="flex items-center animate-customWiggleRight"
          disabled={isDisabled}
        >
          <span className="material-icons">chevron_right</span>
        </button>
        <SwitchTransition mode="out-in">
          <CSSTransition
            key={isPause}
            addEndListener={(node, done) => {
              node.addEventListener("transitionend", done, false);
            }}
            classNames="fade-3"
          >
            <Button
              placeHolder={isPause ? "Continue" : "Pause"}
              handleOnClick={isPause ? continueSorting : pauseSorting}
              disabled={(!isPause && !isDisabled) || isSorted}
            />
          </CSSTransition>
        </SwitchTransition>
      </div>

      <div className="flex-1 hidden md:flex flex-col xl:flex-row items-end justify-center xl:items-center xl:justify-end gap-x-5 h-full">
        <Slider
          name="arrayLength"
          nameHeader="Array Length"
          minValue="10"
          maxValue="150"
          leftValueText="10"
          rightValueText="150"
          value={arrayLength}
          valuePlaceHolder={arrayLength}
          step="1"
          handleOnChange={handleArrayLength}
          disabled={isDisabled || isPause}
        />
        <Slider
          name="sortSpeed"
          nameHeader="Sort Speed"
          minValue="10"
          maxValue="500"
          leftValueText="Slow"
          rightValueText="Fast"
          value={Math.abs(sortSpeed - 500) + 10}
          step="1"
          handleOnChange={handleSortSpeed}
          disabled={isDisabled}
        />
        {/* Toggle Switch */}
        <ToggleSwitch
          isAsc={isAsc}
          handleToggleAsc={handleToggleAsc}
          isDisabled={isDisabled || isPause}
        />
      </div>
    </nav>
  );
}
