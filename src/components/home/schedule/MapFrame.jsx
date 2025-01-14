import React, { memo, useEffect, useState } from "react";

const MapFrame = memo(() => {
  const [isIOS, setIsIOS] = useState(false);
  const [isControlsVisible, setIsControlsVisible] = useState(false);

  useEffect(() => {
    // Detect iOS device
    const checkIsIOS = () => {
      const userAgent = window.navigator.userAgent.toLowerCase();
      return /iphone|ipad|ipod/.test(userAgent);
    };
    setIsIOS(checkIsIOS());
  }, []);

  const toggleControlsVisibility = () => {
    setIsControlsVisible((prev) => !prev);
  };

  // Map URLs and venue details
  const venue = "Vellur Sree Kudakkath Kottanacheri Devaswom Auditorium";
  const coordinates = "12.156456,75.204659";
  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${coordinates}&travelmode=driving`;
  const appleMapsUrl = `maps://maps.apple.com/?daddr=${coordinates}&dirflag=d`;

  return (
    <div
      className="relative w-full h-full group"
      onClick={toggleControlsVisibility} // Toggle visibility on tap/click
    >
      {/* Map iframe */}
      <iframe
        title="Map showing location of Vellur Sree Kudakkath Kottanacheri Devaswom Auditorium"
        className="w-full h-full rounded-2xl shadow-lg relative z-10"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3900.351504158234!2d75.20465877371754!3d12.156455432227933!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba46ef134f68edf%3A0x81b29c0ef5119b77!2sVellur%20Sree%20Kudakkath%20Kottanacheri%20Devaswom%20Auditorium!5e0!3m2!1sen!2sin!4v1736447983723!5m2!1sen!2sin"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        aria-label="Interactive map showing the wedding venue location"
      />

      {/* Glassmorphism overlay for buttons */}
      <div
        className={`absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-3 
                   transition-opacity duration-300 ${isControlsVisible ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          }`}
        role="group"
        aria-label="Open in maps application"
      >
        {!isIOS && (
          <a
            href={googleMapsUrl}
            target="_blank"
            className="backdrop-blur-md bg-rose-500/80 hover:bg-rose-500/80 border border-white/20
                     text-white px-4 py-2 rounded-xl text-sm font-medium shadow-lg
                     transition-all duration-300 flex items-center gap-2 hover:scale-105"
            aria-label="Get directions using Google Maps"
            rel="noopener noreferrer"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C7.589 2 4 5.589 4 9.995C3.971 16.44 11.696 21.784 12 22C12 22 20.029 16.44 20 10C20 5.589 16.411 2 12 2ZM12 14C9.791 14 8 12.209 8 10C8 7.791 9.791 6 12 6C14.209 6 16 7.791 16 10C16 12.209 14.209 14 12 14Z" />
            </svg>
            Open in Maps
          </a>
        )}

        {isIOS && (
          <a
            href={appleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="backdrop-blur-md bg-rose-500/80 hover:bg-rose-500/80 border border-white/20
                     text-white px-4 py-2 rounded-xl text-sm font-medium shadow-lg
                     transition-all duration-300 flex items-center gap-2 hover:scale-105"
            aria-label="Get directions using Apple Maps"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C7.589 2 4 5.589 4 9.995C3.971 16.44 11.696 21.784 12 22C12 22 20.029 16.44 20 10C20 5.589 16.411 2 12 2ZM12 14C9.791 14 8 12.209 8 10C8 7.791 9.791 6 12 6C14.209 6 16 7.791 16 10C16 12.209 14.209 14 12 14Z" />
            </svg>
            Open in Maps
          </a>
        )}
      </div>

      {/* Decorative elements */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-rose-500/5 to-purple-500/5 pointer-events-none"></div>
      <div className="absolute inset-0 rounded-2xl ring-1 ring-white/10 pointer-events-none"></div>
    </div>
  );
});

MapFrame.displayName = "MapFrame";

export default MapFrame;
