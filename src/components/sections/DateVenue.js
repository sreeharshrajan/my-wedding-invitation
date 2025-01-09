"use client";

import React, { useState, useCallback, memo } from 'react';
import { Calendar, MapPin, Clock, ChevronDown } from 'lucide-react';
import { useGsapAnimation } from "@/hooks/useGsapAnimation";

// Memoized components for better performance
const CalendarButton = memo(({ onClick, children }) => (
  <button
    onClick={onClick}
    className="w-full px-4 py-3 text-left hover:bg-rose-50 transition-colors duration-200 flex items-center space-x-2"
  >
    {children}
  </button>
));

CalendarButton.displayName = 'CalendarButton';

const MapFrame = memo(() => (
  <iframe
    title="Venue Location"
    className="w-full h-[450px] rounded-2xl shadow-lg relative z-10"
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345086163!2d144.9556514156138!3d-37.81732797975151!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0x5045675218ce6e0!2sGrand%20Palace%20Convention%20Center!5e0!3m2!1sen!2sau!4v1692022449307!5m2!1sen!2sau"
    allowFullScreen
    loading="lazy"
  />
));

MapFrame.displayName = 'MapFrame';

export const DateVenue = () => {
  const [showCalendarOptions, setShowCalendarOptions] = useState(false);

  useGsapAnimation(".date-venue-item", {
    opacity: 0,
    y: 30,
    stagger: 0.2,
    duration: 1,
    ease: "power3.out"
  });

  // Event details object - memoized to prevent recreations
  const eventDetails = {
    title: "Wedding Ceremony - Devipriya & Sreeharsh",
    description: "Join us for the wedding ceremony of Devipriya and Sreeharsh.",
    location: "Grand Palace Convention Center, 123 Wedding Lane, Dream City",
    startDate: "20250315T100000Z",
    endDate: "20250315T140000Z",
  };

  // Calendar utility functions
  const generateCalendarLinks = useCallback(() => ({
    google: `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventDetails.title)}&dates=${eventDetails.startDate}/${eventDetails.endDate}&details=${encodeURIComponent(eventDetails.description)}&location=${encodeURIComponent(eventDetails.location)}&sf=true`,

    outlook: `https://outlook.live.com/calendar/0/deeplink/compose?subject=${encodeURIComponent(eventDetails.title)}&body=${encodeURIComponent(eventDetails.description)}&location=${encodeURIComponent(eventDetails.location)}&startdt=${eventDetails.startDate}&enddt=${eventDetails.endDate}`,

    yahoo: `https://calendar.yahoo.com/?v=60&title=${encodeURIComponent(eventDetails.title)}&desc=${encodeURIComponent(eventDetails.description)}&in_loc=${encodeURIComponent(eventDetails.location)}&st=${eventDetails.startDate}&et=${eventDetails.endDate}`,

    ics: `data:text/calendar;charset=utf8,BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
URL:${encodeURIComponent(window.location.href)}
DTSTART:${eventDetails.startDate}
DTEND:${eventDetails.endDate}
SUMMARY:${eventDetails.title}
DESCRIPTION:${eventDetails.description}
LOCATION:${eventDetails.location}
END:VEVENT
END:VCALENDAR`
  }), []);

  const handleCalendarClick = useCallback((calendarType) => {
    const links = generateCalendarLinks();
    if (calendarType === 'ics') {
      const link = document.createElement('a');
      link.href = links.ics;
      link.download = 'wedding-invitation.ics';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      window.open(links[calendarType], '_blank');
    }
    setShowCalendarOptions(false);
  }, [generateCalendarLinks]);

  return (
    <section className="min-h-screen py-20 bg-gradient-to-b from-white via-rose-50 to-white">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="date-venue-item text-center mb-16">
          <h2 className="text-5xl font-serif text-gray-800 mb-3">Save the Date</h2>
          <div className="w-24 h-0.5 bg-rose-400 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="date-venue-item bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center space-x-4 mb-6">
                <Calendar className="w-8 h-8 text-rose-500" />
                <div>
                  <h3 className="text-2xl font-serif text-gray-800">The Big Day</h3>
                  <p className="text-lg text-gray-600">March 15, 2025</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 mb-6">
                <Clock className="w-8 h-8 text-rose-500" />
                <div>
                  <h3 className="text-2xl font-serif text-gray-800">Ceremony Time</h3>
                  <p className="text-lg text-gray-600">10:00 AM - 2:00 PM</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <MapPin className="w-8 h-8 text-rose-500" />
                <div>
                  <h3 className="text-2xl font-serif text-gray-800">Venue</h3>
                  <p className="text-lg text-gray-600">Grand Palace Convention Center</p>
                  <p className="text-gray-500">123 Wedding Lane, Dream City</p>
                </div>
              </div>
            </div>

            <div className="date-venue-item relative">
              <button
                onClick={() => setShowCalendarOptions(prev => !prev)}
                className="w-full px-6 py-4 bg-rose-500 text-white text-lg font-medium rounded-xl 
                  hover:bg-rose-600 transform hover:-translate-y-1 transition-all duration-300 
                  flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
              >
                <Calendar className="w-5 h-5" />
                <span>Add to Calendar</span>
                <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${showCalendarOptions ? 'rotate-180' : ''}`} />
              </button>

              {showCalendarOptions && (
                <div className="absolute mt-2 w-full bg-white rounded-xl shadow-xl z-20 overflow-hidden">
                  <CalendarButton onClick={() => handleCalendarClick('google')}>
                    <img src="/google-calendar.png" alt="Google Calendar" className="w-5 h-5" />
                    <span>Google Calendar</span>
                  </CalendarButton>
                  <CalendarButton onClick={() => handleCalendarClick('outlook')}>
                    <img src="/outlook-calendar.png" alt="Outlook" className="w-5 h-5" />
                    <span>Outlook Calendar</span>
                  </CalendarButton>
                  <CalendarButton onClick={() => handleCalendarClick('yahoo')}>
                    <img src="/yahoo-calendar.png" alt="Yahoo" className="w-5 h-5" />
                    <span>Yahoo Calendar</span>
                  </CalendarButton>
                  <CalendarButton onClick={() => handleCalendarClick('ics')}>
                    <Calendar className="w-5 h-5" />
                    <span>Download ICS File</span>
                  </CalendarButton>
                </div>
              )}
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

export default memo(DateVenue);