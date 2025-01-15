import React, { useCallback, useMemo, useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Expand, Share2 } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ANIMATION_VARIANTS } from "@/lib/animations";
import { isCodeContent, formatTimeAgo } from "@/lib/utils";
import { MESSAGE_LIMIT } from "@/lib/constants";

const WishCard = ({ wish }) => {
  // Add local state to handle optimistic updates and loading states
  const [isLiking, setIsLiking] = useState(false);
  const [localLikes, setLocalLikes] = useState(wish.likes || 0);
  const [hasLiked, setHasLiked] = useState(false);

  const isCodeMessage = useMemo(() => isCodeContent(wish.message), [wish.message]);

  const truncatedMessage = useMemo(() =>
    wish.message.length > MESSAGE_LIMIT
      ? `${wish.message.slice(0, MESSAGE_LIMIT)}...`
      : wish.message
    , [wish.message]);

  const timeAgo = useMemo(() => formatTimeAgo(wish.createdAt), [wish.createdAt]);

  const handleLike = useCallback(async (e) => {
    e.stopPropagation();

    // Prevent multiple clicks while processing
    if (isLiking || hasLiked) return;

    setIsLiking(true);

    try {
      const wishRef = doc(db, "wishes", wish.id);
      const newLikes = localLikes + 1;

      // Optimistic update
      setLocalLikes(newLikes);
      setHasLiked(true);

      await updateDoc(wishRef, { likes: newLikes });
    } catch (error) {
      // Rollback on error
      console.error("Error updating likes:", error);
      setLocalLikes(localLikes);
      setHasLiked(false);
    } finally {
      setIsLiking(false);
    }
  }, [wish.id, localLikes, isLiking, hasLiked]);

  const handleShare = useCallback(async (e) => {
    e.stopPropagation();
    const shareText = `"${wish.message}" - ${wish.name} #SreeGotDevified`;
    const shareUrl = `${window.location.origin}/wishes/${wish.id}`;

    try {
      if (navigator.share) {
        await navigator.share({
          text: shareText,
          url: shareUrl,
        });
      } else {
        const fullText = `${shareText}\n${shareUrl}`;
        await navigator.clipboard.writeText(fullText);
        alert('Link copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  }, [wish.message, wish.name, wish.id]);

  return (
    <div
      className="relative group break-inside-avoid overflow-hidden mb-4"
      {...ANIMATION_VARIANTS}
    >
      <div className="backdrop-blur-xl bg-white/10 p-6 z-10 rounded-xl border border-white/20 
                     shadow-lg transition-all duration-300 hover:shadow-xl overflow-hidden relative">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-100/20 to-pink-300/30 rounded-xl opacity-40" />

        {/* Action buttons */}
        <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
          <button
            type="button"
            className="p-1.5 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
            onClick={handleShare}
          >
            <Share2 className="w-4 h-4 text-pink-200" />
          </button>

          <Link href={`/wishes/${wish.id}`}>
            <button
              className="p-1.5 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
            >
              <Expand className="w-4 h-4 text-pink-200" />
            </button>
          </Link>
        </div>

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
            <p className="font-medium text-white/90 font-aleo">- {wish.name.charAt(0).toUpperCase() + wish.name.slice(1)}</p>

            <div className="flex items-center gap-2">
              <button
                type="button"
                className={`flex items-center gap-1 px-3 py-1 rounded-full transition-all duration-300
                  ${hasLiked
                    ? "bg-pink-100/20 text-pink-300"
                    : "bg-white/10 text-white/70 hover:bg-pink-100/20 hover:text-pink-300"
                  } ${isLiking ? "opacity-50 cursor-not-allowed" : ""}`}
                onClick={handleLike}
                disabled={isLiking || hasLiked}
              >
                <span className="text-xl">{hasLiked ? "❤️" : "🤍"}</span>
                <span className="font-medium">{localLikes}</span>
              </button>

              <p className="text-sm text-white/70 font-aleo">{timeAgo}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Hover glow effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-300/0 via-pink-300/20 to-pink-300/0 
                    rounded-xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
    </div>
  );
};

export default React.memo(WishCard);