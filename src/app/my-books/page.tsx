"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function MyBooks() {
  type Book = {
    id: number;
    title: string;
    author: string;
    genre: string;
    year: string;
    description: string;
  };

  const [books, setBooks] = useState<Book[]>([]);

  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  // Fetch all books belonging to the logged-in user
  const fetchBooks = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first.");
      return;
    }

    try {
      const res = await fetch("http://localhost:8000/book", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        setBooks(data);
      } else {
        alert("Failed to fetch books: " + (data.message || data.error));
      }
    } catch (error) {
      alert("Something went wrong while fetching books.");
      console.error(error);
    }
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = confirm("Are you sure you want to delete this book?");
    if (!confirmDelete) return;

    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`http://localhost:8000/book/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        alert("Book deleted successfully.");
        fetchBooks();
      } else {
        const data = await res.json();
        alert("Failed to delete: " + (data.message || data.error));
      }
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-[#EEEFE0] text-gray-800">
      {/* Sidebar */}
      <aside className="w-64 bg-[#D1D8BE] shadow-md p-4">
        <h2 className="text-2xl font-bold mb-6">📚 BookShelf</h2>
        <ul className="space-y-4 text-lg">
          <li>
            <a href="/dashboard" className="hover:text-[#819A91]">
              Dashboard
            </a>
          </li>
          <li>
            <a href="/my-books" className="hover:text-[#819A91]">
              My Books
            </a>
          </li>
          <li>
            <a href="/add-book" className="hover:text-[#819A91]">
              Add Book
            </a>
          </li>
          <li>
            <a href="/genres" className="hover:text-[#819A91]">
              Genres
            </a>
          </li>
          <li>
            <a href="/settings" className="hover:text-[#819A91]">
              Settings
            </a>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-[#A7C1A8] shadow p-4 flex justify-between items-center">
          <h1 className="text-2xl font-semibold">📖 My Books</h1>
          <span>Hello, Reader!</span>
        </header>

        <main className="p-6 flex flex-col gap-6 overflow-y-auto">
          {/* Search */}
          <div className="max-w-xl">
            <input
              type="text"
              placeholder="Search books by title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-3 border border-[#819A91] rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#819A91]"
            />
          </div>

          {/* Book Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBooks.length > 0 ? (
              filteredBooks.map((book: any) => (
                <div
                  key={book.id}
                  className="bg-white/80 backdrop-blur-lg p-5 rounded-2xl shadow hover:shadow-xl transition transform hover:scale-105 relative"
                >
                  <div className="absolute top-3 right-3 flex gap-3 text-lg">
                    <button
                      title="Edit"
                      className="text-blue-600 hover:text-blue-800 cursor-pointer font-bold"
                      onClick={() => router.push(`/edit-book/${book.id}`)}
                    >
                      ✏️
                    </button>
                    <button
                      title="Delete"
                      className="text-red-600 hover:text-red-800 cursor-pointer font-bold"
                      onClick={() => handleDelete(book.id)}
                    >
                      🗑️
                    </button>
                  </div>

                  <h2 className="text-xl font-bold mb-2">{book.title}</h2>
                  <p>
                    <strong>Author:</strong> {book.author}
                  </p>
                  <p>
                    <strong>Genre:</strong> {book.genre}
                  </p>
                  <p>
                    <strong>Year:</strong> {book.year}
                  </p>
                  <p className="mt-2 text-sm text-gray-700">
                    {book.description}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 col-span-3 text-center">
                No books found.
              </p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
