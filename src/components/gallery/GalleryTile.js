// GalleryTile.js
import Image from "next/image";

const GalleryTile = ({ image, onClick, onDownload }) => {
  return (
    <div className="group relative overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:scale-105">
      <div className="aspect-square relative bg-white/30 backdrop-blur-sm">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/0 transition-all duration-300 group-hover:bg-black/20" />

        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <button
            onClick={onClick}
            className="m-2 rounded-full bg-white/70 p-2 backdrop-blur-sm transition-all duration-300 hover:bg-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </button>
          <button
            onClick={onDownload}
            className="m-2 rounded-full bg-white/70 p-2 backdrop-blur-sm transition-all duration-300 hover:bg-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default GalleryTile;