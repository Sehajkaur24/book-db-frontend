"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function EditBookPage() {
  const { id } = useParams();
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    year: "",
    description: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login first.");
        return;
      }

      try {
        const res = await fetch(`http://localhost:8000/book/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) {
          setFormData(data);
        } else {
          alert("Failed to load book: " + (data.message || data.error));
        }
      } catch (err) {
        alert("Error loading book.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  const handleUpdate = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login.");
      return;
    }

    try {
      const res = await fetch(`http://localhost:8000/book/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("Book updated successfully.");
        router.push("/my-books");
      } else {
        const data = await res.json();
        alert("Failed to update: " + (data.message || data.error));
      }
    } catch (err) {
      alert("Something went wrong.");
      console.error(err);
    }
  };

  if (loading) return <p className="p-6">Loading book data...</p>;

  return (
    <div className="flex min-h-screen bg-[#EEEFE0] text-gray-800">
      {/* Sidebar */}
      <aside className="w-64 bg-[#D1D8BE] p-6 shadow-md">
        <h1 className="text-2xl font-bold text-[#819A91] mb-10">
          📚 BookShelf
        </h1>
        <nav className="flex flex-col space-y-4 text-lg">
          <Link href="/dashboard" className="hover:text-[#819A91]">
            Dashboard
          </Link>
          <Link href="/my-books" className="hover:text-[#819A91]">
            My Books
          </Link>
          <Link href="/add-book" className="hover:text-[#819A91]">
            Add Book
          </Link>
          <Link href="/genres" className="hover:text-[#819A91]">
            Genres
          </Link>
          <Link href="/settings" className="hover:text-[#819A91]">
            Settings
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h2 className="text-3xl font-bold text-[#819A91] mb-8">✏️ Edit Book</h2>

        <div className="bg-white p-6 rounded shadow-md max-w-xl mx-auto space-y-4 border border-[#D1D8BE]">
          <input
            type="text"
            placeholder="Title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="w-full p-3 border border-[#A7C1A8] rounded"
          />
          <input
            type="text"
            placeholder="Author"
            value={formData.author}
            onChange={(e) =>
              setFormData({ ...formData, author: e.target.value })
            }
            className="w-full p-3 border border-[#A7C1A8] rounded"
          />
          <input
            type="text"
            placeholder="Genre"
            value={formData.genre}
            onChange={(e) =>
              setFormData({ ...formData, genre: e.target.value })
            }
            className="w-full p-3 border border-[#A7C1A8] rounded"
          />
          <input
            type="text"
            placeholder="Year"
            value={formData.year}
            onChange={(e) => setFormData({ ...formData, year: e.target.value })}
            className="w-full p-3 border border-[#A7C1A8] rounded"
          />
          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="w-full p-3 border border-[#A7C1A8] rounded"
            rows={4}
          />

          <div className="flex gap-4 justify-end pt-4">
            <button
              onClick={() => router.push("/my-books")}
              className="px-4 py-2 bg-[#D1D8BE] text-gray-700 rounded hover:bg-[#A7C1A8]"
            >
              Cancel
            </button>
            <button
              onClick={handleUpdate}
              className="px-4 py-2 bg-[#819A91] text-white rounded hover:bg-[#6e867d]"
            >
              Save Changes
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
