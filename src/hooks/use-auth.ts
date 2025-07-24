"use client";
import { useState } from "react";
import { trpc } from "@/trpc/client";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

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

  const register = async (data: RegisterData) => {
    setIsLoading(true);
    try {
      // 1. Register in your backend
      await registerMutation.mutateAsync(data);

      // 2. Then register in BetterAuth
      const betterAuthUser = await authClient.signUp.email({
        email: data.email,
        password: data.password,
        name: `${data.firstName} ${data.lastName}`,
      });

      if (betterAuthUser.error) {
        throw new Error(betterAuthUser.error.message);
      }

      // 3. Then sign in
      const signInResult = await authClient.signIn.email({
        email: data.email,
        password: data.password,
      });

      if (signInResult.error) {
        throw new Error(signInResult.error.message);
      }

      toast.success("Account created successfully! You are now logged in.");
      router.push("/dashboard");
    } catch (error) {
      console.error("Registration error:", error);
      toast.error(
        error instanceof Error ? error.message : "Registration failed"
      );
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const result = await authClient.signIn.email({
        email,
        password,
      });

      if (result.error) {
        throw new Error(result.error.message);
      }

      toast.success("Signed in successfully!");
      //   window.location.href = "/dashboard";
      router.push("/dashboard");
    } catch (error) {
      console.error("Sign in error:", error);
      toast.error(error instanceof Error ? error.message : "Sign in failed");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      await authClient.signOut();
      toast.success("Signed out successfully!");
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
