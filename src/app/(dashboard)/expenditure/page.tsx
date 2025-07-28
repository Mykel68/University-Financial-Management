"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import {
  Search,
  Filter,
  Download,
  AlertTriangle,
  TrendingUp,
} from "lucide-react";

const expenditureData = [
  {
    month: "Jan",
    salaries: 120000,
    operations: 45000,
    infrastructure: 25000,
    research: 15000,
    other: 8000,
  },
  {
    month: "Feb",
    salaries: 125000,
    operations: 42000,
    infrastructure: 30000,
    research: 18000,
    other: 10000,
  },
  {
    month: "Mar",
    salaries: 122000,
    operations: 48000,
    infrastructure: 28000,
    research: 20000,
    other: 12000,
  },
  {
    month: "Apr",
    salaries: 128000,
    operations: 40000,
    infrastructure: 22000,
    research: 16000,
    other: 9000,
  },
  {
    month: "May",
    salaries: 130000,
    operations: 52000,
    infrastructure: 35000,
    research: 22000,
    other: 11000,
  },
  {
    month: "Jun",
    salaries: 132000,
    operations: 38000,
    infrastructure: 40000,
    research: 25000,
    other: 15000,
  },
];

const departmentBudgets = [
  {
    department: "Computer Science",
    allocated: 150000,
    spent: 142000,
    remaining: 8000,
    utilization: 94.7,
  },
  {
    department: "Engineering",
    allocated: 180000,
    spent: 165000,
    remaining: 15000,
    utilization: 91.7,
  },
  {
    department: "Business",
    allocated: 120000,
    spent: 98000,
    remaining: 22000,
    utilization: 81.7,
  },
  {
    department: "Arts & Humanities",
    allocated: 90000,
    spent: 85000,
    remaining: 5000,
    utilization: 94.4,
  },
  {
    department: "Sciences",
    allocated: 200000,
    spent: 188000,
    remaining: 12000,
    utilization: 94.0,
  },
];

const recentExpenses = [
  {
    id: "EXP-001",
    description: "Laboratory Equipment",
    department: "Sciences",
    amount: 25000,
    date: "2024-01-15",
    status: "Approved",
    category: "Infrastructure",
  },
  {
    id: "EXP-002",
    description: "Software Licenses",
    department: "Computer Science",
    amount: 12000,
    date: "2024-01-14",
    status: "Pending",
    category: "Operations",
  },
  {
    id: "EXP-003",
    description: "Research Materials",
    department: "Engineering",
    amount: 8500,
    date: "2024-01-13",
    status: "Approved",
    category: "Research",
  },
  {
    id: "EXP-004",
    description: "Faculty Training",
    department: "Business",
    amount: 5000,
    date: "2024-01-12",
    status: "Rejected",
    category: "Operations",
  },
  {
    id: "EXP-005",
    description: "Building Maintenance",
    department: "Administration",
    amount: 15000,
    date: "2024-01-11",
    status: "Approved",
    category: "Infrastructure",
  },
];

const categoryColors = {
  salaries: "#3b82f6",
  operations: "#8b5cf6",
  infrastructure: "#10b981",
  research: "#f59e0b",
  other: "#ef4444",
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case "Approved":
      return (
        <Badge className="bg-success text-success-foreground">Approved</Badge>
      );
    case "Pending":
      return (
        <Badge className="bg-warning text-warning-foreground">Pending</Badge>
      );
    case "Rejected":
      return <Badge variant="destructive">Rejected</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

const getBudgetStatus = (utilization: number) => {
  if (utilization > 95)
    return { color: "text-destructive", icon: AlertTriangle };
  if (utilization > 85) return { color: "text-warning", icon: AlertTriangle };
  return { color: "text-success", icon: TrendingUp };
};

export default function Expenditure() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Expenditure Tracking
          </h1>
          <p className="text-muted-foreground">
            Monitor and manage university expenses and budgets
          </p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="current-month">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current-month">Current Month</SelectItem>
              <SelectItem value="last-month">Last Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Expenditure
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₦250,000</div>
            <p className="text-xs text-muted-foreground">
              +5.2% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Budget Utilization
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92.3%</div>
            <p className="text-xs text-muted-foreground">
              Average across departments
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Approvals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">₦45,000 total value</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Over Budget Depts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-destructive">Requires attention</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="departments">Departments</TabsTrigger>
          <TabsTrigger value="expenses">Recent Expenses</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Expenditure by Category</CardTitle>
                <CardDescription>Current month breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={[
                        {
                          name: "Salaries",
                          value: 132000,
                          color: categoryColors.salaries,
                        },
                        {
                          name: "Operations",
                          value: 38000,
                          color: categoryColors.operations,
                        },
                        {
                          name: "Infrastructure",
                          value: 40000,
                          color: categoryColors.infrastructure,
                        },
                        {
                          name: "Research",
                          value: 25000,
                          color: categoryColors.research,
                        },
                        {
                          name: "Other",
                          value: 15000,
                          color: categoryColors.other,
                        },
                      ]}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                    >
                      {Object.values(categoryColors).map((color, index) => (
                        <Cell key={`cell-${index}`} fill={color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => [`$${value.toLocaleString()}`, ""]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Monthly Expenditure Trends</CardTitle>
                <CardDescription>Last 6 months comparison</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={expenditureData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip
                      formatter={(value) => [`$${value.toLocaleString()}`, ""]}
                    />
                    <Line
                      type="monotone"
                      dataKey="salaries"
                      stroke={categoryColors.salaries}
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="operations"
                      stroke={categoryColors.operations}
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="infrastructure"
                      stroke={categoryColors.infrastructure}
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="departments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Department Budget Overview</CardTitle>
              <CardDescription>
                Budget allocation and utilization by department
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {departmentBudgets.map((dept) => {
                  const status = getBudgetStatus(dept.utilization);
                  const StatusIcon = status.icon;
                  return (
                    <div
                      key={dept.department}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <StatusIcon className={`h-4 w-4 ${status.color}`} />
                        <div>
                          <div className="font-medium">{dept.department}</div>
                          <div className="text-sm text-muted-foreground">
                            ₦{dept.spent.toLocaleString()} / ₦
                            {dept.allocated.toLocaleString()}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="font-bold">{dept.utilization}%</div>
                          <div className="text-sm text-muted-foreground">
                            ₦{dept.remaining.toLocaleString()} remaining
                          </div>
                        </div>
                        <div className="w-24 bg-muted rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              dept.utilization > 95
                                ? "bg-destructive"
                                : dept.utilization > 85
                                ? "bg-warning"
                                : "bg-success"
                            }`}
                            style={{
                              width: `${Math.min(dept.utilization, 100)}%`,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="expenses" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Expenses</CardTitle>
              <CardDescription>
                Latest expense requests and approvals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search expenses..." className="pl-10" />
                </div>
                <Select>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  More Filters
                </Button>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentExpenses.map((expense) => (
                      <TableRow key={expense.id}>
                        <TableCell className="font-medium">
                          {expense.id}
                        </TableCell>
                        <TableCell>{expense.description}</TableCell>
                        <TableCell>{expense.department}</TableCell>
                        <TableCell>{expense.category}</TableCell>
                        <TableCell className="font-medium">
                          ${expense.amount.toLocaleString()}
                        </TableCell>
                        <TableCell>{expense.date}</TableCell>
                        <TableCell>{getStatusBadge(expense.status)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Expenditure Trends Analysis</CardTitle>
              <CardDescription>
                Category-wise spending patterns over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={expenditureData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip
                    formatter={(value) => [`$${value.toLocaleString()}`, ""]}
                  />
                  <Bar
                    dataKey="salaries"
                    stackId="a"
                    fill={categoryColors.salaries}
                    name="Salaries"
                  />
                  <Bar
                    dataKey="operations"
                    stackId="a"
                    fill={categoryColors.operations}
                    name="Operations"
                  />
                  <Bar
                    dataKey="infrastructure"
                    stackId="a"
                    fill={categoryColors.infrastructure}
                    name="Infrastructure"
                  />
                  <Bar
                    dataKey="research"
                    stackId="a"
                    fill={categoryColors.research}
                    name="Research"
                  />
                  <Bar
                    dataKey="other"
                    stackId="a"
                    fill={categoryColors.other}
                    name="Other"
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
