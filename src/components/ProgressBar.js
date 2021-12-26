import React from "react";

export default function ProgressBar({ progressBarPercent, arrayLength }) {
  const colorTransition = `${progressBarPercent < 100 ? "green" : "teal"}`;
  const exitTransition = `${
    progressBarPercent === 0 && "transition-all ease-out"
  }`;
  //change from transition to transition-all (include transition-width)
  const progressBarWidthTransition = `${
    arrayLength >= 25 ? "transition-all" : "transition"
  }`;

  return (
    <div className="w-100 h-5 bg-blue-400 mx-[calc(1rem+0.2%)] relative">
      <div
        className={`h-full bg-${colorTransition}-400 ${progressBarWidthTransition}  ease-in duration-500 ${exitTransition}  `}
        style={{ width: `${progressBarPercent}%` }}
      />
      <p className="absolute top-0 bottom-0 left-0 right-0 flex justify-center items-center font-semibold text-sm text-white cursor-default">
        {progressBarPercent}%
      </p>
    </div>
  );
}
