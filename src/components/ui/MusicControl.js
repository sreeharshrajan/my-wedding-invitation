// components/MusicControl.js
'use client';

import { Volume2, VolumeX } from 'lucide-react';
import useBackgroundMusic from '@/hooks/useBackgroundMusic';

const MusicControl = () => {
  const { isPlaying, toggleMusic } = useBackgroundMusic('/music/silent-conversations.mp3');

  return (
    <button
      onClick={toggleMusic}
      className="fixed bottom-4 music-control right-4 p-3 bg-white/10 backdrop-blur-lg rounded-full hover:bg-white/20 transition-colors shadow-lg focus:outline-none focus:ring-1 focus:ring-gray-600 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed border-solid border-stone-900 outline-4"
      aria-label={isPlaying ? 'Mute background music' : 'Play background music'}
    >
      {isPlaying ? (
        <Volume2 size={16} className=" text-white" />
      ) : (
          <VolumeX size={16} className=" text-white" />
      )}
    </button>
  );
};

export default MusicControl;