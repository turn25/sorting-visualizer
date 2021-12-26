import React, { useState } from "react";
import Slider from "./Slider";
import Button from "./Button";

const SortAlgos = [
  [{ id: 1, name: "Bubble Sort", value: "BubbleSort" }],
  [{ id: 2, name: "Insertion Sort", value: "InsertionSort" }],
  [{ id: 3, name: "Selection Sort", value: "SelectionSort" }],
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
}) {
  const [sortAlgoIdx, setSortAlgoIdx] = useState(0);

  return (
    <nav className="flex justify-center items-center min-h-[100px] p-4 bg-gray-700 text-white flex-col md:flex-row md:justify-between gap-y-1 drop-shadow-lg    ">
      <div className="flex items-center">
        <span className="material-icons text-2xl font-bold px-1">sort</span>
        <h1 className="font-bold text-3xl">Sorting Visualizer</h1>
      </div>

      <div className="flex items-center justify-end gap-x-4">
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
          }}
          className="flex items-center animate-customWiggleLeft disabled:cursor-not-allowed"
          disabled={isDisabled}
        >
          <span className="material-icons">chevron_left</span>
        </button>
        {SortAlgos[sortAlgoIdx].map((algo, index) => (
          <Button
            key={index}
            placeHolder={algo.name}
            handleOnClick={() => {
              setSortAlgo(algo.value);
            }}
            disabled={isDisabled}
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
          }}
          className="flex items-center animate-customWiggleRight disabled:cursor-not-allowed"
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

      <div className="flex items-center gap-x-5">
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
          minValue="1"
          maxValue="25"
          leftValueText="Slow"
          rightValueText="Fast"
          value={Math.ceil(500 / sortSpeed)}
          step="1"
          handleOnChange={handleSortSpeed}
          disabled={isDisabled}
        />
      </div>
    </nav>
  );
}
