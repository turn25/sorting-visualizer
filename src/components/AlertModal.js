import React from "react";
import { CSSTransition } from "react-transition-group";
import "../Transition.css";

export default function AlertModal({ isShowAlert }) {
  return (
    <div className="flex justify-center items-center h-fit w-fit fixed top-28 left-[50%] -translate-x-[50%] z-10 cursor-pointer">
      <CSSTransition
        in={isShowAlert}
        timeout={300}
        classNames="pop-up"
        unmountOnExit
      >
        <div className="p-4 bg-indigo-400 rounded-lg">
          <h1 className="text-white text-xl md:text-4xl font-bold text-center">
            The array is already sorted !!!
          </h1>
        </div>
      </CSSTransition>
    </div>
  );
}
