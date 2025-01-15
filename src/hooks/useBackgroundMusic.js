'use client';

import { useState, useEffect } from 'react';

const useBackgroundMusic = (audioUrl) => {
  const [audio, setAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);

  useEffect(() => {
    setMounted(true);
    const audioElement = new Audio(audioUrl);
    audioElement.loop = true;
    setAudio(audioElement);

    // Attempt autoplay
    const attemptAutoplay = async () => {
      try {
        await audioElement.play();
        setIsPlaying(true);
        setAutoplayBlocked(false);
      } catch (error) {
        console.log('Autoplay blocked:', error);
        setAutoplayBlocked(true);
        setIsPlaying(false);
      }
    };

    attemptAutoplay();

    return () => {
      audioElement.pause();
      audioElement.src = '';
    };
  }, [audioUrl]);

  const startMusic = async () => {
    if (!audio) return;

    try {
      await audio.play();
      setIsPlaying(true);
      setAutoplayBlocked(false);
    } catch (error) {
      console.log('Audio playback error:', error);
      setIsPlaying(false);
    }
  };

  const toggleMusic = () => {
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      startMusic();
    }
  };

  // Don't render anything until mounted on client
  if (!mounted) {
    return {
      isPlaying: false,
      autoplayBlocked: false,
      toggleMusic: () => { },
      startMusic: () => { }
    };
  }

  return {
    isPlaying,
    autoplayBlocked,
    toggleMusic,
    startMusic
  };
};

export default useBackgroundMusic;