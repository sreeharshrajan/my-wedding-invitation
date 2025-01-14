import { motion } from "framer-motion";
import { Calendar, MapPin, Clock } from "lucide-react";
import MapFrame from "@/components/home/schedule/MapFrame";

const Schedule = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const eventDetails = {
    title: "Wedding Ceremony - Devipriya & Sreeharsh",
    description: "Join us for the wedding ceremony of Devipriya and Sreeharsh.",
    location: "Vellur Sree Kudakkath Kottanacheri Devaswom Auditorium Vellur, Payyannur",
    date: "January 19, 2025",
    muhurtham: "12.09 PM - 12.45 PM",
  };

  return (
    <motion.section
      id="schedule"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
      className="relative min-h-screen py-12 md:py-24 overflow-hidden"
    >
      {/* Background layers */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-[url('/images/hero_bg-2.jpg')] bg-cover bg-center bg-no-repeat"
          style={{ willChange: 'transform' }}
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        <motion.div
          variants={itemVariants}
          className="text-center mb-8 md:mb-20"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-primary text-white mb-3">When and Where</h2>
          <div className="w-16 md:w-24 h-0.5 bg-rose-400 mx-auto"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-start">
          <div className="space-y-6">
            <motion.div
              variants={itemVariants}
              className="backdrop-blur-md bg-black/30 p-6 md:p-10 rounded-2xl shadow-2xl 
                border border-white/10 hover:border-white/20 transition-all duration-300"
            >
              <div className="flex items-center space-x-4 mb-5 md:mb-8">
                <Calendar className="w-5 h-5 md:w-8 md:h-8 text-rose-500" />
                <div>
                  <h3 className="text-sm md:text-md font-aleo text-white/90">Date</h3>
                  <p className="text-lg md:text-2xl mt-1 font-aleo text-white/70">{eventDetails.date}</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 mb-5 md:mb-8">
                <Clock className="w-5 h-5 md:w-8 md:h-8 text-rose-500" />
                <div>
                  <h3 className="text-sm md:text-md font-aleo text-white/90">Muhurtham</h3>
                  <p className="text-lg md:text-2xl mt-1 font-aleo text-white/70">{eventDetails.muhurtham}</p>
                </div>
              </div>

              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://maps.app.goo.gl/i12cpiwrsbJSGE9d7"
                className="flex items-center space-x-4 group"
              >
                <div className="flex items-center justify-center w-10 h-10 md:w-14 md:h-14 rounded-full ">
                  <MapPin className="w-6 h-6 md:w-8 md:h-8 text-rose-500 group-hover:text-rose-600 transition-colors" />
                </div>
                <div>
                  <h3 className="text-sm md:text-md font-aleo text-white/90">Venue</h3>
                  <p className="text-lg mt-1 font-aleo text-white/70 leading-normal group-hover:text-white/80 transition-colors">
                    {eventDetails.location}
                  </p>
                </div>
              </a>

            </motion.div>
          </div>

          <motion.div
            variants={itemVariants}
            className="relative h-[300px] md:h-[400px]"
          >
            <div className="absolute inset-0 bg-black/20 rounded-2xl transform rotate-3"></div>
            <div className="backdrop-blur-lg bg-black/30 p-2 md:p-3 rounded-2xl border border-white/10 h-full">
              <MapFrame />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default Schedule;