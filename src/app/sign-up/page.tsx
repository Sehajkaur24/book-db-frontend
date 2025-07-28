"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // ✅ Import router

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter(); // ✅ Initialize router

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        alert("✅ Registered successfully!");

        // Clear form
        setEmail("");
        setPassword("");

        // ✅ Redirect to sign-in page
        router.push("/sign-in");
      } else {
        alert("⚠️ Registration failed. Try again.");
      }
    } catch (error) {
      console.error(error);
      alert("⚠️ Error connecting to server.");
    }
  };

  return (
    <div className="min-h-screen bg-[#EEEFE0] flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-[#D1D8BE] p-10 rounded-xl shadow-xl w-full max-w-md"
      >
        <h2 className="text-center text-2xl mb-6 text-gray-800 font-semibold">
          Create Your Account
        </h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-3 mb-4 border border-gray-300 rounded-md bg-[#A7C1A8] text-gray-800 text-sm"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-3 mb-6 border border-gray-300 rounded-md bg-[#A7C1A8] text-gray-800 text-sm"
        />
        <button
          type="submit"
          className="w-full p-3 bg-[#819A91] text-white font-bold rounded-md hover:bg-[#6a857c] transition"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
