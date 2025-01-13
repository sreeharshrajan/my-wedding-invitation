import React, { useRef, useEffect } from "react";
import { X } from "lucide-react";
import Form from "./Form";
import { motion, AnimatePresence } from "framer-motion";

const Modal = ({
  isModalOpen,
  setIsModalOpen,
  feedback,
  loading,
  formData,
  handleChange,
  handleSubmit,
}) => {
  const modalRef = useRef(null);

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen, setIsModalOpen]);

  return (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          key="modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            ref={modalRef}
            className="bg-white p-8 rounded-lg shadow-xl max-w-xl w-full mx-4 relative border border-gray-200 flex flex-col font-aleo"
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-900"
            >
              <X size={24} />
            </button>

            <h3 className="text-3xl text-center mb-8 text-gray-900">
              Add Your Wishes to the Wall
            </h3>

            {feedback && (
              <div
                className={`p-4 mb-4 rounded ${
                  feedback.includes("Error")
                    ? "bg-red-100 text-red-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {feedback}
              </div>
            )}

            <Form
              formData={formData}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              loading={loading}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
