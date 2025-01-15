// hooks/useBackgroundMusic.js
'use client';

import { useState, useEffect, useCallback } from 'react';

const useBackgroundMusic = (audioUrl) => {
  const [audio, setAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Force play function with multiple attempts
  const forcePlay = useCallback(async (audioElement) => {
    try {
      const playPromise = audioElement.play();
      if (playPromise !== undefined) {
        await playPromise;
        setIsPlaying(true);
      }
    } catch (error) {
      console.log('Playback failed:', error);
      // If failed, try playing on next user interaction
      const playOnInteraction = () => {
        audioElement.play().then(() => {
          setIsPlaying(true);
          document.removeEventListener('click', playOnInteraction);
          document.removeEventListener('touchstart', playOnInteraction);
        }).catch(console.error);
      };

      document.addEventListener('click', playOnInteraction);
      document.addEventListener('touchstart', playOnInteraction);
    }
  }, []);

  useEffect(() => {
    setMounted(true);
    const audioElement = new Audio(audioUrl);
    audioElement.loop = true;
    audioElement.volume = 0.5; // Set initial volume
    setAudio(audioElement);

    // Try to play immediately
    forcePlay(audioElement);

    // Also try to play on window focus
    const handleFocus = () => {
      if (!isPlaying) {
        forcePlay(audioElement);
      }
    };
    window.addEventListener('focus', handleFocus);

    return () => {
      audioElement.pause();
      audioElement.src = '';
      window.removeEventListener('focus', handleFocus);
    };
  }, [audioUrl, forcePlay, isPlaying]);

  const toggleMusic = useCallback(() => {
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      forcePlay(audio);
    }
  }, [audio, isPlaying, forcePlay]);

  if (!mounted) {
    return { isPlaying: false, toggleMusic: () => { } };
  }

  return { isPlaying, toggleMusic };
};

export default useBackgroundMusic;