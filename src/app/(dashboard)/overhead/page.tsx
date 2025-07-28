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
import { Progress } from "@/components/ui/progress";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  LineChart,
  CartesianGrid,
  Line,
  Cell,
} from "recharts";

import {
  Building,
  Zap,
  Users,
  Wrench,
  TrendingUp,
  AlertTriangle,
  Download,
} from "lucide-react";

const overheadData = [
  {
    month: "Jan",
    facilities: 45000,
    utilities: 18000,
    admin: 25000,
    maintenance: 12000,
    insurance: 8000,
  },
  {
    month: "Feb",
    facilities: 47000,
    utilities: 19500,
    admin: 24000,
    maintenance: 15000,
    insurance: 8200,
  },
  {
    month: "Mar",
    facilities: 46000,
    utilities: 17000,
    admin: 26000,
    maintenance: 11000,
    insurance: 8000,
  },
  {
    month: "Apr",
    facilities: 48000,
    utilities: 16500,
    admin: 25500,
    maintenance: 13500,
    insurance: 8300,
  },
  {
    month: "May",
    facilities: 49000,
    utilities: 20000,
    admin: 27000,
    maintenance: 16000,
    insurance: 8100,
  },
  {
    month: "Jun",
    facilities: 50000,
    utilities: 22000,
    admin: 26500,
    maintenance: 14000,
    insurance: 8400,
  },
];

const overheadCategories = [
  {
    category: "Facilities Management",
    current: 50000,
    budget: 52000,
    variance: -2000,
    percentage: 96.2,
    icon: Building,
    color: "#3b82f6",
  },
  {
    category: "Utilities",
    current: 22000,
    budget: 20000,
    variance: 2000,
    percentage: 110.0,
    icon: Zap,
    color: "#f59e0b",
  },
  {
    category: "Administrative",
    current: 26500,
    budget: 28000,
    variance: -1500,
    percentage: 94.6,
    icon: Users,
    color: "#10b981",
  },
  {
    category: "Maintenance",
    current: 14000,
    budget: 15000,
    variance: -1000,
    percentage: 93.3,
    icon: Wrench,
    color: "#8b5cf6",
  },
];

const facilityMetrics = [
  {
    facility: "Main Campus",
    sqft: 250000,
    cost: 180000,
    costPerSqft: 0.72,
    utilization: 85,
  },
  {
    facility: "Science Building",
    sqft: 80000,
    cost: 65000,
    costPerSqft: 0.81,
    utilization: 92,
  },
  {
    facility: "Sports Complex",
    sqft: 120000,
    cost: 45000,
    costPerSqft: 0.38,
    utilization: 68,
  },
  {
    facility: "Library",
    sqft: 60000,
    cost: 35000,
    costPerSqft: 0.58,
    utilization: 78,
  },
  {
    facility: "Student Center",
    sqft: 90000,
    cost: 55000,
    costPerSqft: 0.61,
    utilization: 88,
  },
];

const utilityBreakdown = [
  { type: "Electricity", amount: 12000, percentage: 54.5, trend: "+8%" },
  { type: "Water", amount: 4500, percentage: 20.5, trend: "-2%" },
  { type: "Gas", amount: 3200, percentage: 14.5, trend: "+12%" },
  { type: "Internet/Telecom", amount: 2300, percentage: 10.5, trend: "0%" },
];

const getVarianceColor = (variance: number) => {
  if (variance > 0) return "text-destructive";
  return "text-success";
};

const getVarianceBadge = (percentage: number) => {
  if (percentage > 100) return <Badge variant="destructive">Over Budget</Badge>;
  if (percentage > 95)
    return (
      <Badge className="bg-warning text-warning-foreground">Near Limit</Badge>
    );
  return <Badge className="bg-success text-success-foreground">On Track</Badge>;
};

export default function Overhead() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Overhead Tracking
          </h1>
          <p className="text-muted-foreground">
            Monitor and optimize university overhead costs
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
            Export Report
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Overhead
            </CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₦120,900</div>
            <p className="text-xs text-muted-foreground">
              +3.2% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Budget Variance
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">-₦500</div>
            <p className="text-xs text-muted-foreground">0.4% under budget</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Cost per Student
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₦74.63</div>
            <p className="text-xs text-muted-foreground">
              Based on 1,620 students
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Efficiency Score
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87%</div>
            <p className="text-xs text-muted-foreground">+2% improvement</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="facilities">Facilities</TabsTrigger>
          <TabsTrigger value="utilities">Utilities</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Overhead by Category</CardTitle>
                <CardDescription>
                  Current month breakdown and budget comparison
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {overheadCategories.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.category} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Icon
                              className="h-5 w-5"
                              style={{ color: item.color }}
                            />
                            <span className="font-medium">{item.category}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            {getVarianceBadge(item.percentage)}
                            <span className="font-bold">
                              ₦{item.current.toLocaleString()}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <span>Budget: ₦{item.budget.toLocaleString()}</span>
                          <span className={getVarianceColor(item.variance)}>
                            {item.variance > 0 ? "+" : ""}₦
                            {item.variance.toLocaleString()}
                          </span>
                        </div>
                        <Progress value={item.percentage} className="h-2" />
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Overhead Distribution</CardTitle>
                <CardDescription>
                  Proportional spending across categories
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={overheadCategories.map((item) => ({
                        name: item.category.split(" ")[0],
                        value: item.current,
                        color: item.color,
                      }))}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                    >
                      {overheadCategories.map((item, index) => (
                        <Cell key={`cell-${index}`} fill={item.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => [`$${value.toLocaleString()}`, ""]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="facilities" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Facility Cost Analysis</CardTitle>
              <CardDescription>
                Cost per square foot and utilization metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {facilityMetrics.map((facility) => (
                  <div
                    key={facility.facility}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="font-medium">{facility.facility}</div>
                      <div className="text-sm text-muted-foreground">
                        {facility.sqft.toLocaleString()} sq ft
                      </div>
                    </div>
                    <div className="flex items-center gap-8">
                      <div className="text-center">
                        <div className="text-lg font-bold">
                          ₦{facility.costPerSqft}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          per sq ft
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold">
                          {facility.utilization}%
                        </div>
                        <div className="text-xs text-muted-foreground">
                          utilization
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold">
                          ₦{facility.cost.toLocaleString()}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          monthly cost
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="utilities" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Utility Breakdown</CardTitle>
                <CardDescription>Current month utility costs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {utilityBreakdown.map((utility) => (
                    <div
                      key={utility.type}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-primary"></div>
                        <span className="font-medium">{utility.type}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-muted-foreground">
                          {utility.percentage}%
                        </span>
                        <Badge variant="outline">{utility.trend}</Badge>
                        <span className="font-bold">
                          ₦{utility.amount.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Utility Cost Trends</CardTitle>
                <CardDescription>Monthly utility expenses</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={overheadData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip
                      formatter={(value) => [`$${value.toLocaleString()}`, ""]}
                    />
                    <Line
                      type="monotone"
                      dataKey="utilities"
                      stroke="hsl(var(--primary))"
                      strokeWidth={3}
                      dot={{ fill: "hsl(var(--primary))" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Overhead Trends Analysis</CardTitle>
              <CardDescription>
                Historical overhead costs by category
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={overheadData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip
                    formatter={(value) => [`$${value.toLocaleString()}`, ""]}
                  />
                  <Bar
                    dataKey="facilities"
                    stackId="a"
                    fill="#3b82f6"
                    name="Facilities"
                  />
                  <Bar
                    dataKey="utilities"
                    stackId="a"
                    fill="#f59e0b"
                    name="Utilities"
                  />
                  <Bar
                    dataKey="admin"
                    stackId="a"
                    fill="#10b981"
                    name="Administrative"
                  />
                  <Bar
                    dataKey="maintenance"
                    stackId="a"
                    fill="#8b5cf6"
                    name="Maintenance"
                  />
                  <Bar
                    dataKey="insurance"
                    stackId="a"
                    fill="#ef4444"
                    name="Insurance"
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
