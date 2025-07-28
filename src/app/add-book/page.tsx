"use client";

import React, { useState } from "react";

export default function AddBook() {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    year: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the payload to match the Swagger schema
    const bookData = {
      title: formData.title,
      author: formData.author,
      genre: formData.genre,
      description: formData.description,
    };

    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:8000/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bookData),
      });

      if (res.ok) {
        alert("Book added successfully!");
        setFormData({
          title: "",
          author: "",
          genre: "",
          year: "",
          description: "",
        });
      } else {
        alert("Failed to add book.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="flex h-screen bg-[#f5f5ed] text-gray-800">
      {/* Sidebar */}
      <aside className="w-64 bg-[#dbe4c6] shadow-md p-4">
        <h2 className="text-2xl font-bold mb-6">📚 BookShelf</h2>
        <ul className="space-y-4 text-lg">
          <li>
            <a href="/dashboard" className="hover:text-green-800">
              Dashboard
            </a>
          </li>
          <li>
            <a href="/my-books" className="hover:text-green-800">
              My Books
            </a>
          </li>
          <li>
            <a href="/add-book" className="hover:text-green-800">
              Add Book
            </a>
          </li>
          <li>
            <a href="/genres" className="hover:text-green-800">
              Genres
            </a>
          </li>
          <li>
            <a href="/settings" className="hover:text-green-800">
              Settings
            </a>
          </li>
        </ul>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-[#b8c9b0] shadow p-4 flex justify-between items-center">
          <h1 className="text-2xl font-semibold">📖 Add New Book</h1>
          <div className="flex items-center space-x-4">
            <span>Hello, Reader!</span>
            <button className="bg-[#93a39b] hover:bg-[#7c8d86] text-white px-4 py-2 rounded">
              Logout
            </button>
          </div>
        </header>

        <main className="p-6 overflow-y-auto">
          <h2 className="text-xl font-semibold mb-6">Enter Book Details</h2>
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded shadow space-y-4 max-w-xl"
          >
            <div>
              <label className="block font-medium mb-1">📖 Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Book Title"
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">✍️ Author</label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
                placeholder="Author Name"
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">🗂️ Genre</label>
              <select
                name="genre"
                value={formData.genre}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded"
              >
                <option value="">Select Genre</option>
                <option>Fiction</option>
                <option>Self-help</option>
                <option>Biography</option>
                <option>Fantasy</option>
              </select>
            </div>
            <div>
              <label className="block font-medium mb-1">📅 Year</label>
              <input
                type="number"
                name="year"
                value={formData.year}
                onChange={handleChange}
                placeholder="2024"
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">📝 Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Write a short description..."
                className="w-full border border-gray-300 p-2 rounded"
                rows={4}
              ></textarea>
            </div>
            <div className="pt-4">
              <button
                type="submit"
                className="bg-[#819A91] hover:bg-[#6e857c] text-white px-4 py-2 rounded"
              >
                Add Book
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}
