// File Path: src/protected/page.tsx
// Description: Protected route/page that requires a valid Firebase ID token for access

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * This is the protected page component.
 * Before rendering, it verifies the user's authentication status by sending the stored ID token 
 * to a Google Cloud Function for validation. If the token is invalid or missing, the user is 
 * redirected to the login page.
 */

export default function ProtectedPage() {
  const router = useRouter(); // Initialize the Next.js router for navigation

  /**
   * useEffect hook to run side effects when the component mounts.
   * This effect sends the ID token to the Google Cloud Function for verification.
   */
  useEffect(() => {
    const verifyToken = async () => {
      try {
        // Retrieve the ID token from localStorage
        const idToken = localStorage.getItem("idToken");

        if (!idToken) {
          // If no token exists, redirect to the login page
          router.push("/login");
          return;
        }

        // Send the ID token to the Google Cloud Function for verification
        const response = await fetch(
          "https://your-cloud-function-url.cloudfunctions.net/checkAuth", // Replace with your actual Cloud Function URL
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${idToken}`, // Include the token in the Authorization header
            },
          }
        );

        if (response.status === 401 || response.status === 403) {
          // If the token is invalid or expired, redirect to the login page
          router.push("/login");
        }
      } catch (error) {
        console.error("Error verifying token:", error);
        // In case of any error, redirect to the login page
        router.push("/login");
      }
    };

    verifyToken(); // Call the function to verify the token
  }, [router]); // Dependency array ensures the effect runs only when the router changes

  /**
   * If the token is valid and the user is authenticated, render the protected content.
   */
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded shadow-md w-96 text-center">
        <h1 className="text-2xl font-bold mb-4">Protected Page</h1>
        <p className="text-gray-700">
          Welcome! This is a protected route. Only authenticated users can access this page.
        </p>
      </div>
    </div>
  );
}