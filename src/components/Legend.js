import React from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import "../Transition.css";

import SortAlgos from "../SortAlgo";

export default function Legend({
  isSorted,
  isChangeSortAlgo,
  currentSortAlgoIdx,
}) {
  const sortedColor = (sortedColor, unSortedColor) => {
    return isSorted ? sortedColor : unSortedColor;
  };

  const [{ legends }] = SortAlgos[currentSortAlgoIdx];

  return (
    <div className="px-10 max-w-[840px] h-[calc(100vh-60vh-100px-120px)] mx-auto flex flex-col gap-y-6">
      <form className="inline-flex gap-x-2 items-center justify-center transition ease-in">
        <label className="inline-flex items-center transition ease-in duration-200 hover:-translate-y-1 hover:opacity-80">
          <input
            type="checkbox"
            checked={isSorted}
            onChange={() => {
              return;
            }}
            className="form-checkbox h-10 w-10 text-teal-400 rounded-md bg-blue-400 outline-teal-600 outline-2"
          />
          <span
            className={`ml-2 text-2xl font-semibold text-${sortedColor(
              "teal",
              "blue"
            )}-500`}
          >
            {isSorted ? "Sorted" : "Unsorted"}
          </span>
        </label>
      </form>

      <SwitchTransition mode="out-in">
        <CSSTransition
          key={isChangeSortAlgo}
          addEndListener={(node, done) => {
            node.addEventListener("transitionend", done, false);
          }}
          classNames="fade"
        >
          <div className="flex justify-between items-center">
            {legends[3] && (
              <div className="flex flex-col items-center transition ease-in duration-200 hover:-translate-y-1 hover:opacity-80">
                <span className="bg-amber-400 h-10 w-10 rounded-md" />
                <p className="font-semibold text-amber-600 cursor-default">
                  {legends[3]}
                </p>
              </div>
            )}

            <div className="flex flex-col items-center transition ease-in duration-200 hover:-translate-y-1 hover:opacity-80">
              <span className="bg-violet-400 h-10 w-10 rounded-md" />
              <p className="font-semibold text-violet-600 cursor-default">
                {legends[0]}
              </p>
            </div>
            <div className="flex flex-col items-center transition ease-in duration-200 hover:-translate-y-1 hover:opacity-80">
              <span className="bg-rose-400 h-10 w-10 rounded-md" />
              <p className="font-semibold text-rose-600 cursor-default">
                {legends[1]}
              </p>
            </div>
            <div className="flex flex-col items-center transition ease-in duration-200 hover:-translate-y-1 hover:opacity-80">
              <span
                className={`bg-${sortedColor(
                  "teal",
                  "green"
                )}-400 h-10 w-10 rounded-md transition-colors ease-in duration-500`}
              />
              <p
                className={`font-semibold text-${sortedColor(
                  "teal",
                  "green"
                )}-500 cursor-default`}
              >
                {legends[2]}
              </p>
            </div>
          </div>
        </CSSTransition>
      </SwitchTransition>
    </div>
  );
}
