// context/authContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { User as FirebaseUser } from "firebase/auth";
import { User } from "@/types/index";
import {
  getUserProfile,
  loginUser,
  logoutUser,
  signUpUser,
  subscribeToAuthChanges,
} from "@/services/authService";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  signup: (
    email: string,
    password: string,
    displayName: string,
    photoUrl?: string
  ) => Promise<{ success: boolean; error?: string }>;
  signin: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges(
      async (firebaseUser: FirebaseUser | null) => {
        try {
          if (firebaseUser) {
            const userProfile = await getUserProfile(firebaseUser.uid);
            setUser(userProfile);
          } else {
            setUser(null);
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
          setUser(null);
        } finally {
          setLoading(false);
        }
      }
    );

    return () => unsubscribe();
  }, []);

  const signup = async (
    email: string,
    password: string,
    displayName: string,
    photoUrl?: string
  ): Promise<{ success: boolean; error?: string }> => {
    setLoading(true);
    try {
      const { user: userProfile, error } = await signUpUser(
        email,
        password,
        displayName,
        photoUrl
      );

      if (error) {
        setLoading(false);
        return { success: false, error };
      }

      if (userProfile) {
        setUser(userProfile);
        setLoading(false);
        return { success: true };
      }

      setLoading(false);
      return { success: false, error: "Failed to create account" };
    } catch (error: any) {
      setLoading(false);
      return {
        success: false,
        error: error.message || "An unexpected error occurred",
      };
    }
  };

  const signin = async (
    email: string,
    password: string
  ): Promise<{ success: boolean; error?: string }> => {
    setLoading(true);
    try {
      const { user: firebaseUser, error } = await loginUser(email, password);

      if (error) {
        setLoading(false);
        return { success: false, error };
      }

      if (firebaseUser) {
        const userProfile = await getUserProfile(firebaseUser.uid);
        setUser(userProfile);
        setLoading(false);
        return { success: true };
      }

      setLoading(false);
      return { success: false, error: "Failed to sign in" };
    } catch (error: any) {
      setLoading(false);
      return {
        success: false,
        error: error.message || "An unexpected error occurred",
      };
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await logoutUser();
      setUser(null);
    } catch (error) {
      console.error("Error logging out:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    signup,
    signin,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}