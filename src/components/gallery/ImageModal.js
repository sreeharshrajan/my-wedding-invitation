// ImageModal.js
import Image from "next/image";

const ImageModal = ({ image, onClose, onDownload }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="relative overflow-hidden rounded-lg bg-white/30 backdrop-blur-md">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-50 rounded-full bg-white/70 p-2 backdrop-blur-sm transition-all duration-300 hover:bg-white text-black"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="relative max-h-[80vh]">
          <div className="relative h-full w-full">
            <Image
              src={image.src}
              alt={image.alt}
              width={1200}
              height={800}
              className="max-h-[80vh] w-auto object-contain"
              priority
              quality={100}
            />
          </div>
        </div>

        <button
          onClick={onDownload}
          className="absolute bottom-4 right-4 z-50 rounded-full bg-white/70 p-2 backdrop-blur-sm transition-all duration-300 hover:bg-white text-black"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ImageModal;