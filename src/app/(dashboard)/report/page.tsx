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
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  FileText,
  Download,
  Calendar as CalendarIcon,
  Filter,
  Mail,
  Share,
  TrendingUp,
  DollarSign,
  Users,
  BookOpen,
} from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";

const reportTemplates = [
  {
    id: "financial-summary",
    name: "Financial Summary",
    description:
      "Comprehensive financial overview including revenue, expenses, and cash flow",
    category: "Financial",
    lastGenerated: "2024-01-15",
    frequency: "Monthly",
    recipients: 5,
  },
  {
    id: "student-analytics",
    name: "Student Analytics",
    description: "Student enrollment, performance, and demographic analysis",
    category: "Academic",
    lastGenerated: "2024-01-14",
    frequency: "Weekly",
    recipients: 3,
  },
  {
    id: "budget-variance",
    name: "Budget Variance",
    description: "Department budget analysis and variance reporting",
    category: "Financial",
    lastGenerated: "2024-01-13",
    frequency: "Monthly",
    recipients: 8,
  },
  {
    id: "overhead-analysis",
    name: "Overhead Analysis",
    description:
      "Detailed overhead cost breakdown and optimization opportunities",
    category: "Operations",
    lastGenerated: "2024-01-12",
    frequency: "Quarterly",
    recipients: 4,
  },
];

const kpiData = [
  {
    metric: "Total Revenue",
    current: 380000,
    target: 350000,
    variance: 8.6,
    status: "above",
  },
  {
    metric: "Student Enrollment",
    current: 1620,
    target: 1500,
    variance: 8.0,
    status: "above",
  },
  {
    metric: "Operating Expenses",
    current: 250000,
    target: 280000,
    variance: -10.7,
    status: "below",
  },
  {
    metric: "Faculty Ratio",
    current: 15.2,
    target: 16.0,
    variance: -5.0,
    status: "below",
  },
  {
    metric: "Graduation Rate",
    current: 89,
    target: 85,
    variance: 4.7,
    status: "above",
  },
  {
    metric: "Cash Flow",
    current: 180000,
    target: 150000,
    variance: 20.0,
    status: "above",
  },
];

const recentReports = [
  {
    name: "Q4 Financial Report",
    type: "PDF",
    size: "2.4 MB",
    date: "2024-01-15",
    downloads: 23,
  },
  {
    name: "Student Performance Analysis",
    type: "Excel",
    size: "1.8 MB",
    date: "2024-01-14",
    downloads: 15,
  },
  {
    name: "Budget Allocation Report",
    type: "PDF",
    size: "3.1 MB",
    date: "2024-01-13",
    downloads: 31,
  },
  {
    name: "Overhead Cost Analysis",
    type: "PDF",
    size: "1.9 MB",
    date: "2024-01-12",
    downloads: 18,
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "above":
      return "text-success";
    case "below":
      return "text-destructive";
    default:
      return "text-muted-foreground";
  }
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case "above":
      return (
        <Badge className="bg-success text-success-foreground">
          Above Target
        </Badge>
      );
    case "below":
      return <Badge variant="destructive">Below Target</Badge>;
    default:
      return <Badge variant="secondary">On Target</Badge>;
  }
};

export default function Reports() {
  const [date, setDate] = useState<Date>();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Reporting & Analytics
          </h1>
          <p className="text-muted-foreground">
            Generate comprehensive reports and track key performance indicators
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Share className="mr-2 h-4 w-4" />
            Share Report
          </Button>
          <Button>
            <FileText className="mr-2 h-4 w-4" />
            Create Report
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Reports Generated
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">124</div>
            <p className="text-xs text-muted-foreground">+12 this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Downloads
            </CardTitle>
            <Download className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,847</div>
            <p className="text-xs text-muted-foreground">
              +15.3% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Recipients
            </CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">47</div>
            <p className="text-xs text-muted-foreground">Across all reports</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Automated Reports
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground">
              Scheduled & recurring
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="templates" className="space-y-4">
        <TabsList>
          <TabsTrigger value="templates">Report Templates</TabsTrigger>
          <TabsTrigger value="kpis">KPI Dashboard</TabsTrigger>
          <TabsTrigger value="custom">Custom Reports</TabsTrigger>
          <TabsTrigger value="recent">Recent Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="templates" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {reportTemplates.map((template) => (
              <Card key={template.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                    <Badge variant="outline">{template.category}</Badge>
                  </div>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="text-sm text-muted-foreground">
                        Last Generated
                      </div>
                      <div className="font-medium">
                        {template.lastGenerated}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">
                        Frequency
                      </div>
                      <div className="font-medium">{template.frequency}</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      {template.recipients} recipients
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Download className="mr-1 h-3 w-3" />
                        Generate
                      </Button>
                      <Button size="sm">Configure</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="kpis" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Key Performance Indicators</CardTitle>
              <CardDescription>
                Real-time KPI tracking against targets
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {kpiData.map((kpi) => (
                  <div key={kpi.metric} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium">{kpi.metric}</div>
                      {getStatusBadge(kpi.status)}
                    </div>
                    <div className="text-2xl font-bold mb-1">
                      {kpi.metric.includes("Revenue") ||
                      kpi.metric.includes("Expenses") ||
                      kpi.metric.includes("Cash")
                        ? `₦${kpi.current.toLocaleString()}`
                        : kpi.current.toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground mb-2">
                      Target:{" "}
                      {kpi.metric.includes("Revenue") ||
                      kpi.metric.includes("Expenses") ||
                      kpi.metric.includes("Cash")
                        ? `₦${kpi.target.toLocaleString()}`
                        : kpi.target.toLocaleString()}
                    </div>
                    <div
                      className={`text-sm font-medium ${getStatusColor(
                        kpi.status
                      )}`}
                    >
                      {kpi.variance > 0 ? "+" : ""}
                      {kpi.variance.toFixed(1)}% vs target
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="custom" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Create Custom Report</CardTitle>
              <CardDescription>
                Build a custom report with specific metrics and filters
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Report Name</label>
                  <Input placeholder="Enter report name" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Report Type</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select report type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="financial">Financial</SelectItem>
                      <SelectItem value="academic">Academic</SelectItem>
                      <SelectItem value="operations">Operations</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Date Range</label>
                  <div className="flex gap-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Export Format</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF</SelectItem>
                      <SelectItem value="excel">Excel</SelectItem>
                      <SelectItem value="csv">CSV</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium">Include Metrics</label>
                <div className="grid gap-2 md:grid-cols-2">
                  {[
                    "Financial Summary",
                    "Student Analytics",
                    "Department Budgets",
                    "Cash Flow",
                    "Overhead Costs",
                    "Performance Metrics",
                  ].map((metric) => (
                    <div key={metric} className="flex items-center space-x-2">
                      <Checkbox id={metric} />
                      <label htmlFor={metric} className="text-sm">
                        {metric}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <Button className="flex-1">
                  <FileText className="mr-2 h-4 w-4" />
                  Generate Report
                </Button>
                <Button variant="outline">Save Template</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recent" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Reports</CardTitle>
              <CardDescription>
                Recently generated and downloaded reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentReports.map((report, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="h-8 w-8 text-primary" />
                      <div>
                        <div className="font-medium">{report.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {report.type} • {report.size} • {report.date}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-sm text-muted-foreground">
                        {report.downloads} downloads
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Download className="mr-1 h-3 w-3" />
                          Download
                        </Button>
                        <Button variant="outline" size="sm">
                          <Share className="mr-1 h-3 w-3" />
                          Share
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
