"use client";

import { useState } from "react";
import { toast } from "sonner";
import { trpc } from "@/trpc/client";
import { useUserStore } from "@/store/user";

export function useBudget() {
  const [isLoading, setIsLoading] = useState(false);
  const user = useUserStore((state) => state.user);
  const utils = trpc.useUtils(); // ⚠️ used to invalidate queries

  const addBudgetMutation = trpc.budget.addBudget.useMutation({
    onMutate: () => setIsLoading(true),
    onSettled: () => setIsLoading(false),
    onSuccess: () => {
      toast.success("Budget created successfully");
      utils.budget.getBudgets.invalidate(); // ✅ Revalidate all budgets
      utils.budget.getDepartmentBudgets.invalidate(); // ✅ Revalidate department budgets
    },
    onError: () => toast.error("Failed to create budget"),
  });

  const allBudgets = trpc.budget.getBudgets.useQuery();
  const departmentBudgets = trpc.budget.getDepartmentBudgets.useQuery(
    { department: user?.department || "" },
    { enabled: !!user?.department }
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

  const approveBudget = trpc.budget.approveBudget.useMutation({
    onSuccess: () => {
      toast.success("Budget approved");
      utils.budget.getBudgets.invalidate();
      utils.budget.getDepartmentBudgets.invalidate();
      utils.budget.budgetOverview.invalidate(); // ✅ This line is missing
    },
    onError: () => toast.error("Failed to approve budget"),
  });

  const rejectBudget = trpc.budget.rejectBudget.useMutation({
    onSuccess: () => {
      toast.success("Budget rejected");
      utils.budget.getBudgets.invalidate();
      utils.budget.getDepartmentBudgets.invalidate();
      utils.budget.budgetOverview.invalidate(); // ✅ Add this too
    },
    onError: () => toast.error("Failed to reject budget"),
  });

  const setUnderReview = trpc.budget.setUnderReview.useMutation({
    onSuccess: () => {
      toast.success("Budget marked as under review");
      utils.budget.getBudgets.invalidate();
      utils.budget.getDepartmentBudgets.invalidate();
      utils.budget.budgetOverview.invalidate(); // ✅ Don't forget this one
    },
    onError: () => toast.error("Failed to set under review"),
  });

  const handleApprove = (id: string) => approveBudget.mutate({ id });
  const handleReject = (id: string) => rejectBudget.mutate({ id });
  const handleReview = (id: string) => setUnderReview.mutate({ id });

  return {
    createBudget,
    isLoading,
    allBudgets: allBudgets.data,
    departmentBudgets: departmentBudgets.data,
    handleApprove,
    handleReject,
    handleReview,
  };
}
