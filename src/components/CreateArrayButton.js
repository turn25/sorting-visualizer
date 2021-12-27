import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import "./CreateArrayButton.css";

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

  const handleShowInputForm = () => {
    setIsShowInput(!isShowInput);
    if (!isShowInput) setIsShowError(false);
  };

  const handleOnSave = (e) => {
    e.preventDefault();

    // match characters
    const charArr = value.match(/[^\d\W]+/g);
    // match numbers
    const newArr = value.match(/\d+/g);

    if (charArr) {
      setIsShowError(true);
      setTimeout(() => setIsShowError(false), 5000);
      return;
    }
    // must have arr length
    if (value && newArr) {
      for (let i = 0; i < newArr.length; i++) {
        if (newArr[i] > 100 || newArr[i] < 10) {
          setIsShowError(true);
          setTimeout(() => setIsShowError(false), 5000);
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
      setTimeout(() => setIsShowError(false), 5000);
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

  return (
    <div className="fixed bottom-10 left-4 gap-x-2 flex items-center h-32">
      <div className="h-full flex items-center">
        <button
          onClick={handleShowInputForm}
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
          classNames="alert"
          unmountOnExit
        >
          <form className="bg-gray-300 ml-4 h-fit w-[24rem] rounded-md flex flex-col p-1 shadow-lg ">
            <label className="font-semibold flex justify-center align-center text-gray-700 my-0.5">
              <span className="material-icons mx-1 text-gray-600">
                keyboard
              </span>
              Input Array Of Numbers:
            </label>
            <div className="flex flex-row p-0 m-0 relative">
              <input
                type="text"
                name="inputArray"
                value={value}
                placeholder="Input array..."
                onChange={handleOnchange}
                disabled={isDisabled}
                className={`flex-1 mx-4 my-1 py-1 pr-8 border-transparent outline-none border-b-2 rounded-t-md rounded-sm px-3 
              focus:outline-none focus:ring-0 focus:border-blue-400 ${
                isShowError && "focus:border-red-400"
              } cursor-pointer disabled:bg-gray-400
              disabled:text-gray-300 disabled:cursor-not-allowed transition-all ease-in`}
              />
              <span className="material-icons absolute top-2.5 right-6 text-[1.25rem] opacity-20 cursor-pointer">
                edit
              </span>
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

        {/* <CSSTransition
          in={isShowError}
          timeout={300}
          classNames="alert"
          unmountOnExit
        > */}
        <div className="bg-red-400 left-2 right-2 py-2 flex justify-center items-center absolute -top-12 rounded-lg text-white">
          <span className="material-icons">error</span>
          <p className="font-bold">Enter a number between 0 and 100</p>
        </div>
        {/* </CSSTransition> */}
      </div>
    </div>
  );
}
