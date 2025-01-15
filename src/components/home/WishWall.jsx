import React, { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import {
  collection,
  addDoc,
  query,
  orderBy,
  getDocs,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import Wall from "@/components/home/wishwall/Wall";
import Modal from "@/components/home/wishwall/Modal";
import Button from "@/components/home/wishwall/Button";
import Loader from "@/components/ui/Loader";

export default function WishWall() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [wishes, setWishes] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    hidden: false,
    featured: false,
  });
  const [loading, setLoading] = useState(false);
  const [fetchingWishes, setFetchingWishes] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [hasLoaded, setHasLoaded] = useState(false);

  // Set up intersection observer
  const { ref, inView } = useInView({
    threshold: 0.1, // Trigger when 10% of the component is visible
    triggerOnce: true, // Only trigger once
  });

  useEffect(() => {
    // Only fetch wishes when the section comes into view and hasn't loaded before
    if (inView && !hasLoaded) {
      fetchWishes();
      setHasLoaded(true);
    }
  }, [inView, hasLoaded]);

  const fetchWishes = async () => {
    setFetchingWishes(true);
    try {
      const wishesQuery = query(
        collection(db, "wishes"),
        orderBy("createdAt", "desc")
      );
      const querySnapshot = await getDocs(wishesQuery);
      const wishesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
      }));
      setWishes(wishesData.filter((wish) => !wish.hidden));
    } catch (error) {
      console.error("Error fetching wishes:", error);
    } finally {
      setFetchingWishes(false);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFeedback("");

    try {
      await addDoc(collection(db, "wishes"), {
        ...formData,
        createdAt: new Date(),
      });
      setFeedback("Thank you for your heartfelt wishes!");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => {
        setIsModalOpen(false);
        fetchWishes(); // Refresh the wishes wall
        setFeedback("");
      }, 2000);
    } catch (error) {
      setFeedback("Error posting your wish. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      ref={ref}
      id="wishWall"
      className="relative flex flex-col min-h-screen py-20 bg-gradient-to-b overflow-x-hidden"
    >
      <div className="absolute inset-0 backdrop-blur blur-xl z-0">
        <div
          className="absolute inset-0 bg-[url('/images/hero_bg-2.jpg')] bg-cover bg-center bg-no-repeat bg-clip-border bg-fixed"
          style={{ willChange: 'transform' }}
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>
      <div className="container mx-auto px-4 z-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-primary mb-4 text-gray-100">
            Wall of Wishes
          </h2>
          <Button onClick={() => setIsModalOpen(true)} text="Post Your Wishes" />
        </div>

        {/* Wishes Wall with Loading State */}
        {fetchingWishes ? (
          <Loader />
        ) : (
          <Wall wishes={wishes} />
        )}

        {/* Modal */}
        <Modal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          feedback={feedback}
          loading={loading}
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </div>
    </section>
  );
}