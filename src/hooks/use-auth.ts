"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { useRouter } from "next/navigation";

import { trpc } from "@/trpc/client";


type Role = "system_admin" | "finance_officer" | "department_head";

interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
  department?: string;
  password: string;
}

export function useAuth() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const registerMutation = trpc.auth.register.useMutation();
  const loginMutation = trpc.auth.login.useMutation();

  const register = async (data: RegisterData) => {
    setIsLoading(true);
    try {
      await registerMutation.mutateAsync(data);

      toast.success("Account created! Logging you in...");

      await loginMutation.mutateAsync({
        email: data.email,
        password: data.password,
      });


      if (signInResult.error) {
        throw new Error(signInResult.error.message);
      }

      toast.success("Account created successfully! You are now logged in.");

      // Redirect or handle success
      //   window.location.href = "/dashboard"; // or use your preferred routing method

      toast.success("You're now logged in!");

      router.push("/dashboard");
    } catch (error) {
      console.error("Registration error:", error);
      toast.error(
        error instanceof Error ? error.message : "Registration failed"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      await loginMutation.mutateAsync({ email, password });
      toast.success("Signed in successfully!");

      //   window.location.href = "/dashboard";

      router.push("/dashboard");
    } catch (error) {
      console.error("Sign in error:", error);
      toast.error(error instanceof Error ? error.message : "Sign in failed");
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      await fetch("/api/auth/sign-out", { method: "POST" });
      toast.success("Signed out!");
      window.location.href = "/login";
    } catch (error) {
      console.error("Sign out error:", error);
      toast.error("Sign out failed");
    }
  };

  return {
    register,
    signIn,
    signOut,
    isLoading,
  };
}
