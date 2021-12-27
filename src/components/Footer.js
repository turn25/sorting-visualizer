import React from "react";

export default function Footer() {
  return (
    <footer className="w-full flex justify-center items-center text-gray-600 cursor-default">
      {new Date().getFullYear()}&copy;{" "}
      <a
        href="https://github.com/vuquangtuan123"
        rel="noreferrer"
        target="_blank"
        className="text-blue-400"
      >
        Tuan Vu
      </a>
    </footer>
  );
}
