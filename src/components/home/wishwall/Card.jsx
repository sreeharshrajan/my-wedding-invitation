import React, { useCallback, useMemo } from "react";
import { formatDistanceToNow } from "date-fns";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Expand, Share2 } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const MESSAGE_LIMIT = 150;
const ANIMATION_VARIANTS = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3 }
};

const WishCard = ({ wish }) => {
  const isCodeMessage = useMemo(() => (
    wish.message.includes("void") ||
    wish.message.includes("{") ||
    wish.message.includes(";")
  ), [wish.message]);

  const truncatedMessage = useMemo(() => (
    wish.message.length > MESSAGE_LIMIT
      ? `${wish.message.slice(0, MESSAGE_LIMIT)}...`
      : wish.message
  ), [wish.message]);

  const timeAgo = useMemo(() => {
    if (!wish.createdAt) return "N/A";
    try {
      const date = wish.createdAt?.toDate
        ? wish.createdAt.toDate()
        : typeof wish.createdAt === "number"
          ? new Date(wish.createdAt)
          : wish.createdAt;
      return formatDistanceToNow(date, { addSuffix: true });
    } catch (error) {
      console.error("Error formatting date:", error);
      return "N/A";
    }
  }, [wish.createdAt]);

  const handleLike = useCallback(async (e) => {
    e.stopPropagation();
    const newLikes = (wish.likes || 0) + 1;
    try {
      const wishRef = doc(db, "wishes", wish.id);
      await updateDoc(wishRef, { likes: newLikes });
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  }, [wish.id, wish.likes]);

  const handleShare = useCallback((e) => {
    e.stopPropagation();
    const shareText = `"${wish.message}" - ${wish.name} #SreeGotDevified`;
    const shareUrl = `${window.location.origin}/wishes/${wish.id}`;

    if (navigator.share) {
      navigator.share({
        text: shareText,
        url: shareUrl,
      }).catch((error) => console.error('Error sharing:', error));
    } else {
      const fullText = `${shareText}\n${shareUrl}`;
      navigator.clipboard.writeText(fullText)
        .then(() => alert('Link copied to clipboard!'))
        .catch((error) => console.error('Error copying to clipboard:', error));
    }
  }, [wish.message, wish.name, wish.id]);

  return (
    <motion.div
      className="relative group break-inside-avoid overflow-hidden mb-4"
      {...ANIMATION_VARIANTS}
    >
      <div className="backdrop-blur-xl bg-white/10 p-6 z-10 rounded-xl border border-white/20 
                     shadow-lg transition-all duration-300 hover:shadow-xl overflow-hidden relative">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-100/20 to-pink-300/30 rounded-xl opacity-40" />

        {/* Top right action buttons */}
        <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
          <motion.button
            type="button"
            className="p-1.5 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20"
            onClick={handleShare}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Share2 className="w-4 h-4 text-pink-200" />
          </motion.button>

          <Link href={`/wishes/${wish.id}`}>
            <motion.button
              className="p-1.5 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Expand className="w-4 h-4 text-pink-200" />
            </motion.button>
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
            <p className="font-medium text-white/90 font-aleo">- {wish.name}</p>

            <div className="flex items-center gap-2">
              <motion.button
                type="button"
                className={`flex items-center gap-1 px-3 py-1 rounded-full transition-colors duration-300
                  ${wish.likes ? "bg-pink-100/20 text-pink-300" : "bg-white/10 text-white/70 hover:bg-pink-100/20 hover:text-pink-300"}`}
                onClick={handleLike}
                disabled={wish.likes > 0}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-xl">{wish.likes ? "❤️" : "🤍"}</span>
                <span className="font-medium">{wish.likes || 0}</span>
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
  );
};

export default React.memo(WishCard);