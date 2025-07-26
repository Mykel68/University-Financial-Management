"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { BudgetRequestForm } from "./_ui/BudgetRequest";
import { BudgetStats } from "./_ui/BudgetStats";
import { BudgetFilters } from "./_ui/BudgetFilters";
import { trpc } from "@/trpc/client";

interface BudgetRequest {
  id: string;
  department: string;
  title: string;
  amount: number;
  category: string;
  status: "pending" | "approved" | "rejected" | "under_review";
  submittedBy: string;
  submittedDate: string;
  description: string;
  priority: "low" | "medium" | "high";
}

const mockBudgetRequests: BudgetRequest[] = [
  {
    id: "BR001",
    department: "Engineering",
    title: "New Development Tools",
    amount: 25000,
    category: "Software",
    status: "pending",
    submittedBy: "John Smith",
    submittedDate: "2024-01-15",
    description: "Licenses for development IDE and testing tools",
    priority: "high",
  },
  {
    id: "BR002",
    department: "Marketing",
    title: "Q2 Campaign Budget",
    amount: 50000,
    category: "Marketing",
    status: "approved",
    submittedBy: "Sarah Johnson",
    submittedDate: "2024-01-10",
    description: "Digital advertising and content creation budget",
    priority: "medium",
  },
  {
    id: "BR003",
    department: "HR",
    title: "Training Programs",
    amount: 15000,
    category: "Training",
    status: "under_review",
    submittedBy: "Mike Wilson",
    submittedDate: "2024-01-12",
    description: "Employee skill development and certification programs",
    priority: "medium",
  },
  {
    id: "BR004",
    department: "Operations",
    title: "Equipment Upgrade",
    amount: 35000,
    category: "Equipment",
    status: "rejected",
    submittedBy: "Lisa Brown",
    submittedDate: "2024-01-08",
    description: "Office equipment and infrastructure upgrades",
    priority: "low",
  },
];

const Budget = () => {
  const { data, isLoading, error } = trpc.budget.budgetOverview.useQuery();
  //   const [requests, setRequests] = useState<BudgetRequest[]>(mockBudgetRequests);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterDepartment, setFilterDepartment] = useState<string>("all");

  // Map budget data to BudgetRequest interface
  const requests: BudgetRequest[] =
    data?.budgets.map((budget) => ({
      id: budget.id,
      department: budget.department || "Unknown",
      title: budget.title,
      amount: budget.amount,
      category: budget.department || "General", // Adjust based on your schema
      status:
        budget.isApproved === "approved"
          ? "approved"
          : budget.isApproved === "rejected"
          ? "rejected"
          : budget.isApproved === "pending"
          ? "pending"
          : "under_review", // Adjust logic if under_review is stored differently
      submittedBy: "Unknown", // Replace with actual user data if available
      submittedDate: new Date().toISOString().split("T")[0], // Replace with actual date if available
      description: budget.title, // Replace with actual description if available
      priority: "medium", // Replace with actual priority if available
    })) || [];

  const handleApprove = (id: string) => {
    trpc.budget.approveBudget.mutate({ id });
  };

  const handleReject = (id: string) => {
    trpc.budget.rejectBudget.mutate({ id });
  };

  const handleReview = (id: string) => {
    // Assuming a custom mutation for setting under_review
    // You may need to add this to budgetRouter if not already present
    trpc.budget.updateBudget.mutate({
      id,
      status: "under_review", // Adjust based on your schema
      title: requests.find((r) => r.id === id)?.title || "",
      amount: requests.find((r) => r.id === id)?.amount || 0,
      userId: requests.find((r) => r.id === id)?.submittedBy || "",
      department: requests.find((r) => r.id === id)?.department || "",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <Badge className="bg-green-100 text-green-800 border-green-200">
            <CheckCircle className="w-3 h-3 mr-1" />
            Approved
          </Badge>
        );
      case "rejected":
        return (
          <Badge className="bg-red-100 text-red-800 border-red-200">
            <XCircle className="w-3 h-3 mr-1" />
            Rejected
          </Badge>
        );
      case "under_review":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
            <AlertCircle className="w-3 h-3 mr-1" />
            Under Review
          </Badge>
        );
      default:
        return (
          <Badge className="bg-blue-100 text-blue-800 border-blue-200">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        );
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">High</Badge>;
      case "medium":
        return <Badge variant="secondary">Medium</Badge>;
      default:
        return <Badge variant="outline">Low</Badge>;
    }
  };

  const filteredRequests = requests.filter((req) => {
    const statusMatch = filterStatus === "all" || req.status === filterStatus;
    const departmentMatch =
      filterDepartment === "all" || req.department === filterDepartment;
    return statusMatch && departmentMatch;
  });

  // Calculate department spending for chart
  const departmentSpending = requests.reduce((acc, req) => {
    if (!acc[req.department]) {
      acc[req.department] = { allocated: 0, spent: 0 };
    }
    acc[req.department].allocated += req.amount;
    acc[req.department].spent += req.status === "approved" ? req.amount : 0; // Adjust based on actual spent data
    return acc;
  }, {} as Record<string, { allocated: number; spent: number }>);

  if (isLoading) return <div>Loading budget data...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Budget Management</h1>
          <p className="text-muted-foreground">
            Manage departmental budget requests and approvals
          </p>
        </div>
      </div>

      <BudgetStats requests={requests} />

      <Tabs defaultValue="requests" className="space-y-4">
        <TabsList>
          <TabsTrigger value="requests">Budget Requests</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="new-request">New Request</TabsTrigger>
        </TabsList>

        <TabsContent value="requests" className="space-y-4">
          <BudgetFilters
            filterStatus={filterStatus}
            filterDepartment={filterDepartment}
            onStatusChange={setFilterStatus}
            onDepartmentChange={setFilterDepartment}
            departments={Array.from(new Set(requests.map((r) => r.department)))}
          />

          <Card>
            <CardHeader>
              <CardTitle>Budget Requests</CardTitle>
              <CardDescription>
                Review and manage all departmental budget requests
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Request ID</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell className="font-mono">{request.id}</TableCell>
                      <TableCell>{request.department}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{request.title}</div>
                          <div className="text-sm text-muted-foreground">
                            {request.category}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        ${request.amount.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        {getPriorityBadge(request.priority)}
                      </TableCell>
                      <TableCell>{getStatusBadge(request.status)}</TableCell>
                      <TableCell>
                        <div>
                          <div className="text-sm">
                            {new Date(
                              request.submittedDate
                            ).toLocaleDateString()}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {request.submittedBy}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          {request.status === "pending" && (
                            <>
                              <Button
                                size="sm"
                                onClick={() => handleApprove(request.id)}
                              >
                                Approve
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleReview(request.id)}
                              >
                                Review
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleReject(request.id)}
                              >
                                Reject
                              </Button>
                            </>
                          )}
                          {request.status === "under_review" && (
                            <>
                              <Button
                                size="sm"
                                onClick={() => handleApprove(request.id)}
                              >
                                Approve
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleReject(request.id)}
                              >
                                Reject
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Budget Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Detailed analytics coming soon with backend integration
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Department Spending
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Department-wise spending analysis coming soon
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="new-request">
          <BudgetRequestForm />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Budget;
