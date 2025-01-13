import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Calendar, MapPin, Clock } from "lucide-react";
import MapFrame from "@/components/home/schedule/MapFrame";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const Schedule = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    // Wait for DOM to be fully loaded
    const initAnimations = () => {
      const items = gsap.utils.toArray(".date-venue-item");
      const mm = gsap.matchMedia();

      // Desktop animations
      mm.add("(min-width: 768px)", () => {
        items.forEach((item, index) => {
          gsap.fromTo(
            item,
            {
              opacity: 0,
              y: 30
            },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              delay: index * 0.2,
              ease: "power3.out",
              scrollTrigger: {
                trigger: item,
                start: "top bottom-=100",
                end: "bottom top",
                toggleActions: "play none none reverse",
                markers: false
              }
            }
          );
        });
      });

      // Mobile animations
      mm.add("(max-width: 767px)", () => {
        items.forEach((item, index) => {
          gsap.fromTo(
            item,
            {
              opacity: 0,
              y: 20
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              delay: index * 0.15,
              ease: "power2.out",
              scrollTrigger: {
                trigger: item,
                start: "top bottom-=50",
                end: "bottom top",
                toggleActions: "play none none reverse",
                markers: false
              }
            }
          );
        });
      });
    };

    // Initialize animations after a short delay to ensure proper layout
    const timeoutId = setTimeout(initAnimations, 100);

    return () => {
      clearTimeout(timeoutId);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const eventDetails = {
    title: "Wedding Ceremony - Devipriya & Sreeharsh",
    description: "Join us for the wedding ceremony of Devipriya and Sreeharsh.",
    location: "Vellur Sree Kudakkath Kottanacheri Devaswom Auditorium Vellur, Payyannur",
    date: "January 19, 2025",
    muhurtham: "12.09 PM - 12.45 PM",
  };

  return (
    <section
      id="schedule"
      ref={sectionRef}
      className="min-h-screen py-12 sm:py-20 bg-gradient-to-b from-white via-rose-50 to-white"
    >
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="date-venue-item text-center mb-8 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-serif text-gray-800 mb-3">When and Where</h2>
          <div className="w-16 sm:w-24 h-0.5 bg-rose-400 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
          <div className="space-y-6 sm:space-y-8">
            <div className="date-venue-item bg-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center space-x-4 mb-4 sm:mb-6">
                <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-rose-500" />
                <div>
                  <h3 className="text-xl font-serif text-gray-800">Date</h3>
                  <p className="text-base text-gray-600">{eventDetails.date}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 mb-4 sm:mb-6">
                <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-rose-500" />
                <div>
                  <h3 className="text-xl font-serif text-gray-800">Muhurtham</h3>
                  <p className="text-base text-gray-600">{eventDetails.muhurtham}</p>
                </div>
              </div>
              <a href="https://maps.app.goo.gl/i12cpiwrsbJSGE9d7" className="flex items-start space-x-4">
                <MapPin className="w-12 h-12 sm:w-10 sm:h-10 text-rose-500 mt-1" />
                <div>
                  <h3 className="text-xl font-serif text-gray-800">Venue</h3>
                  <p className="text-base text-gray-600 leading-relaxed">
                    {eventDetails.location}
                  </p>
                </div>
              </a>
            </div>
          </div>
          <div className="date-venue-item relative mt-4 sm:mt-0">
            <div className="absolute inset-0 bg-rose-500 rounded-2xl transform rotate-3 opacity-10"></div>
            <MapFrame />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Schedule;