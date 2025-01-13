import React from "react";

const Button = ({ onClick, text }) => {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center text-rose-700 border border-rose-600  py-2 px-4 gap-2  rounded transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed font-aleo">
      <span>{text}</span>
      <svg
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        className="w-4 h-4 ml-1"
      >
        <path d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
      </svg>
    </button>
  );
};

export default Button;
