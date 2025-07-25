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
    onSuccess: () => toast.success("Budget created successfully"),
    onError: () => toast.error("Failed to create budget"),
  });

  // ✅ Fetch all budgets
  const allBudgets = trpc.budget.getBudgets.useQuery();

  // ✅ Fetch department-specific budgets
  const departmentBudgets = trpc.budget.getDepartmentBudgets.useQuery(
    { department: user?.department || "" },
    { enabled: !!user?.department } // only fetch when available
  );

  const createBudget = (data: { title: string; amount: number }) => {
    if (!user?.id || !user?.department) {
      toast.error("User or department not found");
      return;
    }

    addBudgetMutation.mutate({
      title: data.title,
      amount: data.amount.toString(),
      userId: user.id,
      department: user.department,
    });
  };

  return {
    createBudget,
    isLoading,
    allBudgets: allBudgets.data,
    departmentBudgets: departmentBudgets.data,
  };
}
