import React, { useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import { doc, updateDoc } from 'firebase/firestore';
import { db } from "@/lib/firebase";

const Card = ({ wish }) => {
  // Handle different timestamp formats
  const getFormattedTimeAgo = (timestamp) => {
    if (!timestamp) return "N/A";

    try {
      // If it's a Firebase timestamp with toDate()
      if (timestamp?.toDate) {
        return formatDistanceToNow(timestamp.toDate(), { addSuffix: true });
      }

      // If it's a regular Date object or timestamp number
      const date = typeof timestamp === 'number' ? new Date(timestamp) : timestamp;
      return formatDistanceToNow(date, { addSuffix: true });
    } catch (error) {
      console.error("Error formatting date:", error);
      return "N/A";
    }
  };

  const timeAgo = getFormattedTimeAgo(wish.createdAt);
  const [likes, setLikes] = useState(wish.likes || 0);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const updateLikes = async () => {
      try {
        const wishRef = doc(db, "wishes", wish.id);
        await updateDoc(wishRef, { likes });
      } catch (error) {
        console.error("Error updating likes:", error);
      }
    };

    if (likes !== wish.likes) {
      updateLikes();
    }
  }, [likes, wish.id, wish.likes]);

  const handleLike = () => {
    if (!isLiked) {
      setLikes(prev => prev + 1);
      setIsLiked(true);
    }
  };

  return (
    <div className="relative backdrop-blur-md bg-white/30 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20">
      <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-white/30 rounded-xl -z-10" />

      <p className="text-gray-800 italic mb-4 font-aleo text-lg">"{wish.message}"</p>

      <div className="flex justify-between items-center">
        <p className="font-medium text-gray-800 font-aleo">- {wish.name}</p>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className={`flex items-center gap-1 px-3 py-1 rounded-full 
              ${isLiked
                ? 'bg-pink-100 text-pink-500'
                : 'bg-white/50 text-gray-600 hover:bg-pink-50 hover:text-pink-500'} 
              transition-colors duration-300`}
            onClick={handleLike}
            disabled={isLiked}
          >
            <span className="text-xl">{isLiked ? '❤️' : '🤍'}</span>
            <span className="font-medium">{likes}</span>
          </button>

          <p className="text-sm text-gray-600 font-aleo">{timeAgo}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;