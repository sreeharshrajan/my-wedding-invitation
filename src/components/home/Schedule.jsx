import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Calendar, MapPin, Clock } from "lucide-react";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Schedule = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    // Ensure the DOM is loaded
    if (!sectionRef.current) return;

    // Get all items to animate
    const items = document.querySelectorAll(".date-venue-item");

    // Create animations
    const animations = gsap.utils.toArray(items).map((item) => {
      return gsap.fromTo(
        item,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item, // Changed to individual items
            start: "top bottom-=100",
            end: "bottom top",
            toggleActions: "play none none reverse",
            markers: false // Set to true for debugging
          }
        }
      );
    });

    // Cleanup function
    return () => {
      animations.forEach(anim => {
        if (anim.scrollTrigger) {
          anim.scrollTrigger.kill();
        }
      });
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
    <section ref={sectionRef} className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          When and Where
        </h2>

        <div className="max-w-3xl mx-auto space-y-8">
          <div className="grid gap-8 md:grid-cols-1">
            <div className="date-venue-item bg-gray-50 rounded-lg p-6 shadow-sm">
              <div className="flex items-start space-x-4">
                <Calendar className="w-6 h-6 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Date</h3>
                  <p>{eventDetails.date}</p>
                </div>
              </div>
            </div>

            <div className="date-venue-item bg-gray-50 rounded-lg p-6 shadow-sm">
              <div className="flex items-start space-x-4">
                <Clock className="w-6 h-6 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Muhurtham</h3>
                  <p>{eventDetails.muhurtham}</p>
                </div>
              </div>
            </div>

            <div className="date-venue-item bg-gray-50 rounded-lg p-6 shadow-sm">
              <div className="flex items-start space-x-4">
                <MapPin className="w-6 h-6 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Venue</h3>
                  <p>{eventDetails.location}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Schedule;