import React from "react";

export default function Footer() {
  return (
    <footer className="w-full flex justify-center items-center text-gray-600 bg-stone-50 p-2 rounded-t-sm shadow-md cursor-default">
      {new Date().getFullYear()}&copy;{" "}
      <a
        href="https://github.com/vuquangtuan123"
        rel="noreferrer"
        target="_blank"
        className="text-blue-400 font-[500]"
      >
        Tuan Vu
      </a>
    </footer>
  );
}
