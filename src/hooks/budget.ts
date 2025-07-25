"use client";

import { useState } from "react";
import { toast } from "sonner";
import { trpc } from "@/trpc/client";
import { useUserStore } from "@/store/user";

export function useBudget() {
  const [isLoading, setIsLoading] = useState(false);
  const user = useUserStore((state) => state.user);

  const addBudgetMutation = trpc.budget.addBudget.useMutation({
    onMutate: () => setIsLoading(true),
    onSettled: () => setIsLoading(false),
    onSuccess: () => {
      toast.success("Budget created successfully");
    },
    onError: () => {
      toast.error("Failed to create budget");
    },
  });

  const createBudget = (data: { title: string; amount: number }) => {
    if (!user?.id) {
      toast.error("User not found");
      return;
    }

    addBudgetMutation.mutate({
      title: data.title,
      amount: data.amount.toString(), // convert number to string ✅
      userId: user.id,
      department: user.department,
    });
  };

  return {
    createBudget,
    isLoading,
  };
}
