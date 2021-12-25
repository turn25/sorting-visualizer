import React, { useState } from "react";

export default function CreateArrayButton({
  value,
  handleOnchange,
  setArray,
  setInputArray,
  isDisabled,
}) {
  const [isShowInput, setIsShowInput] = useState(false);
  const [isShowError, setIsShowError] = useState(false);

  const handleShowInputForm = () => {
    setIsShowInput(!isShowInput);
    if (!isShowInput) setIsShowError(false);
  };

  const handleShowInputTransition = () => {
    return isShowInput
      ? "opacity-100 translate-x-0"
      : "opacity-0 -translate-x-[140%] z-10";
  };

  const handleOnSave = (e) => {
    e.preventDefault();

    // match characters
    const charArr = value.match(/[^\d\W]+/g);
    // match numbers
    const newArr = value.match(/\d+/g);

    if (charArr) {
      setTimeout(() => setIsShowError(true), 150);
      setTimeout(() => setIsShowError(false), 5000);
      return;
    }
    // must have arr length
    if (value && newArr) {
      for (let i = 0; i < newArr.length; i++) {
        if (newArr[i] > 100 || newArr[i] < 10) {
          setTimeout(() => setIsShowError(true), 150);
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
      setArray(newArr);
    } else {
      setTimeout(() => setIsShowError(true), 150);
      setTimeout(() => setIsShowError(false), 5000);
      return;
    }
  };

  // handle change btn class when error
  const handleErrorBtnClass = () => {
    return isShowError
      ? "bg-red-400 hover:bg-red-500"
      : "bg-blue-400 hover:bg-blue-400";
  };

  return (
    <div className="fixed bottom-10 left-4 gap-x-2 flex items-center h-32">
      <div className="h-full flex items-center">
        <button
          onClick={handleShowInputForm}
          className={`z-20 opacity-50 hover:opacity-100 ${
            isShowInput && "opacity-90"
          } transition-all ease-in`}
        >
          <span className="material-icons h-8 w-8 text-gray-400 text-4xl bg-transparent">
            add_circle
          </span>
        </button>
      </div>
      <form
        className={`bg-gray-300 h-fit w-[24rem] rounded-md flex flex-col p-1 shadow-lg ${handleShowInputTransition()} transition-all ease-in duration-200`}
      >
        <label className="font-semibold flex justify-center align-center text-gray-700">
          <span className="material-icons mx-1 text-gray-600">keyboard</span>
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
            className="flex-1 mx-4 my-1 py-1 pr-8 border-transparent border-b-2 rounded-t-md rounded-sm px-3 
            focus:outline-none focus:ring-0 focus:border-blue-400 cursor-pointer disabled:bg-gray-400
             disabled:text-gray-300 disabled:cursor-not-allowed transition-all ease-in"
          />
          <span className="material-icons absolute top-2.5 right-6 text-[1.25rem] opacity-20">
            edit
          </span>
        </div>
        <button
          onClick={handleOnSave}
          disabled={isDisabled}
          className={`p-2 rounded-md text-white mx-4 my-1 ${handleErrorBtnClass()} transition-all ease-in
        disabled:bg-gray-400 disabled:hover:bg-gray-500 disabled:cursor-not-allowed`}
        >
          {isShowError ? "Invalid Input" : "Go"}
        </button>

        {/* Error Message */}
        {isShowError && (
          <div className="bg-red-400 left-2 right-2 py-2 flex justify-center items-center absolute -top-12 rounded-lg text-white">
            <span className="material-icons">error</span>
            <p className="font-bold">Enter a number between 0 and 100</p>
          </div>
        )}
      </form>
    </div>
  );
}
