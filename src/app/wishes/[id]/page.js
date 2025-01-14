"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { formatDistanceToNow } from "date-fns";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function Page() {
  const router = useRouter();
  const pathname = usePathname();

  const id = pathname?.split("/").pop(); // Extract the dynamic `id`
  const [wish, setWish] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWish = async () => {
      if (!id) return;

      try {
        const wishRef = doc(db, "wishes", id);
        const wishSnap = await getDoc(wishRef);

        if (wishSnap.exists()) {
          setWish({ id: wishSnap.id, ...wishSnap.data() });
        }
      } catch (error) {
        console.error("Error fetching wish:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWish();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-300"></div>
      </div>
    );
  }

  if (!wish) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl text-white/90 mb-4">Wish not found</h1>
        <button
          onClick={() => router.push("/")}
          className="flex items-center gap-2 text-pink-300 hover:text-pink-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </button>
      </div>
    );
  }

  const timeAgo = formatDistanceToNow(
    wish.createdAt?.toDate?.() || new Date(wish.createdAt),
    { addSuffix: true }
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-3">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="max-w-3xl mx-auto"
      >
        <button
          onClick={() => router.push("/")}
          className="flex items-center gap-2 text-pink-300 hover:text-pink-400 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to all wishes
        </button>

        <div className="backdrop-blur-xl bg-white/10 p-4 rounded-xl border border-white/20 shadow-lg relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-100/20 to-pink-300/30 rounded-xl opacity-40" />

          <div className="relative z-10">
            {wish.message.includes("void") || wish.message.includes("{") || wish.message.includes(";") ? (
              <pre className="bg-gray-900/80 text-green-300 p-6 rounded-lg overflow-x-auto font-mono text-sm mb-6">
                {wish.message}
              </pre>
            ) : (
              <p className="text-white/90 italic mb-6 font-aleo text-xl leading-relaxed">
                &ldquo;{wish.message}&rdquo;
              </p>
            )}

            <div className="flex justify-between items-center">
              <p className="font-medium text-white/90 font-aleo text-lg">- {wish.name}</p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-pink-100/20 text-pink-300 px-4 py-2 rounded-full">
                  <span className="text-xl">❤️</span>
                  <span className="font-medium">{wish.likes || 0}</span>
                </div>
                <p className="text-sm text-white/70 font-aleo">{timeAgo}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
