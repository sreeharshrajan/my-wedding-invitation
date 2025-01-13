import React, { useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import { doc, updateDoc } from 'firebase/firestore';
import { db } from "@/lib/firebase";

const Card = ({ wish }) => {
  const getFormattedTimeAgo = (timestamp) => {
    if (!timestamp) return "N/A";

    try {
      if (timestamp?.toDate) {
        return formatDistanceToNow(timestamp.toDate(), { addSuffix: true });
      }

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
    <div className="relative bg-transparent p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-500/30">
      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-transparent rounded-xl -z-10" />

      <p className="text-slate-200 dark:text-slate-300 italic mb-4 font-aleo text-lg">"{wish.message}"</p>

      <div className="flex justify-between items-center">
        <p className="font-medium text-slate-200 dark:text-slate-300 font-aleo">- {wish.name}</p>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className={`flex items-center gap-1 px-3 py-1 rounded-full 
              ${isLiked
                ? 'bg-pink-100 text-pink-500'
              : 'bg-white/20 text-slate-200 dark:bg-black/20 dark:text-slate-400 hover:bg-pink-50 hover:text-pink-500'} 
              transition-colors duration-300`}
            onClick={handleLike}
            disabled={isLiked}
          >
            <span className="text-xl">{isLiked ? '❤️' : '🤍'}</span>
            <span className="font-medium">{likes}</span>
          </button>

          <p className="text-sm text-slate-400 dark:text-slate-300 font-aleo">{timeAgo}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
