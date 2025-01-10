import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Card from "@/components/wish/Card";

const Marquee = ({ wishes, speed = 10, direction = 1 }) => {
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [itemWidth, setItemWidth] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      const firstChild = containerRef.current.querySelector('.marquee-item');
      if (firstChild) {
        const calculatedItemWidth = firstChild.offsetWidth;
        setItemWidth(calculatedItemWidth);
      }
    }
  }, [wishes]);

  useEffect(() => {
    if (itemWidth && wishes.length) {
      setContainerWidth(itemWidth * wishes.length);
    }
  }, [itemWidth, wishes]);

  const totalWidth = containerWidth * 2;

  return (
    <div className="relative overflow-hidden w-full" ref={containerRef}>
      <motion.div
        className="flex gap-6"
        animate={{
          x: direction === 1 ? -containerWidth : 0,
        }}
        initial={{
          x: direction === 1 ? 0 : -containerWidth,
        }}
        transition={{
          repeat: Infinity,
          duration: speed,
          ease: "linear",
        }}
        style={{
          width: totalWidth,
        }}
      >
        {wishes.concat(wishes).map((wish, index) => (
          <div
            key={index}
            className="marquee-item flex-shrink-0 w-[300px]"
          >
            <Card wish={wish} />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default Marquee;
