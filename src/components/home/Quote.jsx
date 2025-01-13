"use client";
import { ArrowDown } from 'lucide-react';
import React, { useState, useEffect } from 'react';

const Quote = () => {
  const [text, setText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const fullQuote = '"Two souls with but a single thought, two hearts that beat as one"';

  useEffect(() => {
    let index = 0;
    const typingSpeed = 80;
    const cursorBlinkSpeed = 530;

    const typingInterval = setInterval(() => {
      if (index < fullQuote.length) {
        setText(fullQuote.slice(0, index + 1));
        index++;
      } else {
        clearInterval(typingInterval);
        setIsTypingComplete(true);
      }
    }, typingSpeed);

    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, cursorBlinkSpeed);

    return () => {
      clearInterval(typingInterval);
      clearInterval(cursorInterval);
    };
  }, []);

  return (
    <section className="relative flex flex-col lg:flex-row h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-br backdrop-blur-lg from-rose-500/10 to-rose-600/10"></div>

      {/* Left Image Section */}
      <div className="relative hidden lg:block lg:w-1/2">
        <div className="absolute inset-0 bg-[url('/images/prewedding/1.jpg')] bg-cover bg-center bg-no-repeat transform hover:scale-105 transition-transform duration-700">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/40 to-transparent"></div>
        </div>
      </div>

      {/* Right Content Section */}
      <div className="lg:w-1/2 flex items-center justify-center p-8 h-full relative z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-lg mx-auto">
            <div className="relative p-8">
              <div className="flex flex-col items-center">
                {/* Hashtag */}
                <div className="px-6 py-2.5 text-base font-aleo font-medium text-white 
                              backdrop-blur-lg bg-white/10 border border-white/20 
                              rounded-full tracking-wider mb-8 
                               transition-all duration-300 ease-linear cursor-pointer
                              shadow-lg hover:shadow-rose-500/10">
                  #SreeGotDevified
                </div>

                {/* Quote container with glassmorphism */}
                <div className="relative min-h-[120px] flex items-center justify-center
                             text-center">
                  <h1 className="text-3xl md:text-4xl font-primary text-white/90 leading-relaxed">
                    {text}
                    <span
                      className={`inline-block w-0.5 h-8 bg-rose-400 ml-1 -mb-1 
                                transition-opacity duration-100 
                                ${showCursor ? 'opacity-100' : 'opacity-0'}`}
                    />
                  </h1>
                </div>

                {/* Animated arrow */}
                <div
                  className={`transform transition-all duration-1000 
                            ${isTypingComplete ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
                >
                  <div className="relative mt-12 group">
                    <div className="absolute -inset-4 bg-rose-500/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
                    <div className="h-10 w-10 animate-bounce motion-safe duration-100 
                                  text-rose-400 group-hover:text-rose-300 
                                  transition-colors relative">
                      <ArrowDown />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Quote;