'use client';
import { useState } from 'react';
import { useGsapAnimation } from '@/hooks/useGsapAnimation';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export const WishTheCouple = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState('');

  useGsapAnimation('.wish-form', {
    opacity: 0,
    y: 50,
    duration: 1,
    ease: 'power3.out'
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFeedback('');

    try {
      await addDoc(collection(db, 'wishes'), {
        ...formData,
        createdAt: new Date(),
      });
      setFeedback('Thank you for your heartfelt wishes!');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setFeedback('Error sending your wish. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 wish-section">
      <div className="container mx-auto px-4">
        <div className="wish-form max-w-xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          <h3 className="text-4xl font-serif text-center mb-8">Wish the Couple</h3>
          {feedback && (
            <div className={`p-4 mb-4 rounded ${feedback.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
              {feedback}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="Your Name"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="Your Email"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Your Wish</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="Write your heartfelt wish here..."
                rows="4"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-rose-500 text-white py-3 rounded hover:bg-rose-600 transition disabled:opacity-50"
            >
              {loading ? 'Sending...' : 'Send Your Wish'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
