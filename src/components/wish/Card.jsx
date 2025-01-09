import React from 'react';

const Card = ({ wish }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
      <p className="text-gray-600 italic mb-4">&quot;{wish.message}&quot;</p>
      <div className="flex justify-between items-center">
        <p className="font-medium text-gray-800">- {wish.name}</p>
        <p className="text-sm text-gray-500">
          {wish.createdAt?.toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default Card;
