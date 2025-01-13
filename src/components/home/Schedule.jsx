"use client";

import { useGsapAnimation } from "@/hooks/useGsapAnimation";
import { Calendar, MapPin, Clock } from "lucide-react";
import MapFrame from "@/components/home/schedule/MapFrame";

const Schedule = () => {
  useGsapAnimation(".date-venue-item", {
    opacity: 0,
    y: 30,
    stagger: 0.2,
    duration: 1,
    ease: "power3.out",
  });

  const eventDetails = {
    title: "Wedding Ceremony - Devipriya & Sreeharsh",
    description: "Join us for the wedding ceremony of Devipriya and Sreeharsh.",
    location: "Vellur Sree Kudakkath Kottanacheri Devaswom Auditorium Vellur, Payyannur",
    date: "January 19, 2025",
    muhurtham: "12.09 PM - 12.45 PM",
  };

  return (
    <section id="schedule" className="min-h-screen py-20 bg-gradient-to-b from-white via-rose-50 to-white">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="date-venue-item text-center mb-16">
          <h2 className="text-5xl font-serif text-gray-800 mb-3">When and Where</h2>
          <div className="w-24 h-0.5 bg-rose-400 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="date-venue-item bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center space-x-4 mb-6">
                <Calendar className="w-8 h-8 text-rose-500" />
                <div>
                  <h3 className="text-2xl font-serif text-gray-800">Date</h3>
                  <p className="text-lg text-gray-600">{eventDetails.date}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 mb-6">
                <Clock className="w-8 h-8 text-rose-500" />
                <div>
                  <h3 className="text-2xl font-serif text-gray-800">Muhurtham</h3>
                  <p className="text-lg text-gray-600">{eventDetails.muhurtham}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <MapPin className="w-14 h-14 text-rose-500" />
                <div>
                  <h3 className="text-2xl font-serif text-gray-800">Venue</h3>
                  <p className="text-lg text-gray-600">{eventDetails.location}</p>
                </div>
              </div>
            </div>

          </div>
          <div className="date-venue-item relative">
            <div className="absolute inset-0 bg-rose-500 rounded-2xl transform rotate-3 opacity-10"></div>
            <MapFrame />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Schedule;

