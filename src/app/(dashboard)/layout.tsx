"use client";
import React, { useEffect, useState } from "react";
import { trpc } from "@/trpc/client";
import { useUserStore } from "@/store/user";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/layout/Sidebar";
import TopNav from "@/components/layout/TopNav";
import { useTheme } from "next-themes";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setUser } = useUserStore();
  const router = useRouter();

  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const { data, isLoading, isError } = trpc.auth.user.useQuery(undefined, {
    retry: false,
  });

  useEffect(() => {
    if (data?.user) {
      setUser(data.user);
    }
  }, [data, setUser]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  if (isLoading) return null;
  if (isError) return router.push("/sign-in");

  return (
    <div className={`flex h-screen ${theme === "dark" ? "dark" : ""}`}>
      <Sidebar />
      <div className="w-full flex flex-1 flex-col">
        <header className="h-16 border-b border-gray-200 dark:border-[#1F1F23]">
          <TopNav />
        </header>
        <main className="flex-1 overflow-auto p-6 bg-white dark:bg-[#0F0F12]">
          {children}
        </main>
      </div>
    </div>
  );
}
