"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { trpc } from "@/trpc/client";
import { useUserStore } from "@/store/user";

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

  const setUser = useUserStore((state) => state.setUser);

  const registerMutation = trpc.auth.register.useMutation();
  const loginMutation = trpc.auth.login.useMutation();

  const register = async (data: RegisterData) => {
    setIsLoading(true);
    try {
      await registerMutation.mutateAsync(data);

      toast.success("Account created! Logging you in...");

      const response = await loginMutation.mutateAsync({
        email: data.email,
        password: data.password,
      });

      toast.success("You're now logged in!");
      setUser(response.user);
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
      const response = await loginMutation.mutateAsync({ email, password });
      console.log(response);
      setUser(response.user);
      toast.success("Signed in successfully!");
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
