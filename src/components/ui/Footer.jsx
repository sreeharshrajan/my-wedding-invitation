import { useState, useEffect } from 'react';

const Footer = () => {
  const [details, setDetails] = useState(null);
  const [bride, setBride] = useState(null);
  const [groom, setGroom] = useState(null);

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

  return (
    <footer className="bg-pink-100 py-12 border-t border-pink-200 h-96 font-aleo">
      <div className="container mx-auto px-4 h-full flex flex-col justify-center">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl text-gray-800 font-bold font-primary">
            {details?.title || '\u00A0'}
          </h1>
          <p className="text-gray-600 text-base md:text-lg mt-2 italic">
            {details?.number_date || '\u00A0'}
          </p>
        </div>
        <div className="flex flex-col md:flex-row justify-center space-y-8 md:space-y-0 md:space-x-20">
          <div className="text-center">
            <h2 className="text-lg md:text-xl font-semibold text-gray-700 mb-2">
              {bride?.name || '\u00A0'}
            </h2>
            <p className="text-gray-600 mt-1 text-sm md:text-base">
              {bride?.address || '\u00A0'}
            </p>
            <p className="text-gray-600 mt-1 text-sm md:text-base">
              {bride?.phone ? (
                <a href={`tel:${bride.phone}`} className="hover:underline focus:outline-none focus:underline">
                  {bride.phone}
                </a>
              ) : '\u00A0'}
            </p>
          </div>
          <div className="text-center">
            <h2 className="text-lg md:text-xl font-semibold text-gray-700 mb-2">
              {groom?.name || '\u00A0'}
            </h2>
            <p className="text-gray-600 mt-1 text-sm md:text-base">
              {groom?.address || '\u00A0'}
            </p>
            <p className="text-gray-600 mt-1 text-sm md:text-base">
              {groom?.phone ? (
                <a href={`tel:${groom.phone}`} className="hover:underline focus:outline-none focus:underline">
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