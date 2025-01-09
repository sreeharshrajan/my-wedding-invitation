import React, { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  query,
  orderBy,
  getDocs,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import Card from "@/components/wish/Card";
import Modal from "@/components/wish/Modal";

export default function WishTheCouple() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [wishes, setWishes] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    fetchWishes();
  }, []);

  const fetchWishes = async () => {
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
      setWishes(wishesData);
    } catch (error) {
      console.error("Error fetching wishes:", error);
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
      setFeedback("Error sending your wish. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif mb-4"> Wall of Wishes</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-rose-500 text-white px-6 py-3 rounded hover:bg-rose-600 transition"
          >
            Send Your Wishes
          </button>
        </div>

        {/* Wishes Wall */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishes.map((wish) => (
            <Card key={wish.id} wish={wish} />
          ))}
        </div>

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
