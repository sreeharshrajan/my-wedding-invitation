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
    const typingSpeed = 80; // Slightly faster for better feel
    const cursorBlinkSpeed = 530; // Cursor blink speed

    // Typing effect
    const typingInterval = setInterval(() => {
      if (index < fullQuote.length) {
        setText(fullQuote.slice(0, index + 1));
        index++;
      } else {
        clearInterval(typingInterval);
        setIsTypingComplete(true);
      }
    }, typingSpeed);

    // Cursor blinking effect
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, cursorBlinkSpeed);

    return () => {
      clearInterval(typingInterval);
      clearInterval(cursorInterval);
    };
  }, []);

  return (
    <section className="flex flex-col lg:flex-row h-screen bg-gradient-to-br from-gray-50 to-gray-100 over">
      <div className="hidden lg:block lg:w-1/2 bg-cover bg-center bg-no-repeat bg-[url('/images/prewedding/1.jpg')]">
      </div>
      <div className="lg:w-1/2 flex items-center justify-center p-8 h-full">
        <div className="container mx-auto px-4">
          <div className="max-w-lg mx-auto">
            <div className="relative p-8 text-center">
              <div className="flex flex-col items-center ">
                <div className="px-4 text-sm font-medium text-gray-600 py-2 border border-slate-400 rounded-full tracking-wider mb-4">
                  #SreeGotDevified
                </div>

                <div className="relative min-h-[120px] flex items-center justify-center">
                  <h1 className="text-3xl md:text-4xl font-serif text-gray-800 leading-relaxed">
                    {text}
                    <span className={`inline-block w-0.5 h-6 bg-gray-800 ml-1 -mb-1 transition-opacity duration-100 ${showCursor ? 'opacity-100' : 'opacity-0'}`} hidden />
                  </h1>
                </div>
                <div className={`transform transition-all duration-1000 ${isTypingComplete ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                  <div className="h-10 w-10 mt-10 animate-bounce motion-safe duration-100 text-gray-700">
                    <ArrowDown />
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