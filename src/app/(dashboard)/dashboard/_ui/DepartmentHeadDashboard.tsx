"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  DollarSign,
  FileText,
  Clock,
  CheckCircle,
  PlusCircle,
} from "lucide-react";
import { useUserStore } from "@/store/user";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  budgetFormSchema,
  BudgetFormValues,
  BudgetPayload,
  budgetSchema,
} from "@/schema/budget";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useBudget } from "@/hooks/budget";
import { useState } from "react";

export function DepartmentHeadDashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUserStore();
  const departmentStats = [
    {
      title: "Department Budget",
      value: "₦8.5M",
      description: "Allocated for this year",
      icon: DollarSign,
    },
    {
      title: "Budget Used",
      value: "₦5.2M",
      description: "61% of allocation",
      icon: CheckCircle,
    },
    {
      title: "Pending Requests",
      value: "3",
      description: "Awaiting approval",
      icon: Clock,
    },
    {
      title: "Approved Requests",
      value: "18",
      description: "This quarter",
      icon: FileText,
    },
  ];

  const recentRequests = [
    {
      id: 1,
      title: "Laboratory Equipment",
      amount: 450000,
      status: "approved",
      date: "2024-01-15",
    },
    {
      id: 2,
      title: "Conference Travel",
      amount: 85000,
      status: "pending",
      date: "2024-01-18",
    },
    {
      id: 3,
      title: "Office Supplies",
      amount: 25000,
      status: "approved",
      date: "2024-01-20",
    },
  ];

  const budgetBreakdown = [
    { category: "Personnel", allocated: 5000000, spent: 3200000 },
    { category: "Equipment", allocated: 2000000, spent: 1100000 },
    { category: "Operations", allocated: 1000000, spent: 720000 },
    { category: "Travel", allocated: 500000, spent: 180000 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            {user?.department || "Department"} Overview
          </h2>
          <p className="text-muted-foreground">
            Manage departmental budgets and submit funding requests
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="secondary">Department Head</Badge>
          {/* <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Request
          </Button> */}
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button variant="default">
                <PlusCircle className="mr-2 h-4 w-4" />
                New Budget
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Budget</DialogTitle>
              </DialogHeader>

              <BudgetForm setIsOpen={setIsOpen} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {departmentStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Budget Breakdown</CardTitle>
            <CardDescription>
              Track spending across budget categories
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {budgetBreakdown.map((item) => {
                const percentage = (item.spent / item.allocated) * 100;
                return (
                  <div key={item.category} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{item.category}</span>
                      <span className="text-muted-foreground">
                        ₦{(item.spent / 1000).toFixed(0)}K / ₦
                        {(item.allocated / 1000).toFixed(0)}K
                      </span>
                    </div>
                    <Progress value={percentage} className="h-2" />
                    <div className="text-xs text-muted-foreground text-right">
                      {percentage.toFixed(1)}% used
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Requests</CardTitle>
            <CardDescription>
              Your latest budget requests and their status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentRequests.map((request) => (
                <div
                  key={request.id}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div>
                    <p className="text-sm font-medium">{request.title}</p>
                    <p className="text-xs text-muted-foreground">
                      Submitted {new Date(request.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">
                      ₦{request.amount.toLocaleString()}
                    </p>
                    <Badge
                      className={`text-xs ${
                        request.status === "approved"
                          ? "bg-success text-success-foreground"
                          : "bg-warning text-warning-foreground"
                      }`}
                    >
                      {request.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

type BudgetFormProps = {
  setIsOpen: (open: boolean) => void;
};

const BudgetForm = ({ setIsOpen }: BudgetFormProps) => {
  const { user } = useUserStore();
  const form = useForm<BudgetFormValues>({
    resolver: zodResolver(budgetFormSchema as any),
    defaultValues: {
      title: "",
      amount: 0,
      userId: user?.id ?? "",
      department: user?.department ?? "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = form;
  const { createBudget, isLoading } = useBudget();
  const onSubmit = async (data: BudgetFormValues) => {
    try {
      await createBudget(data); // wait for it to complete
      reset(); // clear form
      setIsOpen(false); // close dialog
    } catch (error) {
      console.error("Error creating budget:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit as any)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Project Title</label>
        <Input
          type="text"
          {...register("title")}
          disabled={isLoading}
          className="input input-bordered w-full"
          placeholder="e.g. Research Grant"
        />
        {errors.title && (
          <p className="text-sm text-red-500">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium">Amount (₦)</label>
        <Input
          type="number"
          {...register("amount")}
          disabled={isLoading}
          className="input input-bordered w-full"
        />
        {errors.amount && (
          <p className="text-sm text-red-500">{errors.amount.message}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="btn btn-primary w-full"
      >
        {isLoading ? "Creating..." : "Create Budget"}
      </Button>
    </form>
  );
};
