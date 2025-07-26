import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Clock, CheckCircle, XCircle } from "lucide-react";

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

interface BudgetStatsProps {
  requests: BudgetRequest[];
}

export const BudgetStats = ({ requests }: BudgetStatsProps) => {
  const totalRequests = requests.length;
  const pendingRequests = requests.filter((r) => r.status === "pending").length;
  const approvedRequests = requests.filter(
    (r) => r.status === "approved"
  ).length;
  const rejectedRequests = requests.filter(
    (r) => r.status === "rejected"
  ).length;

  const totalAmount = requests.reduce((sum, req) => sum + req.amount, 0);
  const approvedAmount = requests
    .filter((r) => r.status === "approved")
    .reduce((sum, req) => sum + req.amount, 0);

  const stats = [
    {
      title: "Total Budget Requests",
      value: totalRequests.toString(),
      icon: DollarSign,
      description: `₦${totalAmount.toLocaleString()} total requested`,
    },
    {
      title: "Pending Approval",
      value: pendingRequests.toString(),
      icon: Clock,
      description: "Awaiting review",
    },
    {
      title: "Approved",
      value: approvedRequests.toString(),
      icon: CheckCircle,
      description: `₦${approvedAmount.toLocaleString()} approved`,
    },
    {
      title: "Rejected",
      value: rejectedRequests.toString(),
      icon: XCircle,
      description: "Budget requests declined",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
