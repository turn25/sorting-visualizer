import React from "react";

export default function ProgressBar({ progressBarPercent }) {
  const colorTransition = `${progressBarPercent < 100 ? "green" : "teal"}`;

  return (
    <div className="w-100 h-5 bg-blue-400 mx-[calc(1rem+0.2%)] relative">
      <div
        className={`h-full bg-${colorTransition}-400 transition ease-in duration-400`}
        style={{ width: `${progressBarPercent}%` }}
      />
      <p className="absolute top-0 bottom-0 left-0 right-0 flex justify-center items-center font-semibold text-sm text-white cursor-default">
        {progressBarPercent > 0 ? progressBarPercent.toFixed(2) : 0}%
      </p>
    </div>
  );
}
