import React from "react";
import { formatDistanceToNow } from "date-fns"; 

const Card = ({ wish }) => {
  const timeAgo = wish.createdAt
    ? formatDistanceToNow(wish.createdAt, { addSuffix: true })
    : "N/A";

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
      <p className="text-gray-600 italic mb-4">"{wish.message}"</p>
      <div className="flex justify-between items-center">
        <p className="font-medium text-gray-800">- {wish.name}</p>
        <p className="text-sm text-gray-500">{timeAgo}</p>
      </div>
    </div>
  );
};

export default Card;
