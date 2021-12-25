import React from "react";

const blue_400 = "#60a5fa";
const green_400 = "#4ade80";
const violet_400 = "#a78bfa";
const teal_400 = "#2dd4bf";

export default function ArrayList({
  array,
  compare,
  swap,
  sortedIndex,
  sortedArray,
}) {
  return (
    <div className="w-full h-[60vh] flex items-end px-4 my-2">
      {array.map((barHeight, index) => {
        let bg = blue_400;

        // if compare have index(idx) inside => change bar color that have the same idx
        if (compare && (index === compare[0] || index === compare[1]))
          bg = violet_400;

        // if swap have index(idx) inside => change bar color that have the same idx
        if (swap && (index === swap[0] || index === swap[1])) bg = green_400;

        // if sortedIndex have index(idx) inside => change the bar that have the idx listed in sortedIdx
        if (sortedIndex && sortedIndex.includes(index)) bg = green_400;

        if (sortedArray && sortedArray.includes(index)) bg = teal_400;

        return (
          <div
            key={index}
            className="m-[0.2%] rounded-t-md transition-[height] ease-in duration-200"
            //height = 6/10 current bar height, width = 100vw/len
            style={{
              height: `${(barHeight * 6) / 10}vh`,
              width: `${100 / array.length}vw`,
              backgroundColor: bg,
            }}
          >
            {array.length < 25 && (
              <p className="w-full h-full hidden md:flex items-end justify-center pb-1 text-white transition ease-in duration-200 hover:opacity-60 hover:-translate-y-1.5 cursor-default">
                {barHeight}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
