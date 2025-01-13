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
      className="min-h-screen py-12 sm:py-20 bg-gradient-to-b from-white via-rose-50 to-white"
    >
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.div
          variants={itemVariants}
          className="text-center mb-8 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-primary text-gray-800 mb-3">When and Where</h2>
          <div className="w-16 sm:w-24 h-0.5 bg-rose-400 mx-auto"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
          <div className="space-y-6 sm:space-y-8">
            <motion.div
              variants={itemVariants}
              className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center space-x-4 mb-4 sm:mb-6">
                <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-rose-500" />
                <div>
                  <h3 className="text-xl font-aleo text-gray-800">Date</h3>
                  <p className="text-base font-aleo text-gray-600">{eventDetails.date}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 mb-4 sm:mb-6">
                <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-rose-500" />
                <div>
                  <h3 className="text-xl font-aleo text-gray-800">Muhurtham</h3>
                  <p className="text-base font-aleo text-gray-600">{eventDetails.muhurtham}</p>
                </div>
              </div>
              <a href="https://maps.app.goo.gl/i12cpiwrsbJSGE9d7" className="flex items-start space-x-4">
                <MapPin className="w-6 h-6 sm:w-10 sm:h-10 text-rose-500 mt-1" />
                <div>
                  <h3 className="text-xl font-aleo text-gray-800">Venue</h3>
                  <p className="text-base font-aleo text-gray-600 leading-relaxed">
                    {eventDetails.location}
                  </p>
                </div>
              </a>
            </motion.div>
          </div>
          <motion.div
            variants={itemVariants}
            className="relative mt-4 sm:mt-0"
          >
            <div className="absolute inset-0 bg-rose-500 rounded-2xl transform rotate-3 opacity-10"></div>
            <MapFrame />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default Schedule;