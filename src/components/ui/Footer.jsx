import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const [details, setDetails] = useState(null);
  const [bride, setBride] = useState(null);
  const [groom, setGroom] = useState(null);
  const footerRef = useRef(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/details');
        const data = await response.json();
        setDetails(data);
        setBride(data.bride);
        setGroom(data.groom);
      } catch (error) {
        console.error("Error fetching details:", error);
      }
    };
    fetchDetails();
  }, []);

  useEffect(() => {
    const footer = footerRef.current;

    gsap.fromTo(footer,
      {
        opacity: 0,
        y: -100,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footer,
          start: "top bottom-=100",
          end: "top center",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, []);

  return (
    <footer
      ref={footerRef}
      className="bg-white py-16 h-96 font-aleo relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-32 h-32 bg-pink-200 rounded-full -translate-x-16 -translate-y-16" />
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-pink-200 rounded-full translate-x-20 translate-y-20" />
      </div>

      <div className="container mx-auto px-4 h-full flex flex-col justify-center relative">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl text-gray-800 font-light tracking-wide">
            {details?.title || '\u00A0'}
          </h1>
          <p className="text-gray-500 text-base md:text-lg mt-3 font-light tracking-wider">
            {details?.number_date || '\u00A0'}
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-center space-y-8 md:space-y-0 md:space-x-32">
          <div className="text-center">
            <h2 className="text-xl md:text-2xl text-gray-700 mb-3 font-light">
              {bride?.name || '\u00A0'}
            </h2>
            <p className="text-gray-500 mt-2 text-sm md:text-base font-light tracking-wide">
              {bride?.address || '\u00A0'}
            </p>
            <p className="text-gray-500 mt-2 text-sm md:text-base">
              {bride?.phone ? (
                <a href={`tel:${bride.phone}`} className="hover:text-pink-400 transition-colors duration-300 focus:outline-none">
                  {bride.phone}
                </a>
              ) : '\u00A0'}
            </p>
          </div>

          <div className="text-center">
            <h2 className="text-xl md:text-2xl text-gray-700 mb-3 font-light">
              {groom?.name || '\u00A0'}
            </h2>
            <p className="text-gray-500 mt-2 text-sm md:text-base font-light tracking-wide">
              {groom?.address || '\u00A0'}
            </p>
            <p className="text-gray-500 mt-2 text-sm md:text-base">
              {groom?.phone ? (
                <a href={`tel:${groom.phone}`} className="hover:text-pink-400 transition-colors duration-300 focus:outline-none">
                  {groom.phone}
                </a>
              ) : '\u00A0'}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;