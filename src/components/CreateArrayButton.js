import React, { useState, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import "../Transition.css";
import useClickOutside from "../hook/useClickOutside";

export default function CreateArrayButton({
  value,
  handleOnchange,
  setArray,
  setInputArray,
  isDisabled,
  reset,
}) {
  const [isShowInput, setIsShowInput] = useState(false);
  const [isShowError, setIsShowError] = useState(false);
  const createInputRef = useRef();

  //detect click/tap outside input form
  useClickOutside(createInputRef, setIsShowInput);

  // for format buttun
  const handleMatchNumber = (e) => {
    e.preventDefault();
    const newArr = value.match(/\d+/g);
    setInputArray(newArr[0]);
    for (let i = 1; i < newArr.length; i++) {
      setInputArray((prevInput) => prevInput + "," + newArr[i]);
    }
  };

  // save button
  const handleOnSave = (e) => {
    e.preventDefault();

    // match characters
    const charArr = value.match(/[^\d\W]+/g);
    // match numbers
    const newArr = value.match(/\d+/g);

    if (charArr) {
      setIsShowError(true);
      setTimeout(() => setIsShowError(false), 4000);
      return;
    }
    // must have arr length
    if (value && newArr) {
      for (let i = 0; i < newArr.length; i++) {
        if (newArr[i] > 100 || newArr[i] < 10) {
          setIsShowError(true);
          setTimeout(() => setIsShowError(false), 4000);
          return;
        }
      }

      // update new values in input form
      setInputArray(newArr[0]);
      for (let i = 1; i < newArr.length; i++) {
        setInputArray((prevInput) => prevInput + "," + newArr[i]);
      }

      // update state value
      setIsShowInput(false);
      reset();
      setArray(newArr);
    } else {
      setIsShowError(true);
      setTimeout(() => setIsShowError(false), 4000);
      return;
    }
  };

  // handle change btn class when error
  const handleErrorBtnClass = () => {
    if (isDisabled)
      return "disabled:bg-gray-400 disabled:hover:bg-gray-500 disabled:cursor-not-allowed";
    if (isShowError) return "bg-red-400 hover:bg-red-500 cursor-pointer";
    else return "bg-blue-400 hover:bg-blue-500";
  };

  // handle press close input form button
  const handleCloseForm = (e) => {
    e.preventDefault();
    setIsShowInput(false);
  };

  return (
    <div
      className="fixed bottom-10 left-4 gap-x-2 flex items-center h-32 z-10"
      ref={createInputRef}
    >
      <div className="h-full flex items-center">
        <button
          onClick={() => setIsShowInput(!isShowInput)}
          className={`z-20 opacity-80 md:opacity-50 hover:opacity-100 ${
            isShowInput && "opacity-90"
          } transition-all ease-in`}
        >
          <span
            className={`material-icons h-8 w-8 ${
              isShowInput ? "" : "animate-customBounce"
            } text-gray-800 md:text-gray-400 text-5xl bg-transparent shadow-lg`}
          >
            add_circle
          </span>
        </button>
      </div>

      <div>
        <CSSTransition
          in={isShowInput}
          timeout={300}
          classNames="pop-up"
          unmountOnExit
          onExit={() => setIsShowError(false)}
        >
          <form className="bg-gray-300 md:h-fit w-[24rem] smMobile:w-[12rem] mobile:w-[16rem] px-1 pb-1 pt-3 ml-4 rounded-md flex flex-col shadow-lg relative">
            <button onClick={handleCloseForm}>
              <span
                className={`material-icons text-3xl absolute right-3 smMobile:right-0 mobile:right-0 top-0 text-gray-800/30 hover:text-gray-800 transition ease-in`}
              >
                cancel
              </span>
            </button>
            <label className="font-semibold flex justify-center align-center text-gray-700 my-0.5">
              <span className="material-icons mx-1 text-gray-600">
                keyboard
              </span>
              Input Numbers:
            </label>
            <div className="flex flex-row p-0 m-0 relative">
              <input
                type="text"
                name="inputArray"
                value={value}
                placeholder="Input array..."
                onChange={handleOnchange}
                disabled={isDisabled}
                autoComplete="off"
                className={`flex-1 mx-4 my-1 py-1 pr-8 w-32 smMobile:w-full border-transparent outline-none border-b-2 rounded-t-md rounded-sm px-3 
              focus:outline-none focus:ring-0 focus:border-blue-400 ${
                isShowError && "focus:border-red-400"
              } cursor-pointer disabled:bg-gray-400
              disabled:text-gray-300 disabled:cursor-not-allowed transition-all ease-in`}
              />
              <button className="relative group">
                <span
                  onClick={handleMatchNumber}
                  className="material-icons absolute top-2.5 right-6 text-[1.25rem] opacity-20 cursor-pointer"
                >
                  edit
                </span>
                <span
                  className="absolute hidden md:block top-50 -left-2 translate-y-[-50%] text-white text-sm font-semibold
                  rounded-lg h-fit w-32 p-2 bg-blue-400 scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 transitio duration-100"
                >
                  Format An Array
                </span>
              </button>
            </div>
            <button
              onClick={handleOnSave}
              disabled={isDisabled || isShowError}
              className={`p-2 rounded-md text-white mx-4 my-1.5 ${handleErrorBtnClass()} transition-all ease-in`}
            >
              {isShowError ? "Invalid Input" : "Go"}
            </button>
          </form>
        </CSSTransition>

        {/* Error Message */}

        <CSSTransition
          in={isShowError}
          timeout={300}
          classNames="pop-up"
          unmountOnExit
        >
          <div className="bg-red-400 w-[24rem] right-0 py-2 flex justify-center items-center absolute -top-12 rounded-lg text-white cursor-pointer">
            <span className="material-icons">error</span>
            <p className="font-bold">Enter a number between 0 and 100</p>
          </div>
        </CSSTransition>
      </div>
    </div>
  );
}
