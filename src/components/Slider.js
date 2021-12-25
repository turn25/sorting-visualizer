import React from "react";

export default function Slider({
  name,
  nameHeader,
  minValue,
  maxValue,
  leftValueText,
  rightValueText,
  value,
  valuePlaceHolder,
  step,
  handleOnChange,
  disabled,
}) {
  return (
    <div className="flex-col justify-center items-center">
      <label className="text-center block font-semibold">{nameHeader}</label>
      <input
        type="range"
        name={name}
        min={minValue}
        max={maxValue}
        value={value}
        step={step}
        onChange={handleOnChange}
        disabled={disabled}
        className="cursor-pointer"
      />
      <div className="flex justify-between items-center">
        <p>{leftValueText}</p>
        {valuePlaceHolder && (
          <p
            className={`bg-blue-600 rounded-full flex items-center justify-center py-0 px-${
              valuePlaceHolder < 100 ? "1" : "2"
            }`}
          >
            {valuePlaceHolder}
          </p>
        )}
        <p>{rightValueText}</p>
      </div>
    </div>
  );
}
