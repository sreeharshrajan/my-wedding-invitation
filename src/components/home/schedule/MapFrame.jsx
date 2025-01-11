import React, { memo } from "react";

const MapFrame = memo(() => (
  <iframe
    title="Venue Location"
    className="w-full h-[450px] rounded-2xl shadow-lg relative z-10"
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3900.351504158234!2d75.20465877371754!3d12.156455432227933!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba46ef134f68edf%3A0x81b29c0ef5119b77!2sVellur%20Sree%20Kudakkath%20Kottanacheri%20Devaswom%20Auditorium!5e0!3m2!1sen!2sin!4v1736447983723!5m2!1sen!2sin"
    allowFullScreen
    loading="lazy"
  />
));

MapFrame.displayName = "MapFrame";

export default MapFrame;
