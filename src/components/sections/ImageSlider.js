'use client';
import { useGsapAnimation } from '@/hooks/useGsapAnimation';
import Image from 'next/image';

export const ImageSlider = () => {
  useGsapAnimation('.slider-item', {
    opacity: 0,
    x: 50,
    duration: 0.8,
    stagger: 0.2
  });

  const images = [
    { url: '/image1.jpg', alt: 'Wedding photo 1' },
    { url: '/image2.jpg', alt: 'Wedding photo 2' },
    { url: '/image3.jpg', alt: 'Wedding photo 3' },
    { url: '/image4.jpg', alt: 'Wedding photo 4' },
    { url: '/image5.jpg', alt: 'Wedding photo 5' }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h3 className="text-4xl font-serif text-center mb-12 text-teal-700">Our Journey</h3>
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4">
          {images.map((img, index) => (
            <div
              key={index}
              className="slider-item relative flex-none w-80 h-64 rounded-lg overflow-hidden snap-center transition-transform hover:scale-105"
            >
              <Image
                src={img.url}
                alt={img.alt}
                fill
                className="object-cover"
                priority={index === 0}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};