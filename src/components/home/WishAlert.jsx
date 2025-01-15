"use client";
import React, { useState, useEffect } from 'react';
import { Alert, AlertDescription } from '@/components/ui/Alert';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const useWishCount = () => {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchWishCount = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "wishes"));
      const visibleWishes = querySnapshot.docs.filter(doc => !doc.data().hidden).length;
      setCount(visibleWishes);
    } catch (error) {
      console.error("Error fetching wish count:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishCount();
  }, []);

  return { count, loading };
};

// Alert Component
const WishAlert = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { count, loading } = useWishCount();

  const handleClick = () => {
    const wishWallElement = document.getElementById('wishWall');
    if (wishWallElement) {
      wishWallElement.scrollIntoView({ behavior: 'smooth' });
    }
    setIsVisible(false);
  };

  // Show alert when count is loaded
  useEffect(() => {
    if (!loading && count > 0) {
      setIsVisible(true);
      // Auto-close after 5 seconds
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [loading, count]);

  if (!isVisible || loading) return null;

  return (
    <div className="fixed top-8 right-4 z-50 cursor-pointer" onClick={handleClick}>
      <Alert className="bg-primary text-primary-foreground backdrop-blur-lg bg-slate-50/10 border-primary/50 shadow-lg animate-in slide-in-from-right transition-all duration-1000">
        <AlertDescription className="text-sm font-medium">
          {count} {count === 1 ? 'person has' : 'people have'} wished the couple, recently!
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default WishAlert;