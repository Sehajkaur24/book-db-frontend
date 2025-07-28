"use client";
import React, { useEffect, useState } from "react";

export default function BooksDashboard() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    setQuote("A reader lives a thousand lives before he dies.");
    setAuthor("George R.R. Martin");
  }, []);

  const recommendations = [
    {
      title: "The Alchemist",
      author: "Paulo Coelho",
      genre: "Fiction",
      cover: "https://covers.openlibrary.org/b/id/9251996-L.jpg",
    },
    {
      title: "Atomic Habits",
      author: "James Clear",
      genre: "Self-help",
      cover: "https://covers.openlibrary.org/b/id/10192563-L.jpg",
    },
    {
      title: "Becoming",
      author: "Michelle Obama",
      genre: "Biography",
      cover: "https://covers.openlibrary.org/b/id/10052364-L.jpg",
    },
    {
      title: "The Power of Now",
      author: "Eckhart Tolle",
      genre: "Spirituality",
      cover: "https://covers.openlibrary.org/b/id/10543753-L.jpg",
    },
  ];

  const handleLogout = () => {
    // Clear auth token or session
    localStorage.removeItem("token"); // Update the key name if it's different
    // Redirect to sign-in page
    window.location.href = "/sign-in";
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
            <a href="#" className="hover:text-green-800">
              Genres
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-green-800">
              Settings
            </a>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="bg-[#b8c9b0] shadow p-4 flex justify-between items-center">
          <h1 className="text-2xl font-semibold">📖 Book Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span>Hello, Reader!</span>
            <button
              onClick={handleLogout}
              className="bg-[#93a39b] hover:bg-[#7c8d86] text-white px-4 py-2 rounded"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Content Area */}
        <main className="p-6 overflow-y-auto">
          {/* Top Recommendations */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-[#819A91]">
              📚 Top Recommendations
            </h2>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {recommendations.map((book, idx) => (
                <div
                  key={idx}
                  className="min-w-[220px] bg-[#D1D8BE] rounded-2xl shadow-md p-4 hover:scale-105 transition-transform duration-300"
                >
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="w-full h-48 object-cover rounded-xl mb-3"
                  />
                  <h3 className="font-bold text-lg">{book.title}</h3>
                  <p className="text-sm text-[#555] italic">{book.author}</p>
                  <span className="inline-block mt-2 text-xs bg-[#A7C1A8] text-white px-2 py-1 rounded-full">
                    {book.genre}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Quote of the Day */}
          <section className="bg-[#D1D8BE] rounded-xl p-6 shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-[#819A91]">
              📝 Quote of the Day
            </h2>
            <blockquote className="italic text-lg text-[#444] mb-2">
              “{quote}”
            </blockquote>
            <p className="text-right font-semibold text-[#819A91]">
              – {author}
            </p>
          </section>
        </main>
      </div>
    </div>
  );
}
