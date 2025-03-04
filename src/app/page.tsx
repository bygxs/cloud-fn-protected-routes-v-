"use client";

import React from "react";
import Link from "next/link";
//import { useAuth } from "./context/AuthContext";

const HomePage: React.FC = () => {
//  const { user, logout } = useAuth();

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
      <nav className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 shadow-md">
        <Link
          href="/"
          className="text-2xl font-bold text-gray-800 dark:text-white"
        >
          MyApp
        </Link>
        <div>
     {/*      {user ? (
            <button
              onClick={() => logout()}
              className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 transition duration-200"
            >
              Sign Out
            </button>
          ) */} : (
            <Link
              href="/login"
              className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition duration-200"
            >
              Log In
            </Link>
          )}
        </div>
      </nav>

      <div className="flex flex-col items-center justify-center flex-grow p-4">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
          Welcome to Our App!
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
          Join us today and start your journey with us.
        </p>

        <Link
          href="/login"
          className="px-6 py-3 text-white bg-blue-600 rounded hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition duration-200"
        >
          Log In
        </Link>

        <p>try to reach dashboard without logging in</p>
        <Link
          href="/protected"
          className="px-6 py-3 text-white bg-blue-600 rounded hover:bg-blue-700 dark:bg-amber-500 dark:hover:bg-blue-600 transition duration-200"
        >
          Protected
        </Link>

        

        <div className="mt-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
            Serverless Functions (/api/) vs midddleware
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Serverless Functions (/api/) or getServerSideProps dodge the
            middleware headache and keep SSR solid. Here’s the quick rundown:
            Serverless Functions (/api/): Write an API route (e.g.,
            pages/api/check-auth.js), check shit there, redirect or pass data.
            Runs server-side, no root-level crap. getServerSideProps: Pages
            Router, server-side per request—check auth, redirect if needed, send
            props. Simple, reliable
          </p>
        </div>

        <div className="mt-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
            What are Protected Routes?
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            A protected page is restricted to authorized users only. Users must
            be logged in to access it. Unauthorized users are redirected to
            login.
          </p>
        </div>
      </div>
      <div>



        
      </div>




    </div>
  );
};

export default HomePage;