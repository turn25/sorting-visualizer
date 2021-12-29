import React from "react";

export default function ToggleSwitch({ isAsc, handleToggleAsc, isDisabled }) {
  return (
    <label className="flex xl:flex-col justify-between xl:justify-center items-center cursor-pointer w-[7.5rem]">
      <div
        className={`hidden xl:block text-gray-${
          isAsc ? "100 font-medium" : "500 font-bold"
        } transition ease-in`}
      >
        Ascending
      </div>

      <div
        className={`xl:hidden text-gray-${
          isAsc ? "500 font-bold" : "100 font-medium"
        } transition ease-in`}
      >
        Desc
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
        className={`hidden xl:block text-gray-${
          isAsc ? "500 font-bold" : "100 font-medium"
        } transition ease-in`}
      >
        Descending
      </div>
      <div
        className={`xl:hidden text-gray-${
          isAsc ? "100 font-medium" : "500 font-bold"
        } transition ease-in`}
      >
        Asc
      </div>
    </label>
  );
}
