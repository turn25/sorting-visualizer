import React from "react";

export default function Button({
  placeHolder,
  handleOnClick,
  disabled,
  animationDirection,
}) {
  const handleTextAnimationDirection = () => {
    if (animationDirection === "left") return "animate-customEnterLeft";
    else if (animationDirection === "right") return "animate-customEnterRight";
  };

  return (
    <button
      onClick={handleOnClick}
      className="flex justify-center items-center text-white bg-gray-400 rounded-md py-2 w-full md:w-28 xl:w-36 disabled:cursor-not-allowed
    disabled:text-gray-400 disabled:bg-gray-500 disabled:hover:bg-gray-600shadow-md hover:shadow-lg hover:bg-gray-500 
      transition-all hover:-translate-y-0.5 ease-in"
      disabled={disabled}
    >
      <p className={handleTextAnimationDirection()}>{placeHolder}</p>
    </button>
  );
}
