// File Path: src/context/AuthContext.tsx
// Description: Custom authentication context for managing user login, logout, and token storage

"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";

/**
 * Interface defining the shape of the AuthContext.
 * - `user`: The current user's ID (or null if not logged in).
 * - `login`: Function to handle user login and store the ID token.
 * - `logout`: Function to handle user logout and clear the ID token.
 */
interface AuthContextType {
  user: string | null; // User ID or null if not authenticated
  login: (idToken: string) => void; // Function to log in the user
  logout: () => void; // Function to log out the user
}

// Create the AuthContext with an initial value of undefined
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Provider component for the AuthContext.
 * Manages the authentication state and provides it to child components.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<string | null>(null); // State to store the user's ID
  const router = useRouter(); // Next.js router for navigation

  /**
   * Function to handle user login.
   * Stores the Firebase ID token in localStorage and updates the user state.
   * @param idToken - The Firebase ID token received after successful authentication.
   */
  const login = (idToken: string) => {
    setUser(idToken); // Update the user state with the ID token
    localStorage.setItem("idToken", idToken); // Store the ID token in localStorage
    router.push("/protected"); // Redirect to the protected route
  };

  /**
   * Function to handle user logout.
   * Clears the ID token from localStorage and resets the user state.
   */
  const logout = () => {
    setUser(null); // Reset the user state
    localStorage.removeItem("idToken"); // Remove the ID token from localStorage
    router.push("/"); // Redirect to the home page
  };

  // Provide the authentication state and functions to child components
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Custom hook to access the AuthContext.
 * Throws an error if used outside the AuthProvider.
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
