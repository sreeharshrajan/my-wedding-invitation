'use client';
import { createContext, useContext, useState } from 'react';

const LoaderContext = createContext({
  isLoading: false,
  setIsLoading: () => { }
});

export const LoaderProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <LoaderContext.Provider value={{ isLoading, setIsLoading }}>
      {isLoading && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-xl flex flex-col items-center gap-4">
            <div className="w-16 h-16 border-4 rounded-full border-rose-200 border-t-rose-500 animate-spin" />
            <p className="text-gray-700 font-medium">Loading...</p>
          </div>
        </div>
      )}
      {children}
    </LoaderContext.Provider>
  );
};

