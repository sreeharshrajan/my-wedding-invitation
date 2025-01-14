// hooks/useBackgroundMusic.js
'use client';

import { useState, useEffect } from 'react';

const useBackgroundMusic = (audioUrl) => {
  const [audio, setAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    setMounted(true);
    const audioElement = new Audio(audioUrl);
    audioElement.loop = true;
    setAudio(audioElement);

    return () => {
      audioElement.pause();
      audioElement.src = '';
    };
  }, [audioUrl]);

  const toggleMusic = () => {
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(error => console.log('Audio playback error:', error));
    }
    setIsPlaying(!isPlaying);
  };

  // Don't render anything until mounted on client
  if (!mounted) {
    return { isPlaying: false, toggleMusic: () => { } };
  }

  return { isPlaying, toggleMusic };
};

export default useBackgroundMusic;