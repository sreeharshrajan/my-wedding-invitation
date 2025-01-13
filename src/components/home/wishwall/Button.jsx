import { HandHeart } from "lucide-react";
import React from "react";

const Button = ({ onClick, text }) => {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center text-rose-100 border py-2 px-6 gap-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed font-aleo 
      bg-gradient-to-r backdrop-blur-lg  border-rose-100/50 shadow-lg hover:shadow-rose-600/40 hover:text-white hover:-translate-y-1"
    >
      <span className="text-base ">{text}</span>
      <HandHeart size={20} />
    </button>
  );
};

export default Button;
