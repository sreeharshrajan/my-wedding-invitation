import React, { useRef, useEffect, useState } from "react";
import Card from "./Card";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft } from "lucide-react";

const SWIPE_CONFIDENCE_THRESHOLD = 10000;
const swipeConfidenceCheck = (offset, velocity) => {
  return Math.abs(velocity) * offset > SWIPE_CONFIDENCE_THRESHOLD;
};

const Wall = ({ wishes }) => {
  const containerRef = useRef(null);
  const [[page, direction], setPage] = useState([0, 0]);
  const [columns, setColumns] = useState(3);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [containerHeight, setContainerHeight] = useState(0);
  const totalPages = Math.ceil(wishes.length / itemsPerPage);

  // Handle responsive columns and container height
  useEffect(() => {
    const updateLayout = () => {
      if (!containerRef.current) return;
      const width = window.innerWidth; // Use window.innerWidth for more accurate mobile detection
      const height = containerRef.current.offsetHeight;
      setContainerHeight(height);

      // Update columns based on width - adjusted breakpoints
      if (width < 480) setColumns(1); // Extra small devices
      else if (width < 768) setColumns(2); // Small devices
      else setColumns(3); // Medium devices and up
    };

    updateLayout();
    window.addEventListener('resize', updateLayout);
    return () => window.removeEventListener('resize', updateLayout);
  }, []);

  // Calculate items per page based on container height and screen size
  useEffect(() => {
    if (containerHeight > 0) {
      const width = window.innerWidth;
      const cardHeight = width < 480 ? 140 : 170; // Smaller cards on mobile
      const availableHeight = containerHeight - (width < 480 ? 80 : 100); // Less padding on mobile
      const rowsPerPage = Math.floor(availableHeight / cardHeight);
      const calculatedItemsPerPage = rowsPerPage * columns;

      if (calculatedItemsPerPage !== itemsPerPage) {
        setItemsPerPage(Math.max(calculatedItemsPerPage, columns));
        setPage([0, 0]);
      }
    }
  }, [containerHeight, columns]);

  const paginate = (newDirection) => {
    const newPage = page + newDirection;
    if (newPage >= 0 && newPage < totalPages) {
      setPage([newPage, newDirection]);
    }
  };

  const getCurrentPageWishes = () => {
    const startIndex = page * itemsPerPage;
    return wishes.slice(startIndex, startIndex + itemsPerPage);
  };

  const getColumnWishes = (columnIndex) => {
    return getCurrentPageWishes().filter((_, index) => index % columns === columnIndex);
  };

  const pageVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const swipeProps = {
    drag: "x",
    dragElastic: 1,
    onDragEnd: (e, { offset, velocity }) => {
      const swipe = swipeConfidenceCheck(offset.x, velocity.x);
      if (swipe) {
        paginate(offset.x < 0 ? 1 : -1);
      }
    }
  };

  return (
    <div className="max-h-[70vh] min-h-[70vh] relative">
      {/* Navigation Buttons - Adjusted positioning for mobile */}
      <div className="absolute inset-y-0 left-0 z-10 flex items-center sm:pl-2">
        <motion.button
          onClick={() => paginate(-1)}
          className={`bg-white/10 hover:bg-white/20 rounded-full text-white-400 p-2 sm:p-3 backdrop-blur-sm
            ${page === 0 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          whileHover={{ x: 5 }}
          whileTap={{ scale: 0.9 }}
          disabled={page === 0}
        >
          <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
        </motion.button>
      </div>

      <div className="absolute inset-y-0 right-0 z-10 flex items-center sm:pr-2">
        <motion.button
          onClick={() => paginate(1)}
          className={`bg-white/10 hover:bg-white/20 rounded-full text-white-400 p-2 sm:p-3 backdrop-blur-sm
            ${page === totalPages - 1 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          whileHover={{ x: -5 }}
          whileTap={{ scale: 0.9 }}
          disabled={page === totalPages - 1}
        >
          <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
        </motion.button>
      </div>

      {/* Main Content - Adjusted padding for mobile */}
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          ref={containerRef}
          key={page}
          custom={direction}
          variants={pageVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
          {...swipeProps}
          className="h-full w-full px-4 sm:px-8 lg:px-12 py-4 sm:py-6"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 h-full">
            {Array.from({ length: columns }, (_, columnIndex) => (
              <div key={columnIndex} className="flex flex-col gap-2 sm:gap-4">
                {getColumnWishes(columnIndex).map((wish, index) => (
                  <motion.div
                    key={wish.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.3, // Reduced delay for mobile
                      ease: [0.33, 1, 0.68, 1]
                    }}
                    className="transform-gpu"
                  >
                    <Card wish={wish} />
                  </motion.div>
                ))}
              </div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Page Indicators - Adjusted size for mobile */}
      <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex gap-1 sm:gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <motion.button
            key={i}
            onClick={() => setPage([i, i > page ? 1 : -1])}
            className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-colors
              ${i === page ? 'bg-blue-500' : 'bg-gray-600 hover:bg-gray-500'}`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
          />
        ))}
      </div>
    </div>
  );
};

export default Wall;