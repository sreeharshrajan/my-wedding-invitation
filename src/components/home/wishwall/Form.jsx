import React from "react";

const Form = ({ formData, handleChange, handleSubmit, loading }) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-gray-800 mb-2">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded focus:ring-2 focus:ring-rose-500 focus:border-transparent text-gray-800 placeholder:text-gray-500"
          placeholder="Your Name"
          required
        />
      </div>
      <div>
        <label className="block text-gray-800 mb-2">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border rounded focus:ring-2 focus:ring-rose-500 focus:border-transparent text-gray-800 placeholder:text-gray-500"
          placeholder="Your Email"
          required
        />
      </div>
      <div>
        <label className="block text-gray-800 mb-2">Your Wish</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          className="w-full p-2 border rounded focus:ring-2 focus:ring-rose-500 focus:border-transparent text-gray-800 placeholder:text-gray-500"
          placeholder="Write your heartfelt wish here..."
          rows="4"
          required
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-rose-600 text-white py-3 rounded hover:bg-rose-700 transition disabled:opacity-50"
      >
        {loading ? "Posting..." : "Post Your Wish"}
      </button>
    </form>
  );
};

export default Form;
