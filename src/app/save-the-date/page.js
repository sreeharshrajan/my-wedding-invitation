"use client";

// ImageGallery.js
import React, { useState } from 'react';
import Image from "next/image";
import ImageModal from '@/components/gallery/ImageModal';
import GalleryTile from '@/components/gallery/GalleryTile';

const ImageGallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const images = [
    { src: "/images/save-the-date/IMG_2973.JPG", alt: "Save the date image 1" },
    { src: "/images/save-the-date/IMG_2974.JPG", alt: "Save the date image 1" },
    { src: "/images/save-the-date/IMG_2976.JPG", alt: "Save the date image 1" },
    { src: "/images/save-the-date/IMG_2977.JPG", alt: "Save the date image 1" },
    { src: "/images/save-the-date/IMG_2978.JPG", alt: "Save the date image 1" },
    { src: "/images/save-the-date/IMG_2979.JPG", alt: "Save the date image 1" },
    { src: "/images/save-the-date/IMG_2975.JPG", alt: "Save the date image 1" },
    { src: "/images/save-the-date/IMG_2980.JPG", alt: "Save the date image 1" },
  ];

  const downloadImage = async (imageSrc) => {
    try {
      const response = await fetch(imageSrc);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `save-the-date-${Date.now()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <Image
        src="/images/hero_bg-2.jpg"
        alt="Background"
        fill
        className="absolute inset-0 object-cover object-center opacity-40"
      />

      <div className="relative z-10 px-4 py-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {images.map((image, index) => (
            <GalleryTile
              key={index}
              image={image}
              onClick={() => setSelectedImage(image)}
              onDownload={() => downloadImage(image.src)}
            />
          ))}
        </div>
      </div>

      {selectedImage && (
        <ImageModal
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
          onDownload={() => downloadImage(selectedImage.src)}
        />
      )}
    </div>
  );
};

export default ImageGallery;

