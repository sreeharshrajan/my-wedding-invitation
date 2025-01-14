import React, { useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Expand } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const Card = ({ wish }) => {
  const [likes, setLikes] = useState(wish.likes || 0);
  const [isLiked, setIsLiked] = useState(false);
  const MESSAGE_LIMIT = 150;

  const isCodeMessage = wish.message.includes("void") || wish.message.includes("{") || wish.message.includes(";");
  const isExpanded = wish.message.length > MESSAGE_LIMIT;
  const truncatedMessage = isExpanded ? `${wish.message.slice(0, MESSAGE_LIMIT)}...` : wish.message;

  const getFormattedTimeAgo = (timestamp) => {
    if (!timestamp) return "N/A";
    try {
      if (timestamp?.toDate) {
        return formatDistanceToNow(timestamp.toDate(), { addSuffix: true });
      }
      const date = typeof timestamp === "number" ? new Date(timestamp) : timestamp;
      return formatDistanceToNow(date, { addSuffix: true });
    } catch (error) {
      console.error("Error formatting date:", error);
      return "N/A";
    }
  };

  const timeAgo = getFormattedTimeAgo(wish.createdAt);

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

  const handleLike = (e) => {
    e.stopPropagation();
    if (!isLiked) {
      setLikes((prev) => prev + 1);
      setIsLiked(true);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="relative group break-inside-avoid overflow-hidden mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="backdrop-blur-xl bg-white/10 p-6 z-10 rounded-xl border border-white/20 shadow-lg 
                     transition-all duration-300 hover:shadow-xl overflow-hidden relative">
          {/* Pink gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-pink-100/20 to-pink-300/30 rounded-xl opacity-40" />

          {isExpanded && (
            <Link href={`/wishes/${wish.id}`} className="block">
              <motion.button
                className="absolute top-2 right-2 p-1.5 rounded-full bg-white/10 backdrop-blur-sm
                         opacity-0 group-hover:opacity-100 transition-opacity duration-300
                         hover:bg-white/20 z-20"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Expand className="w-4 h-4 text-pink-200" />
              </motion.button>
            </Link>
          )}

          {/* Content */}
          <div className="relative z-10">
            {isCodeMessage ? (
              <pre className="bg-gray-900/80 text-green-300 p-4 rounded-lg overflow-x-auto font-mono text-sm mb-4">
                {truncatedMessage}
              </pre>
            ) : (
              <p className="text-white/90 italic mb-4 font-aleo text-lg">
                &ldquo;{truncatedMessage}&rdquo;
              </p>
            )}

            <div className="flex justify-between items-center">
              <p className="font-medium text-white/90 font-aleo">- {wish.name}</p>

              <div className="flex items-center gap-2">
                <motion.button
                  type="button"
                  className={`flex items-center gap-1 px-3 py-1 rounded-full transition-colors duration-300
                    ${isLiked
                      ? "bg-pink-100/20 text-pink-300"
                      : "bg-white/10 text-white/70 hover:bg-pink-100/20 hover:text-pink-300"}`}
                  onClick={handleLike}
                  disabled={isLiked}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-xl">{isLiked ? "❤️" : "🤍"}</span>
                  <span className="font-medium">{likes}</span>
                </motion.button>

                <p className="text-sm text-white/70 font-aleo">{timeAgo}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Hover glow effect */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-300/0 via-pink-300/20 to-pink-300/0 
                      rounded-xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
      </motion.div>
    </AnimatePresence>
  );
};

export default Card;