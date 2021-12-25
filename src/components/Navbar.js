import React from "react";
import Slider from "./Slider";
import Button from "./Button";

export default function Navbar({
  arrayLength,
  handleArrayLength,
  sortSpeed,
  handleSortSpeed,
  randomArr,
  handleSort,
  isDisabled,
}) {
  return (
    <nav className="flex justify-center items-center min-h-[100px] p-4 bg-gray-700 text-white flex-col md:flex-row md:justify-between gap-y-1 drop-shadow-lg    ">
      <div className="flex items-center">
        <span className="material-icons text-2xl font-bold px-1">sort</span>
        <h1 className="font-bold text-3xl">Sorting Visualizer</h1>
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
      <div className="flex items-center justify-end gap-x-4">
        <Button
          placeHolder="Random Array"
          handleOnClick={randomArr}
          disabled={isDisabled}
        />
        <Button
          placeHolder="Bubble Sort"
          handleOnClick={handleSort}
          disabled={isDisabled}
        />
        <Button placeHolder="Insertion Sort" disabled={isDisabled} />
      </div>
    </nav>
  );
}
