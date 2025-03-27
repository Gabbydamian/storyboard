"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "@/types/user";
import {
  getUser,
  // sessionListener,
  signInUser,
  signOutUser,
  signUpUser,
  resetUserPassword,
} from "@/actions/userActions";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  signUp: (
    email: string,
    password: string,
    displayName: string
  ) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const fetchedUser = await getUser();
        setUser(fetchedUser);
      } catch (error) {
        console.log("Error fetching user:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();

    // sessionListener();
  }, []);

const signIn = async (email: string, password: string) => {
  try {
    const result = await signInUser(email, password);

    if ("error" in result) {
      throw new Error(result.error);
    }

    const updatedUser = await getUser();
    setUser(updatedUser);
    router.replace("/");
    router.refresh();
  } catch (error) {
    console.error("Sign-in error:", error);
    throw error;
  }
};

  const signOut = async () => {
    try {
      await signOutUser();
      setUser(null);
      router.push("/login");
    } catch (error) {
      console.error("Sign-out error:", error);
      throw error;
    }
  };

  const signUp = async (
    email: string,
    password: string,
    displayName: string
  ) => {
    try {
      await signUpUser(email, password, displayName);
      router.push("/login");
    } catch (error) {
      console.error("Sign-up error:", error);
      throw error;
    }
  };

  const resetPassword = async (email: string) => {
    try {
      await resetUserPassword(email);
    } catch (error) {
      console.error("Reset password error:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, signIn, signOut, signUp, resetPassword }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
