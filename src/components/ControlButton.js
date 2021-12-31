import React from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import "../Transition.css";

export default function ControlButton({
  isSorting,
  isSorted,
  isPause,
  handleSort,
  pauseSorting,
  continueSorting,
}) {
  return (
    <div className="w-full h-[80px] flex justify-center items-center">
      <SwitchTransition mode="out-in">
        <CSSTransition
          key={isPause}
          addEndListener={(node, done) => {
            node.addEventListener("transitionend", done, false);
          }}
          classNames="fade-left"
        >
          <button
            //sort the array for the first time click on this button (start sorting visualizer)
            onClick={
              !isPause && !isSorting
                ? handleSort
                : isPause
                ? continueSorting
                : pauseSorting
            }
            disabled={isSorted} // disable when the array is sorted or (isPause===false and isSorting === false)
            className="flex items-center text-blue-400 disabled:text-gray-400"
          >
            {/* show the play button on init */}
            <span className="material-icons text-6xl">
              {isPause ? "play" : isSorting ? "pause" : "play"}
              _circle_filled
            </span>
          </button>
        </CSSTransition>
      </SwitchTransition>
    </div>
  );
}
