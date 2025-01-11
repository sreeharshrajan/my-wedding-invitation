import { useState, useEffect } from 'react';

const Footer = () => {
  const [details, setDetails] = useState(null);
  const [bride, setBride] = useState(null);
  const [groom, setGroom] = useState(null);

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

  return (
    <footer className="bg-pink-100 py-12  border-t border-pink-200">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-serif text-gray-800 font-bold">{details?.title}</h1>
          <p className="text-gray-600 text-base md:text-lg mt-2 italic">{details?.number_date}</p>
        </div>
        <div className="flex flex-col md:flex-row justify-center space-y-8 md:space-y-0 md:space-x-20">
          <div className="text-center">
            <h2 className="text-lg md:text-xl font-semibold text-gray-700 mb-2">{bride?.name}</h2>
            <p className="text-gray-600 mt-1 text-sm md:text-base">{bride?.address}</p>
            <p className="text-gray-600 mt-1 text-sm md:text-base">
              <a href={`tel:${bride?.phone}`} className="hover:underline focus:outline-none focus:underline">
                {bride?.phone}
              </a>
            </p>
          </div>
          <div className="text-center">
            <h2 className="text-lg md:text-xl font-semibold text-gray-700 mb-2">{groom?.name}</h2>
            <p className="text-gray-600 mt-1 text-sm md:text-base">{groom?.address}</p>
            <p className="text-gray-600 mt-1 text-sm md:text-base">
              <a href={`tel:${groom?.phone}`} className="hover:underline focus:outline-none focus:underline">
                {groom?.phone}
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
