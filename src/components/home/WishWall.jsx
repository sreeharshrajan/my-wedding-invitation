import React, { useState, useEffect } from "react";
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
import Card from "@/components/home/wishwall/Card";

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
    <section id="wishthecouple" className="min-h-screen py-20 bg-gradient-to-b from-white via-rose-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif mb-4 text-gray-700"> Wish the couple</h2>
          <Button
            onClick={() => setIsModalOpen(true)}
            text="Send Your Wishes"
          />

        </div>

        {/* Wishes Wall */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishes.map((wish) => (
            <Card key={wish.id} wish={wish} />
          ))}
        </div> */}
        <Wall wishes={wishes} />

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
