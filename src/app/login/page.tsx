// File Path: src/login/page.tsx
// Description: Login page for user sign-in using Firebase Authentication

"use client";

import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/app";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const auth = getAuth(); // Initialize Firebase Auth
      await signInWithEmailAndPassword(auth, email, password); // Sign in with email and password

      // Get the ID token after successful login
      const user = auth.currentUser;
      if (user) {
        const idToken = await user.getIdToken(); // Get the Firebase ID token
        localStorage.setItem("idToken", idToken); // Store the ID token in localStorage
        router.push("/protected"); // Redirect to protected route
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="p-8 bg-white rounded shadow-md w-96"
      >
        <h1 className="text-2xl font-bold mb-4">Sign In</h1>

        <div className="mb-4">
          <label htmlFor="email" className="block mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          Log In
        </button>
      </form>
    </div>
  );
}