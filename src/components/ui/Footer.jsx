import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

const Footer = () => {
  const [details, setDetails] = useState(null);
  const [bride, setBride] = useState(null);
  const [groom, setGroom] = useState(null);
  const footerRef = useRef(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetch('/api/details');
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

    gsap.fromTo(
      footer,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1.5,
        ease: "power3.out",
      }
    );
  }, []);

  return (
    <footer
      ref={footerRef}
      className=" py-16 h-40 font-aleo relative overflow-hidden"
    >

      <div className="container mx-auto px-4 h-full flex flex-col justify-center relative">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl text-rose-600 font-primary tracking-wide">
            {/* {details?.title || '\u00A0'} */}
            {details?.title || '\u00A0'}
          </h1>
          <p className="text-gray-300 text-base md:text-lg mt-3 font-light tracking-wider">
            {details?.number_date || '\u00A0'}
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
