"use client";

import { createTRPCReact } from "@trpc/react-query";
import { httpBatchLink } from "@trpc/client";
import superjson from "superjson";
import { useState } from "react";
import { QueryClientProvider } from "@tanstack/react-query";

import { AppRouter } from "@/trpc/server/router/_app"; // adjust path if needed
import { makeQueryClient } from "./query-client";

// 👇 this is the named export you will use everywhere
export const trpc = createTRPCReact<AppRouter>();

function getUrl() {
  if (typeof window !== "undefined") return "";
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

export const TRPCReactProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: getUrl() + "/api/trpc",
          transformer: superjson,
        }),
      ],
    })
  );

  const queryClient = makeQueryClient();

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
};
