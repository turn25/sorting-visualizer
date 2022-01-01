import React from "react";

export default function ProgressBar({ progressBarPercent }) {
  const currProgressBarPercent =
    progressBarPercent > 0 ? progressBarPercent.toFixed(2) : 0;
  const colorTransition = `${progressBarPercent < 100 ? "green" : "teal"}`;
  const exitTransition = `${
    currProgressBarPercent === 0
      ? "transition-all ease-out"
      : "transition ease-in"
  }`;

  return (
    <div className="w-100 h-5 bg-blue-400 mx-[calc(1rem+0.2%)] relative">
      <div
        className={`h-full bg-${colorTransition}-400 ${exitTransition} duration-400`}
        style={{ width: `${progressBarPercent}%` }}
      />
      <p className="absolute top-0 bottom-0 left-0 right-0 flex justify-center items-center font-semibold text-sm text-white cursor-default">
        {currProgressBarPercent}%
      </p>
    </div>
  );
}
