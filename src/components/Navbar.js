import React, { useState } from "react";
import Slider from "./Slider";
import Button from "./Button";

const SortAlgos = [
  [{ id: 1, name: "Bubble Sort", value: "BubbleSort" }],
  [{ id: 2, name: "Insertion Sort", value: "InsertionSort" }],
  [{ id: 3, name: "Selection Sort", value: "SelectionSort" }],
  [{ id: 4, name: "Shell Sort", value: "ShellSort" }],
];

export default function Navbar({
  arrayLength,
  handleArrayLength,
  sortSpeed,
  handleSortSpeed,
  randomArr,
  setSortAlgo,
  handleSort,
  isDisabled,
  isAsc,
  handleToggleAsc,
  isChangeSortAlgo,
  setIsChangeSortAlgo,
}) {
  const [sortAlgoIdx, setSortAlgoIdx] = useState(0);
  const [animationDirection, setAnimationDirection] = useState("");

  return (
    <nav className="flex justify-center items-center min-h-[100px] p-4 bg-gray-700 text-white flex-col md:flex-row md:justify-between gap-y-1 drop-shadow-lg">
      <div className="flex-1 flex items-center cursor-default">
        <span className="material-icons text-2xl font-bold px-1">sort</span>
        <h1 className="font-bold text-3xl">Sorting Visualizer</h1>
      </div>

      <div className="flex-1 flex items-center justify-center justify gap-x-4">
        <Button
          placeHolder="Random Array"
          handleOnClick={randomArr}
          disabled={isDisabled}
        />

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

            setIsChangeSortAlgo(!isChangeSortAlgo);

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
            disabled={isDisabled}
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

            setIsChangeSortAlgo(!isChangeSortAlgo);

            //set animation direction
            setAnimationDirection("right");
          }}
          className="flex items-center animate-customWiggleRight"
          disabled={isDisabled}
        >
          <span className="material-icons">chevron_right</span>
        </button>
        <Button
          placeHolder="Sort"
          handleOnClick={handleSort}
          disabled={isDisabled}
        />
      </div>

      <div className="flex-1 flex items-center justify-end gap-x-5 h-full">
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
          disabled={isDisabled}
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
        <label className="flex flex-col justify-center items-center cursor-pointer w-[7.5rem]">
          <div
            className={`text-gray-${
              isAsc ? "100 font-medium" : "500 font-bold"
            } transition ease-in`}
          >
            Ascending
          </div>
          <div className="relative my-1">
            <input
              type="checkbox"
              value={isAsc}
              onChange={handleToggleAsc}
              disabled={isDisabled}
              className="sr-only"
              checked={isAsc}
            />
            <div className="bar w-10 h-4 bg-gray-200 rounded-full shadow-inner"></div>
            <div className="dot absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition checked:translate-x-10"></div>
          </div>
          <div
            className={`text-gray-${
              isAsc ? "500 font-bold" : "100 font-medium"
            } transition ease-in`}
          >
            Descending
          </div>
        </label>
      </div>
    </nav>
  );
}
