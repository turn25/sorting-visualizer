import React from "react";
import SortAlgos from "../SortAlgo";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import "../Transition.css";

export default function SortingAlgoInfo({
  sortAlgoIdx,
  sortTimeDelay,
  isChangeSortAlgo,
}) {
  const [
    {
      name: sortAlgoName,
      worstCase,
      bestCase,
      averageCase,
      spaceComplexity,
      description,
      wikiLink,
    },
  ] = SortAlgos[sortAlgoIdx];

  return (
    <div className="h-full w-full md:px-[5%] lg:px-[15%] text-gray-800 overflow-y">
      <hr />
      <SwitchTransition mode="out-in">
        <CSSTransition
          key={isChangeSortAlgo}
          addEndListener={(node, done) => {
            node.addEventListener("transitionend", done, false);
          }}
          classNames="fade2"
        >
          <div className="h-full w-full cursor-default">
            <div className="grid lg:grid-cols-2 gap-x-16 px-8 pt-3 mt-1 text-4xl font-bold">
              <h1 className="py-4 lg:py-1">{sortAlgoName}</h1>
              <div className="flex py-4 lg:py-1">
                <h1>Sort Time:&nbsp;</h1>
                <p className="text-blue-500 italic">{sortTimeDelay} ms</p>
              </div>
            </div>
            <div className="grid lg:grid-cols-2 my-6">
              <div className="flex flex-col px-8 border-r-0 lg:border-r-2 cursor-default">
                <article>
                  <h3 className="text-xl font-semibold pb-4 underline decoration-gray-400">
                    Description
                  </h3>
                  <p className="font-[500] text-justify">
                    <a
                      href={wikiLink}
                      rel="noreferrer"
                      target="_blank"
                      className="text-blue-500"
                    >
                      {sortAlgoName}
                    </a>
                    , {description}
                  </p>
                </article>
              </div>

              <div className="flex flex-col px-8 my-6 z-0">
                <h3 className="text-xl font-semibold pb-4 underline decoration-gray-400">
                  Performance
                </h3>
                <div className="grid grid-cols-5/1  md:grid-cols-4/2 font-semibold text-gray-500 text-lg">
                  <h2 className="py-1 px-2">Worst-case performance</h2>
                  <a
                    href={wikiLink}
                    rel="noreferrer"
                    target="_blank"
                    className="flex justify-between py-1 px-2 italic text-blue-500 w-fit"
                  >
                    {worstCase}
                  </a>
                  <h2 className="flex justify-between py-1 px-2">
                    Best-case performance
                  </h2>
                  <a
                    href={wikiLink}
                    rel="noreferrer"
                    target="_blank"
                    className="flex justify-between py-1 px-2 italic text-blue-500 w-fit"
                  >
                    {bestCase}
                  </a>
                  <h2 className="flex justify-between py-1 px-2">
                    Average performance
                  </h2>
                  <a
                    href={wikiLink}
                    rel="noreferrer"
                    target="_blank"
                    className="flex justify-between py-1 px-2 italic text-blue-500 w-fit"
                  >
                    {averageCase}
                  </a>
                  <h2 className="flex justify-between py-1 px-2">
                    Worst-case space complexity
                  </h2>
                  <a
                    href={wikiLink}
                    rel="noreferrer"
                    target="_blank"
                    className="flex justify-between py-1 px-2 italic text-blue-500 w-fit"
                  >
                    {spaceComplexity}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </CSSTransition>
      </SwitchTransition>
    </div>
  );
}
