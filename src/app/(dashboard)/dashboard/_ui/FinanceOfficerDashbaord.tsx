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
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Calculator,
  FileText,
  AlertCircle,
} from "lucide-react";

export function FinanceOfficerDashboard() {
  const financialStats = [
    {
      title: "Total Budget",
      value: "₦45.2M",
      change: "+12.5%",
      trend: "up",
      description: "Current fiscal year",
      icon: DollarSign,
    },
    {
      title: "Expenses YTD",
      value: "₦28.7M",
      change: "-3.2%",
      trend: "down",
      description: "Year to date",
      icon: Calculator,
    },
    {
      title: "Cash Flow",
      value: "₦16.5M",
      change: "+8.1%",
      trend: "up",
      description: "Available funds",
      icon: TrendingUp,
    },
    {
      title: "Pending Approvals",
      value: "12",
      change: "new",
      trend: "neutral",
      description: "Requires attention",
      icon: AlertCircle,
    },
  ];

  const budgetCategories = [
    { name: "Operations", allocated: 25000000, spent: 18500000 },
    { name: "Infrastructure", allocated: 12000000, spent: 8200000 },
    { name: "Research", allocated: 8000000, spent: 5100000 },
    { name: "Administrative", allocated: 3000000, spent: 2800000 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Finance Overview
          </h2>
          <p className="text-muted-foreground">
            Monitor budgets, expenses, and financial performance
          </p>
        </div>
        <Badge>Finance Officer</Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {financialStats.map((stat) => {
          const Icon = stat.icon;
          const TrendIcon =
            stat.trend === "up"
              ? TrendingUp
              : stat.trend === "down"
              ? TrendingDown
              : FileText;
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
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  {stat.trend !== "neutral" && (
                    <TrendIcon
                      className={`h-3 w-3 ${
                        stat.trend === "up"
                          ? "text-success"
                          : "text-destructive"
                      }`}
                    />
                  )}
                  <span
                    className={
                      stat.trend === "up"
                        ? "text-success"
                        : stat.trend === "down"
                        ? "text-destructive"
                        : ""
                    }
                  >
                    {stat.change}
                  </span>
                  <span>{stat.description}</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Budget Utilization</CardTitle>
            <CardDescription>
              Track spending across different categories
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {budgetCategories.map((category) => {
                const percentage = (category.spent / category.allocated) * 100;
                return (
                  <div key={category.name} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{category.name}</span>
                      <span className="text-muted-foreground">
                        ₦{(category.spent / 1000000).toFixed(1)}M / ₦
                        {(category.allocated / 1000000).toFixed(1)}M
                      </span>
                    </div>
                    <Progress value={percentage} className="h-2" />
                    <div className="text-xs text-muted-foreground text-right">
                      {percentage.toFixed(1)}% utilized
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>
              Latest financial activities requiring review
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="text-sm font-medium">Equipment Purchase</p>
                  <p className="text-xs text-muted-foreground">
                    Engineering Dept.
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">₦850,000</p>
                  <Badge variant="secondary" className="text-xs">
                    Pending
                  </Badge>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="text-sm font-medium">Utility Payment</p>
                  <p className="text-xs text-muted-foreground">Facilities</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">₦125,000</p>
                  <Badge className="bg-success text-success-foreground text-xs">
                    Approved
                  </Badge>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="text-sm font-medium">Research Grant</p>
                  <p className="text-xs text-muted-foreground">Science Dept.</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">₦2,100,000</p>
                  <Badge variant="secondary" className="text-xs">
                    Review
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
