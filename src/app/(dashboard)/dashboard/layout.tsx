"use client"; // 👈 Needed to use Zustand + trpc

import React, { useEffect } from "react";
import { trpc } from "@/trpc/client";
import { useUserStore } from "@/store/user";
import { useRouter } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { setUser } = useUserStore();
  const router = useRouter();

  const { data, isLoading, isError } = trpc.auth.user.useQuery(undefined, {
    retry: false,
  });

  useEffect(() => {
    if (data?.user) {
      setUser(data.user);
    }
  }, [data, setUser]);

  if (isLoading) return <div>Loading layout...</div>;
  if (isError) return router.push("/sign-in");

  return <div>{children}</div>;
}
