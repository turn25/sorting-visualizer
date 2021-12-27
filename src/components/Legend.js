import React from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import "../Transition.css";

export default function Legend({ isSorted, sortAlgo, isChangeSortAlgo }) {
  const sortedColor = (sortedColor, unSortedColor) => {
    return isSorted ? sortedColor : unSortedColor;
  };

  return (
    <div className=" h-40 px-10 max-w-[840px] mx-auto flex flex-col gap-y-6 mt-4">
      <form className="inline-flex gap-x-2 items-center justify-center transition-all ease-in">
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
            {sortAlgo === "ShellSort" && (
              <div className="flex flex-col items-center transition ease-in duration-200 hover:-translate-y-1 hover:opacity-80">
                <span className="bg-amber-400 h-10 w-10 rounded-md" />
                <p className="font-semibold text-amber-600">Gap</p>
              </div>
            )}

            <div className="flex flex-col items-center transition ease-in duration-200 hover:-translate-y-1 hover:opacity-80">
              <span className="bg-violet-400 h-10 w-10 rounded-md" />
              <p className="font-semibold text-violet-600">Compare</p>
            </div>
            <div className="flex flex-col items-center transition ease-in duration-200 hover:-translate-y-1 hover:opacity-80">
              <span className="bg-rose-400 h-10 w-10 rounded-md" />
              <p className="font-semibold text-rose-600">Swap</p>
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
                )}-500`}
              >
                Sorted
              </p>
            </div>
          </div>
        </CSSTransition>
      </SwitchTransition>
    </div>
  );
}
